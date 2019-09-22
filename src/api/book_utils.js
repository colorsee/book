import * as API from '../main'
var token = ''
let user = JSON.parse(localStorage.getItem('access-user'));
if (user) {
      token = user.token;
}
var prePercent = 0;
export default{
    collectStatus(resource_id){//查询收藏状态
        API.POST('http://xxsy.1i2.cn/index/read/collectStatus',{
            resource_id:resource_id,
            resource_type:1,
            callbacktype:'jsonp',
            Authorization:token
        },()=>{

        })
    },
    collectArt(resource_id){//收藏与取消收藏
        API.POST('http://xxsy.1i2.cn/index/read/collectArt',{
            resource_id:resource_id,
            resource_type:1,
            callbacktype:'jsonp',
            Authorization:token
        },res=>{

        })
    },
    calculatePercentAdd(category){
        category.forEach(e => {
           
        });
       
    },
    calculatePercent(category,words_number){//计算章百分比
        category.forEach(e => {
           if(e.child.length != 0){
               this.calculatePercent(e.child,words_number)
           }else{
               e.percent = e.words_number / words_number
           }

        });
        return category;
    }
}