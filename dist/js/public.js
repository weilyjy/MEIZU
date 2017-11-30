
//=================使用ajax获取商品的信息=================================	
function getGoodsInfo(url,item,wrapName,wrapUl,goodsId,goodsIndex){
	$.ajax({
				url:url,
				type:'GET',
				success:function(res){
					var html='';
					for(var i=0;i<res[item].goodsList.length;i++){
						
							html+='<li><a><img id="pic1" src="'+res[item].goodsList[i].url+'" alt=""><h4>'+res[item].goodsList[i].name
						+'</h4><h6>'+res[item].goodsList[i].desc+'</h6><span>'+res[item].goodsList[i].price+'</span></a></li>'
	
					}
					$(wrapName).find(wrapUl).html(html);
					$(wrapUl).find('li').each(function(index){
						$(this).click(function(){
							// location.href='html/details.html?partId='+item+'';
							location.href='../html/details.html?'+goodsId+'='+index+'&'+goodsIndex+'='+item+'';

						})
					})
				}

		})

}

//================从字符串中取出数字============================	
function wordByNum(str){
        	//1、将字符串分割到数组
        	var arr = str.split("");
        	var j=0;
        	var newArr=[];
        	//2、遍历数组，找出大写字母
        	for(var i = 0; i < arr.length; i++){
        		if(arr[i] >= "0" && arr[i] <= "9"){
        			//3、变小写，插空格
        			newArr[j]=arr[i];
        			j++;	
        		}
        	}
        	//3、返回一个字符串
        	return newArr.join("");
        } 
//=====================购物车的数量==========================
//购物车的数量
		function sc_car(name){
			var cookieStr = $.cookie(name);
			var arr = eval(cookieStr);
			var sum = 0; //用于累加的和
			for(var i in arr){
				sum += Number(arr[i].num)
			}
			$('#total').html(sum);
			// return sum;
			
		}           
//====================从cookie中取出加载购物车的详情列表===================
function sc_msg(url,name){
	var goodsNum=0;
	$.ajax({
		url: url,
		type: "GET",
		success: function(res){
			var arr = eval($.cookie(name)); //id num
			if(!arr){
				return;
			}
			for(var i = 0; i < arr.length; i++){
			var price = wordByNum(res[arr[i].index].goodsList[arr[i].id].price);
			var html = '';
			var id=""+arr[i].index+arr[i].id;
			html+='<tr ><td><i class="cheked"></i><div id="goodsPic"><img src="../'+res[arr[i].index].goodsList[arr[i].id].url+'" alt=""></div></td>'
			html+='<td id="goodsDesc"><span>'+res[arr[i].index].goodsList[arr[i].id].name+'</span><br><span>'+res[arr[i].index].goodsList[arr[i].id].desc+'</span></td>'
			html+='<td id="goodsPrice">'+res[arr[i].index].goodsList[arr[i].id].price+'</td>';
			html+='<td ><div id="goodsNumber"><button>-</button><input type="text" value="1"><button>+</button></div><span id="reminder"></span></td>';
			html+='<td id="total_price">￥'+price+'</td><td id="delete"><span class="delete_span" id="'+id+'">X</span></td></tr>';
			$('.nav_table2').append(html);
			}
			
		}
	})
	
} 



//==================从cookie中删除字符串=========================================
 function removeGoods(name,goodId){
			
 			var arr = eval($.cookie(name)); //id num
			if(!arr){
						return;
					}
				
				var id=null;
				for(j = arr.length - 1; j >=0; j--){
					id=""+arr[j].index+arr[j].id;
					id2=""+arr[j].index+arr[j].id+arr[j].id2;
					// alert(goodId);
					if(id == goodId||id2==goodId){
						//删除j
						
						arr.splice(j, 1);
						$.cookie(name, JSON.stringify(arr), {expires: 7});
						
					}
					sc_car(name);
				}
			
		}
//=========================对跳转页面传过来的字符串进行分割==========================
function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
            var context = "";
            if (r != null)
                 context = r[2];
            reg = null;
            r = null;
            return context == null || context == "" || context == "undefined" ? "" : context;
        }
//=====================将加入购物车的商品加缓存到cookie中=========================
function setCookie(id,index,name,id2){
		//<1>判断是否是第一次存储cookie
		var first = $.cookie(name) == null ? true : false;
		if(first){
			$.cookie(name, '[{id:' + id + ',index:'+index+',id2:'+id2+',num:1}]', {expires: 7});
		}else{
			//<2>将之前存储的cookie全部取出
			var cookieStr = $.cookie(name);
			var arr = eval(cookieStr);
			//<3>判断是否之前存储过
			var isYes = false;
			for(var i in arr){
				if(arr[i].id == id&&arr[i].index==index){
					arr[i].num++;
					isYes = true;
				}
			}

			if(!isYes){
				//<4>如果之前没有存储过
				var obj = {id: id,index:index, num: 1,id2:id2};
				arr.push(obj);
			}
			$.cookie(name, JSON.stringify(arr), {expires: 7});
		}
		sc_car(name);

	}       
//================设置用户注册的cookie====================
function setUserCookie(phoneNum,password,name){
		//<1>判断是否是第一次存储cookie
		var first = $.cookie(name) == null ? true : false;
		if(first){
			$.cookie(name, '[{phoneNum:'+phoneNum+',password:'+password+'}]', {expires: 7});
		}else{
			//<2>将之前存储的cookie全部取出
			var cookieStr = $.cookie(name);
			var arr = eval(cookieStr);
			//<3>判断是否之前存储过
			var isYes = false;
			for(var i in arr){
				if(arr[i].phoneNum == phoneNum){
					alert("您输入的手机号已被注册");
					isYes = true;
				}
			}

			if(!isYes){
				//<4>如果之前没有存储过
				var obj = {phoneNum:phoneNum, password: password};
				arr.push(obj);
			}
			$.cookie(name, JSON.stringify(arr), {expires: 7});
		}
		

	}        		 		




