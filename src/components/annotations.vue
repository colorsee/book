<template>
  <div class="list">
    <div class="mypsg_2_list" v-for="item in list" :key="item.id">
      <div class="t">{{item.excerpt}}</div>
      <div class="c" v-if="item.type === '1'">
        <textarea
          class="textarea"
          v-if="modifying === item.id"
          v-model="newContent"
          @blur="handleTextareaBlur(item)"
        ></textarea>
        <span v-else>{{item.note}}</span>
        <i></i>
      </div>
      <div class="b">
        <span>赞 {{item.digg_count}}</span>
        <span @click="openBounce(item)">留言 {{item.comment_count}}</span>
        <span>进度：{{item.percent | percent}}</span>
        <anchor
          class="open"
          :data="{section: item.start_article_id, partcode: item.start_part}"
        >打开此页</anchor>
        <span class="set" v-if="item.type === '1'" @click="handleModify(item)">修改</span>
        <span class="del" @click="remove(item.id)">删除</span>
        <span class="tmr">{{item.create_time | datetime}}</span>
      </div>
    </div>
    <bounced 
     	:lscribingS='lscribingS'
     	 @deletelscribing='deletelscribing' 
     	 @updatelscribing="updatelscribing" 
     	 v-if='isBouncedShow' 
     	 @closeFun='closeFun'
     	 ></bounced>
     	 <div v-if="tkshow" class="tk">
							<div class="qrsc">确认删除吗？</div>
							<span class="confirm" @click="confirm">确认</span>
        					<span class="cancel" @click="cancel">取消</span>
						</div>
  </div>
</template>

<script>
import Anchor from "./anchor.vue";
import scribing from "../api/scribing";
import percent from "../utils/percent";
import datetime from "../utils/datetime.js";
import Bounced from "./bounced.vue";

export default {
  props: ["list"],
  data: () => ({
    modifying: "",
    newContent: "",
    isBouncedShow:false,
    lscribingS:{},
     tkshow:false,
     scId:''
  }),
  methods: {
  	openBounce(data){
  		this.lscribingS = data;
  		this.isBouncedShow = true;
  	},
  	closeFun(){
    	this.isBouncedShow = false;
    },
     confirm(){
     	    this.tkshow = false;
        	scribing.dscribing(this.scId).then(() => this.$emit("reload"));
        },
        cancel(){
        	this.tkshow = false;
        },
  	//	更新批注
    updatelscribing(id){
    	scribing.lscribing(0).then(res => {
        this.list = res.posts || [];
        this.list.forEach(b => {
          	  
		          if(b.id == id){
		          	this.lscribingS = b;
//		          	console.log(this.lscribingS)
		          }
		        });
      })
    },
//  删除批注
    deletelscribing(){
    	this.isBouncedShow = false;
    	this.$emit("reload")
    },
    
    remove(id) {
    	this.tkshow = true;
    	this.scId = id;
//  	var r = confirm("亲，您确定删除吗？");
//  	if (r == true) {
      
//   }
    },
    handleModify(item) {
      this.modifying = item.id;
      this.newContent = item.note;
    },
    handleTextareaBlur(item) {
      scribing
        .ascribing(
          window.resource_id,
          item.start_article_id,
          item.start_part,
          item.start_word,
          item.end_part,
          item.end_word,
          item.excerpt,
          item.percent,
          item.public,
          item.type,
          this.newContent,
          item.id
        )
        .then(() => {
          this.modifying = "";
          item.note = this.newContent;
          this.newContent = "";
        });
    }
  },
  filters: { percent, datetime },
  components: { Anchor ,Bounced}
};
</script>

<style scoped>
.textarea {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
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