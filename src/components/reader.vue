<template>
  <div
    :class="{viewport: true, vertical: settings.mode === 'vertical'}"
    :style="{background: settings.background, color: settings.color}"
    ref="viewport"
    @scroll="handleViewportScroll"
  >
    <tablet>
      <header v-if="settings.mode === 'horizantol'">
        <div
          class="title"
        >{{$refs.container && $refs.container.current && $refs.container.current.title}}</div>
        <button class="buy" v-if="!info.read_auth">
          购买本书
          <span>{{info.price}} 元</span>
        </button>
      </header>
    </tablet>

    <div id="content" class="loading" v-if="isLoading">加载中...</div>

    <div id="content" :style="{height: settings.mode === 'horizantol' ? '100%' : 'unset'}" v-else>
      <horizantol
        v-if="settings.mode === 'horizantol'"
        :sections="sections"
        :permissions="permissions"
        :style="{fontSize: settings.fontSize + 'px'}"
        class="content"
        ref="container"
        @tk='tk'
        v-on="$listeners"
      ></horizantol>

      <div v-else @click="handleVerticalClick" ref="verticalContainer">
        <vertical
          v-for="item in sections"
          class="paragraphs"
          :key="item.id"
          :current="item"
          :style="{fontSize: settings.fontSize + 'px'}"
          :data-id="item.id"
        ></vertical>
      </div>
    </div>

    <control
      :info="info"
      :mode="settings.mode"
      :isShow="isToolbarShow"      
      @pageChange="handlePageChange"
      @show="handleControlShow"
      @close="handleControlClose"
      @add-bookmark="handleBookmarkAdd"
    ></control>

    <catalog
      v-if="isCatalogShow"
      :catalog="info.catalog_list"
      :progress="progress"
      :permissions="permissions"
      :current-article="currentArticle"
      @close="toggle('Catalog', false)"
    ></catalog>

    <bookmark v-if="isBookmarkShow" :sections="sections" @close="toggle('Bookmark', false)"></bookmark>

    <settings
      v-if="isSettingsShow"
      :value="settings"
      @input="handleSettingsChange"
      @close="handleControlClose"
    ></settings>
    <progress-bar
      v-if="isProgressShow"
      @change="handleChapterChange"
      @progress="handleProgressChange"
      :progress="progress"
      :isChapterVisible="settings.mode === 'horizantol'"
    ></progress-bar>
    
     <div v-if="tkshow" class="tk">
							<div class="qrsc">需要购买吗？小主</div>
							<span class="confirm" @click="confirm">急需</span>
        					<span class="cancel" @click="cancel">取消</span>
					</div>

  </div>
</template>

<script>
import Section from "../models/Section";
import Horizantol from "./horizantol.vue";
import Vertical from "./vertical.vue";
import Control from "./control.vue";
import Catalog from "./catalog.vue";
import Bookmark from "./bookmark.vue";
import Settings from "./settings.vue";
import ProgressBar from "./progress-bar.vue";
import Tablet from "./tablet.vue";
import { restoreProgress } from "../utils/progress.js";
import drawUnderline from "../utils/drawUnderline";
//import notation from "../utils/notation";

const defaultSettings = {
  fontSize: 16,
  background: "#faf7ed",
  color: "black",
  mode: "horizantol"
};

