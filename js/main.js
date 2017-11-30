
require.config({
	shim:{
		cookie:["jquery"]
	},
	paths:{
		"jquery": "jquery-1.11.1",
		'cookie':"jquery.cookie",
		"public":'public',
		"nav":"nav",
		'hotGood':"hotGood",
		'secGoodList':"secGoodList",
		"details":"details",
		"magnifying":"magnifying",	
		"login":"login",
		"register":"register",
		"shopCar":"shopCar",
	}
})
require(["jquery","public","nav","hotGood",'secGoodList',"cookie","magnifying","details","login","register","shopCar"],
 function($, public, nav, hotGood,secGoodList,cookie,magnifying,details,login,register,shopCar){
	nav.nav();
	hotGood.hotGood();
	secGoodList.secGoodList();
	magnifying.magnifying();
	details.details();
	login.login();
	register.register();
	shopCar.shopCar();
})

