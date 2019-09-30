import * as API from '../main'
import { jsonp } from 'vue'
import { post } from '../utils/request'

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

    return post('/index/read/ascribing', data)
  },
  lscribing(order = 0) {
    return post('/index/read/lscribing', {
      resource_id,
      order,
      resource_type: 1,
    })
  },
  dscribing(scribing_id) {
    return post('/index/read/rscribing', {
      scribing_id,
    })
  },
}
