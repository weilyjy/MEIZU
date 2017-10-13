define(["jquery"],function($){
	var hotGood=function (){
//===================获取数据建立侧边栏下面的热品推荐===============
	$.ajax({
		url:'../data/data3.json',
		type:'GET',
		success:function(res){
			var html='';
			for(var i=0;i<res.length;i++){
				for(var j=0;j<res[i].goodsList.length;j++){
					// alert(res[i].goodsList[j].desc);
				html+='<li><a href="#"><img src="../'+res[i].goodsList[j].url+'" alt=""><h4>'+res[i].goodsList[j].name
				+'</h4><h6>'+res[i].goodsList[j].desc+'</h6><span>'+res[i].goodsList[j].price+'</span></a></li>'

				}
			}
			$('#hot_goods').find('.hot_goodsUl').html(html);
		}


	})
//===============热品推荐滚动效果=====================================
	var curIndex=0;
	var timer=null;
	 timer=setInterval(function(){

			changeTo(curIndex);
		},3000);
	$('.hot_goodsUl').hover(function(){
		clearInterval(timer);
	},function(){
		 timer=setInterval(function(){

			changeTo(curIndex);
		},3000);
	})

	function changeTo(index){
			// alert(curIndex);
			
			if (curIndex==0) {
				$('.arrows').find('.hot_next').css('border-color','#BDBDBD').css('color','#BDBDBD');
				$('.arrows').find('.hot_pre').css('border-color','#EFEFEF').css('color','#EFEFEF');

				$('.hot_goodsUl').stop().animate({left:-1228,},500,'linear');
				curIndex=1;
			}else{
				$('.arrows').find('.hot_pre').css('border-color','#BDBDBD').css('color','#BDBDBD');;
				$('.arrows').find('.hot_next').css('border-color','#EFEFEF').css('color','#EFEFEF');

				$('.hot_goodsUl').stop().animate({left:0,},500,'linear');
				curIndex=0;
			}
			
		}

//=============左右箭头的click事件=============
	$('.arrows').find('.hot_pre').on('click',function(){
		$(this).css('border-color','#BDBDBD')
		$('.hot_goodsUl').stop().animate({
			left:-1238,
		},500,'linear')
	});
	$('.arrows').find('.hot_next').on('click',function(){
		// alert($('.hot_goodsUl').offset().left-10);
		if ($('.hot_goodsUl').offset().left-10==-1238) {
			$('.hot_goodsUl').stop().animate({
				left:0,
			},500,'linear')
		}

		
	})
//================================手机======================================
	$.ajax({
		url:'../data/phone.json',
		type:'GET',
		success:function(res){
			var html='';
			for(var i=0;i<res.length;i++){
				
				html+='<li><a><img src="../'+res[i].url+'" alt=""><h4>'+res[i].name
				+'</h4><h6>'+res[i].desc1+"   "+res[i].desc2+'</h6><span>'+res[i].price+'</span></a></li>'

				
			}
			$('#home_phone_wrap').find('.home_phoneUl').html(html);
			$('.home_phoneUl').find('li').each(function(item){
						$(this).click(function(){
							location.href='../html/details.html?phoneId='+item+'';
						})
					})
	
			
		}


	})
//==============================数码配件===============================
$('#hot_part').find('.hot_ph_link').each(function(item){
	$(this).attr('id',item);
})

//=========================默认情况下显示第一个的=========================
getGoodsInfo('../data/parts.json',0,'#home_partwrap','.home_partUl','partId','partIndex');
			
//=========hover上去显示不同的数码配件====================
$('#hot_part').find('.hot_ph_link').each(function(item){
	$(this).hover(function(){
			
		getGoodsInfo('../data/parts.json',item,'#home_partwrap','.home_partUl','partId','partIndex');
			/*if(this.id==0){
				$('.home_partUl li').eq(0).find('a img').attr('id','pic');
				$('.home_partUl li').eq(0).siblings().find('a img').attr('id','pic1');

			}
			*/
		})

		})
//=======================手机周边========================================
$('#hot_phoneRim').find('.hot_ph_link').each(function(item){
	$(this).attr('id',item);
})

//============================默认情况下显示第一个的==========================
getGoodsInfo('../data/phoneRim.json',0,'#home_phoneRim','.home_phoneRimUl','phoneRimId','phoneRimIndex');

	
$('.home_phoneRimUl li').eq(0).find('a img').attr('id','pic');
$('.home_phoneRimUl li').eq(0).siblings().find('a img').attr('id','pic1');	



//=========hover上去显示不同的数码配件====================
$('#hot_phoneRim').find('.hot_ph_link').each(function(item){
	$(this).hover(function(){
		getGoodsInfo('../data/phoneRim.json',item,'#home_phoneRim','.home_phoneRimUl','phoneRimId','phoneRimIndex');
			if(this.id==0){
				$('.home_phoneRimUl li').eq(0).find('a img').attr('id','pic');
				$('.home_phoneRimUl li').eq(0).siblings().find('a img').attr('id','pic1');
			}			
		})
		})
	};
	return {
		hotGood:hotGood
	}

})
