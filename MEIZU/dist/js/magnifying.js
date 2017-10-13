define(['jquery'],function(){
	var magnifying=function(){
		function magnify(Box1,Mark_box,Po_box,BigBox,BigPic){
		Mark_box.mouseover(function(){
			Po_box.css('display','block');
			BigBox.css('display','block');
		});
		Mark_box.mouseout(function(){
			Po_box.css('display','none');
			BigBox.css('display','none');
		});
		Mark_box.mousemove(function(ev){
			var left = ev.originalEvent.offsetX-Po_box.outerWidth()/2;
			if (left<0) {
				left=0;
			}else if (left>Box1.outerWidth()-Po_box.outerWidth()) {
				left=Box1.outerWidth()-Po_box.outerWidth();
			}
			Po_box.css('left',left);
			var top = ev.originalEvent.offsetY-Po_box.outerHeight()/2;

			if (top<0) {
				top=0;
			}else if (top>Box1.outerHeight()-Po_box.outerHeight()) {
				top=Box1.outerHeight()-Po_box.outerHeight();

			}
			Po_box.css('top',top);
			var proportionX=left/(Box1.outerWidth()-Po_box.outerWidth());
			var proportionY=top/(Box1.outerHeight()-Po_box.outerHeight());
			BigPic.css('left',-proportionX*(BigPic.outerWidth()-BigBox.outerWidth()));
			BigPic.css('top',-proportionY*(BigPic.outerHeight()-BigBox.outerHeight()));
			})

		}
			magnify($('#box1'),$('#mark_box'),$('#position_box'),$('#bigBox'),$("#bigPic"));
		};
		return{
			magnifying:magnifying
		}
})	