define(['jquery',"cookie"],function(){
	var details=function(){
//===================修改详情页商品的信息======================
function getGoodsInfo(url,id,index){
	$.ajax({
				url: url,
				type: "GET",
				success: function(res){
					var price=parseFloat(wordByNum(res[index].goodsList[id].price))-10;
					var html = '';
					html+='<img src="../'+res[index].goodsList[id].url +'" alt="">';
					$('#box1').find('a').html(html);
					$('.phoneName').find('h2').html(res[index].goodsList[id].name);
					$('.phoneName').find('h4').html(res[index].goodsList[id].desc);
					$('.discount').find('.span2').html("￥"+price);
					$('.discount').find('.span3').html("￥"+wordByNum(res[index].goodsList[id].price));
					$('#bigPic').find('img').attr('src',"../"+res[index].goodsList[id].url);
				}

				
			})

}
//====================一级导航栏菜单==================================
var goodsId	= GetQueryString("goodsId");
var goodsindex=	GetQueryString("goodsindex");   
   if (goodsId) {
   		// getGoodsInfo('../data/data1.json',goodsId,goodsindex);
   		$.ajax({
				url: "../data/data1.json",
				type: "GET",
				success: function(res){
					var html = '';
					var price=parseFloat(wordByNum(res[goodsindex].goods[goodsId].price))-100;
					html+='<img src="../'+res[goodsindex].goods[goodsId].url+'" alt="">';
					$('#box1').find('a').html(html);
					$('.phoneName').find('h2').html(res[goodsindex].goods[goodsId].name);
					// $('.phoneName').find('h4').html(res[goodsindex].desc1+"   "+res[goodsindex].desc2);
					$('.discount').find('.span2').html("￥"+price);
					$('.discount').find('.span3').html("￥"+wordByNum(res[goodsindex].goods[goodsId].price));
					$('#bigPic').find('img').attr('src',"../"+res[goodsindex].goods[goodsId].url);
				}	
			})
   		
   }
 var sideNavIndex= GetQueryString("sideNavIndex");
 var sideNavId= GetQueryString("sideNavId");
 var sideNavGoodsId= GetQueryString("sideNavGoodsId");
 if (sideNavGoodsId) {
 	$.ajax({
				url: "../data/data2.json",
				type: "GET",
				success: function(res){
					var html = '';
					// var price=parseFloat(wordByNum(res[goodsindex].goods[goodsId].price))-100;
					html+='<img src="../'+res[sideNavIndex].goods[sideNavId].goodsList[sideNavGoodsId].url+'" alt="">';
					$('#box1').find('a').html(html);
					$('.phoneName').find('h2').html(res[sideNavIndex].goods[sideNavId].goodsList[sideNavGoodsId].name);
					// $('.phoneName').find('h4').html(res[goodsindex].desc1+"   "+res[goodsindex].desc2);
					$('.discount').find('.span2').html("￥"+1990);
					$('.discount').find('.span3').html("￥"+1890);
					$('#bigPic').find('img').attr('src',"../"+res[sideNavIndex].goods[sideNavId].goodsList[sideNavGoodsId].url);
				}	
			})
   		
 }

  	
//====================一级菜单手机的详情页=====================       
        var phoneId=Number(GetQueryString("phoneId"));
        if (phoneId) {
        	$.ajax({
				url: "../data/phone.json",
				type: "GET",
				success: function(res){
					var html = '';
					var price=parseFloat(wordByNum(res[phoneId].price))-100;
					html+='<img src="../'+res[phoneId].url+'" alt="">';
					$('#box1').find('a').html(html);
					$('.phoneName').find('h2').html(res[phoneId].name);
					$('.phoneName').find('h4').html(res[phoneId].desc1+"   "+res[phoneId].desc2);
					$('.discount').find('.span2').html("￥"+price);
					$('.discount').find('.span3').html("￥"+wordByNum(res[phoneId].price));
					$('#bigPic').find('img').attr('src',"../"+res[phoneId].url);
				}	
			})

        }
	
//====================一级菜单数码配件的详情页=====================     
	var partId=Number(GetQueryString("partId"));
	var partIndex=Number(GetQueryString("partIndex"));
	if (partId) {
		
			getGoodsInfo('../data/parts.json',partId,partIndex);
	}
//====================一级菜单手机周边的详情页=====================   	
	var phoneRimId=GetQueryString("phoneRimId");
	var phoneRimIndex=Number(GetQueryString("phoneRimIndex"));
	if (phoneRimId) {
		
			getGoodsInfo('../data/phoneRim.json',phoneRimId,phoneRimIndex);
	}
//===============二级菜单之手机====================	
	var secPhoneId=GetQueryString("secPhoneId");
	var secPhoneIndex=Number(GetQueryString("secPhoneIndex"));
	if (secPhoneId) {
		
			getGoodsInfo('../data/secGoodList.json',secPhoneId,secPhoneIndex);

	}
//===============二级菜单之热品推荐===================	
	var recommendGoodId=GetQueryString("recommendGoodId");
	var recommendGoodIndex=Number(GetQueryString("recommendGoodIndex"));
	if (recommendGoodId) {
		
		getGoodsInfo('../data/secGood.json',recommendGoodId,recommendGoodIndex);
	}
//=======================购物车的数量===========================
		

function popwindows(id,index,id2){
	$('#pop_windAdd').find('button').each(function(){

			if(this.id=='yes'){
				$(this).click(function(){
					
					location.href="../html/shopCar.html?id="+id+"&index="+index+"&id2="+id2+"";
				})
				
			}if (this.id=='no') {
				$(this).click(function(){
					$('#pop_windAdd').css('display','none');
				})
				
			}
			else{
				var timer=setTimeout(function(){
					$('#pop_windAdd').css('display','none');
					clearTimeout(timer);
				},3000);
			}
		})
}
//====================加入购物车========================
$('#addShopcar').click(function(){
	
	$('#pop_windAdd').css('display','block');
	//进行cookie缓存
	var id=null;
	var index=null;
	if(goodsId){
		setCookie(goodsId,goodsindex,"navgoods");
		popwindows(goodsId,goodsindex);
	}
	if(sideNavGoodsId){
		setCookie(sideNavGoodsId,sideNavId,"sideNavgoods",sideNavIndex);
		popwindows(sideNavGoodsId,sideNavId,sideNavIndex);
	}
	if (phoneId) {
		id=phoneId;
		setCookie(phoneId,0,"phone");
		popwindows(phoneId);
	}
	if (partId) {
		
		id=partId;
		index=partIndex;
		setCookie(partId,partIndex,'part');
		popwindows(partId,partIndex);

	}
	if (phoneRimId) {
	
		id=phoneRimId;
		index=phoneRimIndex;
		setCookie(phoneRimId,phoneRimIndex,'phoneRim');
		popwindows(phoneRimId,phoneRimIndex);
		

	}
	if (secPhoneId) {
		
		id=secPhoneId;
		index=secPhoneIndex;
		setCookie(secPhoneId,secPhoneIndex,'secPhone');
		
		popwindows(secPhoneId,secPhoneIndex);
	}
	if (recommendGoodId) {
	
		id=recommendGoodId;
		index=recommendGoodIndex;
		setCookie(recommendGoodId,recommendGoodIndex,'recommendGood');
		
		popwindows(recommendGoodId,recommendGoodIndex);
	}
	
	})	

//=====================默认情况下显示商品详情==========================	
	$('#goodsWarp').find('#details_goods').css('color','#18C7F5').css('border-bottom','1px solid #18C7F5')
	.siblings().css('color','black').css('border-bottom','0px');
	$.ajax({
				url: "../data/details_data1.json",
				type: "GET",
				success: function(res){
					var html = '';
					for(var i=0 ;i<res.imgUrl.length;i++){
						html+='<img src="'+res.imgUrl[i]+'" alt="">';
					}
					$('#goodsWarp').find('.details_goods').html(html);
				}

				
			})
//===================== 商品详情==========================
$('#goodsWarp').find('#details_goods').click(function(){
	$(this).css('color','#18C7F5').css('border-bottom','1px solid #18C7F5')
	.siblings().css('color','black').css('border-bottom','0px');
	$('#goodsWarp').find('.details_goods').css('display','block').siblings().css('display','none');
	$('#goodsWarp').find('p').css('display','block');
	$.ajax({
				url: "../data/details_data1.json",
				type: "GET",
				success: function(res){
					var html = '';
					for(var i=0 ;i<res.imgUrl.length;i++){
						html+='<img src="'+res.imgUrl[i]+'" alt="">';
					}
					$('#goodsWarp').find('.details_goods').html(html);
				}

				
			})
})	
	
//=====================规格参数===============================
$('#goodsWarp').find('#parameter').click(function(){
	$(this).css('color','#18C7F5').css('border-bottom','1px solid #18C7F5')
	.siblings().css('color','black').css('border-bottom','0px');

	$('#goodsWarp').find('.parameter').css('display','block').siblings().css('display','none');
	$('#goodsWarp').find('p').css('display','block');

	$.ajax({
			url: "../data/details_data1.json",
			type: "GET",
			success: function(res){
				var html = '';
				for(var i=0 ;i<res.parameter.length;i++){
					html+='<tr class="bgcolor"><th colspan="2">'+res.parameter[i].title1+'</th></tr>';
					for(var j=0;j<res.parameter[i].title2.length;j++){

						html+='<tr><th>'+res.parameter[i].title2[j].name+'</th><td>'
						for(var k=0;k<res.parameter[i].title2[j].con.length;k++){
							html+="<br>"+res.parameter[i].title2[j].con[k];
						}
						html+='</td></tr>';
						
					}

				}
				$('#goodsWarp').find('.parameter table').html(html);
					}

					
				})

	})
//=================常见问题==================
	$('#goodsWarp').find('#problem').click(function(){
		$(this).css('color','#18C7F5').css('border-bottom','1px solid #18C7F5')
		.siblings().css('color','black').css('border-bottom','0px');
		$('#goodsWarp').find('.problem').css('display','block').siblings().css('display','none');
		$('#goodsWarp').find('p').css('display','block');
		$.ajax({
				url: "../data/details_data1.json",
				type: "GET",
				success: function(res){
					var html = '';
					for(var i=0 ;i<res.problem.length;i++){
						html+='<dl><span>Q:</span><dt>'+res.problem[i].topic+'</dt><span>A:</span><dd>'+res.problem[i].answer+'<dd></dl>';
					}
					$('#goodsWarp').find('.problem .problem_wrap').html(html);
				}

				
			})
	})
	};
	return{
		details:details
	}
})
