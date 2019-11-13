<template>
  <action>
    <div class="header">
      <h3>书签</h3>
      <div class="close" @click="close">
        <i class="fa fa-times" aria-hidden="true"></i>
      </div>
    </div>
    <div class="list">
      <div :key="item.id" class="item" v-for="item in bookmarks">
        <h4 class="title">{{item.title}}</h4>
        <div>
          <p class="excerpt">{{item.excerpt}}</p>
          <div class="extra">
            <span>进度：{{item.percent | percent}}</span>
            <div class="actions">
              <anchor
                class="action"
                :data="{section: item.article_id, partcode: item.start_part}"
                @click="close"
              >打开</anchor>
              <button class="action dangerous" @click="remove(item.id)">删除</button>
            </div>
            <div>{{item.create_time | datetime}}</div>
          </div>
        </div>
      </div>
    </div>
    <button v-if='bookmarks.length>8' class="load" @click="load">加载更多...</button>
    <div v-if="tkshow" class="tk">
		<div class="qrsc">确认删除吗？</div>
		<span class="confirm" @click="confirm">确认</span>
		<span class="cancel" @click="cancel">取消</span>
	</div>
  </action>
</template>

<script>
import markAPI from "../api/mark";
import Action from "./action.vue";
import Anchor from "./anchor.vue";
import percent from "../utils/percent";
import datetime from "../utils/datetime";

export default {
  props: ["sections"],

  data: () => ({
    bookmarks: [],
    page: 1,
    tkshow:false,
	    scId:''
  }),

  mounted() {
    this.load();
   
  },

  methods: {
    load() {
      markAPI.lmark(resource_id, this.page++).then(({ posts }) => {
        if (!posts || posts.length === 0) {
          return;
        }
        
        posts.forEach(b => {
          const target = this.sections.find(s => s.id == b.article_id);
          b.title = (target && target.title) || "";
        });

        this.bookmarks = [...this.bookmarks, ...posts];
      });
    },
 
    close() {
      this.$emit("close");
    },

     confirm(){
     	this.tkshow = false;
     	markAPI.rmark(this.scId).then(
     		({ posts }) =>{for(var i=0;i<this.bookmarks.length;i++){
     			if(this.scId == this.bookmarks[i].id){
          	this.bookmarks.splice(i,1)
          }
     		}     	
     	})
      },
        cancel(){
        	this.tkshow = false;
        },
    remove(id) {
    	this.scId = id;   
    	this.tkshow = true;
    }
  },

  filters: { percent, datetime },
  components: { Action, Anchor }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item {
  color: #a6a6a6;
}

.item .title {
  border-bottom: 1px dashed #a6a6a6;
  padding-bottom: 10px;
  margin: 0;
  margin-top: 10px;
  color: #333;
}

.item .excerpt {
  color: #999999;
  padding: 10px 0px;
  font-size: 0.9em;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.item .extra {
  font-size: 0.8em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item + .item {
  margin-top: 40px;
}

.extra .actions {
  display: flex;
}

.actions .action {
  border-radius: 3px;
  border: 1px solid #cccccc;
  background-color: #ebebeb;
  padding: 3px 4px;
  margin: 0 5px;
  display: block;
}

.actions .action.dangerous {
  background-color: #ff3300;
  border: 1px solid #cc0000;
  color: white;
}

.load {
  margin-top: 16px;
}
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
</style>
