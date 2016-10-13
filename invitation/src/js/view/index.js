require('../../css/index.css');
require('../plugin/zepto.min.js');
require('../plugin/zepto.fullpage.js');

var info = require('../../tmpl/info.tpl');
var info2 = require('../../tmpl/info2.tpl');

Zepto(function() {
	/*
	 	自适应
	 * */
	var auto = {
		init:function() {
			var dpr = window.devicePixelRatio || 1;
			var docEl = document.documentElement;
			
			//设置data-drp属性
			docEl.setAttribute('data-dpr', dpr);
			//缩放比例
			var scale = 1 / dpr;
			//设置meta 压缩界面 模拟设备的高分辨率
			document.querySelector('meta[name="viewport"]').setAttribute('content', 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
		
			//设置html中font-size大小
			docEl.style.fontSize = docEl.clientWidth / 10 + 'px';
		}
	}
	
	//auto.init();
	
	/*
	 	全屏滚动
	 * */
	$('.wp-inner').fullpage({
		change: function (e) {
            // 移除动画属性
            $('.page').eq(e.cur).find('.js-animate').each(function() {
                $(this).removeClass($(this).data('animate')).hide();
            });
        },
        afterChange: function (e) {
            // 添加动画属性
            $('.page').eq(e.cur).find('.js-animate').each(function () {
                $(this).addClass($(this).data('animate')).show();
            });
        }
	});
	
	
	
	/*
	 	textarea自增高
	 * */
	var textarea = {
		init:function() {
			var textarea= document.getElementById("textarea");
		    textarea.style.height=textarea.scrollHeight + 'px';
		}
	}
	//textarea.init();
	
	
	/*
	 	控制音频
	 * */
	var musicAuto = {
		init:function() {
			var flag = true;
			var audio = document.getElementById("bgMusic");
			this.event(audio);
		},
		event:function(audio,flag) {
			$('.music').click(function() {
				if(flag) {
					audio.play();
					flag = false;
					$(this).addClass('play');
				}else {
					audio.pause();
					flag = true;
					$(this).removeClass('play');
				}
			})
		}
	}
	musicAuto.init();
	
	/*
	 	点击确定邀请
	 * */
	var ok = {
		init:function() {
			this.event();
		},
		event:function() {
			$('.ok').click(function() {
				$('.modal').css('display','none');
				
			})
		}
	}
	ok.init();
	
	/*
	 	点击接受邀请(c-btn)
	 * */
	var c_btn = {
		init:function() {
			this.clickBtn();
		},
		clickBtn:function() {
			
			$( '.c-btn' ).click(function() {
				$('.form').css('display','block');
				
				$(this).parent().css('display','none');
			})
		}
	}
	c_btn.init();
	
	/*
	 	点击接受邀请
	 * */
	var  accept = {
		init:function() {
			this.clickBtn();
		},
		clickBtn:function() {
			
			$( '.accept' ).click(function() {
				var id = location.search.split('=')[1]; //id
				var name = $( '.name_val' ).val();		//姓名
				var words = $( '.textarea_val' ).val(); //祝福语
				var num = $( '.num_val' ).val();		//人数
				$( '.alert' ).remove();
				
				var data = {
					'name':name,
					'words':words,
					'num':num
				}
				
				if(name != '' && words != '' && num != '') {
					
					$('.modal').css('display','block')
					
					$.ajax({
						type:'get',
						url:'http://lijingli.cn:8080/lijinli/service/invitation/'+id+'?data='+data,
						dataType:'json',
						success:function(data) {
							console.log(data)
						}
					});
				}else {
					
					$('<div class="alert color-1 js-animate animated" data-animate="fadeIn">请填写完整的信息~</div>').insertAfter($('.form'))
				}
			})
		}
	}
	accept.init();
	
	/*
	 	初始化数据
	 * */
	var initData = {
		init:function() {
			this.detail();
		},
		detail:function() {
			var _this = this;
			var id = location.search.split('=')[1];
			$.ajax({
				type:'get',
				url:'http://lijingli.cn:8080/lijinli/service/invitation/'+id,
				dataType:'json',
				success:function(data) {
					//var location = data.data.location;
					_this.baiduMap(  );
					
					console.log(data)
					var html = info( data );
					var html2 = info2( data );
					$('.message').append( html );
					$('.page4-info').append( html2 )
					
					var n_time = data.data.createTime.substr(0,10);
					var m_time = data.data.createTime.substr(10);
					$('.page2-5').append('<div class="n-time">'+n_time+'</div>'+
										 '<div class="m-time">'+m_time+'</div>');
					$('.GPS').append('<a class="color-1" href="http://api.map.baidu.com/geocoder?address=四川省成都市高新区香年广场&output=html&src=" ">开始导航</a>')
				}
			});
		},
		baiduMap:function(  ) {
			var map = new BMap.Map("map-container");          // 创建地图实例  
			var point = new BMap.Point(116.331398,39.897445);  // 创建点坐标  
			map.centerAndZoom(point, 17);                 // 初始化地图，设置中心点坐标和地图级别  
			
			// 创建地址解析器实例
			var myGeo = new BMap.Geocoder();
			// 将地址解析结果显示在地图上,并调整地图视野
			myGeo.getPoint("四川省成都市高新区香年广场", function(point){
				if (point) {
					map.centerAndZoom(point, 16);
					map.addOverlay(new BMap.Marker(point));
					
				}else{
					alert("您的地址有误！");
				}
			}, "");
		}
	}
	initData.init();
})
	
	

