//业务文件


var Top = {
	isRolling: false,
	interval: null
};


//构建模板
var View = (function(){
	//模板文件
	var imgTpl = '<li class="{{class}}" data-name="{{name}}"><img src="'+ Conf.imgDir +'/{{name}}.jpg" alt="{{name}}"/></li>';


	//传入的是员工姓名数组
	var addImage = function(data){
		var tpl = [];
		var length = data.length;
		var i = 0,
			max = 5 - length;
		for (i = 0; i < max; i=i+1) {
			data.push(data[length-1]);
		}
		$(data).each(function(k,v){
			var className = k > 4 ? '' : 'd_pos' + k
			var str = imgTpl.replace(/\{\{name\}\}/g, v).replace('{{class}}', className);
			tpl.push(str);
		});

		$('#d_tab29 ul.d_img').html($(tpl.join('')));
	};

	//删除一条数据
	var delImage = function(name){
		$('#d_tab29').find('li[data-name=' + name + ']').remove();
	}

	//添加贺词
	var addCong = function(name){
		$('#d_tab29 .congratulations').html('<p><p>恭喜 ' + name + ' 获奖</p></p>');
	};

	//删除贺词
	var delCong = function(){
		$('#d_tab29 .congratulations').html('');
	};

	//添加获奖名单

	return {
		addImage: addImage,
		delImage: delImage,
		addCong: addCong,
		delCong: delCong
	}
})();

//抽奖，作为Controller使用
var Roll = (function(){
	var $ele = $('#d_tab29');
	var $next = $ele.find('.d_next');
	var currentName = '刘洋';
	var config = {
		key:"c37080",            
		moveSpeed:20,           
		autoRollingTime:10,
		//开始前
		beforeStart: function(){
			//console.log('开始啦');
		},
		//每次切换前都执行
		step: function(){
			//console.log('下一张');
		},
		//结束后
		afterOver: function(){
			//console.log('结束啦');
		}
	};
	var clicknext = function(){
		config.step();
		$next.click();

	};

	var init = function(conf){

		var data = Data.getCurrent();

		config = $.extend(config, conf);

		//清空贺词
		View.delCong();

		//清空之前的元素
		//$('#d_tab29 .d_img, #d_tab29 .d_menu').html('');

		//添加图片
		View.addImage(data);

		$('#d_tab29').DB_rotateRollingBanner(config);
	};

	var start = function(){

		if (Top.isRolling) {
			//alert('正在抽奖中！');
			return false;
		}

		if (Data.getCurrent().length == 0) {
			View.addCong('所有人全部');
			return false;
		}



		config.beforeStart();

		Top.isRolling = true;

		init(config);

		Top.interval = setInterval(clicknext, config.autoRollingTime)
	};

	var over = function(){
		clearInterval(Top.interval);

		if (Data.getCurrent().length == 0) {
			View.addCong('所有人全部');
			return false;
		}
		
		console.log(currentName + '中奖啦')

		//添加贺词
		View.addCong(currentName);

		//从备选中删除
		Data.del(currentName);

		//写入中奖名单

		//config.afterOver();

		Top.isRolling = false;


	};

	var getCurrentName = function(){
		return currentName;
	};

	var setCurrentName = function(index){
		var length = $('#d_tab29 .d_img li').length;
		var k = index + 2;
		var q = k < length ? k : k - length;
		currentName = $('#d_tab29 .d_img li').eq(q).attr('data-name');
	};

	return {
		init: init,
		start: start,
		over: over,
		getCurrentName: getCurrentName,
		setCurrentName: setCurrentName

	}

})();

//事件绑定

//数据操作

//先不使用试试，将html视为数据

var Data = (function(){
	var Staff = [];
	var CurrentStaff = [];

	//获取配置文件中的人员名单，缓存起来
	var init = function(data){
		Staff = data;
		CurrentStaff = data;
	};

	//从候选名单中删除姓名为name的人
	var del = function(name){
		var new_arr = [];
		$.each(CurrentStaff, function(k, v){
			if (v != name) {
				new_arr.push(v)
			}
		});
		CurrentStaff = new_arr;
	};
	//存储每一个数据
	var save = function(){};

	//返回当前的数据
	var getCurrent = function(){
		//打乱顺序
		return CurrentStaff.sort(function(){
		 	return 0.5 - Math.random() 
		});;
	};

	return {
		init: init,
		del: del,
		getCurrent: getCurrent
	}
})();

var Log = function(str){
	console.log(str);
};

var init = function(){

	//缓存数据
	Data.init(Conf.staff);

	Roll.init();

	$('.btn-start').bind('click', function(){
		Roll.start();
	});

	$('.btn-stop').bind('click', function(){
		Roll.over();
	});

	//更新标题
	$('.keTitle').text(Conf.title);

	//绑定键盘事件,空格和回车
	$(document).bind('keypress', function(e){
		if (e.keyCode == 32 || e.keyCode == 13) {
			if (Top.isRolling) {
				Roll.over();
			} else {
				Roll.start();
			}

		}
	})


};

(function(){
	init();
})();