export default {
  props: [
    "articles",
    "info",
    "permissions",
    "bookmarks",
    "resourceId",
    "progress",
    "settings",
    "annotations",
    "currentArticle"
  ],

  data: () => ({
    isToolbarShow: false,
    isCatalogShow: false,
    isBookmarkShow: false,
    isSettingsShow: false,
    isProgressShow: false,

    isBouncedShow:false,
    tkshow:false
  }),

  mounted() {
    this.loadSettings();
    this.initHashChange();
    

    this.tis();

  },

  destroyed() {
    this.removeHashChange();
  },

  computed: {
    sections() {
      return drawUnderline(this.articles, this.annotations);
    },

    isLoading() {
      return !this.articles || this.articles.length === 0;
    },
    
  },

  methods: {

  	tis(){
  		var that = this;
  		var i = setInterval(function(){  			
  			 if(!that.isLoading){
  			 	setTimeout(function(){
//					$("sup").addClass('fa').addClass('fa-bullhorn');
					  $("sup").find("span").html("<span class='fa fa-bullhorn'></span>")
				   },500);			   
				   clearInterval(i);
  			 }
  		},500)
  	},
  	tk(){
  		this.tkshow = true;
  	},
  	 confirm(){
//      	markAPI.delP(this.lscribingS.id).then(res => {
        		alt_page('购买成功');
        		this.tkshow = false;
//	  			this.$emit("deletelscribing");
//             })
        },
        cancel(){
        	this.tkshow = false;
        },

  	notation(){
  		console.log(345)
  	},
    emitProgress(progress) {
      Promise.resolve().then(() => this.$emit("read", progress));
    },
    initHashChange() {
      window.addEventListener("replaceState", this.handleHistoryStateChange);
    },

    removeHashChange() {
      window.removeEventListener("replaceState", this.handleHistoryStateChange);
    },

    handleHistoryStateChange(e) {
      if (this.settings.mode === "horizantol") {
        return;
      }

      const { verticalContainer, viewport } = this.$refs;
      const [{ section, partcode }] = e.arguments;

      const [target] = partcode
        ? $(verticalContainer).find(`p[data-partcode="${partcode}"]`)
        : $(verticalContainer).find(`#section-${section}`);

      this.$refs.viewport.scrollTo(0, target.offsetTop);
    },

    handleVerticalClick() {
      this.isToolbarShow = true;
    
	    this.isCatalogShow = false;
	    this.isBookmarkShow = false;
	    this.isSettingsShow = false;
	    this.isProgressShow = false;
	    this.isBouncedShow = false;
    },

    handlePageChange(step) {
      if (step < 0) {
        this.prev();
      } else {
        this.next();
      }
    },

    handleProgressChange({ value }) {
      this.jumpTo(value);
    },

    handleControlShow(key) {
      this.closeControls();
      this[key] = true;
      if(key == 'isToolbarShow'){     	 
			    this.isCatalogShow = false;
			    this.isBookmarkShow = false;
			    this.isSettingsShow = false;
			    this.isProgressShow = false;
			    this.isBouncedShow = false;
      }else if(key == 'isCatalogShow'){     	 
			    this.isToolbarShow = false;
			    this.isBookmarkShow = false;
			    this.isSettingsShow = false;
			    this.isProgressShow = false;
			    this.isBouncedShow = false;
      }else if(key == 'isBookmarkShow'){     	 
			    this.isToolbarShow = false;
			    this.isCatalogShow = false;
			    this.isSettingsShow = false;
			    this.isProgressShow = false;
			    this.isBouncedShow = false;
      }else if(key == 'isSettingsShow'){     	 
			    this.isToolbarShow = false;
			    this.isCatalogShow = false;
			    this.isBookmarkShow = false;
			    this.isProgressShow = false;
			    this.isBouncedShow = false;
      }else if(key == 'isProgressShow'){     	 
			    this.isToolbarShow = false;
			    this.isCatalogShow = false;
			    this.isBookmarkShow = false;
			    this.isSettingsShow = false;
			    this.isBouncedShow = false;
      }else if(key == 'isBouncedShow'){     	 
			    this.isToolbarShow = false;
			    this.isCatalogShow = false;
			    this.isBookmarkShow = false;
			    this.isSettingsShow = false;
			    this.isProgressShow = false;
      }
    },

    handleControlClose() {
      this.closeControls();
      this.isToolbarShow = false;
    },

    handleBookmarkAdd() {
      this.$emit("add-bookmark");
    },

    toggle(key, shouldShow) {
      this[`is${key}Show`] = shouldShow;
      if(key == 'Toolbar'){     	 
			    this.isCatalogShow = false;
			    this.isBookmarkShow = false;
			    this.isSettingsShow = false;
			    this.isProgressShow = false;
			    this.isBouncedShow = false;
      }else if(key == 'Catalog'){     	 
			    this.isToolbarShow = false;
			    this.isBookmarkShow = false;
			    this.isSettingsShow = false;
			    this.isProgressShow = false;
			    this.isBouncedShow = false;
      }else if(key == 'Bookmark'){     	 
			    this.isToolbarShow = false;
			    this.isCatalogShow = false;
			    this.isSettingsShow = false;
			    this.isProgressShow = false;
			    this.isBouncedShow = false;
      }else if(key == 'Settings'){     	 
			    this.isToolbarShow = false;
			    this.isCatalogShow = false;
			    this.isBookmarkShow = false;
			    this.isProgressShow = false;
			    this.isBouncedShow = false;
      }else if(key == 'Progress'){     	 
			    this.isToolbarShow = false;
			    this.isCatalogShow = false;
			    this.isBookmarkShow = false;
			    this.isSettingsShow = false;
			    this.isBouncedShow = false;
      }else if(key == 'Bounced'){     	 
			    this.isToolbarShow = false;
			    this.isCatalogShow = false;
			    this.isBookmarkShow = false;
			    this.isSettingsShow = false;
			    this.isProgressShow = false;
      }
    },

    next() {
      const { container } = this.$refs;
      this.$refs.container.next();
    },

    prev() {
      const { container } = this.$refs;
      this.$refs.container.prev();
    },

    closeControls() {
       this.isToolbarShow = false;
	    this.isCatalogShow = false;
	    this.isBookmarkShow = false;
	    this.isSettingsShow = false;
	    this.isProgressShow = false;
	    this.isBouncedShow = false;
    },

    restoreSettings(value) {
      localStorage.setItem("settings", JSON.stringify(value));
    },

    loadSettings() {
      const str = localStorage.getItem("settings");
      this.$emit("settings-change", JSON.parse(str) || defaultSettings);
    },

    handleSettingsChange(value) {
      this.$emit("settings-change", value);
      this.restoreSettings(value);
    },

    handleChapterChange({ type }) {
      if (this.settings.mode === "vertical") {
        return;
      }

      this.$refs.container[`${type}Section`]();
    },

    jumpTo(percent) {
      percent = percent / 100;

      if (this.settings.mode === "horizantol") {
        return this.$refs.container.jumpTo(percent);
      }

      const { scrollHeight, clientHeight } = this.$refs.viewport;
      const scrollTo = percent * scrollHeight - clientHeight;
      this.$refs.viewport.scrollTo(0, scrollTo);
    },

    handleViewportScroll() {
      if (this.settings.mode !== "vertical") {
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = this.$refs.viewport;
      this.emitProgress((scrollTop + clientHeight) / scrollHeight);
      this.emitArticles();
    },

    emitArticles() {
      const { verticalContainer, viewport } = this.$refs;
      const headers = $(this.$refs.verticalContainer)
        .find("h1, h2, h3, h4, h5, p")
        .filter((_, c) => {
          if (!c.id) {
            return false;
          }
          return c.offsetTop < viewport.scrollTop;
        });

      if (!headers.length) {
        return;
      }

      const [latest] = headers.last();
      const [, current] = latest.id.match(/^section-(.*)$/);
      this.$emit("article-change", current);
    },

    content() {
      if (this.settings.mode === "horizantol") {
        return this.$refs.container.content();
      }

      const { viewport } = this.$refs;
      const { scrollTop } = viewport;
      const { innerHeight } = window;

      return $(viewport)
        .find(".paragraphs > h1, .paragraphs > div > *")
        .filter(
          (_, e) =>
            e.offsetTop >= scrollTop && e.offsetTop <= scrollTop + innerHeight
        )
        .text();
    },

    abstract() {
      if (this.settings.mode === "horizantol") {
        return this.$refs.container.abstract();
      }

      const { verticalContainer, viewport } = this.$refs;
      const [target] = $(verticalContainer)
        .find("p")
        .not(":has(img)")
        .filter((_, c) => c.offsetTop > viewport.scrollTop);
      const value = $(target).text();
      const partcode = $(target).data("partcode");

      const [article] = $(verticalContainer)
        .find("h1, h2, h3, h4, h5")
        .filter((_, h) => {
          const [, id] = h.id.match(/^section-(.*)$/);
          return (
            this.sections.findIndex(s => s.id == id) >= 0 &&
            h.offsetTop > viewport.scrollTop
          );
        });
      const [, article_id] = article.id.match(/^section-(\d+)$/);

      return {
        article_id,
        start_part: partcode,
        excerpt: value,
        percent: this.progress
      };
    }
  },

  components: {
    Horizantol,
    Vertical,
    Control,
    Catalog,
    Bookmark,
    Settings,
    ProgressBar,
    Tablet,
    
  }
};
</script>

<style scoped>
	.tk{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 200px;
		height: 100px;
		margin: auto;
		border: 1px solid gray;
		border-radius: 10px;
		background: white;
		z-index: 10;
	}
	.qrsc{
		text-align: center;
		padding: 17px;
		color: black;
	}
	.confirm {
    display: inline-block;
    color: #ffffff;
    margin-left: 31px;
    padding: 2px 8px;
    border-radius: 3px;
    border: 1px solid #ff3300;
    background-color: #ff3300;
    }
    .cancel {
    display: inline-block;
    color: #666666;
    padding: 2px 8px;
    margin-left: 31px;
    border-radius: 3px;
    border: 1px solid #dfdfdf;
    background-color: #ebebeb;
    }
.loading {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.viewport {
  /* width: 800px; */
  box-sizing: border-box;
  padding: 40px;
  height: 100% !important;
  overflow: hidden;
}

.viewport.vertical {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.viewport header {
  display: flex;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  margin-top: -1.6rem;
  margin-bottom: 1rem;
}

.viewport header .title {
  margin: 6px 0;
  font-size: 0.8em;
  color: #999;
}

.viewport header .title::before {
  content: "- ";
}

.viewport header .buy {
  background: #efefef;
  color: #666;
  padding: 0 4px;
  margin: 4px 0;
}

.content {
  height: 100%;
}

@media only screen and (max-width: 768px) {
  .viewport {
    width: 100%;
    padding: 40px;
  }
}
</style>

<style>
p img {
  background: white;
}
</style>