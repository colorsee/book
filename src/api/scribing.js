import * as API from '../main'
var token = ''
let user = JSON.parse(localStorage.getItem('access-user'))
if (user) {
  token = user.token
}

window.scribing = {
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
    callback
  ) {
    API.POST('http://xxsy.1i2.cn/index/read/ascribing', {
      resource_id,
      resource_type: 1,
      start_article_id: article_id,
      start_part,
      start_word,
      end_article_id: article_id,
      end_part,
      excerpt,
      percent,
      public: _public,
      type,
      note,
      callbacktype: 'jsonp',
      Authorization: token,
      callback,
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

export default window.scribing
