/*<script src = "../js/jquery-1.11.1.js"></script>
	<script src='../js/nav.js'></script>
	<script src="../js/secGoodList.js"></script>
*/
require.config({
	paths:{
		"jquery": "jquery-1.11.1",
		"nav":"nav",
		'secGoodList':"secGoodList",	
	}
})
require(["jquery","nav","secGoodList"], function(){
	nav.nav();
	secGoodList.secGoodList();
})