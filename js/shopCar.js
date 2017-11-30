define(['jquery',"cookie"],function(){
	var shopCar=function(){
//=====================购物车的数量==========================
//购物车的数量
		// function sc_car(name){
		// 	var cookieStr = $.cookie(name);
		// 	var arr = eval(cookieStr);
		// 	var sum = 0; //用于累加的和
		// 	for(var i in arr){
		// 		sum += Number(arr[i].num)
		// 	}

		// 	$('#total').html(sum);
		// }
var sum=0;
		
//============从cookie中取出手机的商品==================  
        	$.ajax({
				url: "../data/phone.json",
				type: "GET",
				success: function(res){

					var arr = eval($.cookie("phone")); //id num
					if(!arr){
						return;
					}
					for(var i = 0; i < arr.length; i++){
						var price = wordByNum(res[arr[i].id].price);
						var html = '';
						var goodsNum=arr[i].num;
						sum+=goodsNum;
						var id="0"+arr[i].id;
						html+='<tr><td><i class="cheked"></i><div id="goodsPic"><img src="../'+res[arr[i].id].url+'" alt=""></div></td>'
						html+='<td id="goodsDesc"><span>'+res[arr[i].id].desc1+'</span><br><span>'+res[arr[i].id].desc2+'</span></td>'
						html+='<td id="goodsPrice">'+res[arr[i].id].price+'</td>';
						html+='<td ><div id="goodsNumber"><button>-</button><input type="text" value="1"><button>+</button></div><span id="reminder"></span></td>';
						html+='<td id="total_price">￥'+price+'</td><td id="delete"><span  class="delete_span" id="'+id+'">X</span></td></tr>';
						// $('.nav_table2').find('#shopCarGoods').css('width','1000px').css('height','150px').css('backgroundColor','red');
						$('.nav_table2').append(html);	
					}
					sc_car('phone');
					
				}	
			})
//==============从cookie中取出一级导航栏的商品=========================
	// sc_msg("../data/data1.json",'navgoods');
	$.ajax({
				url: "../data/data1.json",
				type: "GET",
				success: function(res){
					var arr = eval($.cookie("navgoods")); //id num
					if(!arr){
						return;
					}
					// res[arr[i].index].goods[arr[i].id].price
					for(var i = 0; i < arr.length; i++){
						var price = wordByNum(res[arr[i].index].goods[arr[i].id].price);
						var html = '';
						
						var goodsNum=arr[i].num;
						sum+=goodsNum;
						var id=""+arr[i].index+arr[i].id;
						html+='<tr><td><i class="cheked"></i><div id="goodsPic"><img src="../'+res[arr[i].index].goods[arr[i].id].url+'" alt=""></div></td>'
						html+='<td id="goodsDesc"><span>'+res[arr[i].index].goods[arr[i].id].name+'</span><br><span></span></td>'
						html+='<td id="goodsPrice">'+res[arr[i].index].goods[arr[i].id].price+'</td>';
						html+='<td ><div id="goodsNumber"><button>-</button><input type="text" value="1"><button>+</button></div><span id="reminder"></span></td>';
						html+='<td id="total_price">￥'+price+'</td><td id="delete"><span  class="delete_span" id="'+id+'">X</span></td></tr>';
						// $('.nav_table2').find('#shopCarGoods').css('width','1000px').css('height','150px').css('backgroundColor','red');
						$('.nav_table2').append(html);	
					}
					sc_car('navgoods');
				}	
			})
//==============从cookie中取出侧边导航栏的商品========================			
	// sc_msg("../data/data2.json",'sideNavgoods');	
			$.ajax({
				url: "../data/data2.json",
				type: "GET",
				success: function(res){
					var arr = eval($.cookie("sideNavgoods")); //id num
					if(!arr){
						return;
					}
					for(var i = 0; i < arr.length; i++){
						// var price = wordByNum(res[arr[i].id].goods[arr[i].index].price);
						var html = '';
						var goodsNum=arr[i].num;
						sum+=goodsNum;
						var id=""+arr[i].index+arr[i].id+arr[i].id2;
						html+='<tr><td><i class="cheked"></i><div id="goodsPic"><img src="../'+res[arr[i].id2].goods[arr[i].index].goodsList[arr[i].id].url+'" alt=""></div></td>'
						html+='<td id="goodsDesc"><span>'+res[arr[i].id2].goods[arr[i].index].goodsList[arr[i].id].name+'</span><br><span></span></td>'
						html+='<td id="goodsPrice">'+1890+'</td>';
						html+='<td ><div id="goodsNumber"><button>-</button><input type="text" value="1"><button>+</button></div><span id="reminder"></span></td>';
						html+='<td id="total_price">￥'+1890+'</td><td id="delete"><span  class="delete_span" id="'+id+'">X</span></td></tr>';
						// $('.nav_table2').find('#shopCarGoods').css('width','1000px').css('height','150px').css('backgroundColor','red');
						$('.nav_table2').append(html);	
					}
					sc_car('sideNavgoods');
				}	
			})

 //============从cookie中取出数码配件的商品==================       
       sc_msg("../data/parts.json",'part');
 //============从cookie中取出手机周边的商品==================          
        sc_msg("../data/phoneRim.json",'phoneRim');
 //============从cookie中取出从二级菜单的商品==================          
        sc_msg("../data/secGoodList.json",'secPhone');
       sc_msg("../data/secGood.json",'recommendGood');
	
// $('#total').html(sum);
$('.nav_table2').delegate('tr #delete span','mouseover',function(){
	$(this).click(function(){
		var _this=this;
		var timer=null;
		clearTimeout(timer);
		$('#pop_windAdd').css('display','block');
		$('#pop_windAdd').find('button').each(function(){
			
			if(this.id=='yes'){
				$(this).click(function(){
					clearTimeout(timer);
					$('#pop_windAdd').css('display','none');
					removeGoods('phone',_this.id);
					removeGoods('part',_this.id);
					removeGoods('phoneRim',_this.id);
					removeGoods('secPhone',_this.id);
					removeGoods('recommendGood',_this.id);
					removeGoods('navgoods',_this.id);
					removeGoods('sideNavgoods',_this.id);
					
					$(_this).parent().parent().remove();
				})
				
			}if (this.id=='no') {
				$(this).click(function(){
					
					$('#pop_windAdd').css('display','none');
					clearTimeout(timer);

				})
				
			}
			else{
				 timer=setTimeout(function(){
					$('#pop_windAdd').css('display','none');
					clearTimeout(timer);
				},5000);
			}
		})
		
	})

})

//======================================================	
	var num;
	$('.nav_table2').delegate('#goodsNumber button','click',function(){
	 	 num=$('#goodsNumber').find('input').val();
		if ($(this).html()=='-') {
			
			if (num==0) {
				num=0;
				$('#goodsNumber').siblings().html('');
			}else{
				num--;
				$('#goodsNumber').siblings().html('');
				
			};
			
			$('#goodsNumber').find('input').val(num);
		}else {
			if (num==5) {
				num=5;
				$('#goodsNumber').siblings().html('限购5件');
			}else{
				num++;
				$('#goodsNumber').siblings().html('');	
			}
			$('#goodsNumber').find('input').val(num);	
		}
		$('#total').html(num);
		var money=parseFloat(wordByNum($('#total_price').html()))*num;
		// money=money*num;
		$('#total_price').html('￥'+money);
		
	})

	/*$('.nav_table2').delegate('#delete span','click',function(){
		$('.nav_table2').html('');
	})*/
	$('.nav_table2').delegate('td i','click',function(){
		$(this).css('color','#fff').css('backgroundColor','#00C3F5')
				.html('√');
	})
	var flag=true;
	$('#shopcar_wrap').find('i').each(function(){
		if (flag) {
			if (this.id=='allSelect') {
				$(this).click(function(){
					$('#shopcar_wrap').find('i').css('color','#fff').css('backgroundColor','#00C3F5')
					.html('√');
					// alert(num);
					$('#select').html($('#total').html());
					$('.total_money').html($('#total_price').html());
					$('#payment').css('backgroundColor','#05C4F5').css('color','#fff');
				})
			
			}else{
				$(this).click(function(){
					$(this).css('color','#fff').css('backgroundColor','#00C3F5')
					.html('√');
					// alert(num);
					$('#select').html($('#total').html());
					$('.total_money').html($('#total_price').html());
					$('#payment').css('backgroundColor','#05C4F5').css('color','#fff');
				})
			}
			flag=false;
		}else{
			if (this.id=='allSelect') {
				$(this).click(function(){
					$('#shopcar_wrap').find('i').css('backgroundColor','#fff');
					$('#select').html();
				})
			
			}else{
				$(this).click(function(){
					$(this).css('backgroundColor','#fff');
					$('#select').html();
				})
			}
			
			flag=true;		
			}
		})
	};
	return{
		shopCar:shopCar
	}
})
