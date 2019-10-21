import $ from 'jquery'
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'
import url from 'url'
import Reader from './components/reader.vue'
import Thr from './components/thr.vue'
import SearchBox from './components/search-box.vue'
import Copier from './components/copier.vue'
import Annotations from './components/annotations.vue'
import OtherAnnotations from './components/other-annotations.vue'

import percent from './utils/percent'
import query from './utils/query'

import userAPI from './api/user'
import bookAPI from './api/book_content'

import utilsAPI from './api/book_utils'
import markAPI from './api/mark'
import sliblingAPI from './api/scribing'
import { saveProgress } from './utils/progress'

Vue.use(VueJsonp)

export const POST = (url, params, callback) => {
  return Vue.jsonp(url, params).then(res => {
    callback(res)
  })
}

const { resource_id, resource_type } = query()
window.resource_id = resource_id
window.resource_type = resource_type

var articleID = null
var vm = new Vue({
  el: '#app',
  data: () => ({
    baseinfo: '',
    resource_id,
    resource_type,
    content_list: [],
    lmarkList: [],
    lscribingList: [],
    progress: 0,
    jump: '',
    isSearchBoxShow: false,
    settings: {},
    lastPagination: '',
    currentArticle: '',
  }),
  methods: {
    collection() {
      //收藏
      //var status = utilsAPI.collectStatus(this.resource_id)
      utilsAPI.collectArt(this.resource_id)
      // var status = utilsAPI.collectStatus(this.resource_id)
    },
    amark() {
      markAPI.amark({
        resource_id,
        ...this.$refs.reader.abstract(),
      })
    },
    lmark() {
      this.$refs.reader.handleControlShow('isBookmarkShow')
      markAPI.lmark(1, 1, res => {
        this.lmarkList = res.posts
      })
    },
    lscribling(order = 0) {
      sliblingAPI.lscribing(order).then(res => {
        this.lscribingList = res.posts || []
      })
    },
    delete_scribing(item) {
      //删除一个批注
      sliblingAPI.dscribing(item.id) //处理DOM，删除DOM
    },
    loadArticle(id) {
      bookAPI.show(id).then(sections => {
        this.content_list = sections
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
    loadInfo(id) {
      bookAPI.info(id).then(({ posts }) => (this.baseinfo = posts))
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
      const { article_id, start_part, ...props } = this.$refs.reader.abstract()
      const step = { article_id, start_part, start_word: 1 }
      saveProgress(step)
    },

    handleControlShow(key) {
      this.$refs.reader.handleControlShow(key)
    },

    handleWholePageCopy({ currentTarget }) {
      $('.book_topl_but .bt_5').removeClass('bg_black')
      $(
        '.set_style,.bok_Catalog,.search_box,.change_form,.mypsg_1,.mypsg_2,.mypsg_3'
      ).removeClass('act')
      this.$refs.copier.copy(this.$refs.reader.content())
    },

    handlePageChange(type) {
      this.lastPagination = type
    },

    jumpTo() {
      this.$refs.reader.jumpTo(parseInt(this.jump))
    },

    toggleSearchBar(isShow) {
      this.isSearchBoxShow = isShow
    },

    changeSettings(value) {
      this.settings = value
    },

    handleArticleChange(value) {
      this.currentArticle = value
    },
  },
  created: function() {
    //判断类型
    userAPI.login('caoxiaomo', '123456')
  },

  mounted() {
    this.$refs.thr.init()
    this.loadArticle(resource_id)
    this.loadInfo(resource_id)
    this.lscribling()
  },

  components: {
    Reader,
    Thr,
    SearchBox,
    Copier,
    Annotations,
    OtherAnnotations,
  },
  filters: { percent },
})
