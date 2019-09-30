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

    <div id="content" :style="{height: settings.mode === 'horizantol' ? '100%' : 'unset'}">
      <horizantol
        v-if="settings.mode === 'horizantol'"
        :sections="sections"
        :style="{fontSize: settings.fontSize + 'px'}"
        class="content"
        ref="container"
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
    <progress-bar v-if="isProgressShow"></progress-bar>
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
    isProgressShow: false
  }),

  mounted() {
    this.loadSettings();
  },

  computed: {
    sections() {
      // if (!this.annotations) {
      //   return this.articles;
      // }

      return this.articles;
    }
  },

  methods: {
    emitProgress(progress) {
      Promise.resolve().then(() => this.$emit("read", progress));
    },

    handleVerticalClick() {
      this.isToolbarShow = true;
    },

    handlePageChange(step) {
      if (step < 0) {
        this.prev();
      } else {
        this.next();
      }
    },

    handleControlShow(key) {
      this.closeControls();
      this[key] = true;
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
      this.isCatalogShow = false;
      this.isBookmarkShow = false;
      this.isSettingsShow = false;
      this.isProgressShow = false;
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
      const headers = $(verticalContainer).find("h1, h2, h3, h4, h5");
      const [targetHeader] = headers.filter(
        (_, c) => c.offsetTop > viewport.scrollTop
      );
      const [, partcode] = targetHeader.id.match(/^section-(\d+)$/);

      const [target] = $(verticalContainer)
        .find("p")
        .filter((_, c) => c.offsetTop > viewport.scrollTop);
      const value = $(target).text();

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
        start_word: 1,
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
    Tablet
  }
};
</script>

<style scoped>
.viewport {
  width: 800px;
  box-sizing: border-box;
  padding: 40px;
  height: 100vh !important;
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
