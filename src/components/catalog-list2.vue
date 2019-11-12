<template>
  <div class="list catalog-list">
    <div
      :key="item.id"
      :class="{item: true, active: currentArticle == item.id}"
      v-for="(item, i) in source"
           
    >
      <div class="detail" >
      	
        <anchor :class="{red:item.id>permissions}" @tk='tk' @handleClick1='handleClick1' class="title" v-html="item.title" :data="{section: item.id}"></anchor>
        <div class="line"></div>
        <div class="status">{{ percent(i) | percentFilter }}</div>
      </div>     
    </div>
    
    <div v-if="tkshow" class="tk">
		<div class="qrsc">需要购买吗？小主！！！</div>
		<span class="confirm" @click="confirm">急需</span>
		<span class="cancel" @click="cancel">放弃</span>
	</div>
  </div>
</template>

<script>
import Anchor from "./anchor.vue";
import percent from "../utils/percent";

export default {
  name: "catalog-list",
  props: ["source", "level", "index", "sum", "currentArticle","permissions"],
   data: () => ({
    permissionsNum:0,
    tkshow:false,
    chapterId:0
  }),
  computed: {
    step() {
      return (1 / this.source.length) * this.level;
    }
  },
  mounted(){
//	console.log(this.source)
//	this.load();
  },
  methods: {
  	load(){
  		this.permissionsNum = this.permissions;
  		console.log(this.permissionsNum)
  	},
    handleClick1() {
      this.$emit("handleClick");
    },
    tk(id){
    	console.log(id)
    	this.tkshow= true;
    	this.chapterId = id;
    },
     confirm(id){
//      	markAPI.delP().then(res => {
        		alt_page('购买成功');
        		this.tkshow = false;
	  			this.$emit("handleClick");
//             })
        },
        cancel(){
        	this.tkshow = false;
        },
    percent(index) {
      const { step, sum } = this;
      return sum + step * index;
    }
  },
  filters: { percentFilter: percent },
  components: { Anchor }
};
</script>

<style scoped>
.list {
  font-size: 0.9rem;
}
.red{
	color: gainsboro;
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
.item {
  color: #666;
  display: block;
  margin-left: 2em;
}

.item.active {
  color: #549bbc;
}

*::-webkit-scrollbar {
  width: 0;
}

.detail {
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

.detail .title {
  max-width: 80%;
}

.detail .line {
  flex: 1;
  border-bottom: 1px dashed currentColor;
  margin: 0 0.4em;
}
</style>
