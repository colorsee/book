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
    note,
    scribing_id
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
      scribing_id,
    }

    return post('/s1/read/ascribing', data)
  },
  lscribing(order = 0) {
    return post('/s1/read/lscribing', {
      resource_id: window.resource_id,
      order,
      resource_type: 1,
    })
  },
  dscribing(scribing_id) {
    return post('/s1/read/rscribing', {
      scribing_id,
    })
  },
}
