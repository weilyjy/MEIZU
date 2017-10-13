define(['jquery',"cookie"],function(){
    var register=function(){
    $('.registerBtn').click(function(){
        register();
    })
    var register=(function(){
        
        var reg=function(){
            
           var pattern1 = /0?(13|17|15|18)[0-9]{9}/;
           var pattern2=/^[0-9A-Za-z]{6,}$/; 
           var phoneStr=$('#phone').val();
           var pwdStr=$('#password').val();
           
            if(pattern1.test(phoneStr)&&pattern2.test(pwdStr)){
                alert('注册成功');
                       // $('#pop_windAdd').css('display','block');

                        setUserCookie(phoneStr,pwdStr,'userInfo');
                        // popwindows();
        
                    }if (!pattern1.test(phoneStr)) {
                         // $('#pop_windAdd').css('display','block');

                        alert('你输入的手机号码有误！');
                    }
                    if (!pattern2.test(pwdStr)){
                        alert('密码有数字和字母组成至少六位！');
                    }

            }
            return reg;
        })()

    };
    return{
        register:register
    }
})	

