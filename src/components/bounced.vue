<template>
	    <div ref="bounced" class="bok_piz_peg" >
					<div class="guide_gary"></div>
					<div class="guide_whit"></div>
					<div class="close" @click="closeFun"><i class="fa fa-times" aria-hidden="true"></i></div>
					<div class="scrollview">
						<div class="head">
							<span class="pic" style="background-image: url(img/ewm.png);"></span>
							<span class="name">{{lscribingS.member_id.nickname}}的批注</span>
							<span class="set" @click="setP">修改</span>
							<span class="del" @click="delP">删除</span>
						</div>
						<div class="my_piz">{{lscribingS.note}}</div>
						<div class="my_coment">
							<div class="set_date">
								<p class="l">用户于{{dateTime(lscribingS.update_time)}}修改过此批注</p>
								<p class="c" @click="giveLike"><i  :class="[{'fa':true},lscribingS.is_digg ==1?'fa-thumbs-up' :'fa-thumbs-o-up']" aria-hidden="true"></i><span>{{lscribingS.digg_count}}</span></p>
								<p class="r"><i class="fa fa-commenting-o" aria-hidden="true"></i><span>{{lscribingS.comment_count}}</span></p>
							</div>
						</div>
						<div class="my_comentman">
							<div class="guide_coment"></div>
							<div class="ipt" v-if='isreplyshow'>
								<input type="text" name="" id="comments" value="" />
								<input type="button" v-if='subp' @click="commentsFun" name="" value="评论" />
								<input type="button" v-if='subx' @click="submitSet" name="" value="修改" />
							</div>
							<div class="lst" v-for="item in commentsList" v-if='commentsList.length>0'>
								<div class="lst_item">
									<div class="t">
										<p>{{item.member_id.nickname}}：</p>
										<p>{{item.content}}</p>
									</div>
									<div class="b">
										<span>{{dateTime(item.create_time)}}</span>

										<!--<span @click="reply(item.id)">回复</span>-->

										<span @click="reply(item.id)">回复</span>

										<span @click="giveLikepl(item.id)"><i :class="[{'fa':true},item.is_digg ==1?'fa-thumbs-up' :'fa-thumbs-o-up']" aria-hidden="true"></i>{{item.digg_count}}</span>
									</div>
								</div>
								
								
							</div>
							<div v-else style="text-align: center;">
								暂无评论
							</div>
						</div>
						
						<div v-if="tkshow" class="tk">
							<div class="qrsc">确认删除吗？</div>
							<span class="confirm" @click="confirm">确认</span>
        					<span class="cancel" @click="cancel">取消</span>
						</div>
					</div>
				</div>
</template>

<script>
//	import Datatime from "../utils/datatime.js"
	import markAPI from "../api/mark";
	export default {
		props: ["lscribingS"],
		data: () => ({
	    commentsList:[],
	    isreplyshow:true,
	    subx:false,
	    subp:true,
	    replyId:'',
	    tkshow:false,
	    scId:''
	  }),
	  
	  mounted() {
	    this.load();
	    
	  },
	  methods:{
	  	
//	  	修改批注
        setP(){
        	
        	this.isreplyshow = true;
        	this.subx = true;  
        	var that = this;
        	setTimeout(function(){
        		
        	$('#comments').val(that.lscribingS.note);
        	},200)
        	
        },
//      提交修改
        submitSet(){
        	markAPI.setP(this.lscribingS,$('#comments').val()).then(({posts})=>{
        		
	  				if(posts.length != 0){
	  					alt_page('修改成功');
	  					$('#comments').val('');
	  					this.isreplyshow = false;
	  					this.subx = false;
	  					this.$emit("updatelscribing",posts.ascribing_id);
	  				}
	  			})
        },
        confirm(){
        	markAPI.delP(this.lscribingS.id).then(res => {
        		alt_page('删除成功');
	  			this.$emit("deletelscribing");
               })
        },
        cancel(){
        	this.tkshow = false;
        },
//      删除批注
        delP(){
        	this.tkshow = true;
        	
//      		({posts})=>{
//      		console.log(posts)
//	  				if(code == 1){
//	  					alt_page('删除成功');
//	  					this.$emit("deletelscribing");
//	  				}
//	  			}
        		
        },
//	  	回复
        reply(id){
        	this.replyId = id;
        	this.isreplyshow = true;
        	this.subp = true; 
        },
//	  	提交评论
	  	commentsFun(){
	  		if($('#comments').val().replace(/\s+/g,"") == ''){
	  			return;
	  		}else{
	  			markAPI.comments(this.lscribingS.id,$('#comments').val(),this.replyId).then(({posts})=>{
	  				$('#comments').val('');
	  				this.isreplyshow = false;
	  				this.subp = false; 
	  				this.load()
	  			})
	  		}
	  	},
//	  	给自己评论点赞
        giveLike(){        	
        	markAPI.giveLike(this.lscribingS.id).then(({posts})=>{
        		if(posts == 0){
        			alt_page('已取消点赞');
	        		$('.c .fa').removeClass('fa-thumbs-up').addClass('fa-thumbs-o-up') 
	        		this.lscribingS.digg_count -=1;
	        		this.lscribingS.is_digg = 0;
        		}else{
        			alt_page('已点赞');
	        		$('.c .fa').removeClass('fa-thumbs-o-up').addClass('fa-thumbs-up') 
	        		this.lscribingS.digg_count +=1;
	        		this.lscribingS.is_digg = 1;
        		}
        		
        	})
        },
//      评论点赞
        giveLikepl(id){
        	markAPI.giveLikepl(id).then(({posts})=>{
        		
        		if(posts == 0){
        			alt_page('已取消点赞');
	        		$('.b .fa').removeClass('fa-thumbs-up').addClass('fa-thumbs-o-up') 
	        		
        		}else{
        			alt_page('已点赞');
	        		$('.b .fa').removeClass('fa-thumbs-o-up').addClass('fa-thumbs-up') 
	        		
        		}
        		this.load();
        	})
        },
	  	dateTime(time){
	  	 return	new Date(parseInt(time) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "); 
	  	},
	  	closeFun(){
	  		this.$emit("closeFun");
//	  		$('.bok_piz_peg').hide();
	  	},
	  	load(){
	  		console.log(this.lscribingS)
	  		markAPI.bounce(this.lscribingS.id,1).then(({ posts }) => {
//	        if (!posts || posts.length === 0) {
	        	this.commentsList = posts;
//	          return;
//	        }
//	        console.log(posts)
//	        posts.forEach(b => {
//	          const target = this.sections.find(s => s.id == b.article_id);
//	          b.title = (target && target.title) || "";
//	        });
//	
//	        this.bookmarks = [...this.bookmarks, ...posts];
	      });
	  	}
	  }
	}
	
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