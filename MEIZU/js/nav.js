define(["jquery"],function($){
	var nav = function(){
	//导航栏数据生成
		$('#nav_conent ul li').find('a').each(function(item){
			$(this).attr('id',item);
		})
				$.ajax({
				url: "../data/data1.json",
				type: "GET",
				success: function(res){
					// var html='';
					var oA=$('#nav_conent .nav_List li').find('a');
					$('#nav_conent .nav_List').find('li a').each(function(item){
						$(this).html(res[item].name);

					})
				}
			})
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

		$('#nav_conent .nav_List').find('li').each(function(item){

			$(this).hover(function(){
				$(this).find('a').css('color','blue');
				$(this).find('.detailGoods').css('display','block');
				var _this =this;
				if(item>0&&item<5){
					 
					$.ajax({
						url: "../data/data1.json",
						type: "GET",
						success:function(res){
							
						var html='';
						for(var i = 0; i < res[item].goods.length; i++){
							html+='<div><img src="../'+res[item].goods[i].url+'" alt=""><p class="name">'+res[item].goods[i].name+'</p><p class="price">'+res[item].goods[i].price+'</p></div>';

					       }
					     $(_this).find('.detailGoods').html(html);
//============第二层菜单默认效果是高度从0-300，且有一个淡入淡出的效果==============	     
					$(_this).find('.detailGoods').stop().animate({height:300,opacity:1},1000,'linear');     
//===================默认情况下先给他设好位置后加定位===========================
					   $(_this).find('.detailGoods div').each(function(){
					   		$(this).css('left',$(this).offset().left+350)
					   				.css('top',$(this).offset().top);

					   }) 
					    $(_this).find('.detailGoods div').each(function(){
					   		$(this).css('position','absolute');
					   				

					   }) 
 //====================默认情况下是从右向左动态滑过来的========================
					     $(_this).find('.detailGoods div').each(function(){
					   $(this).stop().animate({left:$(this).offset().left-200},500,'linear');				

					   }) 
 //===========鼠标上去之后的透明度的变华==============================
					      $(_this).find('.detailGoods div').each(function(index){
					      	$(this).hover(function(){
					      		$(this).stop().animate({opacity:1},500,'linear')
					      				.siblings().stop().animate({opacity:0.5},500,'linear');
					      	})
					      	$(this).click(function(){
					      		location.href='../html/details.html?goodsId='+index+'&goodsIndex='+item+'';
								
					      	})
					   				

					   }) 
						
						}
					})
				}

					},function(){

					$(this).find('a').css('color','black');
					$(this).find('.detailGoods').stop().animate({height:0,opacity:0.6},1000,'linear',function(){
						$(this).css('display','none');
					});     

						})
					
				})
//================用户登录=========================================================
			$('#ren').on('mouseover',function(){
			$('#login').css('display','block');
			
		}).on('mouseout',function(){
			$('#login').css('display','none');
		})

// alert(flag);	
//=====================
	$('#goodsnum').click(function(){
		location.href='../html/shopCar.html';
	})		

//============轮播图======================================
		var curIndex=0;
		var timer=setInterval(function(){
			if (curIndex<$('.imgList li').length-1) {
				curIndex++;
			}else{curIndex=0;}

			changeTo(curIndex);
		},4000);
		$('ol').find('li').each(function(item){
			$(this).hover(function(){
				clearInterval(timer);
				changeTo(item);
			},function(){
				timer=setInterval(function(){
					if (curIndex<$('.imgList li').length-1) {
						curIndex++;
					}else{curIndex=0;}

					changeTo(curIndex);
				},4000);
			})
		})

		$('.next').on('click',function(){
			
			clearInterval(timer);
			if (curIndex<$('.imgList li').length-1) {
				curIndex++;
				}else{curIndex=$('.imgList li').length-1;}
			changeTo(curIndex);
			})
			
		
		$('.prive').on('click',function(){

			clearInterval(timer);
			
			if(curIndex==0){
				curIndex==0;
			}else{
				curIndex--;
			}
			
			changeTo(curIndex);
		})
		
			
		
		function changeTo(index){
			$('.imgList').find('li').removeClass('imgOn').fadeOut().eq(index).fadeIn().addClass('imgOn');
			$('ol').find('li').removeClass('active').eq(index).addClass('active');

		}

//==============侧边导航栏===============================
		$('.sideNav_good').find('li').each(function(item){
			$(this).attr('id',item);
		})

		$.ajax({
				url: "../data/data2.json",
				type: "GET",
				success: function(res){
					var oA=$('.sideNav_good li').find('a');
					$('.sideNav_good').find('li a').each(function(item){
						$(this).html(res[item].name);

					})
				}
			})
	
		$('.sideNav_good').find('li').each(function(i){
			$(this).hover(function(){
				$(this).css('backgroundColor','white');
				$(this).find('.sideNav_hideGoods').css('display','block');
				var _this=this;
				$.ajax({
					url: "../data/data2.json",
					type: "GET",
					success: function(res){
						var html='';
						var goodsList='';
						for(var j = 0; j < res[i].goods.length; j++){
							// alert(res[i].goods.length);
							html+='<div class="title" id="'+j+'"><p>'+res[i].goods[j].name+'</p></div>';
							// 
							for(var k=0;k<res[i].goods[j].goodsList.length;k++){

								html+='<div class="box" id="'+k+'"><img src="../'+res[i].goods[j].goodsList[k].url+'" /><span>'+res[i].goods[j].goodsList[k].name+'</span></div>'

							}

						}
						$(_this).find('.sideNav_hideGoods').html(html);
						$(_this).find('.sideNav_hideGoods .box').each(function(id){
							$(this).click(function(){
								var item=$(this).prevAll('.title').attr('id');
								// alert(item);
								// alert(this.id);
					      		location.href='../html/details.html?sideNavIndex='+i+'&sideNavId='+item+'&sideNavGoodsId='+this.id+'';

							})
						})

				}
			})


			},function(){
				$(this).css('backgroundColor','#F4F3F3');
				$(this).find('.sideNav_hideGoods').css('display','none');

			})
		})
var flag=GetQueryString("flag");
var time=null;

if(flag){
	
		$('#popwind').css('display','block');
		time=setTimeout(function(){
			$('#popwind').css('display','none');
		},2000);
		
}		
		};
		return {
			nav:nav
		};
})
