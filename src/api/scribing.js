import * as API from '../main'
var token = ''
let user = JSON.parse(localStorage.getItem('access-user'));
if (user) {
      token = user.token;
}

export default{
    lscribing(resource_id,order,callback){//列出我的批注
        API.POST('http://xxsy.1i2.cn/index/read/lscribing',{
            resource_id:resource_id,
            resource_type:1,
            order:order,
            callbacktype:'jsonp',
            Authorization:token
        },callback)
    },
    dscribing(scribing_id,callback){//删除我的批注
        API.POST('http://xxsy.1i2.cn/index/read/rscribing',{
            scribing_id:scribing_id,
            callbacktype:'jsonp'
        },callback)
    }
}