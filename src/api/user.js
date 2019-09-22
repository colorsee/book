import * as API from '../main'

export default{
    login(username,password){ //用户登录
        API.POST('http://xxsy.1i2.cn/index/member/login',{
            account:username,
            password:password,
            callbacktype:'jsonp'
        },data=>{
            if(data.code == 1 && data.msg == '成功！'){
                let userInfo = {
                    token:data.posts,
                    timestamp: new Date().getTime()
                  };
                  localStorage.setItem('access-user', JSON.stringify(userInfo)); // 将用户信息存到localStorage中
            }else{
                return false;
            }
        })
    }
}