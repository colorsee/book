<template>
  <div class="list">
    <div class="mypsg_3_list" v-for="item in list" :key="item.id">
      <div class="t">
        <div class="user">
          <div class="portrait"
            style="background-image: url('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2188301108,2208747323&fm=26&gp=0.jpg')"
          ></div>
          <span class="name">{{item.member_id.nickname}}的批注</span>
        </div>
        <span>{{item.update_time | datetime}}</span>
      </div>
      <div class="c">
        <p>{{item.excerpt}}</p>
        <p>
          <span>{{item.note}}</span>
          <i></i>
        </p>
      </div>
      <div  class="b">
        <span>赞{{item.digg_count}}</span>
        <span @click="openBounce(item)">留言 {{item.comment_count}}</span>
        <span>进度：{{item.percent | percent}}</span>
        <anchor
          class="open"
          :data="{section: item.start_article_id, partcode: item.start_part}"
        >打开此页</anchor>
      </div>
    </div>   
     <bounced
    	
     	:lscribingS='lscribingS'     	
     	 @deletelscribing='deletelscribing' 
     	 @updatelscribing="updatelscribing" 
     	 v-if='isBouncedShow' 
     	 @closeFun="closeFun"
     	 ></bounced>
  </div>
</template>

<script>
import Anchor from "./anchor.vue";
import percent from "../utils/percent";
import datetime from "../utils/datetime.js";
import Bounced from "./bounced.vue";
export default {
  props: ["list"],
  data: () => ({
   
    isBouncedShow:false,
    lscribingS:{},
     tkshow:false,
    
  }),
  filters: {
    percent,
    datetime
  },
  methods: {
  	openBounce(data){
  		this.lscribingS = data;
  		this.isBouncedShow = true; 		
  	},
  	closeFun(){
    	this.isBouncedShow = false;
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
  },
  components: { Anchor,Bounced }
};
</script>

<style scoped>
.mypsg_3_list .t {
  display: flex;
  justify-content: space-between;
}

.user {
  display: flex;
  align-items: center;
}

.user .name {
  margin-left: 10px;
}

.portrait {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white no-repeat;
  background-size: cover;
}

.tk{
		position: absolute;
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
    cursor: pointer;
    }
    .cancel {
    display: inline-block;
    color: #666666;
    padding: 2px 8px;
    margin-left: 31px;
    border-radius: 3px;
    border: 1px solid #dfdfdf;
    background-color: #ebebeb;
    cursor: pointer;
    }
</style>