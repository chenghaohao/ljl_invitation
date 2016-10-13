"use strict"

var path = require('path');

var config = {
	//开发环境
	dev:{
		//页面js 路径
		publicPath:'/invitation/bulid/js/',
		// 打包输出位置
		output: path.resolve(process.cwd(), 'bulid')+'/',
	},
	//线上环境
	release:{
		//页面js 路径
		publicPath:'/js/',
		// 打包输出位置
		output: path.resolve(process.cwd(), 'output')+'/',
	}
}

module.exports = config;