import * as API from '../main'
import user from './user'
import { jsonp } from 'vue'
import axios from 'axios'
import handle from '../utils/handle'

let token = ''

export default {
  ascribing(
    resource_id,
    article_id,
    start_part,
    start_word,
    end_part,
    end_word,
    excerpt,
    percent,
    _public,
    type,
    note
  ) {
    return user.login().then(token => {
      const data = {
        resource_id,
        resource_type: 1,
        start_article_id: article_id,
        start_part,
        start_word,
        end_article_id: article_id,
        end_part,
        excerpt,
        percent,
        end_word,
        public: _public,
        type,
        note,
        member_token: token,
      }

      return axios.post('/index/read/ascribing', data).then(handle)
    })
  },
  lscribing(resource_id, order, callback) {
    //列出我的批注
    API.POST(
      'http://xxsy.1i2.cn/index/read/lscribing',
      {
        resource_id: resource_id,
        resource_type: 1,
        order: order,
        callbacktype: 'jsonp',
        Authorization: token,
      },
      callback
    )
  },
  dscribing(scribing_id, callback) {
    //删除我的批注
    API.POST(
      'http://xxsy.1i2.cn/index/read/rscribing',
      {
        Authorization: token,
        scribing_id: scribing_id,
        callbacktype: 'jsonp',
      },
      callback
    )
  },
}
