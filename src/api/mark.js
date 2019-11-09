// @flow
import * as API from '../main'
var token = ''
let user = JSON.parse(localStorage.getItem('access-user'))
if (user) {
  token = user.token
}

import { post } from '../utils/request'

export default {
  amark({ resource_id, article_id, start_part, start_word, excerpt, percent }) {
    return post('/s1/read/amark', {
      resource_type: 1,
      start_word: 0,
      resource_id,
      article_id,
      start_part,
      excerpt,
      percent,
    })
  },

  lmark(resource_id, page) {
    return post('/s1/read/lmark', {
      resource_id: resource_id,
      resource_type: 1,
      pagenum: page,
    })
  },

  rmark(mark_id, callback) {
    return post('/s1/read/rmark', {
      mark_id,
    })
  },
//获取评论
  bounce(scribing,page){
  	return post('/s1/comment/lsreadcomment', {
      scribing_id:scribing,
      page:page
    })
  },
//给自己批注点赞
  giveLike(scribing){
  	return post('/s1/read/diggscribing', {
      scribing_id:scribing,
     
    })
  },
//添加评论
  comments(scribing,content,tocomment){
  	return post('/s1/comment/areadcomment', {
      scribing_id:scribing,
     content:content,
     tocomment:tocomment,
     sharefeed:1
    })
  },
//修改批注
  setP(lscribingS,note){
  	 return post('/s1/read/ascribing', {
      resource_id:window.resource_id,
      resource_type: 1,
      start_article_id: lscribingS.start_article_id,
      start_part:lscribingS.start_part,
      start_word:lscribingS.start_word,
      end_article_id: lscribingS.end_article_id,
      end_part:lscribingS.end_part,
      excerpt:lscribingS.excerpt,
      percent:lscribingS.percent,
      end_word:lscribingS.end_word,
      public: lscribingS.public,
      type:lscribingS.type,
      note:note,
      scribing_id:lscribingS.id,
    })
  },
//删除批注
  delP(scribing_id) {
    return post('/s1/read/rscribing', {
      scribing_id:scribing_id,
    })
  },
  //给评论点赞
  giveLikepl(scribing){
  	return post('/s1/comment/diggreadcomment', {
      comment_id:scribing,
     
    })
  },
}
