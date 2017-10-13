define(['jquery',"cookie"],function(){
	var login=function(){
	$('.code').on('click',function(){
		$('#code_login').css('display','block');
		$('#register_form').css('display','none');

	});
	$('.pc').on('click',function(){
		$('#code_login').css('display','none');

		$('#register_form').css('display','block');
	})
function getUserInfo(userphone,password){	
	var arr = eval($.cookie("userInfo")); 	
		if(!arr){			
				return;
		}
		else{
			
			for(var i=0;i<arr.length;i++){
				// alert(arr[i].phoneNum);
				if(arr[i].phoneNum==userphone&&arr[i].password==password){
					// alert(arr[i].phoneNum);
					return true;
				}

			}
		}
}	
//================登录==================================
$('.loginBtn').click(function(){	
	var userphone=$('#userphone').val();	
	var password=$('#userpassword').val();	
	var timer=null;
	clearTimeout(timer);
	var flag=getUserInfo(userphone,password);	
	if(flag){
		
		window.open('../index.html?flag=true');
	}else{
		alert('您输入的用户名或密码有误');
		}
	})
};
	return{
		login:login
	}
})
