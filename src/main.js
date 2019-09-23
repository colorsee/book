import $ from 'jquery'
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'
import url from 'url'
import Reader from './components/reader.vue'
import Thr from './components/thr.vue'
import percent from './utils/percent'

Vue.use(VueJsonp)

var locationURL = url.parse(window.location.href, true)
var query = locationURL.query
window.resource_id = query.resource_id
window.resource_type = query.resource_type

import userAPI from './api/user'
import bookAPI from './api/book_content'

import utilsAPI from './api/book_utils'
import markAPI from './api/mark'
import sliblingAPI from './api/scribing'

var token = ''

export const POST = (url, params, callback) => {
  return Vue.jsonp(url, params).then(res => {
    callback(res)
  })
}

var articleID
var vm = new Vue({
  el: '#app',
  data: {
    baseinfo: '',
    resource_id: query.resource_id,
    resource_type: query.resource_type,
    content_list: [],
    lmarkList: [],
    lscribingList: [],
    progress: 0,
    jump: '',
  },
  methods: {
    collection() {
      //收藏
      //var status = utilsAPI.collectStatus(this.resource_id)
      utilsAPI.collectArt(this.resource_id)
      // var status = utilsAPI.collectStatus(this.resource_id)
    },
    lmark() {
      markAPI.lmark(1, 1, res => {
        this.lmarkList = res.posts
      })
    },
    lscribling(order) {
      //我的划线/批注
      sliblingAPI.lscribing(1, order, res => {
        this.lscribingList = res.posts
      })
    },
    delete_scribing(item) {
      //删除一个批注
      sliblingAPI.dscribing(item.id) //处理DOM，删除DOM
    },
    loadArticle(id) {
      bookAPI.showart(id).then(data => {
        console.log(data)
        this.content_list = data.posts
      })
      // //加载内容
      // //1.加载篇章基础信息
      // var _that = this
      // if (this.resource_type == 1) {
      //   articleID = id
      //   console.log(id)
      //   bookAPI.show(id, 2, 2, ret => {
      //     _that.content_list = null

      //     _that.content_list = ret.posts
      //     //                  $('.bt_2').trigger('click');
      //     //$(".bok_item_list").eq(0).addClass("act");
      //     //$(".next").trigger('click')
      //   })
      // } else {

      //   bookAPI.showart(id, ret => {
      //     _that.content_list = null
      //     _that.content_list = ret.posts
      //     //                  $('.bt_2').trigger('click');
      //     //$(".next").trigger('click')
      //   })
      // }
      // console.log(content_list)
    },
    showArticle(pid, id) {
      //滚动到指定位置
      if (pid != articleID) {
        this.loadArticle(id)
      }
      articleID = pid
      $('#content div.bok_item_list').removeClass('act')
      $('#content_' + id).addClass('act')
      $('.bt_2').trigger('click')
    },
    getArticleId(item) {
      //初始化ID
      return 'content_' + item.id
    },

    prev() {
      this.$refs.reader.prev()
    },

    next() {
      this.$refs.reader.next()
    },

    handleRead(progress) {
      this.progress = progress
    },

    handleControlShow(key) {
      this.$refs.reader.handleControlShow(key)
    },

    jumpTo() {
      this.$refs.reader.jumpTo(parseInt(this.jump))
    },
  },
  created: function() {
    //判断类型
    userAPI.login('caoxiaomo', '123456').then(() => this.loadArticle(2))

    var resource_id = this.resource_id
    var resource_type = this.resource_type
    if (resource_type == 1) {
      //图书
      //图书基本信息
      bookAPI.info(resource_id, article => {
        var category = utilsAPI.calculatePercent(
          article.posts.catalog_list,
          article.posts.words_number
        )
        category = utilsAPI.calculatePercentAdd(category)
        this.baseinfo = article.posts
      })
      //加载试读数据
      bookAPI.probation(resource_id, resource_type, list => {
        this.content_list = list.posts
        // console.log(this.content_list)
      })
    } else {
      //章节
      bookAPI.article(resource_id, article => {
        this.baseinfo = article.posts
      })
      bookAPI.probation(resource_id, resource_type, list => {
        this.content_list = list.posts
        // console.log(this.content_list)
      })
    }
  },

  mounted() {
    this.$refs.thr.init()
  },

  components: { Reader, Thr },
  filters: { percent },
})
