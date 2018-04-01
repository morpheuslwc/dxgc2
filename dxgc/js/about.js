$(function(){
    jQuery.fn.widResize = function (Func) {
        Func();
        $(window).resize(function(){
            Func();
        });
    }
    //[h-ctrl]
    function hCtrl() {
        $("[h-ctrl]").each(function () {
            var $this = $(this);
            var $h = 0;
            if($this.find("*[h-main]").length){
                $h = $this.find("*[h-main]")[0].offsetHeight;
            }else{
                $this.find("*[h-list]").each(function(){
                    if($(this)[0].offsetHeight > $h) $h = $(this)[0].offsetHeight;
                });
            }
            var $rull = $this.data("rull");
            var $w = document.body.clientWidth;
            var $rullnum;
            if($rull == 'sm') $rullnum = 768;
            if($rull == 'md') $rullnum = 992;
            if($rull == 'lg') $rullnum = 1200;
            if($w < $rullnum){
                $this.find("*[h-list]").css({"height" : "auto"});
            }else{
                $this.find("*[h-list]").css({"height" : $h});
            }
        });
    }
    $(window).widResize(hCtrl);

	//[data-toggle-class]
	$("[data-toggle-class]").on("click",function(){
		var attr = $(this).data();
		var target = this;
		if(attr.target){
			target = attr.target;
		}
		$(target).toggleClass(attr.toggleClass);
	});

	//data-tab
	$("[data-tab]").each(function(){
		var $tab = $(this);
		var attr = $tab.data();
		var trigger = attr.trigger? attr.trigger:'click';
		$tab.find("[data-handle]").css("cursor","pointer");
		$tab.find("[data-handle]").on(trigger,function(){
			if($(this).hasClass(attr.class)) return;
			var n = $(this).index();
			$tab.find("[data-handle]").removeClass(attr.class);
			$tab.find("[data-content]").removeClass(attr.class);
			$tab.find("[data-content]").eq(n).addClass(attr.class);
			$(this).addClass(attr.class);
		});
	});

    //animation-banner
    $(".animation-banner").each(function(){
        var bannerLength;
        var bannerShow;
        var bannerShowList;
        var $w;
        var $this = $(this);
        function setNew(){
            $w = document.body.clientWidth;
            bannerLength = $this.find(".img-box .img").length;
            bannerShowList = $this.data("show-list")? $this.data("show-list").split(','):[1,1,1,1];
            if($w < 768) bannerShow = bannerShowList[0];
            if($w < 992 && $w >= 768) bannerShow = bannerShowList[1];
            if($w < 1200 && $w >= 992) bannerShow = bannerShowList[2];
            if($w >= 1200) bannerShow = bannerShowList[3];
            $this.find(".img-box").css("left",-100/bannerShow + "%");
            $this.find(".img-box .img").css({"width":10/bannerShow + "%"});
            $this.find(".img-box .img").css({"left":"-" + 100/bannerShow + "%"});
        }
        $(window).widResize(setNew);
        function bannerMove(a){
            var b = Math.abs(a);
            for(var c = b; c>0; c=c-1){
                dotMove(a);
                if(a>0){
                    $this.find(".img-box").animate({"left":"-" + 200/bannerShow + "%"}, 500/b, "linear", function(){
                        $(this).find(".img:first").insertAfter($(this).find(".img:last"));
                        $(this).css("left",-100/bannerShow + "%");
                    });
                    $this.find(".content").animate({top: "-" + 200/bannerShow + "%"}, 500/b, "linear", function(){
                        $(this).find("div:first").insertAfter($(this).find("div:last"));
                        $(this).css("top",-100/bannerShow + "%");
                    });
                }else if(a<0){
                    $this.find(".img-box").animate({left: 0}, 500/b, "linear", function(){
                        $(this).find(".img:last").insertBefore($(this).find(".img:first"));
                        $(this).css("left",-100/bannerShow + "%");
                    });
                    $this.find(".content").animate({top: 0}, 500/b, "linear", function(){
                        $(this).find("div:last").insertBefore($(this).find("div:first"));
                        $(this).css("top",-100/bannerShow + "%");
                    });
                }
            }
        }
        function dotMove(a){
            var oldIndex = $this.find(".dots > div.active").index();
            if(a>0 && oldIndex >= bannerLength - 1){
                oldIndex = 0;
            }else if(a>0 && oldIndex < bannerLength - 1){
                oldIndex = oldIndex + 1;
            }else if(a<0 && oldIndex <= 0){
                oldIndex = bannerLength - 1;
            }else if(a<0 && oldIndex > 0){
                oldIndex = oldIndex - 1;
            }
            $this.find(".dots > div").eq(oldIndex).addClass("active").siblings().removeClass("active");
        }
        $this.find(".btn-left").click(function(){
            bannerMove(-1)
        });
        $this.find(".btn-right").click(function(){
            bannerMove(1)
        });
        $this.find(".dots > div").click(function(){
            var oldIndex = $this.find(".dots > div.active").index();
            var newIndex = $(this).index();
            var a = newIndex - oldIndex;
            bannerMove(a);
        });
        var timer = setInterval(function(){
            bannerMove(1);
        },5000);
        $this.hover(function(){
            clearInterval(timer);
        },function(){
            timer = setInterval(function(){
                bannerMove(1);
            },5000);
        });
    });


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})