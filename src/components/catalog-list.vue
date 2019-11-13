<template>
  <div class="list catalog-list">
    <div
      :key="item.id"
      :class="{item: true, active: currentArticle == item.id}"
      v-for="(item, i) in source"
      
      
    >
      <div class="detail" >
      	
        <anchor :class="{red:item.id>permissions}" @tk='tk' @handleClick='handleClick' class="title" v-html="item.title" :data="{section: item.id}"></anchor>
        <div class="line" @click="handleClick"></div>
        <div class="status">{{ percent(i) | percentFilter }}</div>
      </div>
      <div v-if="tkshow" class="tk">
				<div class="qrsc">需要购买吗？小主！！！</div>
				<span class="confirm" @click="confirm">急需</span>
				<span class="cancel" @click="cancel">放弃</span>
			</div>
      <catalog-list2
      
        v-if="item.child && item.child.length"
        :sum="percent(i)"
        :source="item.child"
        :level="step"
        :permissions="permissions"
        :currentArticle="currentArticle"
        @handleClick="handleClick"
      ></catalog-list2>
    </div>
  </div>
</template>

<script>
	import CatalogList2 from "./catalog-list2.vue";
import Anchor from "./anchor.vue";
import percent from "../utils/percent";

export default {
 
  props: ["source", "level", "index", "sum", "currentArticle","permissions"],
   data: () => ({
   tkshow:false,
    chapterId:0
  }),
  computed: {
    step() {
      return (1 / this.source.length) * this.level;
    }
  },
  mounted(){ 	
	
  },
  methods: {
  	
    handleClick() {
      this.$emit("close");
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
        		this.$emit("close");
//	  			this.$emit("deletelscribing");
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
  components: { Anchor ,CatalogList2}
};
</script>

<style scoped>
.list {
  font-size: 0.9rem;
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
.red{
	color: gainsboro;
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
