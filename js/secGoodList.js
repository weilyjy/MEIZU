define(['jquery'],function(){
	var secGoodList=function(){

//==================手机参数=========================================

	$('#goodDetails ul').find('li').each(function(item){
		var _this=this;

		$.ajax({
				url: "../data/secondPhone.json",
				type: "GET",
				success: function(res){
					var html='';
						for(var j=0;j<res[item].parameter.length;j++){
							html+='<a href="#">'+res[item].parameter[j]+'</a>';
						}

					$(_this).html(html);	
				}
			})

	})
//================默认情况下是生成第一个推荐的商品===================

			$.ajax({
				url:'../data/secGoodList.json',
				type:'GET',
				success:function(res){
					var html='';
					for(var i=0;i<res[0].goodsList.length;i++){
						
						html+='<li><a><img id="pic" src="../'+res[0].goodsList[i].url+'" alt=""><div id="box">';
						for(var j=0;j<res[0].goodsList[i].imgList.length;j++){
						html+='<div id="borde"><img id="pic1" src="../'+res[0].goodsList[i].imgList[j]+'"></div>'	
							}
						html+='</div><h4>'+res[0].goodsList[i].name+'</h4><h6>'+res[0].goodsList[i].desc+'</h6><span>'+res[0].goodsList[i].price+'</span></a></li>'
	
					}

					$('#secGoodDetail').find('ul').html(html);
					$('#secGoodDetail ul').find('li').each(function(item){
						$(this).click(function(){
							// location.href='details.html?secPhoneId='+item+'';
							location.href='details.html?secPhoneId='+item+'&secPhoneIndex='+0+'';

						})
					})
				}
		

		})


//==================鼠标点击上面的标签出现不同的商品====================
	$('#secGoodList p').find('span').each(function(item){
	$(this).click(function(){

			$.ajax({
				url:'../data/secGoodList.json',
				type:'GET',
				success:function(res){
					var html='';
					for(var i=0;i<res[item].goodsList.length;i++){
						
						html+='<li><a><img id="pic" src="../'+res[item].goodsList[i].url+'" alt=""><div id="box">';
						for(var j=0;j<res[item].goodsList[i].imgList.length;j++){
						html+='<div id="borde"><img id="pic1" src="../'+res[item].goodsList[i].imgList[j]+'"></div>'	
							}
						html+='</div><h4>'+res[item].goodsList[i].name+'</h4><h6>'+res[item].goodsList[i].desc+'</h6><span>'+res[item].goodsList[i].price+'</span></a></li>'
	
					}

					$('#secGoodDetail').find('ul').html(html);
					$('#secGoodDetail ul').find('li').each(function(index){
						$(this).click(function(){
							// location.href='details.html?secPhoneId='+item+'';
							location.href='details.html?secPhoneId='+index+'&secPhoneIndex='+item+'';
							// location.href='html/details.html?partId='+index+'&partIndex='+item+'';
							

						})
					})
				}
		

		})

	})
})
//==========点击下面的图片列表，上面显示相对应的图片================
$('#secGoodDetail ul').find('li a').each(function(){
	$(this).find('#box #borde').each(function(){
		$(this).click(function(){
			alert(1);
			alert($(this).find('img').src);

		})
	})
})
/*$('#box').find('#borde').each(function(i){
	$(this).click(function(){
		alert(i);
		$('#pic').attr('src',$(this).find('img').src);
	})
})	*/

//=============================为您推荐商品====================
		$.ajax({
				url:'../data/secGood.json',
				type:'GET',
				success:function(res){
					var html='';
					for(var i=0;i<res[0].goodsList.length;i++){
						
						html+='<li><a href="#"><div><img  src="../'+res[0].goodsList[i].url+'" alt=""></div><h4>'+res[0].goodsList[i].name
						+'</h4><h6>'+res[0].goodsList[i].desc+'</h6><span>'+res[0].goodsList[i].price+'</span></a></li>'
	
					}
					$('#recommendGood').find('ul').html(html);
					$('#recommendGood ul').find('li').each(function(index){
						$(this).click(function(){
							// location.href='details.html?secPhoneId='+item+'';
							location.href='details.html?recommendGoodId='+index+'&recommendGoodIndex='+0+'';

						})
					})

				}
		

		})		
	};
	return{
		secGoodList:secGoodList
	}
})
