/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		"app": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({}[chunkId]||chunkId) + "." + {"chunk-c1f4851c":"09f77045","chunk-e61a399e":"cce2ede1"}[chunkId] + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"chunk-c1f4851c":1,"chunk-e61a399e":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "css/" + ({}[chunkId]||chunkId) + "." + {"chunk-c1f4851c":"0d841527","chunk-e61a399e":"fed05ab0"}[chunkId] + ".css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.request = request;
/******/ 					delete installedCssChunks[chunkId]
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("56d7");


/***/ }),

/***/ "096c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PunchCard_vue_vue_type_style_index_0_id_62630d21_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("27ee");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PunchCard_vue_vue_type_style_index_0_id_62630d21_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PunchCard_vue_vue_type_style_index_0_id_62630d21_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "0c3d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChartPie_vue_vue_type_style_index_0_id_60e18257_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ff0c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChartPie_vue_vue_type_style_index_0_id_60e18257_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChartPie_vue_vue_type_style_index_0_id_60e18257_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "173e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "17e8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LeiDa_vue_vue_type_style_index_0_id_d26b9c44_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4daa");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LeiDa_vue_vue_type_style_index_0_id_d26b9c44_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LeiDa_vue_vue_type_style_index_0_id_d26b9c44_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "1f34":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DoughnutChart_vue_vue_type_style_index_0_id_5e13963b_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5264");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DoughnutChart_vue_vue_type_style_index_0_id_5e13963b_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DoughnutChart_vue_vue_type_style_index_0_id_5e13963b_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "1f92":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DuoZhuTu_vue_vue_type_style_index_0_id_5138602b_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("74aa");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DuoZhuTu_vue_vue_type_style_index_0_id_5138602b_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DuoZhuTu_vue_vue_type_style_index_0_id_5138602b_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "27ee":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "28f4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoCommon_vue_vue_type_style_index_0_id_6ae5192e_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d4dc");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoCommon_vue_vue_type_style_index_0_id_6ae5192e_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoCommon_vue_vue_type_style_index_0_id_6ae5192e_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "2fba":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeiFenHuan_vue_vue_type_style_index_0_id_301e737a_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("df3a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeiFenHuan_vue_vue_type_style_index_0_id_301e737a_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeiFenHuan_vue_vue_type_style_index_0_id_301e737a_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "30f9":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "33c8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "36ca":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3b6a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3e2f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChartLineArea_vue_vue_type_style_index_0_id_5e0c5c0b_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("54a2");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChartLineArea_vue_vue_type_style_index_0_id_5e0c5c0b_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChartLineArea_vue_vue_type_style_index_0_id_5e0c5c0b_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "3fd2":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "41cb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DuitieZhutu_vue_vue_type_style_index_0_id_d5030cb8_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6cdf");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DuitieZhutu_vue_vue_type_style_index_0_id_d5030cb8_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DuitieZhutu_vue_vue_type_style_index_0_id_d5030cb8_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "4752":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "477f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_style_index_0_id_f07eb1f4_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4ad6");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_style_index_0_id_f07eb1f4_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_style_index_0_id_f07eb1f4_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "4ad6":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4daa":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "509e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LineCharts_vue_vue_type_style_index_0_id_4a417a56_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d5a7");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LineCharts_vue_vue_type_style_index_0_id_4a417a56_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LineCharts_vue_vue_type_style_index_0_id_4a417a56_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "51a7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StackDuoZhuTu_vue_vue_type_style_index_0_id_92a12184_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("30f9");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StackDuoZhuTu_vue_vue_type_style_index_0_id_92a12184_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StackDuoZhuTu_vue_vue_type_style_index_0_id_92a12184_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "51b9":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "5264":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "54a2":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "56d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=d3cffb1c
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('div', {
    staticClass: "main",
    class: _vm.notFound ? '' : 'nomargin'
  }, [_c('router-view')], 1)]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=d3cffb1c

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js

// import Nav from './components/Nav.vue';
// 屏幕自适应
(function (doc, win) {
  setRem();
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      setRem();
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  // doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
function setRem() {
  var docEl = document.documentElement;
  var clientWidth = docEl.clientWidth;
  if (!clientWidth) {
    return;
  }
  docEl.style.fontSize = 20 * (clientWidth / 1920) + 'px';
}
/* harmony default export */ var Appvue_type_script_lang_js = ({
  name: 'App',
  data() {
    return {
      navData: [],
      menu: [],
      scale: 1,
      notFound: ''
    };
  },
  components: {
    // Nav,
  },
  methods: {
    setScreen() {
      let visibleWidth = window.innerWidth;
      let visibleHeight = window.innerHeight;
      var widthPercentage = 1.0 * visibleWidth / 3840;
      var heightPercentage = 1.0 * visibleHeight / 2160;
      this.scale = Math.min(widthPercentage, heightPercentage);
      this.$store.commit('setScale', this.scale);
    }
  },
  mounted() {},
  created() {
    this.$store.commit('setRouter', this.$router.currentRoute.path);
    let that = this;
    that.menu = this.$router.options.routes.filter(item => {
      that.navData.push(item.path);
    });
  },
  watch: {}
});
// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js
 /* harmony default export */ var src_Appvue_type_script_lang_js = (Appvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/App.vue?vue&type=style&index=0&id=d3cffb1c&prod&lang=less
var Appvue_type_style_index_0_id_d3cffb1c_prod_lang_less = __webpack_require__("e0af");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/App.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_Appvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var App = (component.exports);
// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__("8c4f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ChartLibraryView/Zhexian.vue?vue&type=template&id=c9f38d9e&scoped=true
var Zhexianvue_type_template_id_c9f38d9e_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "zx"
  }, [_c('div', {
    staticClass: "picBox"
  }, [_c('div', [_c('ChartLineArea', {
    attrs: {
      "Width": '97%',
      "height": '258px'
    }
  }), _c('div', {
    staticClass: "btn"
  }, [_c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('ChartLineArea');
      }
    }
  }, [_vm._v("复制代码")])])], 1), _c('div', [_c('DuoZhexianTu', {
    attrs: {
      "width": '97%',
      "height": '258px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('DuoZhexianTu');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('LineCharts', {
    attrs: {
      "width": '97%',
      "height": '258px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('LineCharts');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('LineChartsXuxian', {
    attrs: {
      "width": '97%',
      "height": '258px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('LineChartsXuxian');
      }
    }
  }, [_vm._v("复制代码")])], 1)])]);
};
var Zhexianvue_type_template_id_c9f38d9e_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/ChartLibraryView/Zhexian.vue?vue&type=template&id=c9f38d9e&scoped=true

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/01-折线图/02-单折现面积图/ChartLineArea.vue?vue&type=template&id=5e0c5c0b&scoped=true
var ChartLineAreavue_type_template_id_5e0c5c0b_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "chartBox"
  }, [_c('div', {
    ref: "myChart",
    staticClass: "myChart",
    style: {
      width: _vm.Width,
      height: _vm.height
    }
  }), _vm.legIsShow ? _c('ul', {
    staticClass: "legth",
    style: {
      top: _vm.legTop,
      left: _vm.legLeft
    }
  }, _vm._l(_vm.legendthWZ, function (item, i) {
    return _c('li', {
      key: i
    }, [_c('h3', {
      style: {
        backgroundColor: _vm.legendColor[i]
      }
    }), _c('span', [_vm._v(_vm._s(item))])]);
  }), 0) : _vm._e()]);
};
var ChartLineAreavue_type_template_id_5e0c5c0b_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/01-折线图/02-单折现面积图/ChartLineArea.vue?vue&type=template&id=5e0c5c0b&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/01-折线图/02-单折现面积图/ChartLineArea.vue?vue&type=script&lang=js

/* harmony default export */ var ChartLineAreavue_type_script_lang_js = ({
  name: 'pieGeRenNanDing',
  props: {
    rowData: {
      type: Array,
      default: () => {
        return [{
          name: '00:00',
          value: 90,
          item: 10
        }, {
          name: '02:00',
          value: 150,
          item: 20
        }, {
          name: '04:00',
          value: 130,
          item: 120
        }, {
          name: '04:00',
          value: 130,
          item: 130
        }, {
          name: '04:00',
          value: 120,
          item: 140
        }, {
          name: '06:00',
          value: 100,
          item: 150
        }, {
          name: '08:00',
          value: 80,
          item: 110
        }, {
          name: '10:00',
          value: 80,
          item: 160
        }, {
          name: '12:00',
          value: 70,
          item: 191
        }, {
          name: '14:00',
          value: 90,
          item: 182
        }, {
          name: '16:00',
          value: 100,
          item: 170
        }, {
          name: '18:00',
          value: 130,
          item: 160
        }, {
          name: '20:00',
          value: 120,
          item: 150
        }, {
          name: '22:00',
          value: 110,
          item: 140
        }];
      }
    },
    symbolSize: {
      type: [String, Number],
      default: () => {
        return 5;
      }
    },
    lineColor: {
      type: Array,
      default: () => {
        return ['#6387a9', '#595959'];
      }
    },
    legendColor: {
      type: Array,
      default: () => {
        return ['#6387a9'];
      }
    },
    legendthWZ: {
      type: Array,
      default: () => {
        return ['A'];
      }
    },
    unit: {
      type: String,
      default: () => {
        return '%';
      }
    },
    Width: {
      type: String,
      default: () => {
        return '600px';
      }
    },
    height: {
      type: String,
      default: () => {
        return '360px';
      }
    },
    legTop: {
      type: String,
      default: () => {
        return '10px';
      }
    },
    legLeft: {
      type: String,
      default: () => {
        return '450px';
      }
    },
    legIsShow: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    fontStyle: {
      type: Object,
      default: () => {
        return {
          Xfont: {
            // x轴
            color: '#f8f8f8',
            fontSize: 14,
            fontFamily: '黑体'
          },
          Yfont: {
            // y轴
            color: '#f8f8f8',
            fontSize: 14,
            fontFamily: 'Helvetica'
          },
          nameTextStyle: {
            // 单位
            color: '#f8f8f8',
            fontSize: 16,
            padding: 2,
            fontFamily: '黑体'
          }
        };
      }
    },
    top: {
      type: String,
      default: () => {
        return '15%';
      }
    },
    left: {
      type: String,
      default: () => {
        return '2%';
      }
    }
  },
  data() {
    return {
      Xdata: [],
      Ydata: [],
      valTwo: [],
      setTime: null,
      chartInst: null
    };
  },
  mounted() {
    // this.getData();
    if (this.rowData && this.rowData.length > 0) {
      this.rowData.forEach(item => {
        this.Xdata.push(item.name);
        this.Ydata.push(item.value);
        this.valTwo.push(item.item);
      });
    }
    this.drawWidth();
    this.tooltipShuffling();
  },
  methods: {
    drawWidth() {
      // 基于准备好的dom，初始化echarts实例
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      this.chartInst.setOption({
        color: this.lineColor[0],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          top: this.top,
          left: this.left,
          right: '3%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [{
          boundaryGap: false,
          type: 'category',
          data: this.Xdata,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            //x轴文字的配置
            textStyle: this.fontStyle.Xfont
          },
          axisLine: {
            lineStyle: {
              color: '#9FAFB5',
              width: 1.2 //这里是为了突出显示加上的
            }
          }
        }],
        yAxis: [{
          name: '单位:' + this.unit,
          position: 'left',
          type: 'value',
          nameTextStyle: this.fontStyle.nameTextStyle,
          axisLabel: {
            //y轴文字的配置
            textStyle: this.fontStyle.Yfont
          },
          splitNumber: 4,
          // 设置y轴线条的粗细
          splitLine: {
            show: false,
            lineStyle: {
              color: ['#0A223E'],
              width: 2,
              type: 'solid'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#9FAFB5',
              width: 3 //这里是为了突出显示加上的
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              // color: ["rgba(14,29,52,0.5)", "rgba(191,235,255,0.1)"]
              color: ['transparent', 'rgba(238,238,238,.1)']
            }
          }
        }],
        series: [{
          type: 'line',
          data: this.Ydata,
          symbolSize: this.symbolSize,
          // symbolSize: 5,

          areaStyle: {
            normal: {
              lineStyle: {
                width: 30,
                type: 'solid',
                shadowColor: 'rgba(0,0,0,0)',
                //默认透明
                shadowBlur: 5,
                shadowOffsetX: 3,
                shadowOffsetY: 3
              },
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.lineColor[0]
              }, {
                offset: 1,
                color: this.lineColor[1]
              }])
            }
          }
        }]
      });
      //设置默认选中高亮部分
      this.chartInst.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: 0
      }); //鼠标进
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          //表示series中的第几个data数据循环展示
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.setTime);
  },
  watch: {
    rowData: {
      handler() {
        this.Xdata = [];
        this.Ydata = [];
        this.valTwo = [];
        this.rowData.forEach(item => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
        });
        this.chartInst.dispose();
        this.drawWidth();
        this.tooltipShuffling();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/01-折线图/02-单折现面积图/ChartLineArea.vue?vue&type=script&lang=js
 /* harmony default export */ var _02_ChartLineAreavue_type_script_lang_js = (ChartLineAreavue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/01-折线图/02-单折现面积图/ChartLineArea.vue?vue&type=style&index=0&id=5e0c5c0b&prod&lang=less&scoped=true
var ChartLineAreavue_type_style_index_0_id_5e0c5c0b_prod_lang_less_scoped_true = __webpack_require__("3e2f");

// CONCATENATED MODULE: ./src/components/Chart Library/01-折线图/02-单折现面积图/ChartLineArea.vue






/* normalize component */

var ChartLineArea_component = Object(componentNormalizer["a" /* default */])(
  _02_ChartLineAreavue_type_script_lang_js,
  ChartLineAreavue_type_template_id_5e0c5c0b_scoped_true_render,
  ChartLineAreavue_type_template_id_5e0c5c0b_scoped_true_staticRenderFns,
  false,
  null,
  "5e0c5c0b",
  null
  
)

/* harmony default export */ var ChartLineArea = (ChartLineArea_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/01-折线图/03-多折线图/DuoZhexianTu.vue?vue&type=template&id=b73743cc&scoped=true
var DuoZhexianTuvue_type_template_id_b73743cc_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "chartBox"
  }, [_c('div', {
    ref: "myChart",
    staticClass: "myChart",
    style: {
      width: _vm.width,
      height: _vm.height
    }
  })]);
};
var DuoZhexianTuvue_type_template_id_b73743cc_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/01-折线图/03-多折线图/DuoZhexianTu.vue?vue&type=template&id=b73743cc&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/01-折线图/03-多折线图/DuoZhexianTu.vue?vue&type=script&lang=js

/* harmony default export */ var DuoZhexianTuvue_type_script_lang_js = ({
  name: 'pieGeRenNanDing',
  props: {
    rowData: {
      type: Array,
      default: () => {
        return [{
          name: '00:00',
          value: 90,
          item: 10
        }, {
          name: '02:00',
          value: 150,
          item: 20
        }, {
          name: '04:00',
          value: 130,
          item: 120
        }, {
          name: '04:00',
          value: 130,
          item: 130
        }, {
          name: '04:00',
          value: 120,
          item: 140
        }, {
          name: '06:00',
          value: 100,
          item: 150
        }, {
          name: '08:00',
          value: 80,
          item: 110
        }, {
          name: '10:00',
          value: 80,
          item: 160
        }, {
          name: '12:00',
          value: 70,
          item: 191
        }, {
          name: '14:00',
          value: 90,
          item: 182
        }, {
          name: '16:00',
          value: 100,
          item: 170
        }, {
          name: '18:00',
          value: 130,
          item: 160
        }, {
          name: '20:00',
          value: 120,
          item: 150
        }, {
          name: '22:00',
          value: 110,
          item: 140
        }];
      }
    },
    barColor: {
      type: Array,
      default: () => {
        return ['#04C8EB', '#80ECFF', '#04C8EB', '#80ECFF'];
      }
    },
    legendOptions: {
      type: Object,
      default: () => {
        return {
          WZ: ['邮件', '营销'],
          align: 'left',
          left: 220,
          top: 20,
          itemGap: 10,
          itemWidth: 20,
          itemHeight: 7,
          textColor: '#f8f8f8',
          textSize: 15
        };
      }
    },
    unit: {
      type: String,
      default: () => {
        return '单位:个';
      }
    },
    barWidth: {
      type: String,
      default: () => {
        return '22';
      }
    },
    width: {
      type: String,
      default: () => {
        return '644px';
      }
    },
    height: {
      type: String,
      default: () => {
        return '266px';
      }
    },
    symbolSize: {
      type: Number,
      default: () => {
        return 5;
      }
    }
  },
  data() {
    return {
      Xdata: [],
      Ydata: [],
      valTwo: [],
      setTime: null,
      chartInst: null
    };
  },
  mounted() {
    // this.getData();
    if (this.rowData && this.rowData.length > 0) {
      this.rowData.forEach(item => {
        this.Xdata.push(item.name);
        this.Ydata.push(item.value);
        this.valTwo.push(item.item);
      });
    }
    this.drawWidth();
    this.tooltipShuffling();
  },
  methods: {
    drawWidth() {
      // 基于准备好的dom，初始化echarts实例
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      this.chartInst.setOption({
        color: '#00BFFF',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          boundaryGap: false,
          type: 'category',
          data: this.Xdata,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            //x轴文字的配置
            textStyle: {
              color: '#f8f8f8',
              fontSize: 14,
              fontFamily: '黑体'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#9FAFB5',
              width: 1.2 //这里是为了突出显示加上的
            }
          }
        }],
        yAxis: [{
          name: `${this.unit}`,
          position: 'left',
          type: 'value',
          nameTextStyle: {
            color: '#f8f8f8',
            fontSize: 16,
            padding: 2,
            fontFamily: '黑体'
          },
          axisLabel: {
            //y轴文字的配置
            textStyle: {
              color: '#f8f8f8',
              fontSize: 14,
              fontFamily: 'Helvetica'
            }
          },
          splitNumber: 5,
          // 设置y轴线条的粗细
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#0A223E'],
              width: 1,
              // 背景横向的边框
              type: 'solid'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#9FAFB5',
              width: 2 //这里是为了突出显示加上的
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(14,29,52,0.2)', 'rgba(191,235,255,0.1)']
            }
          }
        }],
        legend: {
          data: this.legendOptions.WZ,
          orient: 'horizontal',
          // 布局方式，默认为水平布局，可选为：vertical /  horizontal
          icon: 'rect',
          //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
          align: this.legendOptions.align,
          left: this.legendOptions.left,
          //距离canvas左侧距离
          top: this.legendOptions.top,
          //距离canvas上面距离
          // bottom: "20%",
          selectedMode: true,
          //图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。默认开启图例选择，可以设成 false 关闭。
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ff0',
          // 图例边框颜色
          borderWidth: 0,
          // 图例边框线宽，单位px，默认为0（无边框）
          padding: 0,
          // 图例内边距，单位px，默认各方向内边距为5，
          // 接受数组分别设定上右下左边距，同css
          itemGap: this.legendOptions.itemGap,
          // 各个item之间的间隔，单位px，默认为10，
          // 横向布局时为水平间隔，纵向布局时为纵向间隔
          itemWidth: this.legendOptions.itemWidth,
          // 图例图形宽度
          itemHeight: this.legendOptions.itemHeight,
          // 图例图形高度
          textStyle: {
            color: this.legendOptions.textColor,
            // color: "#f8f8f8",
            fontSize: this.legendOptions.textSize
          }
        },
        series: [{
          name: this.legendOptions.WZ[0],
          type: 'line',
          barGap: 0,
          width: this.barWidth,
          symbolSize: this.symbolSize,
          data: this.Ydata,
          color: '#F0AB2E'
        }, {
          name: this.legendOptions.WZ[1],
          type: 'line',
          barGap: 0,
          barWidth: this.barWidth,
          data: this.valTwo,
          symbolSize: this.symbolSize,
          color: '#2872EC'
        }]
      });
      //设置默认选中高亮部分
      this.chartInst.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: 0
      }); //鼠标进
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          //表示series中的第几个data数据循环展示
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.setTime);
  },
  watch: {
    rowData: {
      handler() {
        this.Xdata = [];
        this.Ydata = [];
        this.valTwo = [];
        this.rowData.forEach(item => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
        });
        this.chartInst.dispose();
        this.drawWidth();
        this.tooltipShuffling();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/01-折线图/03-多折线图/DuoZhexianTu.vue?vue&type=script&lang=js
 /* harmony default export */ var _03_DuoZhexianTuvue_type_script_lang_js = (DuoZhexianTuvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/01-折线图/03-多折线图/DuoZhexianTu.vue?vue&type=style&index=0&id=b73743cc&prod&lang=less&scoped=true
var DuoZhexianTuvue_type_style_index_0_id_b73743cc_prod_lang_less_scoped_true = __webpack_require__("ad08");

// CONCATENATED MODULE: ./src/components/Chart Library/01-折线图/03-多折线图/DuoZhexianTu.vue






/* normalize component */

var DuoZhexianTu_component = Object(componentNormalizer["a" /* default */])(
  _03_DuoZhexianTuvue_type_script_lang_js,
  DuoZhexianTuvue_type_template_id_b73743cc_scoped_true_render,
  DuoZhexianTuvue_type_template_id_b73743cc_scoped_true_staticRenderFns,
  false,
  null,
  "b73743cc",
  null
  
)

/* harmony default export */ var DuoZhexianTu = (DuoZhexianTu_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/01-折线图/03-多折线图/LineCharts+xuxian.vue?vue&type=template&id=53757c96&scoped=true
var LineCharts_xuxianvue_type_template_id_53757c96_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "chartBox"
  }, [_c('div', {
    ref: "myChart",
    staticClass: "myChart",
    style: {
      width: _vm.width,
      height: _vm.height
    }
  }), _vm.legIsShow ? _c('ul', {
    staticClass: "legth",
    style: {
      top: _vm.legTop,
      left: _vm.legLeft
    }
  }, _vm._l(_vm.legthWZ, function (item, i) {
    return _c('li', {
      key: i
    }, [_c('h3', {
      style: {
        backgroundColor: _vm.legthColor[i],
        width: _vm.legendwidth,
        height: _vm.legendheight,
        marginTop: _vm.margintop
      }
    }), _c('span', [_vm._v(_vm._s(item))])]);
  }), 0) : _vm._e()]);
};
var LineCharts_xuxianvue_type_template_id_53757c96_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/01-折线图/03-多折线图/LineCharts+xuxian.vue?vue&type=template&id=53757c96&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/01-折线图/03-多折线图/LineCharts+xuxian.vue?vue&type=script&lang=js

/* harmony default export */ var LineCharts_xuxianvue_type_script_lang_js = ({
  name: 'pieGeRenNanDing',
  props: {
    rowData: {
      type: Array,
      default: () => {
        return [{
          name: '00:00',
          value: 90,
          item: 10,
          val: 10
        }, {
          name: '02:00',
          value: 150,
          item: 20,
          val: 10
        }, {
          name: '04:00',
          value: 130,
          item: 120,
          val: 10
        }, {
          name: '04:00',
          value: 130,
          item: 130,
          val: 10
        }, {
          name: '04:00',
          value: 120,
          item: 140,
          val: 10
        }, {
          name: '06:00',
          value: 100,
          item: 150,
          val: 10
        }, {
          name: '08:00',
          value: 80,
          item: 110,
          val: 10
        }, {
          name: '10:00',
          value: 80,
          item: 160,
          val: 10
        }, {
          name: '12:00',
          value: 70,
          item: 191,
          val: 10
        }, {
          name: '14:00',
          value: 90,
          item: 182,
          val: 10
        }, {
          name: '16:00',
          value: 100,
          item: 170,
          val: 10
        }, {
          name: '18:00',
          value: 130,
          item: 160
        }, {
          name: '20:00',
          value: 120,
          item: 150,
          val: 10
        }, {
          name: '22:00',
          value: 110,
          item: 140,
          val: 10
        }];
      }
    },
    barColor: {
      type: Array,
      default: () => {
        return ['#6387a9', '#eee', '#7476c5'];
      }
    },
    legthColor: {
      type: Array,
      default: () => {
        return ['#6387a9', '#eee', '#7476c5'];
      }
    },
    legthWZ: {
      type: Array,
      default: () => {
        return ['总量', '整改量'];
      }
    },
    unit: {
      type: String,
      default: () => {
        return '个';
      }
    },
    width: {
      type: String,
      default: () => {
        return '644px';
      }
    },
    height: {
      type: String,
      default: () => {
        return '266px';
      }
    },
    legTop: {
      type: String,
      default: () => {
        return '10px';
      }
    },
    legLeft: {
      type: String,
      default: () => {
        return '320px';
      }
    },
    legIsShow: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    symbolSizebordius: {
      type: Number,
      default: () => {
        return 5;
      }
    },
    legendwidth: {
      type: String,
      default: () => {
        return '';
      }
    },
    legendheight: {
      type: String,
      default: () => {
        return '';
      }
    },
    margintop: {
      type: String,
      default: () => {
        return '';
      }
    }
  },
  data() {
    return {
      Xdata: [],
      Ydata: [],
      valTwo: [],
      valthree: [],
      valfour: [],
      valfive: [],
      valsix: [],
      valseven: [],
      setTime: null,
      chartInst: null
    };
  },
  mounted() {
    // this.getData();
    if (this.rowData && this.rowData.length > 0) {
      this.rowData.forEach(item => {
        this.Xdata.push(item.name);
        this.Ydata.push(item.value);
        this.valTwo.push(item.item);
        this.valthree.push(item.val);
        // this.valfour.push(item.val1);
        // this.valfive.push(item.val2);
        // this.valsix.push(item.val3);
        // this.valseven.push(item.val4);
      });
    }
    this.drawWidth();
    this.tooltipShuffling();
  },
  methods: {
    drawWidth() {
      // 基于准备好的dom，初始化echarts实例
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      this.chartInst.setOption({
        color: '#00BFFF',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        /*
         * toolbox为工具栏；提供导出图片，数据转化，动态数据等信息
         * 保存图片
         */
        toolbox: {
          // feature: {
          //   dataView: { show: true, readOnly: false },
          //   restore: { show: true },
          //   saveAsImage: { show: true },
          // },
          show: false
        },
        grid: {
          left: '3%',
          right: '0%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          boundaryGap: false,
          type: 'category',
          data: this.Xdata,
          axisTick: {
            alignWithLabel: true
          },
          interval: 0,
          axisLabel: {
            //x轴文字的配置
            textStyle: {
              color: '#f8f8f8',
              fontSize: 16,
              fontFamily: '黑体'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#9FAFB5',
              width: 1.2 //这里是为了突出显示加上的
            }
          }
        }],
        yAxis: [{
          name: `单位:${this.unit}`,
          position: 'left',
          type: 'value',
          nameTextStyle: {
            color: '#f8f8f8',
            fontSize: 16,
            padding: 2,
            fontFamily: '黑体'
          },
          axisLabel: {
            formatter: '{value} w',
            //y轴文字的配置
            textStyle: {
              color: '#f8f8f8',
              fontSize: 16,
              fontFamily: 'Helvetica',
              interval: 0
            }
          },
          splitNumber: 5,
          // 设置y轴线条的粗细
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#0A223E20'],
              width: 1,
              type: 'solid'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(14,29,52,0.2)', 'rgba(191,235,255,0.1)']
            }
          }
        }, {
          position: 'right',
          type: 'value',
          nameTextStyle: {
            show: false,
            color: '#f8f8f8',
            fontSize: 16,
            padding: 2,
            fontFamily: '黑体'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#9FAFB5',
              width: 0 //Y轴的粗细
            }
          },
          axisLabel: {
            formatter: '{value} %',
            //y轴文字的配置
            textStyle: {
              color: '#f8f8f8',
              fontSize: 16,
              fontFamily: 'Helvetica',
              interval: 0
            }
          },
          splitNumber: 5,
          // 设置y轴线条的粗细
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#33333330'],
              width: 1,
              // 那个横着的背景线边框
              type: 'solid'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(14,29,52,0.2)', 'rgba(191,235,255,0.1)']
            }
          }
        }],
        series: [{
          type: 'line',
          symbolSize: this.symbolSizebordius,
          data: this.Ydata,
          color: this.barColor[0]
        }, {
          yAxisIndex: 1,
          type: 'line',
          data: this.valTwo,
          symbolSize: this.symbolSizebordius,
          color: this.barColor[1]
        }, {
          type: 'line',
          data: this.valthree,
          symbolSize: this.symbolSizebordius,
          color: this.barColor[2]
        }, {
          type: 'line',
          data: this.valfour,
          symbolSize: this.symbolSizebordius,
          color: this.barColor[3]
        }, {
          type: 'line',
          data: this.valfive,
          symbolSize: this.symbolSizebordius,
          color: this.barColor[4]
        }, {
          type: 'line',
          data: this.valsix,
          symbolSize: this.symbolSizebordius,
          color: this.barColor[5]
        }, {
          type: 'line',
          data: this.valseven,
          symbolSize: this.symbolSizebordius,
          color: this.barColor[6]
        }]
      });
      //设置默认选中高亮部分
      this.chartInst.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: 0
      }); //鼠标进
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          //表示series中的第几个data数据循环展示
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.setTime);
  },
  watch: {
    rowData: {
      handler() {
        this.Xdata = [];
        this.Ydata = [];
        this.valTwo = [];
        this.valthree = [];
        this.rowData.forEach(item => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
          this.valthree.push(item.val);
          this.valfour.push(item.val1);
          this.valfive.push(item.val2);
          this.valsix.push(item.val3);
          this.valseven.push(item.val3);
        });
        this.chartInst.dispose();
        this.drawWidth();
        this.tooltipShuffling();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/01-折线图/03-多折线图/LineCharts+xuxian.vue?vue&type=script&lang=js
 /* harmony default export */ var _03_LineCharts_xuxianvue_type_script_lang_js = (LineCharts_xuxianvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/01-折线图/03-多折线图/LineCharts+xuxian.vue?vue&type=style&index=0&id=53757c96&prod&lang=less&scoped=true
var LineCharts_xuxianvue_type_style_index_0_id_53757c96_prod_lang_less_scoped_true = __webpack_require__("6f70");

// CONCATENATED MODULE: ./src/components/Chart Library/01-折线图/03-多折线图/LineCharts+xuxian.vue






/* normalize component */

var LineCharts_xuxian_component = Object(componentNormalizer["a" /* default */])(
  _03_LineCharts_xuxianvue_type_script_lang_js,
  LineCharts_xuxianvue_type_template_id_53757c96_scoped_true_render,
  LineCharts_xuxianvue_type_template_id_53757c96_scoped_true_staticRenderFns,
  false,
  null,
  "53757c96",
  null
  
)

/* harmony default export */ var LineCharts_xuxian = (LineCharts_xuxian_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/01-折线图/03-多折线图/LineCharts.vue?vue&type=template&id=4a417a56&scoped=true
var LineChartsvue_type_template_id_4a417a56_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "chartBox"
  }, [_c('div', {
    ref: "myChart",
    staticClass: "myChart",
    style: {
      width: _vm.width,
      height: _vm.height
    }
  }), _vm.legIsShow ? _c('ul', {
    staticClass: "legth",
    style: {
      top: _vm.legTop,
      left: _vm.legLeft
    }
  }, _vm._l(_vm.legthWZ, function (item, i) {
    return _c('li', {
      key: i
    }, [_c('h3', {
      style: {
        backgroundColor: _vm.legthColor[i]
      }
    }), _c('span', [_vm._v(_vm._s(item))])]);
  }), 0) : _vm._e()]);
};
var LineChartsvue_type_template_id_4a417a56_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/01-折线图/03-多折线图/LineCharts.vue?vue&type=template&id=4a417a56&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/01-折线图/03-多折线图/LineCharts.vue?vue&type=script&lang=js

/* harmony default export */ var LineChartsvue_type_script_lang_js = ({
  name: 'pieGeRenNanDing',
  props: {
    rowData: {
      type: Array,
      default: () => {
        return [{
          name: '00:00',
          value: 90,
          item: 10
        }, {
          name: '02:00',
          value: 150,
          item: 20
        }, {
          name: '04:00',
          value: 130,
          item: 120
        }, {
          name: '04:00',
          value: 130,
          item: 130
        }, {
          name: '04:00',
          value: 120,
          item: 140
        }, {
          name: '06:00',
          value: 100,
          item: 150
        }, {
          name: '08:00',
          value: 80,
          item: 110
        }, {
          name: '10:00',
          value: 80,
          item: 160
        }, {
          name: '12:00',
          value: 70,
          item: 191
        }, {
          name: '14:00',
          value: 90,
          item: 182
        }, {
          name: '16:00',
          value: 100,
          item: 170
        }, {
          name: '18:00',
          value: 130,
          item: 160
        }, {
          name: '20:00',
          value: 120,
          item: 150
        }, {
          name: '22:00',
          value: 110,
          item: 140
        }];
      }
    },
    symbolSize: {
      type: [String, Number],
      default: () => {
        return 0;
      }
    },
    lineColor: {
      type: Array,
      default: () => {
        return ['#6387a9', '#6387a9', '#6387a9', '#eee'];
      }
    },
    legthColor: {
      type: Array,
      default: () => {
        return ['#6387a9', '#eee'];
      }
    },
    legthWZ: {
      type: Array,
      default: () => {
        return ['利用率', '使用率'];
      }
    },
    unit: {
      type: String,
      default: () => {
        return '%';
      }
    },
    width: {
      type: String,
      default: () => {
        return '736px';
      }
    },
    height: {
      type: String,
      default: () => {
        return '360px';
      }
    },
    legTop: {
      type: String,
      default: () => {
        return '10px';
      }
    },
    legLeft: {
      type: String,
      default: () => {
        return '200px';
      }
    },
    legIsShow: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  data() {
    return {
      Xdata: [],
      Ydata: [],
      valTwo: [],
      setTime: null,
      chartInst: null
    };
  },
  mounted() {
    // this.getData();
    if (this.rowData && this.rowData.length > 0) {
      this.rowData.forEach(item => {
        this.Xdata.push(item.name);
        this.Ydata.push(item.value);
        this.valTwo.push(item.item);
      });
    }
    this.drawWidth();
    this.tooltipShuffling();
  },
  methods: {
    drawWidth() {
      // 基于准备好的dom，初始化echarts实例
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      this.chartInst.setOption({
        color: '#eee',
        // 面线  的  线条的颜色
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          boundaryGap: false,
          type: 'category',
          data: this.Xdata,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            //x轴文字的配置
            textStyle: {
              color: '#f8f8f8',
              fontSize: 14,
              fontFamily: '黑体'
            }
          }
        }],
        yAxis: [{
          name: `单位:${this.unit}`,
          position: 'left',
          type: 'value',
          nameTextStyle: {
            color: '#f8f8f8',
            fontSize: 16,
            padding: 2,
            fontFamily: '黑体'
          },
          axisLabel: {
            //y轴文字的配置
            textStyle: {
              color: '#f8f8f8',
              fontSize: 14,
              fontFamily: 'Helvetica'
            }
          },
          splitNumber: 5,
          // 设置y轴线条的粗细
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#0A223E10'],
              width: 1,
              type: 'solid'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(14,29,52,0.2)', 'rgba(191,235,255,0.1)']
            }
          }
        }],
        series: [{
          type: 'line',
          symbolSize: this.symbolSize,
          data: this.Ydata,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.lineColor[0]
              }, {
                offset: 1,
                color: this.lineColor[1]
              }]),
              lineStyle: {
                width: 3,
                type: 'solid',
                shadowColor: 'rgba(0,0,0,0)',
                //默认透明
                shadowBlur: 5,
                shadowOffsetX: 3,
                shadowOffsetY: 3
              }
            }
          }
        }, {
          type: 'line',
          data: this.valTwo,
          symbolSize: this.symbolSize,
          areaStyle: {
            normal: {
              lineStyle: {
                width: 25,
                type: 'solid',
                shadowColor: 'rgba(0,0,0,0)',
                //默认透明
                shadowBlur: 5,
                shadowOffsetX: 3,
                shadowOffsetY: 3
              },
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.lineColor[2]
              }, {
                offset: 1,
                color: this.lineColor[3]
              }])
            }
          }
        }]
      });
      //设置默认选中高亮部分
      this.chartInst.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: 0
      }); //鼠标进
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          //表示series中的第几个data数据循环展示
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.setTime);
  },
  watch: {
    rowData: {
      handler() {
        this.Xdata = [];
        this.Ydata = [];
        this.valTwo = [];
        this.rowData.forEach(item => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
        });
        this.chartInst.dispose();
        this.drawWidth();
        this.tooltipShuffling();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/01-折线图/03-多折线图/LineCharts.vue?vue&type=script&lang=js
 /* harmony default export */ var _03_LineChartsvue_type_script_lang_js = (LineChartsvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/01-折线图/03-多折线图/LineCharts.vue?vue&type=style&index=0&id=4a417a56&prod&lang=less&scoped=true
var LineChartsvue_type_style_index_0_id_4a417a56_prod_lang_less_scoped_true = __webpack_require__("509e");

// CONCATENATED MODULE: ./src/components/Chart Library/01-折线图/03-多折线图/LineCharts.vue






/* normalize component */

var LineCharts_component = Object(componentNormalizer["a" /* default */])(
  _03_LineChartsvue_type_script_lang_js,
  LineChartsvue_type_template_id_4a417a56_scoped_true_render,
  LineChartsvue_type_template_id_4a417a56_scoped_true_staticRenderFns,
  false,
  null,
  "4a417a56",
  null
  
)

/* harmony default export */ var LineCharts = (LineCharts_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ChartLibraryView/Zhexian.vue?vue&type=script&lang=js





// import ChartLineAreaTxt from '../../assets/copyText/ChartLineArea.txt';
/* harmony default export */ var Zhexianvue_type_script_lang_js = ({
  name: 'App',
  components: {
    ChartLineArea: ChartLineArea,
    DuoZhexianTu: DuoZhexianTu,
    LineCharts: LineCharts,
    LineChartsXuxian: LineCharts_xuxian
  },
  data() {
    return {};
  },
  mounted() {
    // this.getLDFSSS();
  },
  methods: {
    onSubmit() {
      console.log('submit!', this.form);
    },
    // getLDFSSS() {},
    copyImportedFileContent(val) {
      axios_default.a.get(`./data/折线图/文本/${val}.txt`).then(res => {
        // 获取要复制的内容
        var textArea = document.createElement('textarea');
        textArea.value = res.data;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        // 提示复制成功
        alert('内容已复制到剪贴板');
      }).catch(err => {
        console.error('加载文件失败：', err);
      });
    }
  }
});
// CONCATENATED MODULE: ./src/views/ChartLibraryView/Zhexian.vue?vue&type=script&lang=js
 /* harmony default export */ var ChartLibraryView_Zhexianvue_type_script_lang_js = (Zhexianvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/ChartLibraryView/Zhexian.vue?vue&type=style&index=0&id=c9f38d9e&prod&lang=less&scoped=true
var Zhexianvue_type_style_index_0_id_c9f38d9e_prod_lang_less_scoped_true = __webpack_require__("7721");

// CONCATENATED MODULE: ./src/views/ChartLibraryView/Zhexian.vue






/* normalize component */

var Zhexian_component = Object(componentNormalizer["a" /* default */])(
  ChartLibraryView_Zhexianvue_type_script_lang_js,
  Zhexianvue_type_template_id_c9f38d9e_scoped_true_render,
  Zhexianvue_type_template_id_c9f38d9e_scoped_true_staticRenderFns,
  false,
  null,
  "c9f38d9e",
  null
  
)

/* harmony default export */ var Zhexian = (Zhexian_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ChartLibraryView/Zhutu.vue?vue&type=template&id=1bbd5968&scoped=true
var Zhutuvue_type_template_id_1bbd5968_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "zt"
  }, [_c('div', {
    staticClass: "picBox"
  }, [_c('div', [_c('DuoZhuTu2', {
    attrs: {
      "width": '97%',
      "height": '270px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('DuoZhuTu2');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('PictorialSingleBar', {
    attrs: {
      "width": '750px',
      "height": '270px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('PictorialSingleBar');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('DuoZhuTu', {
    attrs: {
      "width": '97%',
      "height": '270px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('DuoZhuTu');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('StackDuoZhuTu', {
    attrs: {
      "width": '97%',
      "height": '270px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('StackDuoZhuTu');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('CylindricalPlot', {
    attrs: {
      "width": '97%',
      "height": '270px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('CylindricalPlot');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('BarChart3D', {
    attrs: {
      "width": '97%',
      "height": '270px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('BarChart3D');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('HengTwoBarCharts', {
    attrs: {
      "width": '97%',
      "height": '270px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('HengTwoBarCharts');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('CycloneChart', {
    attrs: {
      "width": '97%',
      "height": '270px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('CycloneChart');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('BubbleBar', {
    attrs: {
      "width": '97%',
      "height": '270px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('BubbleBar');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('DuitieZhutu', {
    attrs: {
      "Width": '97%',
      "Height": '270px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('DuitieZhutu');
      }
    }
  }, [_vm._v("复制代码")])], 1)])]);
};
var Zhutuvue_type_template_id_1bbd5968_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/ChartLibraryView/Zhutu.vue?vue&type=template&id=1bbd5968&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/02-多柱图/StackDuoZhuTu.vue?vue&type=template&id=92a12184&scoped=true
var StackDuoZhuTuvue_type_template_id_92a12184_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "chartBox"
  }, [_c('div', {
    ref: "myChart",
    staticClass: "myChart",
    style: {
      width: _vm.width,
      height: _vm.height
    }
  }), _vm.legIsShow && _vm.rowData.length ? _c('ul', {
    staticClass: "legth",
    style: {
      top: _vm.legTop,
      left: _vm.legLeft
    }
  }, _vm._l(_vm.legthWZ, function (item, i) {
    return _c('li', {
      key: i
    }, [_c('h3', {
      style: {
        backgroundColor: _vm.legthColor[i]
      }
    }), _c('span', [_vm._v(_vm._s(item))])]);
  }), 0) : _vm._e()]);
};
var StackDuoZhuTuvue_type_template_id_92a12184_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/02-多柱图/StackDuoZhuTu.vue?vue&type=template&id=92a12184&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/02-多柱图/StackDuoZhuTu.vue?vue&type=script&lang=js

/* harmony default export */ var StackDuoZhuTuvue_type_script_lang_js = ({
  name: 'pieGeRenNanDing',
  props: {
    rowData: {
      type: Array,
      default: () => {
        return [{
          name: '0601',
          value: '10',
          item: '30',
          val: '20'
        }, {
          name: '0602',
          value: '20',
          item: '30',
          val: '40'
        }, {
          name: '0603',
          value: '50',
          item: '30',
          val: '10'
        }, {
          name: '0604',
          value: '20',
          item: '30',
          val: '40'
        }, {
          name: '0605',
          value: '30',
          item: '45',
          val: '32'
        }, {
          name: '0606',
          value: '45',
          item: '32',
          val: '10'
        }, {
          name: '0607',
          value: '12',
          item: '45',
          val: '21'
        }, {
          name: '0608',
          value: '23',
          item: '23',
          val: '45'
        }];
      }
    },
    h3Style: {
      type: Object,
      default: () => {
        return {};
      }
    },
    barColor: {
      type: Array,
      default: () => {
        return ['rgba(99, 135, 169,1)', 'rgba(99, 135, 169,.9)', 'rgba(235,235,235,1)', 'rgba(235,235,235,0)', '#252d35', '#ff0'];
      }
    },
    legthColor: {
      type: Array,
      default: () => {
        return ['#6387a9', '#eee'];
      }
    },
    legthWZ: {
      type: Array,
      default: () => {
        return ['正常', '违章', '总数'];
      }
    },
    unit: {
      type: String,
      default: () => {
        return '单位:个';
      }
    },
    barWidth: {
      type: String,
      default: () => {
        return '15';
      }
    },
    width: {
      type: String,
      default: () => {
        return '412px';
      }
    },
    height: {
      type: String,
      default: () => {
        return '188px';
      }
    },
    legTop: {
      type: String,
      default: () => {
        return '10px';
      }
    },
    legLeft: {
      type: String,
      default: () => {
        return '200px';
      }
    },
    legIsShow: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    labelShow: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    showUnit: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  data() {
    return {
      Xdata: [],
      Ydata: [],
      valTwo: [],
      valThree: [],
      valFour: [],
      setTime: null,
      chartInst: null
    };
  },
  mounted() {
    // this.getData();
    if (this.rowData && this.rowData.length > 0) {
      this.rowData.forEach(item => {
        this.Xdata.push(item.name);
        this.Ydata.push(item.value);
        this.valTwo.push(item.item);
        this.valThree.push(item.val);
        this.valFour.push(item.four);
      });
    } else {
      this.noDataShow();
      return;
    }
    this.drawWidth();
    this.tooltipShuffling();
  },
  methods: {
    drawWidth() {
      // 基于准备好的dom，初始化echarts实例
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      this.chartInst.setOption({
        color: '#00BFFF',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          icon: 'rect',
          data: this.legthWZ,
          right: '5%',
          selectedMode: true,
          borderWidth: 0,
          padding: 0,
          itemGap: 18,
          itemWidth: 17,
          itemHeight: 7,
          top: 30,
          textStyle: {
            color: '#E5FFFF',
            fontFamily: '微软雅黑',
            fontSize: 14
          }
        },
        xAxis: [{
          type: 'category',
          data: this.Xdata,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            //x轴文字的配置
            textStyle: {
              color: '#f8f8f8',
              fontSize: 16,
              fontFamily: '黑体'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#9FAFB5',
              width: 1.2 //这里是为了突出显示加上的
            }
          }
        }],
        yAxis: [{
          name: `${this.unit}`,
          position: 'left',
          type: 'value',
          nameTextStyle: {
            show: this.showUnit,
            color: '#f8f8f8',
            fontSize: 16,
            padding: 2,
            fontFamily: '黑体'
          },
          axisLabel: {
            //y轴文字的配置
            textStyle: {
              color: '#f8f8f8',
              fontSize: 16,
              fontFamily: 'Helvetica'
            }
          },
          splitNumber: 5,
          // 设置y轴线条的粗细
          splitLine: {
            show: true,
            lineStyle: {
              color: [' rgba(255,255,255,0.08)'],
              width: 1,
              type: 'solid'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#9FAFB5',
              width: 2 //这里是为了突出显示加上的
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: [' rgba(255,255,255,0.08)', 'rgba(0,0,0,0)']
            }
          }
        }],
        series: [{
          stack: true,
          name: this.legthWZ[0],
          type: 'bar',
          barWidth: this.barWidth,
          data: this.Ydata,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.barColor[0]
              }, {
                offset: 1,
                color: this.barColor[1]
              }]),
              barBorderRadius: 0
            }
          },
          label: {
            show: this.labelShow,
            formatter: '{c} ',
            color: '#00FFFF',
            offset: [0, 1],
            position: 'top',
            fontFamily: '微软雅黑',
            fontSize: 18
          }
        }, {
          stack: true,
          name: this.legthWZ[1],
          type: 'bar',
          barWidth: this.barWidth,
          data: this.valTwo,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.barColor[2]
              }, {
                offset: 1,
                color: this.barColor[3]
              }]),
              barBorderRadius: 0
            }
          },
          label: {
            position: 'top',
            show: this.labelShow,
            formatter: '{c} ',
            color: '#00FFFF',
            offset: [0, 1],
            fontFamily: '微软雅黑',
            fontSize: 18
          }
        }, {
          name: this.legthWZ[2],
          type: 'line',
          barWidth: this.barWidth,
          data: this.valThree,
          color: this.barColor[4]
          // itemStyle: {
          //   normal: {
          //     color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //       {
          //         offset: 0,
          //         color: this.barColor[4]
          //       },
          //       {
          //         offset: 1,
          //         color: this.barColor[5]
          //       }
          //     ]),
          //     barBorderRadius: 0
          //   }
          // },
        }, {
          name: this.legthWZ[3],
          type: 'bar',
          barWidth: this.barWidth,
          data: this.valFour,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.barColor[6]
              }, {
                offset: 1,
                color: this.barColor[7]
              }]),
              barBorderRadius: 0
            }
          },
          label: {
            position: 'top',
            show: this.labelShow,
            formatter: '{c} ',
            color: '#00FFFF',
            offset: [0, 1],
            fontFamily: '微软雅黑',
            fontSize: 18
          }
        }]
      });
      //设置默认选中高亮部分
      this.chartInst.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: 0
      }); //鼠标进
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          //表示series中的第几个data数据循环展示
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 2000);
    },
    noDataShow() {
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      this.chartInst.setOption({
        backgroundColor: 'rgba(255,255,255,.03)',
        title: {
          text: `暂无数据`,
          show: true,
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 32
          },
          top: 'center',
          left: 'center'
        }
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    this.setTime = null;
    this.chartInst.dispose();
  },
  watch: {
    rowData: {
      handler(val) {
        if (!val.length) {
          this.noDataShow();
          return;
        }
        this.Xdata = [];
        this.Ydata = [];
        this.valTwo = [];
        this.valThree = [];
        this.valFour = [];
        this.rowData.forEach(item => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
          this.valThree.push(item.val);
          this.valFour.push(item.four);
        });
        this.tooltipShuffling();
        this.drawWidth();
      },
      deep: true
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/02-多柱图/StackDuoZhuTu.vue?vue&type=script&lang=js
 /* harmony default export */ var _02_StackDuoZhuTuvue_type_script_lang_js = (StackDuoZhuTuvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/02-柱图/02-多柱图/StackDuoZhuTu.vue?vue&type=style&index=0&id=92a12184&prod&lang=less&scoped=true
var StackDuoZhuTuvue_type_style_index_0_id_92a12184_prod_lang_less_scoped_true = __webpack_require__("51a7");

// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/02-多柱图/StackDuoZhuTu.vue






/* normalize component */

var StackDuoZhuTu_component = Object(componentNormalizer["a" /* default */])(
  _02_StackDuoZhuTuvue_type_script_lang_js,
  StackDuoZhuTuvue_type_template_id_92a12184_scoped_true_render,
  StackDuoZhuTuvue_type_template_id_92a12184_scoped_true_staticRenderFns,
  false,
  null,
  "92a12184",
  null
  
)

/* harmony default export */ var StackDuoZhuTu = (StackDuoZhuTu_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/02-多柱图/DuoZhuTu2.vue?vue&type=template&id=fc885ce8&scoped=true
var DuoZhuTu2vue_type_template_id_fc885ce8_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    ref: "chart",
    staticClass: "bar-chart",
    style: {
      width: _vm.width,
      height: _vm.height
    },
    on: {
      "mousemove": _vm.mousemove,
      "mouseleave": _vm.mouseleave
    }
  });
};
var DuoZhuTu2vue_type_template_id_fc885ce8_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/02-多柱图/DuoZhuTu2.vue?vue&type=template&id=fc885ce8&scoped=true

// EXTERNAL MODULE: ./node_modules/echarts/index.js + 542 modules
var echarts = __webpack_require__("313e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/02-多柱图/DuoZhuTu2.vue?vue&type=script&lang=js


/* harmony default export */ var DuoZhuTu2vue_type_script_lang_js = ({
  props: {
    width: {
      type: String,
      default: () => {
        return '736px';
      }
    },
    height: {
      type: String,
      default: () => {
        return '360px';
      }
    },
    xtype: {
      type: String,
      default: 'category'
    },
    ytype: {
      type: String,
      default: 'value'
    },
    maxData: {
      type: Number,
      default: 300
    },
    coloreBarChart: {
      type: Array,
      default: () => {
        return ['#6c94b9', '#252d35'];
      }
    },
    rowData: {
      type: Array,
      default: () => {
        return [{
          name: '0601',
          value: '10'
        }, {
          name: '0602',
          value: '20'
        }, {
          name: '0603',
          value: '50'
        }, {
          name: '0604',
          value: '20'
        }, {
          name: '0605',
          value: '30'
        }, {
          name: '0606',
          value: '45'
        }, {
          name: '0607',
          value: '12'
        }, {
          name: '0608',
          value: '23'
        }];
      }
    },
    chartStylr: {
      type: Object,
      default: () => {
        return {
          unit: '单位：人',
          barWidth: 20
        };
      }
    },
    gridData: {
      type: Object,
      default: () => {
        return {
          top: '20%',
          bottom: '13%',
          left: '5%',
          right: '5%'
        };
      }
    }
  },
  data() {
    return {
      chartInst: null,
      option: {},
      setTime: null
    };
  },
  methods: {
    instantiation() {
      this.chartInst = echarts["init"](this.$refs.chart);
      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765'
            }
          }
        },
        grid: this.gridData,
        xAxis: {
          type: this.xtype,
          data: [],
          axisLine: {
            lineStyle: {
              color: '#f8f8f8'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 14,
            interval: 0
          }
        },
        yAxis: {
          type: this.ytype,
          name: this.chartStylr.unit,
          // max: this.maxData,
          nameTextStyle: {
            fontSize: 14,
            padding: [0, 0, 0, 35] // 四个数字分别为上右下左与原位置距离
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#f8f8f8'
            }
          },
          axisLabel: {
            fontSize: 14,
            interval: 0
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255,255,255,0.1)', 'rgba(238,238,238,0)']
            }
          }
        },
        series: [{
          data: [],
          avoidLabelOverlap: false,
          type: 'bar',
          barWidth: this.chartStylr.barWidth,
          itemStyle: {
            color: new echarts["graphic"].LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: this.coloreBarChart[0]
            }, {
              offset: 1,
              color: this.coloreBarChart[1]
            }]),
            //这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
            barBorderRadius: 10
          }
        }]
      };
    },
    rowDataChart() {
      let name = [];
      let value = [];
      this.rowData.forEach(val => {
        name.push(val['name']);
        value.push(val['value']);
      });
      this.option.xAxis.data = name;
      this.option.series[0].data = value;
      this.chartInst.setOption(this.option, true);
    },
    tooltipShuffling() {
      //
      clearInterval(this.setTime);
      let count = 0;
      this.setTime = setInterval(() => {
        if (count == this.rowData.length) {
          count = 0;
        }
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: count
        });
        count++;
      }, 3000);
    },
    noDataShow() {
      this.chartInst = echarts["init"](this.$refs.chart);
      this.chartInst.setOption({
        backgroundColor: 'rgba(255,255,255,.03)',
        title: {
          text: `暂无数据`,
          show: true,
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 32
          },
          top: 'center',
          left: 'center'
        }
      });
    },
    mousemove() {
      clearInterval(this.setTime);
    },
    mouseleave() {
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.rowData.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          //表示series中的第几个data数据循环展示
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 2000);
    }
  },
  mounted() {
    if (!this.rowData.length) {
      this.noDataShow();
      return;
    }
    this.instantiation();
    this.rowDataChart();
    this.tooltipShuffling();
    this.mousemove();
    this.mouseleave();
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    echarts["init"](this.$refs.chart).dispose();
  },
  watch: {
    rowData: {
      handler(newV) {
        if (!newV.length) {
          this.noDataShow();
          return;
        }
        this.instantiation();
        this.rowDataChart();
        this.tooltipShuffling();
      },
      deep: true
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/02-多柱图/DuoZhuTu2.vue?vue&type=script&lang=js
 /* harmony default export */ var _02_DuoZhuTu2vue_type_script_lang_js = (DuoZhuTu2vue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/02-多柱图/DuoZhuTu2.vue





/* normalize component */

var DuoZhuTu2_component = Object(componentNormalizer["a" /* default */])(
  _02_DuoZhuTu2vue_type_script_lang_js,
  DuoZhuTu2vue_type_template_id_fc885ce8_scoped_true_render,
  DuoZhuTu2vue_type_template_id_fc885ce8_scoped_true_staticRenderFns,
  false,
  null,
  "fc885ce8",
  null
  
)

/* harmony default export */ var DuoZhuTu2 = (DuoZhuTu2_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/02-多柱图/DuoZhuTu.vue?vue&type=template&id=5138602b&scoped=true
var DuoZhuTuvue_type_template_id_5138602b_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "chartBox"
  }, [_c('div', {
    ref: "myChart",
    staticClass: "myChart",
    style: {
      width: _vm.width,
      height: _vm.height
    },
    on: {
      "mousemove": _vm.mousemove,
      "mouseleave": _vm.mouseleave
    }
  }), _vm.legIsShow ? _c('ul', {
    staticClass: "legth",
    style: {
      top: _vm.legTop,
      left: _vm.legLeft
    }
  }, _vm._l(_vm.legthWZ, function (item, i) {
    return _c('li', {
      key: i
    }, [_c('h3', {
      style: {
        backgroundColor: _vm.legthColor[i],
        width: _vm.stylebrick.width,
        height: _vm.stylebrick.height,
        marginTop: _vm.stylebrick.marginTop
      }
    }), _c('span', [_vm._v(_vm._s(item))])]);
  }), 0) : _vm._e()]);
};
var DuoZhuTuvue_type_template_id_5138602b_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/02-多柱图/DuoZhuTu.vue?vue&type=template&id=5138602b&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/02-多柱图/DuoZhuTu.vue?vue&type=script&lang=js

/* harmony default export */ var DuoZhuTuvue_type_script_lang_js = ({
  name: 'pieGeRenNanDing',
  props: {
    stylebrick: {
      type: Object,
      default: () => {
        return {
          width: '4px',
          height: '15px',
          marginTop: '5px'
        };
      }
    },
    rowData: {
      type: Array,
      default: () => {
        return [{
          name: '20210601',
          value: '10',
          item: '30',
          val: '20'
        }, {
          name: '20210602',
          value: '20',
          item: '30',
          val: '40'
        }, {
          name: '20210603',
          value: '50',
          item: '30',
          val: '10'
        }, {
          name: '20210604',
          value: '20',
          item: '30',
          val: '40'
        }, {
          name: '20210605',
          value: '30',
          item: '45',
          val: '32'
        }, {
          name: '20210606',
          value: '45',
          item: '32',
          val: '10'
        }, {
          name: '20210607',
          value: '12',
          item: '45',
          val: '21'
        }, {
          name: '20210608',
          value: '23',
          item: '23',
          val: '45'
        }];
      }
    },
    barColor: {
      type: Array,
      default: () => {
        return ['#ababa9', '#252d35', '#6387a9', '#6387a9'];
      }
    },
    legthColor: {
      type: Array,
      default: () => {
        return ['#252d35', '#6387a9'];
      }
    },
    legthWZ: {
      type: Array,
      default: () => {
        return ['使用率', '利用率'];
      }
    },
    unit: {
      type: String,
      default: () => {
        return '%';
      }
    },
    barWidth: {
      type: String,
      default: () => {
        return '15';
      }
    },
    width: {
      type: String,
      default: () => {
        return '736px';
      }
    },
    height: {
      type: String,
      default: () => {
        return '360px';
      }
    },
    legTop: {
      type: String,
      default: () => {
        return '10px';
      }
    },
    legLeft: {
      type: String,
      default: () => {
        return '330px';
      }
    },
    legIsShow: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    fontStyle: {
      type: Object,
      default: () => {
        return {
          Xfont: {
            color: '#f8f8f8',
            fontSize: 14,
            fontFamily: '黑体'
          },
          Yfont: {
            color: '#f8f8f8',
            fontSize: 14,
            fontFamily: 'Helvetica'
          },
          nameTextStyle: {
            color: '#f8f8f8',
            fontSize: 16,
            padding: 2,
            fontFamily: '黑体'
          }
        };
      }
    },
    rotate: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      Xdata: [],
      Ydata: [],
      valTwo: [30, 40, 50, 60],
      valThree: [],
      setTime: null,
      chartInst: null
    };
  },
  mounted() {
    // this.getData();
    if (this.rowData && this.rowData.length > 0) {
      this.rowData.forEach(item => {
        this.Xdata.push(item.name);
        this.Ydata.push(item.value);
        this.valTwo.push(item.item);
        this.valThree.push(item.val);
      });
    }
    this.drawWidth();
    this.tooltipShuffling();
    this.mousemove();
    this.mouseleave();
  },
  methods: {
    drawWidth() {
      // 基于准备好的dom，初始化echarts实例
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      this.chartInst.setOption({
        color: '#00BFFF',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.Xdata,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            //x轴文字的配置
            textStyle: this.fontStyle.Xfont,
            rotate: this.rotate
          },
          axisLine: {
            lineStyle: {
              color: '#9FAFB5',
              width: 1 //这里是为了突出显示加上的
            }
          }
        }],
        yAxis: [{
          name: `单位:${this.unit}`,
          position: 'left',
          type: 'value',
          nameTextStyle: this.fontStyle.nameTextStyle,
          axisLabel: {
            //y轴文字的配置
            textStyle: this.fontStyle.Yfont
          },
          splitNumber: 5,
          // 设置y轴线条的粗细
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#0A223E50'],
              width: 1,
              type: 'solid'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#9FAFB5',
              width: 2 //这里是为了突出显示加上的
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.1)']
            }
          }
        }],
        series: [{
          // name: "直接访问",
          type: 'bar',
          barWidth: this.barWidth,
          data: this.Ydata,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.barColor[0]
              }, {
                offset: 1,
                color: this.barColor[1]
              }])
            }
          }
        }, {
          // name: "直接访问",
          type: 'bar',
          barWidth: this.barWidth,
          data: this.valTwo,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.barColor[2]
              }, {
                offset: 1,
                color: this.barColor[3]
              }])
            }
          }
        }]
      });
      //设置默认选中高亮部分
      this.chartInst.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: 0
      }); //鼠标进
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          //表示series中的第几个data数据循环展示
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 2000);
    },
    mousemove() {
      clearInterval(this.setTime);
    },
    mouseleave() {
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          //表示series中的第几个data数据循环展示
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 2000);
    }
  },
  beforeDestroy() {
    clearInterval(this.setTime);
  },
  watch: {
    rowData: {
      handler() {
        this.Xdata = [];
        this.Ydata = [];
        this.valTwo = [];
        this.valThree = [];
        this.rowData.forEach(item => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
          this.valThree.push(item.val);
        });
        this.tooltipShuffling();
        this.drawWidth();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/02-多柱图/DuoZhuTu.vue?vue&type=script&lang=js
 /* harmony default export */ var _02_DuoZhuTuvue_type_script_lang_js = (DuoZhuTuvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/02-柱图/02-多柱图/DuoZhuTu.vue?vue&type=style&index=0&id=5138602b&prod&lang=less&scoped=true
var DuoZhuTuvue_type_style_index_0_id_5138602b_prod_lang_less_scoped_true = __webpack_require__("1f92");

// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/02-多柱图/DuoZhuTu.vue






/* normalize component */

var DuoZhuTu_component = Object(componentNormalizer["a" /* default */])(
  _02_DuoZhuTuvue_type_script_lang_js,
  DuoZhuTuvue_type_template_id_5138602b_scoped_true_render,
  DuoZhuTuvue_type_template_id_5138602b_scoped_true_staticRenderFns,
  false,
  null,
  "5138602b",
  null
  
)

/* harmony default export */ var DuoZhuTu = (DuoZhuTu_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/01-单柱图/PictorialSingleBar.vue?vue&type=template&id=23b1937c&scoped=true
var PictorialSingleBarvue_type_template_id_23b1937c_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    ref: "chart",
    style: {
      width: _vm.width,
      height: _vm.height
    }
  });
};
var PictorialSingleBarvue_type_template_id_23b1937c_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/01-单柱图/PictorialSingleBar.vue?vue&type=template&id=23b1937c&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/01-单柱图/PictorialSingleBar.vue?vue&type=script&lang=js


let baseStyle = {
  //柱子颜色
  barLiner: '#252d35',
  //柱子宽度
  barWidth: '100%',
  //x单位，不显示置空即可
  xName: '',
  //y单位，不显示置空即可
  yName: '单位：分',
  //x轴Tick颜色 '#f8f8f8',置空不展示
  xTick: '',
  //x轴轴线颜色 '#f8f8f8',置空不展示
  xLine: '#f8f8f8',
  //x轴分割线颜色 '#f8f8f8',置空不展示
  xSplit: '',
  //x轴分割区域颜色 ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.1)'],置空不展示
  xSplitArea: '',
  //y轴Tick颜色 '#f8f8f8',置空不展示 间隔线
  yTick: '#f8f8f8',
  //y轴轴线颜色 '#f8f8f8',置空不展示 ↓
  yLine: '#f8f8f8',
  //y轴分割线颜色 '#f8f8f8',置空不展示
  ySplit: '',
  //y轴分割区域颜色 ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.1)'],置空不展示
  ySplitArea: ['#FFFFFF08', '#FFFFFF00'],
  //y轴分割份数
  splitNumber: 6,
  //x轴label间隔,设置为1,间隔1个展示
  xLabelInterval: 0
};
/* harmony default export */ var PictorialSingleBarvue_type_script_lang_js = ({
  name: 'PictorialSingleBar',
  props: {
    width: {
      type: String,
      default: () => {
        return '736px';
      }
    },
    height: {
      type: String,
      default: () => {
        return '360px';
      }
    },
    labelStyle: {
      type: Object,
      default: () => {
        return {
          color: '#f8f8f8',
          fontStyle: 'normal',
          fontSize: 16
        };
      }
    },
    chartGrid: {
      type: Object,
      default: () => {
        return {
          right: '8%',
          top: '18%',
          left: '5%',
          bottom: '5%',
          containLabel: true
        };
      }
    },
    chartStyle: {
      type: Object,
      default: () => {
        return baseStyle;
      }
    },
    chartData: {
      type: Array,
      default: () => {
        return [{
          name: '0601',
          value: '10'
        }, {
          name: '0602',
          value: '20'
        }, {
          name: '0603',
          value: '50'
        }, {
          name: '0604',
          value: '20'
        }, {
          name: '0605',
          value: '30'
        }];
      }
    },
    chartToolTip: {
      type: Object,
      default: () => {
        return {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765'
            }
          }
        };
      }
    }
  },
  data() {
    return {
      instance: null,
      option: {},
      refreshTimer: null
    };
  },
  methods: {
    getAxisStyle(axis, tick, line, split, splitArea) {
      axis.axisTick = {
        //坐标轴刻度相关设置。
        show: tick,
        //坐标轴轴线相关设置
        lineStyle: {
          color: tick
        }
      };
      axis.axisLine = {
        show: line,
        //坐标轴轴线相关设置
        lineStyle: {
          color: line
        }
      };
      axis.splitLine = {
        //坐标轴在 grid 区域中的分隔线。
        show: split,
        lineStyle: {
          color: split
        }
      };
      axis.splitArea = {
        show: splitArea,
        areaStyle: {
          color: splitArea
        }
      };
      axis.axisPointer = {
        type: 'none',
        //line(直线指示器),none,shadow(阴影)
        label: {
          show: false
        }
      };
      axis.nameTextStyle = this.labelStyle;
      axis.axisLabel = Object.assign({}, axis.axisLabel, {
        textStyle: this.labelStyle
      });
    },
    init() {
      this.instance = echarts["init"](this.$refs.chart);
      for (const key in this.chartStyle) {
        baseStyle[key] = this.chartStyle[key];
      }
      let cOption = baseStyle;
      this.option = {
        tooltip: this.chartToolTip,
        xAxis: {
          name: cOption.xName,
          type: 'category',
          boundaryGap: true,
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: cOption.xLabelInterval //设置为 1，表示『隔一个标签显示一个标签』
          }
        },
        yAxis: {
          name: cOption.yName,
          type: 'value',
          splitNumber: cOption.splitNumber
        },
        grid: this.chartGrid,
        series: [{
          type: 'pictorialBar',
          barWidth: cOption.barWidth,
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: cOption.barLiner // 0% 处的颜色
                }, {
                  offset: 1,
                  color: cOption.barLiner + '33' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              } //渐变颜色
            }
          },
          symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z'
        }]
      };
      this.getAxisStyle(this.option.xAxis, cOption.xTick, cOption.xLine, cOption.xSplit, cOption.xSplitArea);
      this.getAxisStyle(this.option.yAxis, cOption.yTick, cOption.yLine, cOption.ySplit, cOption.ySplitArea);
      this.instance.setOption(this.option, true);
    },
    loadData() {
      let name = [];
      let value = [];
      this.chartData.forEach(val => {
        name.push(val['name']);
        value.push(val['value']);
      });
      this.option.xAxis.data = name;
      this.option.series[0].data = value;
      this.instance.setOption(this.option, true);
    },
    refreshToolTip() {
      clearInterval(this.refreshTimer);
      let index = 0;
      this.refreshTimer = setInterval(() => {
        if (index >= this.chartData.length) {
          index = 0;
        }
        this.instance.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index++
        });
      }, 2000);
    }
  },
  mounted() {
    this.init();
    this.loadData();
    this.refreshToolTip();
  },
  beforeDestroy() {
    clearInterval(this.refreshTimer);
    echarts["init"](this.$refs.chart).dispose();
  },
  watch: {
    chartData: {
      handler() {
        this.init();
        this.loadData();
        this.refreshToolTip();
      },
      deep: true
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/01-单柱图/PictorialSingleBar.vue?vue&type=script&lang=js
 /* harmony default export */ var _01_PictorialSingleBarvue_type_script_lang_js = (PictorialSingleBarvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/01-单柱图/PictorialSingleBar.vue





/* normalize component */

var PictorialSingleBar_component = Object(componentNormalizer["a" /* default */])(
  _01_PictorialSingleBarvue_type_script_lang_js,
  PictorialSingleBarvue_type_template_id_23b1937c_scoped_true_render,
  PictorialSingleBarvue_type_template_id_23b1937c_scoped_true_staticRenderFns,
  false,
  null,
  "23b1937c",
  null
  
)

/* harmony default export */ var PictorialSingleBar = (PictorialSingleBar_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/01-单柱图/CylindricalPlot.vue?vue&type=template&id=4e19cc23&scoped=true
var CylindricalPlotvue_type_template_id_4e19cc23_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "chartBox"
  }, [_c('div', {
    ref: "myChart",
    staticClass: "myChart",
    style: {
      width: _vm.width,
      height: _vm.height
    },
    on: {
      "mousemove": _vm.mousemove,
      "mouseleave": _vm.mouseleave
    }
  })]);
};
var CylindricalPlotvue_type_template_id_4e19cc23_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/01-单柱图/CylindricalPlot.vue?vue&type=template&id=4e19cc23&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/01-单柱图/CylindricalPlot.vue?vue&type=script&lang=js

/* harmony default export */ var CylindricalPlotvue_type_script_lang_js = ({
  name: 'pieGeRenNanDing',
  props: {
    rowData: {
      type: Array,
      default: () => {
        return ['91', '51', '119', '225', '125'];
      }
    },
    rowData2: {
      type: Array,
      default: () => {
        return ['400', '400', '400', '400', '400'];
      }
    },
    XData: {
      type: Array,
      default: () => {
        return ['A类', 'B类', 'C类', 'D类', 'E类'];
      }
    },
    //
    barColor: {
      type: Array,
      default: () => ['#666', '#eee', '#3e464f', '#3e464f', 'rgba(235, 235, 235,0.1)', 'rgb(235, 235, 235)', 'rgba(235, 235, 235,0)', 'rgb(235, 235, 235)', 'rgb(235, 235, 235,0.8)', 'rgb(235, 235, 235,0)', 'rgb(235, 235, 235,0.8)']
    },
    unit: {
      type: String,
      default: () => {
        return '件';
      }
    },
    barWidth: {
      type: String,
      default: () => {
        return '22';
      }
    },
    width: {
      type: String,
      default: () => {
        return '736px';
      }
    },
    height: {
      type: String,
      default: () => {
        return '360px';
      }
    },
    fontStyle: {
      type: Object,
      default: () => {
        return {
          Xfont: {
            color: '#f8f8f8',
            fontSize: 16,
            fontFamily: '黑体'
          },
          Yfont: {
            color: '#f8f8f8',
            fontSize: 16,
            fontFamily: 'Helvetica'
          },
          nameTextStyle: {
            color: '#f8f8f8',
            fontSize: 16,
            fontFamily: '黑体',
            padding: 2
          }
        };
      }
    },
    rotate: {
      type: Number,
      default() {
        return 0;
      }
    },
    provideNumber: {
      type: Number,
      default: 2
    },
    //一行显示几个字
    interval: {
      type: Number,
      default() {
        return 20;
      }
    },
    top: {
      type: String,
      default: '18%'
    }
  },
  data() {
    return {
      // Xdata: [],
      Ydata: [],
      valTwo: [],
      valThree: [],
      valFour: [],
      setTime: null,
      chartInst: null
    };
  },
  mounted() {
    this.drawWidth();
    this.tooltipShuffling();
    this.mousemove();
    this.mouseleave();
  },
  methods: {
    drawWidth() {
      let that = this;
      // 基于准备好的dom，初始化echarts实例
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      // var xData2 = [
      //   '容城谷庄',
      //   '雄县七间房',
      //   '安新三台',
      //   '雄县张岗',
      //   '安新寨里'
      // ];
      var data1 = this.rowData;
      var data2 = this.rowData2;
      let _this = this;
      let option = {
        color: '#00BFFF',
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let str;
            console.log(params, 'paramsparams');
            if (params[0].axisValue == 'A类') {
              str = `${params[0].axisValue}：${data1[0]}`;
            } else if (params[0].axisValue == 'B类') {
              str = `${params[0].axisValue}：${data1[1]}`;
            } else if (params[0].axisValue == 'C类') {
              str = `${params[0].axisValue}：${data1[2]}`;
            } else if (params[0].axisValue == 'D类') {
              str = `${params[0].axisValue}：${data1[3]}`;
            } else {
              str = `${params[0].axisValue}：${data1[4]}`;
            }
            return str;
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          top: this.top,
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#9FAFB5',
              width: 1 //这里是为了突出显示加上的
            }
          },
          axisLabel: {
            //x轴文字的配置
            interval: 0,
            textStyle: this.fontStyle.Xfont,
            rotate: this.rotate,
            formatter: function (params) {
              var newParamsName = '';
              var paramsNameNumber = params.length;
              var provideNumber = that.provideNumber; //一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = '';
                  var start = p * provideNumber;
                  var end = start + provideNumber;
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    tempStr = params.substring(start, end) + '\n';
                  }
                  newParamsName += tempStr;
                }
              } else {
                newParamsName = params;
              }
              return newParamsName;
            }
          },
          data: this.XData
        }, {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitArea: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: this.XData
        }],
        yAxis: [{
          name: `单位:${this.unit}`,
          position: 'left',
          type: 'value',
          nameTextStyle: this.fontStyle.nameTextStyle,
          // interval: this.interval,
          axisLabel: {
            //y轴文字的配置
            textStyle: this.fontStyle.Yfont
          },
          splitNumber: 5,
          // 设置y轴线条的粗细
          splitLine: {
            show: true,
            lineStyle: {
              color: '#0A223E50',
              width: 1,
              type: 'solid'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#9FAFB5',
              width: 2 //这里是为了突出显示加上的
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(191,235,255,.1)', 'rgba(191,235,255,0)']
            }
          }
        }, {
          type: 'value',
          show: false,
          name: '单位:%',
          nameTextStyle: {
            color: '#f8f8f8',
            fontFamily: '苹方',
            fontWeight: 'Medium',
            fontSize: 20
          },
          min: 0,
          max: 100,
          interval: 25,
          splitLine: {
            show: false
          },
          axisLabel: {
            // formatter: "{value} %",
            textStyle: {
              color: '#f8f8f8',
              fontSize: '18',
              fontFamily: 'Helvetica'
            }
          }
        }],
        series: [{
          //三个最低下的圆片
          name: '',
          type: 'pictorialBar',
          symbolSize: [22, 11],
          symbolOffset: [0, 5],
          z: 23,
          itemStyle: {
            opacity: 1,
            color: function () {
              return new echarts["graphic"].LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: _this.barColor[0] // 0% 处的颜色
              }, {
                offset: 1,
                color: _this.barColor[0] // 100% 处的颜色
              }], false);
            }
          },
          data: Array(_this.XData.length).fill(1)
        },
        //下半截柱状图
        {
          name: '2020',
          type: 'bar',
          barWidth: 22,
          barGap: '-100%',
          z: 22,
          itemStyle: {
            //lenged文本
            opacity: 0.7,
            color: function () {
              return new echarts["graphic"].LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: _this.barColor[1] // 0% 处的颜色
              }, {
                offset: 0.5,
                color: _this.barColor[2] // 0% 处的颜色
              }, {
                offset: 1,
                color: _this.barColor[3] // 100% 处的颜色
              }], false);
            }
          },
          data: data1
        }, {
          // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
          type: 'bar',
          barWidth: 22,
          barGap: '-100%',
          stack: '广告',
          itemStyle: {
            color: 'transparent'
          },
          data: data1
        }, {
          name: '',
          //头部
          type: 'pictorialBar',
          symbolSize: [22, 11],
          symbolOffset: [0, -5],
          z: 23,
          symbolPosition: 'end',
          itemStyle: {
            color: function () {
              return new echarts["graphic"].LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: _this.barColor[4]
                // 0% 处的颜色
              }, {
                offset: 1,
                color: _this.barColor[5]
                // 100% 处的颜色
              }], false);
            },
            opacity: 1
          },
          data: data2
        }, {
          name: '',
          type: 'pictorialBar',
          symbolSize: [22, 11],
          symbolOffset: [0, -5],
          z: 23,
          itemStyle: {
            opacity: 1,
            color: function () {
              return new echarts["graphic"].LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: _this.barColor[6]
                // 0% 处的颜色
              }, {
                offset: 1,
                color: _this.barColor[7]
                // 100% 处的颜色
              }], false);
            }
          },
          symbolPosition: 'end',
          data: data1
        }, {
          name: '2019',
          type: 'bar',
          barWidth: 22,
          barGap: '-100%',
          z: 2,
          itemStyle: {
            color: function () {
              return new echarts["graphic"].LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: _this.barColor[8]
                // 0% 处的颜色
              }, {
                offset: 0.5,
                color: _this.barColor[9]
                // 0% 处的颜色
              }, {
                offset: 1,
                color: _this.barColor[10]
                // 100% 处的颜色
              }], false);
            },
            opacity: 0.7
          },
          data: data2
        }]
      };
      this.chartInst.setOption(option);
      //设置默认选中高亮部分
      this.chartInst.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: 0
      }); //鼠标进
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          //表示series中的第几个data数据循环展示
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 1000);
    },
    mousemove() {
      clearInterval(this.setTime);
    },
    mouseleave() {
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          //表示series中的第几个data数据循环展示
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.setTime);
  },
  watch: {
    rowData: {
      handler() {
        this.tooltipShuffling();
        this.drawWidth();
      },
      deep: true
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/01-单柱图/CylindricalPlot.vue?vue&type=script&lang=js
 /* harmony default export */ var _01_CylindricalPlotvue_type_script_lang_js = (CylindricalPlotvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/02-柱图/01-单柱图/CylindricalPlot.vue?vue&type=style&index=0&id=4e19cc23&prod&lang=less&scoped=true
var CylindricalPlotvue_type_style_index_0_id_4e19cc23_prod_lang_less_scoped_true = __webpack_require__("5ab8");

// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/01-单柱图/CylindricalPlot.vue






/* normalize component */

var CylindricalPlot_component = Object(componentNormalizer["a" /* default */])(
  _01_CylindricalPlotvue_type_script_lang_js,
  CylindricalPlotvue_type_template_id_4e19cc23_scoped_true_render,
  CylindricalPlotvue_type_template_id_4e19cc23_scoped_true_staticRenderFns,
  false,
  null,
  "4e19cc23",
  null
  
)

/* harmony default export */ var CylindricalPlot = (CylindricalPlot_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/01-单柱图/BarChart3D.vue?vue&type=template&id=63446d12&scoped=true
var BarChart3Dvue_type_template_id_63446d12_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    ref: "chart",
    staticClass: "bar-chart",
    style: {
      width: _vm.width,
      height: _vm.height
    },
    on: {
      "mousemove": _vm.mousemove,
      "mouseleave": _vm.mouseleave
    }
  });
};
var BarChart3Dvue_type_template_id_63446d12_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/01-单柱图/BarChart3D.vue?vue&type=template&id=63446d12&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/01-单柱图/BarChart3D.vue?vue&type=script&lang=js


/* harmony default export */ var BarChart3Dvue_type_script_lang_js = ({
  props: {
    width: {
      type: String,
      default: () => {
        return '736px';
      }
    },
    height: {
      type: String,
      default: () => {
        return '360px';
      }
    },
    xtype: {
      type: String,
      default: 'category'
    },
    ytype: {
      type: String,
      default: 'value'
    },
    maxData: {
      type: Number,
      default: 300
    },
    coloreBarChart: {
      type: Array,
      default: () => {
        return ['#89AAFF', '#F496AA', '#71C6FF', '#FFE595', '#4BD3B4'];
      }
    },
    rowData: {
      type: Array,
      default: () => {
        return [{
          name: '语文',
          value: 60
        }, {
          name: '数学',
          value: 30
        }, {
          name: '英语',
          value: 80
        }, {
          name: '物理',
          value: 40
        }, {
          name: '化学',
          value: 55
        }];
      }
    },
    chartStylr: {
      type: Object,
      default: () => {
        return {
          unit: '单位：人次',
          barWidth: 20
        };
      }
    },
    gridData: {
      type: Object,
      default: () => {
        return {
          top: '18%',
          bottom: '20%',
          left: '10%',
          right: '10%'
        };
      }
    }
  },
  data() {
    return {
      chartInst: null,
      option: {},
      setTime: null
    };
  },
  methods: {
    instantiation() {
      let that = this;
      this.chartInst = echarts["init"](this.$refs.chart);
      this.option = {
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter: function (params) {
            const item = params[2];
            return item.name + ' : ' + item.value + '%';
          },
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765'
            }
          }
        },
        grid: this.gridData,
        xAxis: {
          type: this.xtype,
          data: [],
          axisLine: {
            show: false,
            lineStyle: {
              color: '#f8f8f8'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 16,
            margin: 15,
            interval: 0
          }
        },
        yAxis: {
          show: false,
          type: this.ytype,
          name: this.chartStylr.unit,
          // max: this.maxData,
          nameTextStyle: {
            fontSize: 14,
            padding: [0, 0, 0, 35] // 四个数字分别为上右下左与原位置距离
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#f8f8f8'
            }
          },
          axisLabel: {
            fontSize: 12,
            interval: 0
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: ['rgba(255,255,255,0.1)', 'rgba(238,238,238,0)']
            }
          }
        },
        series: [{
          data: [],
          avoidLabelOverlap: false,
          type: 'bar',
          barWidth: 35,
          barMaxWidth: 'auto',
          itemStyle: {
            // color: {
            //   x: 0,
            //   y: 0,
            //   x2: 0,
            //   y2: 1,
            //   type: 'linear',
            //   global: false,
            //   colorStops: [
            //     {
            //       offset: 0,
            //       color: 'rgba(76, 228, 230, 0.7)'
            //     },
            //     {
            //       offset: 1,
            //       color: 'rgba(24, 134, 144, 1)'
            //     }
            //   ]
            // }

            color: function (params) {
              return that.coloreBarChart[params.dataIndex];
              // var num = that.coloreBarChart.length
              // return that.coloreBarChart[params.dataIndex % num]
            }
          },
          label: {
            show: true,
            position: 'top',
            distance: 10,
            color: '#EBEBF9',
            fontFamily: '微软雅黑',
            fontSize: 24,
            formatter: function (p) {
              return p.data + '%';
            }
          }
        }, {
          data: [],
          //底部三角
          type: 'pictorialBar',
          barMaxWidth: '20',
          itemStyle: {
            color: function (params) {
              return that.coloreBarChart[params.dataIndex];
              // var num = that.coloreBarChart.length
              // return that.coloreBarChart[params.dataIndex % num]
            }
          },
          symbol: 'diamond',
          symbolOffset: [0, '50%'],
          symbolSize: [35, 15]
        }, {
          data: [],
          //数据上部分
          type: 'pictorialBar',
          barMaxWidth: '20',
          symbolPosition: 'end',
          symbol: 'diamond',
          symbolOffset: [0, '-50%'],
          symbolSize: [35, 15],
          zlevel: 2,
          itemStyle: {
            color: function (params) {
              return that.coloreBarChart[params.dataIndex];
              // var num = that.coloreBarChart.length
              // return that.coloreBarChart[params.dataIndex % num]
            }
          }
        }, {
          data: [],
          //背景阴影
          type: 'bar',
          barMaxWidth: 'auto',
          barWidth: 35,
          barGap: '-100%',
          zlevel: -1,
          itemStyle: {
            color: function (params) {
              return that.coloreBarChart[params.dataIndex] + '60';
              // var num = that.coloreBarChart.length
              // return that.coloreBarChart[params.dataIndex % num]
            }
          }
        }, {
          data: [],
          //顶部三角
          type: 'pictorialBar',
          barMaxWidth: '20',
          symbolPosition: 'end',
          symbol: 'diamond',
          symbolOffset: [0, '-50%'],
          symbolSize: [35, 15],
          itemStyle: {
            color: function (params) {
              return that.coloreBarChart[params.dataIndex] + '60';
              // var num = that.coloreBarChart.length
              // return that.coloreBarChart[params.dataIndex % num]
            }
          },
          zlevel: -1
        }]
      };
    },
    rowDataChart() {
      let name = [];
      let value = [];
      // let rate = []
      let botData = [];
      let sum = 0;
      let n = 0; // eslint-disable-line no-unused-vars
      let topData = [];
      this.rowData.forEach(val => {
        n += Number(val.value);
        name.push(val['name']);
        value.push(val['value']);
        botData.push(1); // 底数小三角
        if (val.value > sum) {
          sum = val.value;
        }
      });
      this.rowData.forEach(() => {
        topData.push(sum + 20); //背景柱子数据
        // value.push(((it.value / n)*100).toFixed(0))
      });
      this.option.xAxis.data = name;
      this.option.series[0].data = value;
      this.option.series[1].data = botData;
      this.option.series[2].data = value;
      this.option.series[3].data = topData;
      this.option.series[4].data = topData;
      this.chartInst.setOption(this.option, true);
    },
    tooltipShuffling() {
      //
      clearInterval(this.setTime);
      let count = 0;
      this.setTime = setInterval(() => {
        if (count == this.rowData.length) {
          count = 0;
        }
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: count
        });
        count++;
      }, 3000);
    },
    noDataShow() {
      this.chartInst = echarts["init"](this.$refs.chart);
      this.chartInst.setOption({
        backgroundColor: 'rgba(255,255,255,.03)',
        title: {
          text: `暂无数据`,
          show: true,
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 32
          },
          top: 'center',
          left: 'center'
        }
      });
    },
    mousemove() {
      clearInterval(this.setTime);
    },
    mouseleave() {
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.rowData.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          //表示series中的第几个data数据循环展示
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 2000);
    }
  },
  mounted() {
    if (!this.rowData.length) {
      this.noDataShow();
      return;
    }
    this.instantiation();
    this.rowDataChart();
    this.mousemove();
    this.mouseleave();
    // this.tooltipShuffling()
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    echarts["init"](this.$refs.chart).dispose();
  },
  watch: {
    rowData: {
      handler(newV) {
        if (!newV.length) {
          this.noDataShow();
          return;
        }
        this.instantiation();
        this.rowDataChart();
        // this.tooltipShuffling()
      },
      deep: true
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/01-单柱图/BarChart3D.vue?vue&type=script&lang=js
 /* harmony default export */ var _01_BarChart3Dvue_type_script_lang_js = (BarChart3Dvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/01-单柱图/BarChart3D.vue





/* normalize component */

var BarChart3D_component = Object(componentNormalizer["a" /* default */])(
  _01_BarChart3Dvue_type_script_lang_js,
  BarChart3Dvue_type_template_id_63446d12_scoped_true_render,
  BarChart3Dvue_type_template_id_63446d12_scoped_true_staticRenderFns,
  false,
  null,
  "63446d12",
  null
  
)

/* harmony default export */ var BarChart3D = (BarChart3D_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/03-堆叠主图/HengTwoBarCharts.vue?vue&type=template&id=5c7b0e26&scoped=true
var HengTwoBarChartsvue_type_template_id_5c7b0e26_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "chartBox"
  }, [_c('div', {
    ref: "myChart",
    staticClass: "myChart",
    style: {
      width: _vm.width,
      height: _vm.height
    }
  }), _vm.legIsShow ? _c('ul', {
    staticClass: "legth",
    style: {
      top: _vm.legTop,
      left: _vm.legLeft
    }
  }, _vm._l(_vm.legthWZ, function (item, i) {
    return _c('li', {
      key: i
    }, [_c('h3', {
      style: {
        backgroundColor: _vm.legthColor[i]
      }
    }), _c('span', [_vm._v(_vm._s(item))])]);
  }), 0) : _vm._e()]);
};
var HengTwoBarChartsvue_type_template_id_5c7b0e26_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/03-堆叠主图/HengTwoBarCharts.vue?vue&type=template&id=5c7b0e26&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/03-堆叠主图/HengTwoBarCharts.vue?vue&type=script&lang=js

/* harmony default export */ var HengTwoBarChartsvue_type_script_lang_js = ({
  name: 'pieGeRenNanDing',
  props: {
    rowData: {
      type: Array,
      default: () => {
        return [{
          name: '0601',
          value: '10',
          item: '30',
          val: '20'
        }, {
          name: '0602',
          value: '20',
          item: '30',
          val: '40'
        }, {
          name: '0603',
          value: '50',
          item: '30',
          val: '10'
        }, {
          name: '0604',
          value: '20',
          item: '30',
          val: '40'
        }, {
          name: '0605',
          value: '30',
          item: '45',
          val: '32'
        }, {
          name: '0606',
          value: '45',
          item: '32',
          val: '10'
        }, {
          name: '0607',
          value: '12',
          item: '45',
          val: '21'
        }, {
          name: '0608',
          value: '23',
          item: '23',
          val: '45'
        }];
      }
    },
    h3Style: {
      type: Object,
      default: () => {
        return {};
      }
    },
    barColor: {
      type: Array,
      default: () => {
        return ['#ababa9', '#252d35', '#eee', '#666', '#6c94b9', '#6c94b9'];
      }
    },
    legthColor: {
      type: Array,
      default: () => {
        return ['#75787a', '#eee', '#6c94b9'];
      }
    },
    legthWZ: {
      type: Array,
      default: () => {
        return ['利用率', '废弃率', '使用率'];
      }
    },
    unit: {
      type: String,
      default: () => {
        return '%';
      }
    },
    barWidth: {
      type: [String, Number],
      default: () => {
        return '22';
      }
    },
    width: {
      type: String,
      default: () => {
        return '736px';
      }
    },
    height: {
      type: String,
      default: () => {
        return '360px';
      }
    },
    legTop: {
      type: String,
      default: () => {
        return '10px';
      }
    },
    legLeft: {
      type: String,
      default: () => {
        return '200px';
      }
    },
    legIsShow: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  data() {
    return {
      Xdata: [],
      Ydata: [],
      valTwo: [],
      valThree: [],
      setTime: null,
      chartInst: null
    };
  },
  mounted() {
    // this.getData();
    if (this.rowData && this.rowData.length > 0) {
      this.rowData.forEach(item => {
        this.Xdata.push(item.name);
        this.Ydata.push(item.value);
        this.valTwo.push(item.item);
        this.valThree.push(item.val);
      });
    }
    this.drawWidth();
    this.tooltipShuffling();
  },
  methods: {
    drawWidth() {
      // 基于准备好的dom，初始化echarts实例
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      this.chartInst.setOption({
        // color: "#00BFFF",
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [{
          type: 'value',
          data: this.Xdata,
          // axisTick: {
          //   alignWithLabel: true
          // },
          axisLabel: {
            //x轴文字的配置
            textStyle: {
              color: '#f8f8f8',
              fontSize: 16,
              fontFamily: '黑体'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#9FAFB5',
              width: 1.2 //这里是为了突出显示加上的
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ['#8A9EB5'],
              width: 1,
              type: 'solid'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(14,29,52,0.2)', 'rgba(191,235,255,0.1)']
            }
          }
        }],
        yAxis: [{
          data: this.Xdata,
          name: `单位:${this.unit}`,
          position: 'left',
          type: 'category',
          inverse: true,
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          // position: "top",
          nameTextStyle: {
            color: '#f8f8f8',
            fontSize: 16,
            padding: [-230, 4, 5, 6],
            fontFamily: '黑体'
          },
          axisLabel: {
            //y轴文字的配置
            textStyle: {
              color: '#f8f8f8',
              fontSize: 16,
              fontFamily: 'Helvetica'
            }
          },
          splitNumber: 2,
          // 设置y轴线条的粗细
          splitLine: {
            show: false,
            lineStyle: {
              color: ['#8A9EB5'],
              width: 1,
              type: 'solid'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#9FAFB5',
              width: 1.2 //这里是为了突出显示加上的
            }
          }
        }],
        series: [{
          // name: "直接访问",
          type: 'bar',
          barWidth: this.barWidth,
          data: this.Ydata,
          stack: 'total',
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: this.barColor[0]
              }, {
                offset: 1,
                color: this.barColor[1]
              }])
            }
          }
        }, {
          // name: "直接访问",
          type: 'bar',
          barWidth: this.barWidth,
          data: this.valTwo,
          stack: 'total',
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: this.barColor[2]
              }, {
                offset: 1,
                color: this.barColor[3]
              }])
            }
          }
        }, {
          // name: "直接访问",
          type: 'bar',
          barWidth: this.barWidth,
          data: this.valThree,
          stack: 'total',
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: this.barColor[4]
              }, {
                offset: 1,
                color: this.barColor[5]
              }])
            }
          }
        }]
      });
      //设置默认选中高亮部分
      this.chartInst.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: 0
      }); //鼠标进
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length;

        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          //表示series中的第几个data数据循环展示
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 2000);
    }
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    this.setTime = null;
    this.chartInst.dispose();
  },
  watch: {
    rowData: {
      handler() {
        this.Xdata = [];
        this.Ydata = [];
        this.valTwo = [];
        this.valThree = [];
        this.rowData.forEach(item => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
          this.valThree.push(item.val);
        });
        this.tooltipShuffling();
        this.drawWidth();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/03-堆叠主图/HengTwoBarCharts.vue?vue&type=script&lang=js
 /* harmony default export */ var _03_HengTwoBarChartsvue_type_script_lang_js = (HengTwoBarChartsvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/02-柱图/03-堆叠主图/HengTwoBarCharts.vue?vue&type=style&index=0&id=5c7b0e26&prod&lang=less&scoped=true
var HengTwoBarChartsvue_type_style_index_0_id_5c7b0e26_prod_lang_less_scoped_true = __webpack_require__("eb51");

// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/03-堆叠主图/HengTwoBarCharts.vue






/* normalize component */

var HengTwoBarCharts_component = Object(componentNormalizer["a" /* default */])(
  _03_HengTwoBarChartsvue_type_script_lang_js,
  HengTwoBarChartsvue_type_template_id_5c7b0e26_scoped_true_render,
  HengTwoBarChartsvue_type_template_id_5c7b0e26_scoped_true_staticRenderFns,
  false,
  null,
  "5c7b0e26",
  null
  
)

/* harmony default export */ var HengTwoBarCharts = (HengTwoBarCharts_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/09-蝴蝶柱图/CycloneChart.vue?vue&type=template&id=31c102f8&scoped=true
var CycloneChartvue_type_template_id_31c102f8_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cyclone_chart"
  }, [_c('div', {
    ref: "chart",
    staticClass: "bar-chart",
    style: {
      width: _vm.width,
      height: _vm.height
    }
  }), _c('ul', {
    staticClass: "center"
  }, _vm._l(_vm.centerCon, function (item, index) {
    return _c('li', {
      key: index
    }, [_vm._v(_vm._s(item))]);
  }), 0), _c('ul', {
    staticClass: "Unit"
  }, _vm._l(_vm.units, function (item, index) {
    return _c('li', {
      key: index
    }, [_vm._v("单位:" + _vm._s(item))]);
  }), 0)]);
};
var CycloneChartvue_type_template_id_31c102f8_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/09-蝴蝶柱图/CycloneChart.vue?vue&type=template&id=31c102f8&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/09-蝴蝶柱图/CycloneChart.vue?vue&type=script&lang=js


/* harmony default export */ var CycloneChartvue_type_script_lang_js = ({
  props: {
    width: {
      type: String,
      default: () => {
        return '736px';
      }
    },
    height: {
      type: String,
      default: () => {
        return '360px';
      }
    },
    xtype: {
      type: String,
      default: 'category'
    },
    ytype: {
      type: String,
      default: 'value'
    },
    units: {
      type: Array,
      default: () => {
        return ['户', '户'];
      }
    },
    centerCon: {
      type: Array,
      default: () => {
        return ['注册', '注销'];
      }
    },
    maxData: {
      type: Number,
      default: 100
    },
    coloreBarChart: {
      type: Array,
      default: () => {
        return [{
          start: '#6c94b9',
          end: '#3e5468'
        }, {
          start: '#a5a5a4',
          end: '#293139'
        }];
      }
    },
    rowData: {
      type: Array,
      default: () => {
        return [{
          name: '1月',
          value: 22,
          item: 23
        }, {
          name: '2月',
          value: 32,
          item: 53
        }, {
          name: '3月',
          value: 42,
          item: 43
        }, {
          name: '4月',
          value: 52,
          item: 33
        }, {
          name: '5月',
          value: 32,
          item: 23
        }];
      }
    },
    chartStylr: {
      type: Object,
      default: () => {
        return {
          unit: '单位：人次',
          barWidth: 20
        };
      }
    }
  },
  data() {
    return {
      chartInst: null,
      option: {},
      setTime: null,
      setTimeRight: null,
      Xdata: [],
      Ydata: [],
      valTwo: []
    };
  },
  methods: {
    instantiation() {
      // let timeLineData = [1];
      this.chartInst = echarts["init"](this.$refs.chart);
      this.option = {
        baseOption: {
          timeline: {
            show: false,
            top: 0,
            data: []
          },
          tooltip: {
            trigger: 'axis',
            show: true,
            axisPointer: {
              type: 'cross',
              // animation: true,
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          grid: [{
            show: false,
            left: '5%',
            top: '10%',
            bottom: '8%',
            containLabel: true,
            width: '37%'
          }, {
            show: false,
            left: '53%',
            top: '6%',
            bottom: '19%',
            width: '0%'
          }, {
            show: false,
            right: '2%',
            top: '10%',
            bottom: '8%',
            containLabel: true,
            width: '37%'
          }],
          xAxis: [{
            type: 'value',
            inverse: true,
            axisLine: {
              lineStyle: {
                color: '#f8f8f8',
                fontSize: 22
              }
            },
            axisTick: {
              show: false
            },
            // position: "bottom",
            axisLabel: {
              show: true,
              fontSize: 16,
              interval: 0,
              color: '#f8f8f8'
            },
            splitLine: {
              show: false
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(255,255,255,0.1)', 'rgba(238,238,238,0)']
              }
            }
          }, {
            gridIndex: 1,
            show: false
          }, {
            gridIndex: 2,
            axisLine: {
              lineStyle: {
                color: '#f8f8f8'
              }
            },
            axisTick: {
              show: false
            },
            position: 'bottom',
            axisLabel: {
              show: true,
              fontSize: 16,
              interval: 0,
              color: '#f8f8f8'
            },
            splitLine: {
              show: false
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(255,255,255,0.1)', 'rgba(238,238,238,0)']
              }
            }
          }],
          yAxis: [{
            type: 'category',
            inverse: true,
            position: 'right',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            data: this.Xdata
          }, {
            gridIndex: 1,
            type: 'category',
            inverse: true,
            position: 'left',
            nameTextStyle: {
              color: '#f8f8f8',
              fontSize: 22,
              padding: 2,
              fontFamily: '黑体'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              padding: [30, 0, 0, 0],
              textStyle: {
                color: '#ffffff',
                fontSize: 20
              },
              align: 'center'
            },
            data: this.Xdata
          }, {
            gridIndex: 2,
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            data: this.Xdata
          }],
          series: []
        },
        options: []
      };
      // this.option.baseOption.timeline.data.push(timeLineData[0]);
      this.option.options.push({
        series: [{
          name: '2017',
          type: 'bar',
          barWidth: 25,
          itemStyle: {
            normal: {
              color: new echarts["graphic"].LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: this.coloreBarChart[0].start
              }, {
                offset: 1,
                color: this.coloreBarChart[0].end
              }])
            }
            // emphasis: {
            //   color: "#fe89ff" // 高亮状态下柱条颜色
            // }
          },
          label: {
            normal: {
              show: false
            }
          },
          data: this.Ydata,
          animationEasing: 'elasticOut'
        }, {
          name: '2018',
          type: 'bar',
          barWidth: this.chartStylr.barWidth,
          xAxisIndex: 2,
          yAxisIndex: 2,
          itemStyle: {
            normal: {
              color: new echarts["graphic"].LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: this.coloreBarChart[1].start
              }, {
                offset: 1,
                color: this.coloreBarChart[1].end
              }])
            }
            // emphasis: {
            //   color: "#fe89ff" // 高亮状态下柱条颜色
            // }
          },
          label: {
            normal: {
              show: false
            }
          },
          data: this.valTwo,
          animationEasing: 'elasticOut'
        }]
      });
      this.chartInst.setOption(this.option, true);
      //设置默认选中高亮部分
      this.chartInst.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: 0
      }); //鼠标进
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: [0, 1],
          //表示series中的第几个data数据循环展示
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: [0],
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'highlight',
          seriesIndex: [0, 1],
          dataIndex: currentIndex
        });
      }, 1000);
    },
    tooltipShufflingright() {
      clearInterval(this.setTimeRight);
      var currentIndex = 1;
      this.setTimeRight = setInterval(() => {
        var dataLen = this.Ydata.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 1,
          //表示series中的第几个data数据循环展示
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 1,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'highlight',
          seriesIndex: 1,
          dataIndex: currentIndex
        });
      }, 1000);
    }
  },
  mounted() {
    if (this.rowData && this.rowData.length > 0) {
      this.Xdata = [];
      this.Ydata = [];
      this.valTwo = [];
      this.rowData.forEach(item => {
        // .reverse()
        this.Xdata.push(item.name);
        this.Ydata.push(item.value);
        this.valTwo.push(item.item);
      });
    }
    this.instantiation();
    // this.tooltipShuffling();
    // this.tooltipShufflingright();
  },
  beforeDestroy() {
    echarts["init"](this.$refs.chart).dispose();
  },
  watch: {
    rowData: {
      handler() {
        this.Xdata = [];
        this.Ydata = [];
        this.valTwo = [];
        this.rowData.forEach(item => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
        });
        this.instantiation();
        // this.tooltipShuffling();
        // this.tooltipShufflingright();
      },
      deep: true
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/09-蝴蝶柱图/CycloneChart.vue?vue&type=script&lang=js
 /* harmony default export */ var _09_CycloneChartvue_type_script_lang_js = (CycloneChartvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/02-柱图/09-蝴蝶柱图/CycloneChart.vue?vue&type=style&index=0&id=31c102f8&prod&lang=less&scoped=true
var CycloneChartvue_type_style_index_0_id_31c102f8_prod_lang_less_scoped_true = __webpack_require__("f3d8");

// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/09-蝴蝶柱图/CycloneChart.vue






/* normalize component */

var CycloneChart_component = Object(componentNormalizer["a" /* default */])(
  _09_CycloneChartvue_type_script_lang_js,
  CycloneChartvue_type_template_id_31c102f8_scoped_true_render,
  CycloneChartvue_type_template_id_31c102f8_scoped_true_staticRenderFns,
  false,
  null,
  "31c102f8",
  null
  
)

/* harmony default export */ var CycloneChart = (CycloneChart_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/10-Svg气泡柱图/BubbleBar.vue?vue&type=template&id=673931e0&scoped=true
var BubbleBarvue_type_template_id_673931e0_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    ref: "chart",
    staticClass: "bar-chart",
    style: {
      width: _vm.width,
      height: _vm.height
    }
  });
};
var BubbleBarvue_type_template_id_673931e0_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/10-Svg气泡柱图/BubbleBar.vue?vue&type=template&id=673931e0&scoped=true

// EXTERNAL MODULE: ./src/components/Chart Library/02-柱图/10-Svg气泡柱图/60x80.png
var _60x80 = __webpack_require__("ce7d");
var _60x80_default = /*#__PURE__*/__webpack_require__.n(_60x80);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/10-Svg气泡柱图/BubbleBar.vue?vue&type=script&lang=js



/* harmony default export */ var BubbleBarvue_type_script_lang_js = ({
  props: {
    width: {
      type: String,
      default: () => {
        return '736px';
      }
    },
    height: {
      type: String,
      default: () => {
        return '360px';
      }
    },
    xtype: {
      type: String,
      default: 'category'
    },
    ytype: {
      type: String,
      default: 'value'
    },
    maxData: {
      type: Number,
      default: 300
    },
    coloreBarChart: {
      type: Array,
      default: () => {
        return ['#eee', '#6c94b9'];
      }
    },
    rowData: {
      type: Array,
      default: () => {
        return [{
          name: '0601',
          value: '10'
        }, {
          name: '0602',
          value: '20'
        }, {
          name: '0603',
          value: '50'
        }, {
          name: '0604',
          value: '20'
        }, {
          name: '0605',
          value: '30'
        }, {
          name: '0606',
          value: '45'
        }, {
          name: '0607',
          value: '12'
        }, {
          name: '0608',
          value: '23'
        }];
      }
    },
    chartStylr: {
      type: Object,
      default: () => {
        return {
          unit: '单位：人次',
          barWidth: 30
        };
      }
    },
    gridData: {
      type: Object,
      default: () => {
        return {
          top: '20%',
          bottom: '13%',
          left: '10%',
          right: '10%'
        };
      }
    },
    // 参考echarts官网配置
    animateAttr: {
      type: Object,
      default: () => ({
        attributeName: 'y',
        dur: '500ms',
        to: '-80',
        repeatCount: 'indefinite'
      })
    }
  },
  data() {
    return {
      chartInst: null,
      option: {},
      setTime: null
    };
  },
  methods: {
    instantiation() {
      this.chartInst = echarts["init"](this.$refs.chart, {}, {
        renderer: 'svg'
      });
      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765'
            }
          }
        },
        aria: {
          enabled: true,
          decal: {
            show: true,
            decals: {
              symbol: `image://${_60x80_default.a}`,
              dashArrayX: 30,
              dashArrayY: 60,
              maxTileWidth: 20,
              maxTileHeight: 80
            }
          }
        },
        grid: this.gridData,
        xAxis: {
          type: this.xtype,
          data: [],
          axisLine: {
            lineStyle: {
              color: '#f8f8f8'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 14,
            interval: 0
          }
        },
        yAxis: {
          type: this.ytype,
          name: this.chartStylr.unit,
          // max: this.maxData,
          nameTextStyle: {
            fontSize: 14,
            padding: [0, 0, 0, 35] // 四个数字分别为上右下左与原位置距离
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#f8f8f8'
            }
          },
          axisLabel: {
            fontSize: 14,
            interval: 0
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255,255,255,0.1)', 'rgba(238,238,238,0)']
            }
          }
        },
        series: [{
          data: [],
          avoidLabelOverlap: false,
          type: 'bar',
          barWidth: this.chartStylr.barWidth,
          itemStyle: {
            color: new echarts["graphic"].LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: this.coloreBarChart[0]
            }, {
              offset: 1,
              color: this.coloreBarChart[1]
            }])
          }
        }]
      };
    },
    rowDataChart() {
      let name = [];
      let value = [];
      this.rowData.forEach(val => {
        name.push(val['name']);
        value.push(val['value']);
      });
      this.option.xAxis.data = name;
      this.option.series[0].data = value;
      this.chartInst.setOption(this.option, true);
    },
    runAnimate() {
      const animateDom = document.createElement('animate');
      let animateAttr = {
        attributeName: 'y',
        dur: '500ms',
        to: '-80',
        repeatCount: 'indefinite'
      };
      Object.assign(animateAttr, this.animateAttr);
      for (let key in animateAttr) {
        animateDom.setAttribute(key, animateAttr[key]);
      }
      const pattern = this.$el.querySelector('pattern');
      pattern === null || pattern === void 0 || pattern.prepend(animateDom);
      const defsDom = this.$el.querySelector('defs');
      let ani = defsDom.innerHTML;
      defsDom.innerHTML = ani;
    },
    tooltipShuffling() {
      //
      clearInterval(this.setTime);
      let count = 0;
      this.setTime = setInterval(() => {
        if (count == this.rowData.length) {
          count = 0;
        }
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: count
        });
        count++;
      }, 2000);
    }
  },
  mounted() {
    this.instantiation();
    this.rowDataChart();
    this.runAnimate();
    this.tooltipShuffling();
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    echarts["init"](this.$refs.chart).dispose();
  },
  watch: {
    rowData: {
      handler() {
        this.instantiation();
        this.rowDataChart();
        this.runAnimate();
        this.tooltipShuffling();
      },
      deep: true
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/10-Svg气泡柱图/BubbleBar.vue?vue&type=script&lang=js
 /* harmony default export */ var _10_Svg_BubbleBarvue_type_script_lang_js = (BubbleBarvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/10-Svg气泡柱图/BubbleBar.vue





/* normalize component */

var BubbleBar_component = Object(componentNormalizer["a" /* default */])(
  _10_Svg_BubbleBarvue_type_script_lang_js,
  BubbleBarvue_type_template_id_673931e0_scoped_true_render,
  BubbleBarvue_type_template_id_673931e0_scoped_true_staticRenderFns,
  false,
  null,
  "673931e0",
  null
  
)

/* harmony default export */ var BubbleBar = (BubbleBar_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/07-堆叠柱图+折线图/DuitieZhutu.vue?vue&type=template&id=d5030cb8&scoped=true
var DuitieZhutuvue_type_template_id_d5030cb8_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "chartBox"
  }, [_c('div', {
    ref: "myChart",
    staticClass: "myChart",
    style: {
      width: _vm.Width,
      height: _vm.Height
    }
  }), _vm.legIsShow ? _c('ul', {
    staticClass: "legth",
    style: {
      top: _vm.legTop,
      left: _vm.legLeft
    }
  }, _vm._l(_vm.legthWZ, function (item, i) {
    return _c('li', {
      key: i
    }, [_c('h3', {
      style: {
        backgroundColor: _vm.legthColor[i]
      }
    }), _c('span', [_vm._v(_vm._s(item))])]);
  }), 0) : _vm._e(), _vm.legIsShow ? _c('ul', {
    staticClass: "linelegth",
    style: {
      top: _vm.linelegTop,
      left: _vm.linelegLeft
    }
  }, _vm._l(_vm.linelegthWZ, function (item, i) {
    return _c('li', {
      key: i
    }, [_c('h3', {
      style: {
        backgroundColor: _vm.linelegthColor[i]
      }
    }), _c('span', [_vm._v(_vm._s(item))])]);
  }), 0) : _vm._e()]);
};
var DuitieZhutuvue_type_template_id_d5030cb8_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/07-堆叠柱图+折线图/DuitieZhutu.vue?vue&type=template&id=d5030cb8&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/02-柱图/07-堆叠柱图+折线图/DuitieZhutu.vue?vue&type=script&lang=js

/* harmony default export */ var DuitieZhutuvue_type_script_lang_js = ({
  name: 'pieGeRenNanDing',
  props: {
    rowData: {
      type: Array,
      default: () => {
        return [{
          name: 'A类',
          value: 90,
          item: 10,
          it: 80,
          valOne: 20,
          valLineOne: 50,
          valLineTwo: 20
        }, {
          name: 'B类',
          value: 50,
          item: 20,
          it: 80,
          valOne: 20,
          valLineOne: 10,
          valLineTwo: 20
        }, {
          name: 'C类',
          value: 30,
          item: 30,
          it: 80,
          valOne: 20,
          valLineOne: 70,
          valLineTwo: 50
        }, {
          name: 'D类',
          value: 30,
          item: 40,
          it: 80,
          valOne: 20,
          valLineOne: 90,
          valLineTwo: 20
        }, {
          name: 'E类',
          value: 10,
          item: 50,
          it: 80,
          valOne: 20,
          valLineOne: 30,
          valLineTwo: 50
        }];
      }
    },
    barColor: {
      type: Array,
      default: () => {
        return ['#eee', '#80ECFF', '#000', '#6c94b9', '#26FFFF', '#000', '#ccc', '#999'];
      }
    },
    LineStyle: {
      type: Object,
      default: () => {
        return {
          color: ['#26FFFF', '#f8f8f8'],
          lineWidth: 3
        };
      }
    },
    legthColor: {
      type: Array,
      default: () => {
        return ['#4BDBF4', '#71C6FF'];
      }
    },
    linelegthColor: {
      type: Array,
      default: () => {
        return ['#26FFFF', '#f8f8f8'];
      }
    },
    legthWZ: {
      type: Array,
      default: () => {
        return ['A类', 'B类'];
      }
    },
    linelegthWZ: {
      type: Array,
      default: () => {
        return ['注册率', '注销率'];
      }
    },
    unit: {
      type: String,
      default: () => {
        return '%';
      }
    },
    barWidth: {
      type: [String, Number],
      default: () => {
        return '22';
      }
    },
    Width: {
      type: String,
      default: () => {
        return '736px';
      }
    },
    Height: {
      type: String,
      default: () => {
        return '360px';
      }
    },
    legTop: {
      type: String,
      default: () => {
        return '15px';
      }
    },
    legLeft: {
      type: String,
      default: () => {
        return '150px';
      }
    },
    linelegTop: {
      type: String,
      default: () => {
        return '15px';
      }
    },
    linelegLeft: {
      type: String,
      default: () => {
        return '370px';
      }
    },
    legIsShow: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  data() {
    return {
      Xdata: [],
      Ydata: [],
      valTwo: [],
      valthree: [],
      it: [],
      valLineOne: [],
      valLineTwo: [],
      setTime: null,
      chartInst: null
    };
  },
  mounted() {
    // this.getData();
    if (this.rowData && this.rowData.length > 0) {
      this.rowData.forEach(item => {
        this.Xdata.push(item.name);
        this.Ydata.push(item.value);
        this.valTwo.push(item.item);
        this.it.push(item.it);
        this.valthree.push(item.valOne);
        this.valLineOne.push(item.valLineOne);
        this.valLineTwo.push(item.valLineTwo);
      });
    }
    this.drawWidth();
    this.tooltipShuffling();
  },
  methods: {
    drawWidth() {
      // 基于准备好的dom，初始化echarts实例
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      this.chartInst.setOption({
        color: '#00BFFF',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.Xdata,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            //x轴文字的配置
            textStyle: {
              color: '#f8f8f8',
              fontSize: 18,
              fontFamily: '黑体'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#9FAFB5',
              width: 1.2 //这里是为了突出显示加上的
            }
          }
        }],
        yAxis: [{
          name: `单位:${this.unit}`,
          position: 'left',
          type: 'value',
          nameTextStyle: {
            color: '#f8f8f8',
            fontSize: 18,
            padding: 2,
            fontFamily: '黑体'
          },
          axisLabel: {
            //y轴文字的配置
            textStyle: {
              color: '#f8f8f8',
              fontSize: 18,
              fontFamily: 'Helvetica'
            }
          },
          splitNumber: 5,
          // 设置y轴线条的粗细
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#0A223E'],
              width: 2,
              type: 'solid'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#9FAFB5',
              width: 2 //这里是为了突出显示加上的
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(14,29,52,0.3)', 'rgba(191,235,255,0.1)']
            }
          }
        }, {
          name: `单位:${this.unit}`,
          position: 'right',
          type: 'value',
          nameTextStyle: {
            color: '#f8f8f8',
            fontSize: 18,
            padding: 2,
            fontFamily: '黑体'
          },
          axisLabel: {
            //y轴文字的配置
            textStyle: {
              color: '#f8f8f8',
              fontSize: 18,
              fontFamily: 'Helvetica'
            }
          },
          splitNumber: 5,
          // 设置y轴线条的粗细
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#0A223E'],
              width: 1,
              type: 'solid'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#9FAFB5',
              width: 1 //这里是为了突出显示加上的
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(14,29,52,0.3)', 'rgba(191,235,255,0.1)']
            }
          }
        }],
        series: [{
          name: `单位:${this.unit}`,
          type: 'bar',
          stack: 'stack',
          barWidth: this.barWidth,
          data: this.Ydata,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.barColor[0]
              }, {
                offset: 1,
                color: this.barColor[1]
              }])
            }
          }
        }, {
          name: `单位:${this.unit}`,
          type: 'bar',
          stack: 'stack',
          barWidth: this.barWidth,
          data: this.valTwo,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.barColor[2]
              }, {
                offset: 1,
                color: this.barColor[3]
              }])
            }
          }
        }, {
          name: `单位:${this.unit}`,
          type: 'bar',
          stack: 'stack',
          barWidth: this.barWidth,
          data: this.valthree,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.barColor[4]
              }, {
                offset: 1,
                color: this.barColor[5]
              }])
            }
          }
        }, {
          name: `单位:${this.unit}`,
          type: 'bar',
          stack: 'stack',
          barWidth: this.barWidth,
          data: this.it,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.barColor[6]
              }, {
                offset: 1,
                color: this.barColor[7]
              }])
            }
          }
        }, {
          name: `单位:${this.unit}`,
          type: 'line',
          data: this.valLineOne,
          itemStyle: {
            normal: {
              color: this.LineStyle.color[0],
              lineStyle: {
                width: this.LineStyle.lineWidth,
                type: 'solid' //'dotted'虚线 'solid'实线
              }
            }
          }
        }, {
          name: `单位:${this.unit}`,
          type: 'line',
          data: this.valLineTwo,
          itemStyle: {
            normal: {
              color: this.LineStyle.color[1],
              lineStyle: {
                width: this.LineStyle.lineWidth,
                type: 'solid' //'dotted'虚线 'solid'实线
              }
            }
          }
        }]
      });
      //设置默认选中高亮部分
      this.chartInst.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: 0
      }); //鼠标进
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          //表示series中的第几个data数据循环展示
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 2000);
    }
  },
  beforeDestroy() {
    clearInterval(this.setTime);
  },
  watch: {
    rowData: {
      handler() {
        this.Xdata = [];
        this.Ydata = [];
        this.valTwo = [];
        this.valthree = [];
        this.it = [];
        this.valLineTwolTwo = [];
        this.valLineOne = [];
        this.rowData.forEach(item => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
          this.it.push(item.it);
          this.valthree.push(item.valOne);
          this.valLineOne.push(item.valLineOne);
          this.valLineTwo.push(item.valLineTwo);
        });
        this.tooltipShuffling();
        this.drawWidth();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/07-堆叠柱图+折线图/DuitieZhutu.vue?vue&type=script&lang=js
 /* harmony default export */ var _07_DuitieZhutuvue_type_script_lang_js = (DuitieZhutuvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/02-柱图/07-堆叠柱图+折线图/DuitieZhutu.vue?vue&type=style&index=0&id=d5030cb8&prod&lang=less&scoped=true
var DuitieZhutuvue_type_style_index_0_id_d5030cb8_prod_lang_less_scoped_true = __webpack_require__("41cb");

// CONCATENATED MODULE: ./src/components/Chart Library/02-柱图/07-堆叠柱图+折线图/DuitieZhutu.vue






/* normalize component */

var DuitieZhutu_component = Object(componentNormalizer["a" /* default */])(
  _07_DuitieZhutuvue_type_script_lang_js,
  DuitieZhutuvue_type_template_id_d5030cb8_scoped_true_render,
  DuitieZhutuvue_type_template_id_d5030cb8_scoped_true_staticRenderFns,
  false,
  null,
  "d5030cb8",
  null
  
)

/* harmony default export */ var DuitieZhutu = (DuitieZhutu_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ChartLibraryView/Zhutu.vue?vue&type=script&lang=js











/* harmony default export */ var Zhutuvue_type_script_lang_js = ({
  name: 'App',
  components: {
    DuoZhuTu2: DuoZhuTu2,
    PictorialSingleBar: PictorialSingleBar,
    DuoZhuTu: DuoZhuTu,
    StackDuoZhuTu: StackDuoZhuTu,
    CylindricalPlot: CylindricalPlot,
    BarChart3D: BarChart3D,
    HengTwoBarCharts: HengTwoBarCharts,
    CycloneChart: CycloneChart,
    BubbleBar: BubbleBar,
    DuitieZhutu: DuitieZhutu
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log('submit!', this.form);
    },
    copyImportedFileContent(val) {
      axios_default.a.get(`./data/柱图/文本/${val}.txt`).then(res => {
        // 获取要复制的内容
        var textArea = document.createElement('textarea');
        textArea.value = res.data;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        // 提示复制成功
        alert('内容已复制到剪贴板');
      }).catch(err => {
        console.error('加载文件失败：', err);
      });
    }
  }
});
// CONCATENATED MODULE: ./src/views/ChartLibraryView/Zhutu.vue?vue&type=script&lang=js
 /* harmony default export */ var ChartLibraryView_Zhutuvue_type_script_lang_js = (Zhutuvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/ChartLibraryView/Zhutu.vue?vue&type=style&index=0&id=1bbd5968&prod&lang=less&scoped=true
var Zhutuvue_type_style_index_0_id_1bbd5968_prod_lang_less_scoped_true = __webpack_require__("be36");

// CONCATENATED MODULE: ./src/views/ChartLibraryView/Zhutu.vue






/* normalize component */

var Zhutu_component = Object(componentNormalizer["a" /* default */])(
  ChartLibraryView_Zhutuvue_type_script_lang_js,
  Zhutuvue_type_template_id_1bbd5968_scoped_true_render,
  Zhutuvue_type_template_id_1bbd5968_scoped_true_staticRenderFns,
  false,
  null,
  "1bbd5968",
  null
  
)

/* harmony default export */ var Zhutu = (Zhutu_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ChartLibraryView/pieChart.vue?vue&type=template&id=0484db75&scoped=true
var pieChartvue_type_template_id_0484db75_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "zt"
  }, [_c('div', {
    staticClass: "picBox"
  }, [_c('div', [_c('locaLoopChart', {
    attrs: {
      "width": '280px',
      "height": '300px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('locaLoopChart');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('DeiFenHuan', {
    attrs: {
      "width": '280px',
      "height": '200px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('DeiFenHuan');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('roseCharts', {
    attrs: {
      "width": '300px',
      "height": '300px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('roseCharts');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('DoughnutChart', {
    attrs: {
      "width": '300px',
      "height": '300px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    staticStyle: {
      "margin-top": "-50px"
    },
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('DoughnutChart');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('ChartPie'), _c('button', {
    staticClass: "button button--block",
    staticStyle: {
      "margin-top": "-65px"
    },
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('ChartPie');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('DuoHuanTu', {
    attrs: {
      "width": '260px',
      "height": '260px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    staticStyle: {
      "margin-top": "0px"
    },
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('DuoHuanTu');
      }
    }
  }, [_vm._v("复制代码")])], 1)])]);
};
var pieChartvue_type_template_id_0484db75_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/ChartLibraryView/pieChart.vue?vue&type=template&id=0484db75&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/03-饼图/03-玫瑰图/roseCharts.vue?vue&type=template&id=39811738&scoped=true
var roseChartsvue_type_template_id_39811738_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "box"
  }, [_c('div', {
    ref: "NightingaleEcharts",
    style: {
      width: _vm.width,
      height: _vm.height
    },
    attrs: {
      "id": "NightingaleEcharts"
    }
  }), _vm.displayModel == 1 ? _c('div', {
    staticClass: "rose_legend"
  }, _vm._l(_vm.loopData, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "legend"
    }, [_c('div', {
      staticClass: "legend_color",
      style: {
        backgroundColor: _vm.pieceColor[index]
      }
    }), 0 ? undefined : _vm._e(), _c('div', {
      staticClass: "legend_name"
    }, [_vm._v(_vm._s(item.name))]), 0 ? undefined : _vm._e(), _c('div', {
      staticClass: "legend_value",
      style: {
        color: _vm.pieceColor[index]
      }
    }, [_vm._v(_vm._s(item.num))]), 0 ? undefined : _vm._e(), 0 ? undefined : _vm._e()]);
  }), 0) : _vm._e(), _vm.displayModel == 2 ? _c('div', {
    staticClass: "bottomrose_legend"
  }, _vm._l(_vm.loopData, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "legend"
    }, [_c('div', {
      staticClass: "legend_color",
      style: {
        backgroundColor: _vm.pieceColor[index]
      }
    }), 0 ? undefined : _vm._e(), _c('div', {
      staticClass: "legend_name"
    }, [_vm._v(_vm._s(item.name))]), 0 ? undefined : _vm._e(), 0 ? undefined : _vm._e(), 0 ? undefined : _vm._e(), 0 ? undefined : _vm._e()]);
  }), 0) : _vm._e()]);
};
var roseChartsvue_type_template_id_39811738_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/03-玫瑰图/roseCharts.vue?vue&type=template&id=39811738&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/03-饼图/03-玫瑰图/roseCharts.vue?vue&type=script&lang=js

/* harmony default export */ var roseChartsvue_type_script_lang_js = ({
  name: 'NightingaleEcharts',
  props: {
    title: {
      type: String
    },
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '500px'
    },
    //数据
    rowData: {
      type: Array,
      default: () => {
        return [{
          category: '类型1',
          value: 20
        }, {
          category: '类型2',
          value: 30
        }, {
          category: '类型3',
          value: 40
        }, {
          category: '类型4',
          value: 50
        }];
      }
    },
    //图表颜色
    pieceColor: {
      type: Array,
      default: () => {
        return ['#eee', '#ababa9', '#3e464f', '#252d35', '#051839', '#E6C84F'];
      }
    },
    //图表位置
    location: {
      type: Array,
      default: () => {
        return ['120%', '55%'];
      }
    },
    //图表半径
    EchartRadius: {
      type: Array,
      default: () => {
        return [50, 100];
      }
    },
    displayModel: {
      type: [String, Number],
      default: () => {
        return 1;
      }
    }
  },
  data() {
    return {
      option: {
        //title图的标题，副标题，以及位置设置
        title: {
          show: false,
          text: '南丁格尔玫瑰图',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          show: false
          //提示框的数据样式显示
        },
        //图例相关内容的说明

        legend: {
          show: false,
          x: 'left',
          y: 'center',
          //图例的排列默认属性是：水平或垂直,默认是：水平
          orient: 'vertical'
          // data: ['北京', '上海', '广州', '福建', '厦门', '武汉', '青岛', '南京']
        },
        /*
         * toolbox为工具栏；提供导出图片，数据转化，动态数据等信息
         * 保存图片
         */

        toolbox: {
          show: false //是否显示工具栏组件
        },
        calculable: false,
        //手柄拖拽调整选中的范围

        series: [{
          name: this.title,
          type: 'pie',
          radius: this.EchartRadius,
          color: this.pieceColor,
          center: this.location,
          roseType: 'radius',
          width: '40%',
          // for funnel

          max: 140,
          // for funnel

          itemStyle: {
            //普通样式设置
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            },
            //高亮样式设置
            emphasis: {
              label: {
                show: true
              },
              labelLine: {
                show: false
              }
            }
          },
          data: this.rowData
        }]
      },
      ind: 0,
      loopData: [],
      num: 0,
      sum: 0,
      //当前选中的value
      selectedSeries: {
        category: '',
        value: '',
        sum: ''
      }
    };
  },
  methods: {
    initEcharts() {
      let that = this;
      this.myChart = that.$echarts.init(that.$refs.NightingaleEcharts);
      this.loopData = this.convertData(this.rowData, this.legends);
      console.log(this.loopData);
      this.option.series[0].data = this.loopData;
      this.carousel();
      this.myChart.setOption(that.option);
    },
    //value转换
    convertData(rowData) {
      this.sum = 0;
      let returnData = [];
      rowData.forEach(d => {
        this.sum += d.value;
        returnData.push({
          value: d.value,
          name: d.category
          // itemStyle: {
          //   color: legends[d.category]
          // }
        });
      });
      returnData.forEach(d => {
        d.num = this.sum == 0 ? '0' : (d.value / this.sum * 100).toFixed(3) + '%';
      });
      //进度条模式时 倒序排序
      if (this.displayModel == 100) {
        returnData.sort((a, b) => {
          return b.value - a.value;
        });
      }
      //增加千分位
      if (this.displayModel == 2) {
        let re = /(?=(?!(\b))(\d{3})+$)/g;
        returnData.forEach(r => {
          r.value = String(r.value).replace(re, ',');
        });
      }
      return returnData;
    },
    setTimeToDo() {
      const data = this.option.series[0].data;
      data.forEach(e => e.selected = false);
      data[this.num].selected = true;
      this.selectedSeries.category = data[this.num].name;
      // 计算百分比的一个
      this.selectedSeries.value = data[this.num].num;
      // this.selectedSeries =data[this.num]
      // 必须重新设置option，因为echart没有监听data的变化
      this.myChart.setOption(this.option);
    },
    setHighLight() {
      clearInterval(this.timer);
      const data = this.option.series[0].data;
      this.timer = setInterval(() => {
        if (this.num < data.length - 1) {
          this.num++;
        } else {
          this.num = 0;
        }
        this.setTimeToDo();
      }, 1000);
    },
    //轮播
    carousel() {
      if (this.option.series[0].data.length > 0) {
        //开启定时器
        this.setTimeToDo();
        this.setHighLight();
        this.myChart.on('mouseover', params => {
          clearInterval(this.timer);
          // 鼠标快速移动时，会导致mouseover里的代码来不及执行，引起事件延迟，出现多个扇形区域同时被选中的现象，所以有必要设置防抖函数
          this.debounce && clearTimeout(this.debounce);
          this.debounce = setTimeout(() => {
            const data = this.option.series[0].data;
            data.forEach(e => e.selected = false);
            data[params.dataIndex].selected = true;
            this.myChart.setOption(this.option);
            this.num = params.dataIndex;
          }, 300);
        });
        this.myChart.on('mouseout', () => {
          this.setTimeToDo();
          this.setHighLight();
        });
      }
    }
  },
  mounted() {
    if (this.rowData && this.rowData.length > 0) {
      this.initEcharts();
    }
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
    this.debounce && clearTimeout(this.debounce);
  },
  watch: {
    rowData: {
      handler(neVal) {
        let that = this;
        this.option.series[0].data = [];
        this.loopData = this.convertData(neVal, this.legends);
        this.option.series[0].data = this.loopData;
        this.$nextTick(() => {
          let chart = this.$echarts.init(this.$refs.NightingaleEcharts);
          this.carousel();
          chart.setOption(this.option);
          that.initEcharts();
        });
      },
      deep: true
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/03-玫瑰图/roseCharts.vue?vue&type=script&lang=js
 /* harmony default export */ var _03_roseChartsvue_type_script_lang_js = (roseChartsvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/03-饼图/03-玫瑰图/roseCharts.vue?vue&type=style&index=0&id=39811738&prod&lang=less&scoped=true
var roseChartsvue_type_style_index_0_id_39811738_prod_lang_less_scoped_true = __webpack_require__("9858");

// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/03-玫瑰图/roseCharts.vue






/* normalize component */

var roseCharts_component = Object(componentNormalizer["a" /* default */])(
  _03_roseChartsvue_type_script_lang_js,
  roseChartsvue_type_template_id_39811738_scoped_true_render,
  roseChartsvue_type_template_id_39811738_scoped_true_staticRenderFns,
  false,
  null,
  "39811738",
  null
  
)

/* harmony default export */ var roseCharts = (roseCharts_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/03-饼图/01-基础饼图/ChartPie.vue?vue&type=template&id=60e18257&scoped=true
var ChartPievue_type_template_id_60e18257_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticStyle: {
      "position": "relative"
    },
    style: {
      width: `${_vm.width}`,
      height: `${_vm.height}`
    }
  }, [_c('div', {
    ref: "loop",
    staticClass: "positionloopecharts",
    style: {
      width: `${_vm.width}`,
      height: `${_vm.height}`
    }
  }), _vm.PietextShow ? _c('div', {
    staticClass: "loop_label"
  }, [_c('div', {
    staticClass: "text",
    attrs: {
      "title": _vm.selectedSeries.legend
    },
    domProps: {
      "innerHTML": _vm._s(_vm.selectedSeries.legend)
    }
  }), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.labelvalue,
      expression: "!labelvalue"
    }],
    staticClass: "num",
    domProps: {
      "textContent": _vm._s(_vm.selectedSeries.measure)
    }
  }), _c('div', {
    staticClass: "unit",
    domProps: {
      "textContent": _vm._s(_vm.selectedSeries.unit)
    }
  })]) : _vm._e()]), _c('div', {
    staticClass: "right"
  }, _vm._l(_vm.loopData, function (d, index) {
    return _c('div', {
      key: index,
      staticClass: "right_item"
    }, [_c('div', {
      staticClass: "legend1"
    }, [_c('div', {
      staticClass: "legend",
      style: {
        'background-image': `linear-gradient(to right,${d.itemStyle.color}, rgba(255,255,255,0.8))`,
        width: d.num
      }
    }), _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.labelvalue,
        expression: "!labelvalue"
      }],
      staticClass: "num",
      domProps: {
        "textContent": _vm._s(d.num)
      }
    })]), _c('div', {
      staticClass: "text",
      attrs: {
        "title": d.name
      },
      domProps: {
        "innerHTML": _vm._s(d.name)
      }
    })]);
  }), 0)]);
};
var ChartPievue_type_template_id_60e18257_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/01-基础饼图/ChartPie.vue?vue&type=template&id=60e18257&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/03-饼图/01-基础饼图/ChartPie.vue?vue&type=script&lang=js

/* harmony default export */ var ChartPievue_type_script_lang_js = ({
  props: {
    height: {
      type: String,
      default: '300px'
    },
    //高度
    width: {
      type: String,
      default: '200px'
    },
    //宽度
    radius: {
      type: String,
      default: '75%'
    },
    //宽度
    // marginNum: { type: String, default: '8px 0 10px 0' }, // 图例的margin指
    // 数据
    rowData: {
      type: Array,
      default: () => {
        return [{
          measure: 24,
          legend: '杨树'
        }, {
          measure: 21,
          legend: '松树'
        }, {
          measure: 17,
          legend: '柏树'
        }, {
          measure: 14,
          legend: '梧桐树'
        }, {
          measure: 8,
          legend: '银杏树'
        }];
      }
    },
    //图例数据
    legends: {
      type: Array,
      default: () => {
        return ['#eeeeee', '#ababa9', '#b8e5fe', '#3f89b1', '#3e464f', '#252d35', '#2693FF', '#00698C', '#00664C', '#248E64'];
      }
    },
    colors: {},
    // 饼图中间文字初始化是否显示
    pietext: {
      type: Boolean,
      default: true
    },
    //中间文字是否显示
    PietextShow: {
      type: Boolean,
      default: true
    },
    // 是否开启轮播
    rotation: {
      type: Boolean,
      default: true
    },
    twounit: {
      type: String,
      default: '个'
    },
    //第二种图例 单位
    // 中心文字是否显示原始值
    labelvalue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loopData: [],
      num: 0,
      //当前选中的数据
      selectedSeries: {
        legend: '',
        measure: '',
        value: '',
        unit: ''
      },
      sum: 0,
      displayModel: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.drawChart();
    });
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      this.loopChart = this.$echarts.init(this.$refs.loop);
      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{d}%',
          textStyle: {
            fontSize: 18
          }
        },
        series: [{
          type: 'pie',
          radius: [this.radius, '90%'],
          center: ['50%', '40%'],
          hoverAnimation: false,
          selectedMode: 'single',
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          data: []
        }]
      };
      this.loopData = this.convertData(this.rowData, this.legends);
      this.option.series[0].data = this.loopData;
      this.carousel();
      this.loopChart.setOption(this.option);
    },
    //数据转换
    convertData(rowData, legends) {
      this.sum = 0;
      let returnData = [];
      if (rowData.length > 0) {
        rowData.forEach((d, index) => {
          this.sum += d.measure;
          returnData.push({
            value: d.measure,
            name: d.legend,
            unit: d.unit,
            itemStyle: {
              color: legends[index % 10]
            }
          });
        });
        returnData.forEach(d => {
          d.num = this.sum == 0 ? '0' : (d.value / this.sum * 100).toFixed(1) + '%';
        });
        if (returnData.length > 0 && returnData[0].value == this.sum) {
          returnData[0].num = '100%';
        }

        //增加千分位
        if (this.displayModel == 2) {
          let re = /(?=(?!(\b))(\d{3})+$)/g;
          returnData.forEach(r => {
            r.value = String(r.value).replace(re, ',');
          });
        }
      } else {
        returnData.push({
          name: '暂无数据',
          value: '0',
          num: '0%',
          itemStyle: {
            color: '#373F55'
          }
        });
      }
      return returnData;
    },
    setTimeToDo() {
      const data = this.option.series[0].data;
      data.forEach(e => e.selected = false);
      data[this.num].selected = true;
      this.selectedSeries.legend = data[this.num].name;
      this.selectedSeries.measure = data[this.num].num;
      this.selectedSeries.value = data[this.num].value;
      this.selectedSeries.unit = data[this.num].unit;
      // 必须重新设置option，因为echart没有监听data的变化
      this.loopChart.setOption(this.option);
    },
    setHighLight() {
      clearInterval(this.timer);
      const data = this.option.series[0].data;
      this.timer = setInterval(() => {
        if (this.num < data.length - 1) {
          this.num++;
        } else {
          this.num = 0;
        }
        this.setTimeToDo();
      }, 2000);
    },
    //轮播
    carousel() {
      if (this.option.series[0].data.length > 0) {
        //开启定时器
        if (this.pietext) {
          this.setTimeToDo();
        }
        if (this.rotation) {
          this.setHighLight();
        }
        this.loopChart.on('mouseover', params => {
          clearInterval(this.timer);
          // 鼠标快速移动时，会导致mouseover里的代码来不及执行，引起事件延迟，出现多个扇形区域同时被选中的现象，所以有必要设置防抖函数
          this.debounce && clearTimeout(this.debounce);
          this.debounce = setTimeout(() => {
            const data = this.option.series[0].data;
            data.forEach(e => e.selected = false);
            data[params.dataIndex].selected = true;
            this.loopChart.setOption(this.option);
            this.num = params.dataIndex;
          }, 300);
        });
        this.loopChart.on('mouseout', () => {
          this.setTimeToDo();
          this.setHighLight();
        });
      }
    }
  },
  watch: {
    rowData: {
      handler(neVal) {
        this.option.series[0].data = [];
        this.loopData = this.convertData(neVal, this.legends);
        this.option.series[0].data = this.loopData;
        this.$nextTick(() => {
          this.num = 0;
          this.selectedSeries = {
            legend: '',
            measure: '',
            unit: ''
          };
          this.sum = 0;
          let chart = this.$echarts.init(this.$refs.loop);
          this.carousel();
          chart.setOption(this.option);
        });
      },
      deep: false
    }
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
    this.debounce && clearTimeout(this.debounce);
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/01-基础饼图/ChartPie.vue?vue&type=script&lang=js
 /* harmony default export */ var _01_ChartPievue_type_script_lang_js = (ChartPievue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/03-饼图/01-基础饼图/ChartPie.vue?vue&type=style&index=0&id=60e18257&prod&lang=less&scoped=true
var ChartPievue_type_style_index_0_id_60e18257_prod_lang_less_scoped_true = __webpack_require__("0c3d");

// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/01-基础饼图/ChartPie.vue






/* normalize component */

var ChartPie_component = Object(componentNormalizer["a" /* default */])(
  _01_ChartPievue_type_script_lang_js,
  ChartPievue_type_template_id_60e18257_scoped_true_render,
  ChartPievue_type_template_id_60e18257_scoped_true_staticRenderFns,
  false,
  null,
  "60e18257",
  null
  
)

/* harmony default export */ var ChartPie = (ChartPie_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/03-饼图/01-基础饼图/locaLoopChart.vue?vue&type=template&id=71066bfb&scoped=true
var locaLoopChartvue_type_template_id_71066bfb_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "loop"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    ref: "loop",
    staticClass: "pie",
    style: {
      width: `${_vm.width}`,
      height: `${_vm.height}`
    }
  }), _c('div', {
    staticClass: "loop_label",
    style: {
      left: `${_vm.loop_labelStyle.left}`,
      top: `${_vm.loop_labelStyle.top}`
    }
  }, [_c('div', {
    staticClass: "text",
    domProps: {
      "textContent": _vm._s(_vm.selectedSeries.category)
    }
  }), _c('div', {
    staticClass: "num",
    domProps: {
      "textContent": _vm._s(_vm.selectedSeries.value)
    }
  })]), _vm.displayModel == 0 ? _c('div', {
    staticClass: "right"
  }, _vm._l(_vm.loopData, function (d, index) {
    return _c('div', {
      key: index,
      staticClass: "right_item"
    }, [_c('div', {
      staticClass: "legend",
      style: {
        'background-color': d.itemStyle.color
      }
    }), _c('div', {
      staticClass: "text",
      domProps: {
        "textContent": _vm._s(d.name)
      }
    }), _c('div', {
      staticClass: "num",
      style: {
        color: d.itemStyle.color
      },
      domProps: {
        "textContent": _vm._s(d.value)
      }
    })]);
  }), 0) : _vm.displayModel == 1 ? _c('div', {
    staticClass: "right"
  }, _vm._l(_vm.loopData, function (d, index) {
    return _c('div', {
      key: index,
      staticClass: "right_item_2"
    }, [_c('div', {
      staticClass: "top"
    }, [_c('div', {
      staticClass: "text",
      domProps: {
        "textContent": _vm._s(d.name)
      }
    }), _c('div', {
      staticClass: "num",
      domProps: {
        "textContent": _vm._s(d.value)
      }
    }), _c('div', {
      staticClass: "unit"
    }, [_vm._v("个")])]), _c('div', {
      staticClass: "progress",
      style: {
        background: `linear-gradient(90deg, ${d.itemStyle.color} ${d.num}, #495472 ${d.num})`
      }
    })]);
  }), 0) : _vm._e(), _vm.displayModel == 2 ? _c('div', {
    staticClass: "right"
  }, _vm._l(_vm.loopData, function (d, index) {
    return _c('div', {
      key: index,
      staticClass: "right_item_3"
    }, [_c('div', {
      staticClass: "legend",
      style: {
        'background-color': d.itemStyle.color
      }
    }), _c('div', {
      staticClass: "text",
      domProps: {
        "textContent": _vm._s(d.name)
      }
    }), _c('div', {
      staticClass: "num",
      style: {
        color: d.itemStyle.color
      },
      domProps: {
        "textContent": _vm._s(d.num)
      }
    }), _c('div', {
      staticClass: "unitNum",
      domProps: {
        "textContent": _vm._s(d.value)
      }
    }), _c('div', {
      staticClass: "unit"
    }, [_vm._v("个")])]);
  }), 0) : _vm._e(), _vm.displayModel === 3 && _vm.lengthShow == true ? _c('div', {
    staticClass: "rose_legend"
  }, _vm._l(_vm.loopData, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "legend",
      style: {
        paddingBottom: _vm.paddingBottom
      }
    }, [0 ? undefined : _vm._e(), _c('div', {
      staticClass: "legend_progress",
      style: {
        backgroundColor: _vm.color[index]
      }
    }), _c('div', {
      staticClass: "legend_name",
      on: {
        "click": function ($event) {
          return _vm.changeRegion($event, item.name);
        }
      }
    }, [_c('div', {
      staticClass: "name_label"
    }, [_vm._v(_vm._s(item.name))]), _c('div', {
      staticClass: "num_label",
      style: {
        color: _vm.color[index]
      }
    }, [_vm._v(" " + _vm._s(item.value) + " ")]), _vm.showValue ? _c('div', {
      staticClass: "value_label"
    }, [_vm._v(_vm._s(item.value))]) : _vm._e(), _c('div', {
      staticClass: "unit"
    }, [_vm._v(_vm._s(_vm.legthunit))])])]);
  }), 0) : _vm._e()])]);
};
var locaLoopChartvue_type_template_id_71066bfb_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/01-基础饼图/locaLoopChart.vue?vue&type=template&id=71066bfb&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/03-饼图/01-基础饼图/locaLoopChart.vue?vue&type=script&lang=js


/* harmony default export */ var locaLoopChartvue_type_script_lang_js = ({
  name: 'LoopChartTj',
  props: {
    height: {
      type: String,
      default: '800px'
    },
    //高度
    width: {
      type: String,
      default: '800px'
    },
    //宽度
    legthunit: {
      type: String,
      default: '个'
    },
    paddingBottom: {
      type: String,
      default: '6px'
    },
    // value
    rowData: {
      type: Array,
      default: () => {
        return [{
          category: '类型1',
          value: 10
        }, {
          category: '类型2',
          value: 20
        }, {
          category: '类型3',
          value: 30
        }, {
          category: '类型4',
          value: 40
        }];
      }
    },
    lengthShow: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    showValue: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    color: {
      type: Array,
      default: () => {
        return ['#eeeeee', '#ababa9', '#415568', '#252d35'];
      }
    },
    // 图表文字中间位置
    loop_labelStyle: {
      type: Object,
      default: () => {
        return {
          left: '8%',
          top: '45%'
        };
      }
    },
    legendsStyle: {
      type: Object,
      default: () => {
        return {
          display: 'block',
          right: '2px',
          unitright: '-27px'
        };
      }
    },
    //图例value
    legends: {
      type: Object,
      default: () => {
        return {
          城管采集员: '#00BFFF',
          执法人员: '#FFE426',
          坐席人员: '#00DD8A',
          离岗: '#96FF2B'
        };
      }
    },
    displayModel: {
      type: Number,
      default: 3 //0 图例 1 进度条 2 图例+个数
    },
    chartStyle: {
      type: Object,
      default: () => {
        return {
          left: 6,
          top: 6,
          right: 6,
          bottom: 6
        };
      }
    }
  },
  data() {
    return {
      ind: 0,
      loopData: [],
      num: 0,
      //当前选中的value
      selectedSeries: {
        category: '',
        value: ''
      },
      sum: 0,
      Status: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.draw();
    });
  },
  methods: {
    changeRegion(e, item) {
      e.stopPropagation();
      this.$emit('changeRegion', item);
    },
    draw() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(this.$refs.loop);
      this.option = {
        tooltip: {
          // trigger: 'item',
          // formatter: '{b}:{d}%'
          show: false
        },
        series: [{
          // ...this.chartStyle,
          type: 'pie',
          // radius: '50%',
          radius: ['95%', '72%'],
          hoverAnimation: false,
          selectedMode: 'single',
          color: [new echarts["graphic"].LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: this.color[0] + '00'
          }, {
            offset: 1,
            color: this.color[0]
          }]), new echarts["graphic"].LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: this.color[1] + '00'
          }, {
            offset: 1,
            color: this.color[1]
          }]), new echarts["graphic"].LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: this.color[2] + '00'
          }, {
            offset: 1,
            color: this.color[2]
          }]), new echarts["graphic"].LinearGradient(1, 0, 0, 0, [{
            offset: 0,
            color: this.color[3] + '00'
          }, {
            offset: 1,
            color: this.color[3]
          }]), new echarts["graphic"].LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: this.color[4] + '00'
          }, {
            offset: 1,
            color: this.color[4]
          }])],
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          data: []
        }]
      };
      this.loopData = this.convertData(this.rowData, this.legends);
      this.option.series[0].data = this.loopData;
      this.carousel();
      this.myChart.setOption(this.option);
    },
    //value转换
    convertData(rowData) {
      this.sum = 0;
      let returnData = [];
      rowData.forEach(d => {
        this.sum += d.value;
        returnData.push({
          value: d.value,
          name: d.category
          // itemStyle: {
          //   color: legends[d.category]
          // }
        });
      });
      returnData.forEach(d => {
        d.num = this.sum == 0 ? '0' : (d.value / this.sum * 100).toFixed(0) + '%';
      });

      //进度条模式时 倒序排序
      if (this.displayModel == 1) {
        returnData.sort((a, b) => {
          return b.value - a.value;
        });
      }

      //增加千分位
      if (this.displayModel == 2) {
        let re = /(?=(?!(\b))(\d{3})+$)/g;
        returnData.forEach(r => {
          r.value = String(r.value).replace(re, ',');
        });
      }
      return returnData;
    },
    setTimeToDo() {
      const data = this.option.series[0].data;
      data.forEach(e => e.selected = false);
      data[this.num].selected = false;
      this.selectedSeries.category = data[this.num].name;
      // 计算百分比的一个
      // this.selectedSeries.value = data[this.num].num
      this.selectedSeries.value = data[this.num].value;

      // 必须重新设置option，因为echart没有监听data的变化
      this.myChart.setOption(this.option);
    },
    setHighLight() {
      clearInterval(this.timer);
      const data = this.option.series[0].data;
      console.log(data, 'datadata5');
      this.timer = setInterval(() => {
        if (this.num < data.length - 1) {
          this.num++;
        } else {
          this.num = 0;
        }
        this.setTimeToDo();
      }, 3000);
    },
    //轮播
    carousel() {
      if (this.option.series[0].data.length > 0) {
        //开启定时器
        this.setTimeToDo();
        this.setHighLight();
        this.myChart.on('mouseover', params => {
          clearInterval(this.timer);
          // 鼠标快速移动时，会导致mouseover里的代码来不及执行，引起事件延迟，出现多个扇形区域同时被选中的现象，所以有必要设置防抖函数
          this.debounce && clearTimeout(this.debounce);
          this.debounce = setTimeout(() => {
            const data = this.option.series[0].data;
            data.forEach(e => e.selected = false);
            data[params.dataIndex].selected = true;
            this.myChart.setOption(this.option);
            this.num = params.dataIndex;
          }, 300);
        });
        this.myChart.on('mouseout', () => {
          this.setTimeToDo();
          this.setHighLight();
        });
      }
    }
  },
  watch: {
    rowData: {
      handler(neVal) {
        this.option.series[0].data = [];
        this.loopData = this.convertData(neVal, this.legends);
        this.option.series[0].data = this.loopData;
        this.$nextTick(() => {
          let chart = this.$echarts.init(this.$refs.loop);
          this.carousel();
          chart.setOption(this.option);
        });
      },
      deep: false
    }
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
    this.debounce && clearTimeout(this.debounce);
    this.myChart.dispose();
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/01-基础饼图/locaLoopChart.vue?vue&type=script&lang=js
 /* harmony default export */ var _01_locaLoopChartvue_type_script_lang_js = (locaLoopChartvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/03-饼图/01-基础饼图/locaLoopChart.vue?vue&type=style&index=0&id=71066bfb&prod&lang=less&scoped=true
var locaLoopChartvue_type_style_index_0_id_71066bfb_prod_lang_less_scoped_true = __webpack_require__("b7c5");

// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/01-基础饼图/locaLoopChart.vue






/* normalize component */

var locaLoopChart_component = Object(componentNormalizer["a" /* default */])(
  _01_locaLoopChartvue_type_script_lang_js,
  locaLoopChartvue_type_template_id_71066bfb_scoped_true_render,
  locaLoopChartvue_type_template_id_71066bfb_scoped_true_staticRenderFns,
  false,
  null,
  "71066bfb",
  null
  
)

/* harmony default export */ var locaLoopChart = (locaLoopChart_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/03-饼图/01-基础饼图/DeiFenHuan.vue?vue&type=template&id=301e737a&scoped=true
var DeiFenHuanvue_type_template_id_301e737a_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "chartBox"
  }, [_c('div', {
    ref: "myChart",
    staticClass: "myChart",
    style: {
      width: _vm.echartStyle.width + 'px',
      height: _vm.echartStyle.height + 'px'
    }
  }), _c('div', {
    staticClass: "echartLegend",
    style: {
      width: _vm.echartStyle.width + 'px',
      height: _vm.echartStyle.height + 'px',
      'margin-top': _vm.echartStyle.top + 'px'
    }
  }, [_c('div', {
    staticClass: "title",
    style: {
      'margin-top': _vm.marginTop + 'px'
    }
  }, [_vm._v(" " + _vm._s(_vm.title) + " ")]), _c('div', {
    staticClass: "percentage"
  }, [_vm._v(_vm._s(_vm.perCentage) + "%")])]), _c('div', {
    staticClass: "cont",
    style: {
      width: _vm.contStyle.width + 'px',
      height: _vm.contStyle.height + 'px'
    }
  }, [_c('div', {
    staticClass: "cont_box"
  }, _vm._l(_vm.echartData, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "context"
    }, [_c('div', {
      staticClass: "context_bg",
      style: {
        background: _vm.echartColor[index]
      }
    }), _c('div', {
      staticClass: "context_tit"
    }, [_vm._v(_vm._s(_vm.echartLegend[index]))]), _c('div', {
      staticClass: "context_per",
      style: {
        color: _vm.echartColor[index]
      }
    }, [_vm._v(_vm._s(_vm.echartPer[index]) + "%")])]);
  }), 0)])]);
};
var DeiFenHuanvue_type_template_id_301e737a_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/01-基础饼图/DeiFenHuan.vue?vue&type=template&id=301e737a&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/03-饼图/01-基础饼图/DeiFenHuan.vue?vue&type=script&lang=js
/* harmony default export */ var DeiFenHuanvue_type_script_lang_js = ({
  props: {
    //饼图图例数据
    echartLegend: {
      type: Array,
      default() {
        return ['类型1', '类型2', '类型3'];
      }
    },
    //饼图图例上间距
    marginTop: {
      type: String,
      default() {
        return '92';
      }
    },
    //饼图宽高  左侧图例上间距
    echartStyle: {
      type: Object,
      default() {
        return {
          width: 300,
          height: 300,
          top: 20
        };
      }
    },
    //饼图数据
    echartData: {
      type: Array,
      default() {
        return [20, 30, 40];
      }
    },
    //饼图位置
    echartCenter: {
      type: Array,
      default() {
        return ['50%', '50%'];
      }
    },
    //饼图内外半径
    echartRadius: {
      type: Array,
      default() {
        return ['50%', '70%'];
      }
    },
    //饼图颜色
    echartColor: {
      type: Array,
      default() {
        return ['#eee', '#ababa9', '#3e464f', '#252d35', '#94FF27', '#7473FF', '#BFFFFF', '#7473FF', '#BFFFFF'];
      }
    },
    //饼图右侧图例宽高
    contStyle: {
      type: Object,
      default() {
        return {
          width: 280,
          height: 280
        };
      }
    },
    //饼图百分比
    echartPer: {
      type: Array,
      default() {
        return ['34', '46', '20'];
      }
    }
  },
  data() {
    return {
      data: [],
      myChart: null,
      initTimer: null,
      currentIndex: -1,
      setTime: null,
      title: '类型1',
      perCentage: '34'
    };
  },
  mounted() {
    this.draw();
    this.timerMode();
  },
  methods: {
    draw() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(this.$refs.myChart);
      // 绘制图表
      this.myChart.setOption({
        color: this.echartColor,
        // tooltip: {
        //   trigger: "item",
        // },
        legend: {
          data: [],
          type: 'scroll',
          orient: 'vertical',
          selectedMode: false,
          left: 240,
          top: 60,
          bottom: 20,
          itemGap: 44,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            color: '#f8f8f8',
            fontSize: 14,
            fontFamily: '黑体'
          }
        },
        series: [{
          showbackground: false,
          type: 'pie',
          radius: this.echartRadius,
          center: this.echartCenter,
          selectedMode: 'single',
          data: this.echartData,
          labelLine: {
            show: false
          }
        }]
      });
    },
    timerMode() {
      clearInterval(this.setTime);
      this.setTime = null;
      let str = 0;
      this.setTime = setInterval(() => {
        this.title = this.echartLegend[str];
        this.perCentage = this.echartPer[str];
        // 取消之前高亮的图形
        this.myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          //表示series中的第几个data数据循环展示
          dataIndex: this.currentIndex
        });
        str = (str + 1) % this.echartData.length;
        this.currentIndex = (this.currentIndex + 1) % this.echartData.length;
        //高亮
        this.myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.currentIndex
        });
      }, 2000);
    }
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    this.setTime = null;
  },
  watch: {
    echartData: {
      handler() {
        this.draw();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/01-基础饼图/DeiFenHuan.vue?vue&type=script&lang=js
 /* harmony default export */ var _01_DeiFenHuanvue_type_script_lang_js = (DeiFenHuanvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/03-饼图/01-基础饼图/DeiFenHuan.vue?vue&type=style&index=0&id=301e737a&prod&lang=less&scoped=true
var DeiFenHuanvue_type_style_index_0_id_301e737a_prod_lang_less_scoped_true = __webpack_require__("2fba");

// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/01-基础饼图/DeiFenHuan.vue






/* normalize component */

var DeiFenHuan_component = Object(componentNormalizer["a" /* default */])(
  _01_DeiFenHuanvue_type_script_lang_js,
  DeiFenHuanvue_type_template_id_301e737a_scoped_true_render,
  DeiFenHuanvue_type_template_id_301e737a_scoped_true_staticRenderFns,
  false,
  null,
  "301e737a",
  null
  
)

/* harmony default export */ var DeiFenHuan = (DeiFenHuan_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/03-饼图/04-多环图/DoughnutChart.vue?vue&type=template&id=5e13963b&scoped=true
var DoughnutChartvue_type_template_id_5e13963b_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "doughBox"
  }, [_c('div', {
    ref: "chart",
    staticClass: "doughnu"
  }), _vm.displayModel == 1 ? _c('div', {
    staticClass: "rose_legend"
  }, _vm._l(_vm.loopData, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "legend"
    }, [_c('div', {
      staticClass: "legend_color"
    }), _c('div', {
      staticClass: "legend_progress",
      style: {
        backgroundColor: _vm.color[index],
        width: 'calc(' + item.num + ' - 0px)'
      }
    }), _c('div', {
      staticClass: "legend_name"
    }, [_vm._v(_vm._s(item.name))]), _c('div', {
      staticClass: "legend_bar"
    }), _c('div', {
      staticClass: "legend_value",
      style: {
        color: _vm.color[index]
      }
    }, [_vm._v(_vm._s(item.num))]), 0 ? undefined : _vm._e(), 0 ? undefined : _vm._e()]);
  }), 0) : _vm._e(), _vm.displayModel == 2 ? _c('div', {
    staticClass: "rectrose_legend"
  }, _vm._l(_vm.loopData, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "legend"
    }, [_c('div', {
      staticClass: "legend_color",
      style: {
        backgroundColor: _vm.color[index]
      }
    }), _c('div', {
      staticClass: "legend_name",
      style: {
        color: '#f8f8f8'
      }
    }, [_vm._v(_vm._s(item.name))])]);
  }), 0) : _vm._e(), _c('div', {
    staticClass: "doughPos",
    style: _vm.doughPosStyle
  }, _vm._l(_vm.loopData, function (item, index) {
    return _c('li', {
      key: index
    }, [_vm._v(_vm._s(item.name))]);
  }), 0)]);
};
var DoughnutChartvue_type_template_id_5e13963b_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/04-多环图/DoughnutChart.vue?vue&type=template&id=5e13963b&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/03-饼图/04-多环图/DoughnutChart.vue?vue&type=script&lang=js


/* harmony default export */ var DoughnutChartvue_type_script_lang_js = ({
  props: {
    doughPosStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 表示图表的个数
    data: {
      type: Array,
      default: () => {
        return [5, 6, 7, 8];
      }
    },
    barWidth: {
      type: [String, Number],
      default: () => {
        return 17;
      }
    },
    displayModel: {
      type: [String, Number],
      default: () => {
        return 1;
      }
    },
    obj: {
      type: Object,
      default: () => {
        return {};
      }
    },
    color: {
      type: Array,
      default: () => {
        return ['#eee', '#ababa9', '#3e464f', '#252d35', '#051839'];
      }
    },
    rowData: {
      type: Array,
      default: () => {
        return [{
          category: '类型1',
          value: 20
        }, {
          category: '类型2',
          value: 30
        }, {
          category: '类型3',
          value: 40
        }, {
          category: '类型4',
          value: 50
        }];
      }
    }
  },
  data() {
    return {
      chartInst: null,
      option: {},
      setTime: null,
      loopData: [],
      num: 0,
      //当前选中的value
      selectedSeries: {
        category: '',
        value: '',
        sum: ''
      },
      sum: 0
    };
  },
  methods: {
    instantiation() {
      this.chartInst = echarts["init"](this.$refs.chart);
      let _this = this;
      this.option = {
        angleAxis: {
          max: 12,
          startAngle: 90,
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          minorTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          minorSplitLine: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisPointer: {
            show: false
          }
        },
        radiusAxis: {
          type: 'category',
          show: false
        },
        polar: {},
        series: [{
          type: 'bar',
          barGap: '75%',
          data: this.data,
          barWidth: this.barWidth,
          animationEasing: 'bounceOut',
          //初始动画
          itemStyle: {
            normal: {
              // 定制显示（按顺序）
              color: function (params) {
                return _this.color[params.dataIndex];
              }
              // color:this.dough
            }
          },
          coordinateSystem: 'polar'
        }],
        legend: {
          show: true
        }
      };
      this.loopData = this.convertData(this.rowData, this.legends);
      this.chartInst.setOption(this.option, true);
    },
    //value转换
    convertData(rowData) {
      this.sum = 0;
      let returnData = [];
      rowData.forEach(d => {
        this.sum += d.value;
        returnData.push({
          value: d.value,
          name: d.category,
          num: d.value
          // itemStyle: {
          //   color: legends[d.category]
          // }
        });
      });
      returnData.forEach(d => {
        d.num = this.sum == 0 ? '0' : (d.value / this.sum * 100).toFixed(0) + '%';
      });
      //进度条模式时 倒序排序
      if (this.displayModel == 100000) {
        returnData.sort((a, b) => {
          return b.value - a.value;
        });
      }
      //增加千分位
      if (this.displayModel == 2) {
        let re = /(?=(?!(\b))(\d{3})+$)/g;
        returnData.forEach(r => {
          r.value = String(r.value).replace(re, ',');
        });
      }
      return returnData;
    }
  },
  mounted() {
    this.instantiation();
  },
  beforeDestroy() {
    echarts["init"](this.$refs.chart).dispose();
  },
  watch: {
    dough: {
      handler() {
        this.instantiation();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/04-多环图/DoughnutChart.vue?vue&type=script&lang=js
 /* harmony default export */ var _04_DoughnutChartvue_type_script_lang_js = (DoughnutChartvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/03-饼图/04-多环图/DoughnutChart.vue?vue&type=style&index=0&id=5e13963b&prod&lang=less&scoped=true
var DoughnutChartvue_type_style_index_0_id_5e13963b_prod_lang_less_scoped_true = __webpack_require__("1f34");

// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/04-多环图/DoughnutChart.vue






/* normalize component */

var DoughnutChart_component = Object(componentNormalizer["a" /* default */])(
  _04_DoughnutChartvue_type_script_lang_js,
  DoughnutChartvue_type_template_id_5e13963b_scoped_true_render,
  DoughnutChartvue_type_template_id_5e13963b_scoped_true_staticRenderFns,
  false,
  null,
  "5e13963b",
  null
  
)

/* harmony default export */ var DoughnutChart = (DoughnutChart_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/03-饼图/04-多环图/DuoHuanTu.vue?vue&type=template&id=89dbfed6&scoped=true
var DuoHuanTuvue_type_template_id_89dbfed6_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cs-dashboard",
    style: {
      width: _vm.width,
      height: _vm.height
    }
  }, [_c('div', {
    ref: "chart",
    staticClass: "chart",
    style: {
      width: _vm.width,
      height: _vm.height
    },
    on: {
      "mouseover": _vm.mouseover,
      "mouseleave": _vm.mouseleave
    }
  }), _c('div', {
    staticClass: "cont_box"
  }, _vm._l(_vm.rowData, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "context"
    }, [_c('div', {
      staticClass: "context_bg"
    }, [_vm._v(_vm._s(item.uid))]), _c('div', {
      staticClass: "context_per",
      staticStyle: {
        "color": "#f8f8f8"
      }
    }, [_vm._v(_vm._s(item.value) + "%")])]);
  }), 0)]);
};
var DuoHuanTuvue_type_template_id_89dbfed6_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/04-多环图/DuoHuanTu.vue?vue&type=template&id=89dbfed6&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/03-饼图/04-多环图/DuoHuanTu.vue?vue&type=script&lang=js

/* harmony default export */ var DuoHuanTuvue_type_script_lang_js = ({
  props: {
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '500px'
    },
    rowData: {
      type: Array,
      default: () => {
        return [{
          uid: 'A类',
          value: 5
        }, {
          uid: 'B类',
          value: 2
        }, {
          uid: 'C类',
          value: 3
        }, {
          uid: 'D类',
          value: 4
        }];
      }
    },
    pieceColor: {
      type: Array,
      default: () => {
        return ['#eee', '#ababa9', '#3e464f', '#252d35', '#051839', '#E6C84F'];
      }
    },
    barWidth: {
      type: String,
      default: () => {
        return '20';
      }
    },
    fontStyle: {
      type: Object,
      default: () => {
        return {
          color: '#f8f8f800',
          fontSize: 20,
          fontFamily: '黑体',
          interval: 0
        };
      }
    }
  },
  data() {
    return {
      radiusAxisData: [],
      seriesData: [],
      chartInst: null
    };
  },
  mounted() {
    const that = this;
    let max = 0;
    if (this.rowData && this.rowData.length > 0) {
      this.rowData.forEach(item => {
        this.radiusAxisData.push(item.uid);
        this.seriesData.push(item.value);
        if (item.value > max) {
          max = item.value;
        }
      });
      //为效果好看追加最大值防止圆环闭环
      this.seriesData.push(max *= 1.1);
    }
    that.initChart();
    that.tooltipShuffling();
    that.mouseover();
    that.mouseleave();
  },
  methods: {
    initChart() {
      const that = this;
      that.chartInst = this.$echarts.init(this.$refs.chart);
      that.option = {
        angleAxis: {
          data: this.radiusAxisData,
          startAngle: 75,
          show: false,
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: that.fontStyle,
          max: 5
        },
        polar: {
          center: ['60%', '52%']
        },
        tooltip: {
          show: false,
          position: 'center'
        },
        series: {
          type: 'bar',
          data: this.rowData,
          coordinateSystem: 'polar',
          color: this.pieceColor,
          label: {
            show: true,
            position: 'middle',
            formatter: '{b}: {c}'
          }
        }
      };
      that.chartInst.setOption(that.option);
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      let currentIndex = -1;
      this.setTime = setInterval(() => {
        let dataLen = this.seriesData.length;
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % (dataLen - 1); //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 2000);
    },
    mouseover() {
      clearInterval(this.setTime);
    },
    mouseleave() {
      this.tooltipShuffling();
    }
  },
  beforeDestroy() {
    clearInterval(this.setTime);
  },
  watch: {
    rowData: {
      hendler() {
        this.radiusAxisData = [];
        this.seriesData = [];
        this.rowData.forEach(item => {
          this.radiusAxisData.push(item.uid);
          this.seriesData.push(item.value);
        });
        this.tooltipShuffling();
        this.initChart();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/04-多环图/DuoHuanTu.vue?vue&type=script&lang=js
 /* harmony default export */ var _04_DuoHuanTuvue_type_script_lang_js = (DuoHuanTuvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/03-饼图/04-多环图/DuoHuanTu.vue?vue&type=style&index=0&id=89dbfed6&prod&lang=less&scoped=true
var DuoHuanTuvue_type_style_index_0_id_89dbfed6_prod_lang_less_scoped_true = __webpack_require__("acb5");

// CONCATENATED MODULE: ./src/components/Chart Library/03-饼图/04-多环图/DuoHuanTu.vue






/* normalize component */

var DuoHuanTu_component = Object(componentNormalizer["a" /* default */])(
  _04_DuoHuanTuvue_type_script_lang_js,
  DuoHuanTuvue_type_template_id_89dbfed6_scoped_true_render,
  DuoHuanTuvue_type_template_id_89dbfed6_scoped_true_staticRenderFns,
  false,
  null,
  "89dbfed6",
  null
  
)

/* harmony default export */ var DuoHuanTu = (DuoHuanTu_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ChartLibraryView/pieChart.vue?vue&type=script&lang=js







/* harmony default export */ var pieChartvue_type_script_lang_js = ({
  name: 'App',
  components: {
    locaLoopChart: locaLoopChart,
    DeiFenHuan: DeiFenHuan,
    roseCharts: roseCharts,
    DoughnutChart: DoughnutChart,
    DuoHuanTu: DuoHuanTu,
    ChartPie: ChartPie
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log('submit!', this.form);
    },
    copyImportedFileContent(val) {
      axios_default.a.get(`./data/饼图/文本/${val}.txt`).then(res => {
        // 获取要复制的内容
        var textArea = document.createElement('textarea');
        textArea.value = res.data;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        // 提示复制成功
        alert('内容已复制到剪贴板');
      }).catch(err => {
        console.error('加载文件失败：', err);
      });
    }
  }
});
// CONCATENATED MODULE: ./src/views/ChartLibraryView/pieChart.vue?vue&type=script&lang=js
 /* harmony default export */ var ChartLibraryView_pieChartvue_type_script_lang_js = (pieChartvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/ChartLibraryView/pieChart.vue?vue&type=style&index=0&id=0484db75&prod&lang=less&scoped=true
var pieChartvue_type_style_index_0_id_0484db75_prod_lang_less_scoped_true = __webpack_require__("c2b2");

// CONCATENATED MODULE: ./src/views/ChartLibraryView/pieChart.vue






/* normalize component */

var pieChart_component = Object(componentNormalizer["a" /* default */])(
  ChartLibraryView_pieChartvue_type_script_lang_js,
  pieChartvue_type_template_id_0484db75_scoped_true_render,
  pieChartvue_type_template_id_0484db75_scoped_true_staticRenderFns,
  false,
  null,
  "0484db75",
  null
  
)

/* harmony default export */ var pieChart = (pieChart_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ChartLibraryView/LeiDa.vue?vue&type=template&id=d26b9c44&scoped=true
var LeiDavue_type_template_id_d26b9c44_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "zt"
  }, [_c('div', {
    staticClass: "picBox"
  }, [_c('div', [_c('RadarChart', {
    attrs: {
      "width": '400px',
      "hight": '420px',
      "datacolor": _vm.teacherColor
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('RadarChart');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('LeiDaBar', {
    attrs: {
      "width": '300px',
      "height": '250px'
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('LeiDaBar');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', {
    staticStyle: {
      "background-color": "#ffffff00"
    }
  }), _c('div', {
    staticStyle: {
      "background-color": "#ffffff00"
    }
  })])]);
};
var LeiDavue_type_template_id_d26b9c44_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/ChartLibraryView/LeiDa.vue?vue&type=template&id=d26b9c44&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/04-雷达图/01-基础雷达图/LeiDaBar.vue?vue&type=template&id=27996f56&scoped=true
var LeiDaBarvue_type_template_id_27996f56_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "chartBox"
  }, [_c('div', {
    ref: "myChart",
    staticClass: "myChart",
    style: {
      width: _vm.width,
      height: _vm.height
    }
  })]);
};
var LeiDaBarvue_type_template_id_27996f56_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/04-雷达图/01-基础雷达图/LeiDaBar.vue?vue&type=template&id=27996f56&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/04-雷达图/01-基础雷达图/LeiDaBar.vue?vue&type=script&lang=js
/* harmony default export */ var LeiDaBarvue_type_script_lang_js = ({
  name: 'pieGeRenNanDing',
  props: {
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '500px'
    },
    rowData: {
      type: Object,
      default: () => {
        return {
          // shape: 'circle',
          indicator: [{
            name: '销售'
          }, {
            name: '管理'
          }, {
            name: '调研'
          }, {
            name: '客服'
          }, {
            name: '研发'
          }, {
            name: '市场'
          }],
          value: [4200, 8000, 2000, 2300, 2000, 1800]
        };
      }
    }
  },
  data() {
    return {
      setTime: null,
      myChart: null,
      initTimer: null
    };
  },
  mounted() {
    if (this.rowData && this.rowData.indicator && this.rowData.indicator.length > 0) {
      console.log(this.rowData.indicator);
    }
    this.leidadraw();
    this.initTimer = setInterval(() => {
      this.myChart.dispose();
      this.leidadraw();
    }, 30000);
  },
  methods: {
    leidadraw() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(this.$refs.myChart);
      // 绘制图表
      this.myChart.setOption({
        radar: {
          nameGap: 0,
          center: ['58%', '53%'],
          name: {
            textStyle: {
              // padding: [3, 5],
              fontSize: 15,
              family: '黑体',
              color: '#f8f8f8',
              borderRadius: 1
            }
          },
          // radius: [55,10], // 圆的半径，数组的第一项是内半径，第二项是外半径
          splitNumber: 3,
          splitLine: {
            show: true,
            lineStyle: {
              width: 2,
              color: ['#fff', '#19334D', '#19334D'],
              // type: "dashed[]",
              type: 'solid'
              //  type: ["solid","solid","dashed"],

              // 图表背景网格线的颜色
            }
          },
          axisLine: {
            lineStyle: {
              width: 1,
              color: '#fff',
              // 分割线
              type: 'dashed'
            }
          },
          splitArea: {
            show: false,
            type: 'dashed',
            areaStyle: {
              color: ['rgba(240,240,240,0)'] // 图表背景网格的颜色
            }
          },
          indicator: this.rowData.indicator
        },
        tooltip: {
          trigger: 'axis'
        },
        series: [{
          type: 'radar',
          tooltip: {
            trigger: 'item'
          },
          areaStyle: {
            normal: {}
          },
          itemStyle: {
            type: 'dashed',
            // 单个拐点标志的样式设置。
            normal: {
              borderColor: '#59FFFF',
              // 拐点的描边颜色。[ default: '#000' ]
              borderWidth: 5
              // 拐点的描边宽度，默认不描边。[ default: 0 ]
            }
          },
          lineStyle: {
            // 单项线条样式。
            normal: {
              color: '#1FC5CC',
              opacity: 0.8 // 图形透明度,
            }
          },
          data: [{
            value: this.rowData.value,
            name: '预算分配',
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  return params.value;
                },
                fontSize: '20',
                fontFamily: '微软雅黑',
                position: ['1%', '1%'],
                color: '#f8f8f8',
                backgroundColor: 'rgba(51,51,51,0.9)'
              }
            }
          }]
        }]
      });
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.rowData.value.length;
        // // 取消之前高亮的图形
        // this.myChart.dispatchAction({
        //   type: "downplay",
        //   seriesIndex: 0, //表示series中的第几个data数据循环展示
        //   dataIndex: currentIndex
        // });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 3000);
    }
  },
  watch: {
    rowData: {
      handler() {
        this.myChart && this.myChart.dispose();
        this.leidadraw();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/04-雷达图/01-基础雷达图/LeiDaBar.vue?vue&type=script&lang=js
 /* harmony default export */ var _01_LeiDaBarvue_type_script_lang_js = (LeiDaBarvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/Chart Library/04-雷达图/01-基础雷达图/LeiDaBar.vue





/* normalize component */

var LeiDaBar_component = Object(componentNormalizer["a" /* default */])(
  _01_LeiDaBarvue_type_script_lang_js,
  LeiDaBarvue_type_template_id_27996f56_scoped_true_render,
  LeiDaBarvue_type_template_id_27996f56_scoped_true_staticRenderFns,
  false,
  null,
  "27996f56",
  null
  
)

/* harmony default export */ var LeiDaBar = (LeiDaBar_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/04-雷达图/01-基础雷达图/RadarChart.vue?vue&type=template&id=3b346434&scoped=true
var RadarChartvue_type_template_id_3b346434_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "ldat"
  }, [_c('div', {
    ref: "ldatChart",
    style: {
      width: _vm.width,
      height: _vm.height
    }
  })]);
};
var RadarChartvue_type_template_id_3b346434_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/04-雷达图/01-基础雷达图/RadarChart.vue?vue&type=template&id=3b346434&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/04-雷达图/01-基础雷达图/RadarChart.vue?vue&type=script&lang=js

/* harmony default export */ var RadarChartvue_type_script_lang_js = ({
  name: 'Ldat',
  props: {
    leidaData: {
      type: Array,
      default: () => {
        return [{
          value: 1000,
          maxvalue: 2000,
          name: 'A类'
        }, {
          value: 1100,
          maxvalue: 2000,
          name: 'B类'
        }, {
          value: 1200,
          maxvalue: 2000,
          name: 'C类'
        }, {
          value: 1300,
          maxvalue: 2000,
          name: 'D类'
        }, {
          value: 1400,
          maxvalue: 2000,
          name: 'E类'
        }];
      }
    },
    datacolor: {
      type: Array,
      default: () => {
        return ['#00BFFF', '#00BFFF']; //面积内颜色起始值及结束值
      }
    },
    width: {
      type: String,
      default: '265px'
    },
    height: {
      type: String,
      default: '230px'
    }
  },
  data() {
    return {
      //标题及最大值
      maxdata: [],
      //数据
      ldatdata: [],
      ldatChart: null,
      option: null
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    leidaData() {
      this.getData();
    }
  },
  methods: {
    getData() {
      if (this.leidaData.length === 0) {
        return;
      } else {
        var a = new Array();
        var b = new Array();
        for (let i = 0; i < this.leidaData.length; i++) {
          a.push({
            name: this.leidaData[i].name,
            max: this.leidaData[i].maxvalue
          });
          b.push(this.leidaData[i].value);
        }
        this.maxdata = a;
        this.ldatdata.push(b);
        this.ldatdrawLine();
      }
    },
    ldatdrawLine() {
      let echarts = __webpack_require__("313e");
      this.ldatChart = this.$echarts.init(this.$refs.ldatChart);
      // let ldatChart = echarts.init(document.getElementById("ldatChart"));
      let maxdata = this.maxdata;
      let ldatdata = this.ldatdata;
      let datacolor = this.datacolor;
      this.option = {
        // backgroundColor: '#fff',
        // color: ["rgba(0,183,238, 1)", "rgba(86,199,60, 1)"],
        tooltip: {
          show: false,
          trigger: 'item',
          extraCssText: 'background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;'
        },
        radar: {
          center: ['44%', '60%'],
          radius: '75%',
          startAngle: 90,
          splitNumber: 1,
          // shape: "circle",
          splitArea: {
            areaStyle: {
              color: ['transparent']
            }
          },
          axisLabel: {
            show: false,
            fontSize: 20,
            color: '#ffffff',
            fontStyle: 'normal',
            fontWeight: 'normal'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#f8f8f8'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#f8f8f8'
            }
          },
          name: {
            formatter: '{value}',
            textStyle: {
              color: '#B8E5FE',
              fontSize: 16
            }
          },
          //标题及最大值
          indicator: maxdata
        },
        series: [{
          type: 'radar',
          symbol: 'none',
          symbolSize: 9,
          areaStyle: {
            normal: {
              //面积颜色
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: datacolor[0]
              }, {
                offset: 1,
                color: datacolor[1]
              }], false)
            }
          },
          itemStyle: {
            color: '#00BFFF',
            borderColor: '#00BFFF',
            borderWidth: 2
          },
          lineStyle: {
            normal: {
              color: 'rgba(0, 255, 191, 0.5)',
              width: 2
            }
          },
          //数据值
          data: ldatdata
        }]
      };
      this.ldatChart.setOption(this.option);
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/04-雷达图/01-基础雷达图/RadarChart.vue?vue&type=script&lang=js
 /* harmony default export */ var _01_RadarChartvue_type_script_lang_js = (RadarChartvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/Chart Library/04-雷达图/01-基础雷达图/RadarChart.vue





/* normalize component */

var RadarChart_component = Object(componentNormalizer["a" /* default */])(
  _01_RadarChartvue_type_script_lang_js,
  RadarChartvue_type_template_id_3b346434_scoped_true_render,
  RadarChartvue_type_template_id_3b346434_scoped_true_staticRenderFns,
  false,
  null,
  "3b346434",
  null
  
)

/* harmony default export */ var RadarChart = (RadarChart_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ChartLibraryView/LeiDa.vue?vue&type=script&lang=js



/* harmony default export */ var LeiDavue_type_script_lang_js = ({
  name: 'App',
  components: {
    LeiDaBar: LeiDaBar,
    RadarChart: RadarChart
  },
  data() {
    return {
      teacherColor: ['rgba(0, 255, 191, 0.2)', ' rgba(0, 255, 191, 0.2)']
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log('submit!', this.form);
    },
    copyImportedFileContent(val) {
      axios_default.a.get(`./data/雷达/文本/${val}.txt`).then(res => {
        // 获取要复制的内容
        var textArea = document.createElement('textarea');
        textArea.value = res.data;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        // 提示复制成功
        alert('内容已复制到剪贴板');
      }).catch(err => {
        console.error('加载文件失败：', err);
      });
    }
  }
});
// CONCATENATED MODULE: ./src/views/ChartLibraryView/LeiDa.vue?vue&type=script&lang=js
 /* harmony default export */ var ChartLibraryView_LeiDavue_type_script_lang_js = (LeiDavue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/ChartLibraryView/LeiDa.vue?vue&type=style&index=0&id=d26b9c44&prod&lang=less&scoped=true
var LeiDavue_type_style_index_0_id_d26b9c44_prod_lang_less_scoped_true = __webpack_require__("17e8");

// CONCATENATED MODULE: ./src/views/ChartLibraryView/LeiDa.vue






/* normalize component */

var LeiDa_component = Object(componentNormalizer["a" /* default */])(
  ChartLibraryView_LeiDavue_type_script_lang_js,
  LeiDavue_type_template_id_d26b9c44_scoped_true_render,
  LeiDavue_type_template_id_d26b9c44_scoped_true_staticRenderFns,
  false,
  null,
  "d26b9c44",
  null
  
)

/* harmony default export */ var LeiDa = (LeiDa_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ChartLibraryView/Other.vue?vue&type=template&id=a0b9ac00&scoped=true
var Othervue_type_template_id_a0b9ac00_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "zt"
  }, [_c('div', {
    staticClass: "picBox"
  }, [_c('div', {
    staticStyle: {
      "height": "270px"
    }
  }, [_c('treeChart', {
    staticStyle: {
      "transform": "scale(0.95)"
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('treeChart');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', {
    staticStyle: {
      "height": "270px"
    }
  }, [_c('RectangleChart', {
    staticStyle: {
      "transform": "scale(0.95)"
    }
  }), _c('button', {
    staticClass: "button button--block",
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('RectangleChart');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', {
    staticStyle: {
      "height": "330px"
    }
  }, [_c('Table'), _c('button', {
    staticClass: "button button--block",
    staticStyle: {
      "margin-top": "20px"
    },
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('Table');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', {
    staticStyle: {
      "height": "330px"
    }
  }, [_c('VideoCommon'), _c('button', {
    staticClass: "button button--block",
    staticStyle: {
      "margin-top": "20px"
    },
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('VideoCommon');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div', [_c('PunchCard'), _c('button', {
    staticClass: "button button--block",
    staticStyle: {
      "margin-top": "-20px"
    },
    on: {
      "click": function ($event) {
        return _vm.copyImportedFileContent('PunchCard');
      }
    }
  }, [_vm._v("复制代码")])], 1), _c('div')])]);
};
var Othervue_type_template_id_a0b9ac00_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/views/ChartLibraryView/Other.vue?vue&type=template&id=a0b9ac00&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/09-其他组件/表格组件/Table.vue?vue&type=template&id=f07eb1f4&scoped=true
var Tablevue_type_template_id_f07eb1f4_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "table"
  }, [_c('ul', {
    staticClass: "FJ_GZZDYJLB_Nav",
    style: {
      height: _vm.TableStyle.NavHeight,
      width: _vm.TableStyle.TableWidth
    }
  }, _vm._l(_vm.NavData, function (item, index) {
    return _c('li', {
      key: index,
      style: {
        lineHeight: _vm.TableStyle.NavlineHeight,
        marginTop: _vm.TableStyle.NavTop
      }
    }, [_vm._v(_vm._s(item))]);
  }), 0), _c('div', {
    staticClass: "swiper_wraper FJ_GZZDYJLB_Content",
    style: {
      width: _vm.TableStyle.TableWidth
    },
    on: {
      "mouseenter": _vm.enterSwiper,
      "mouseleave": _vm.leaveSwiper
    }
  }, [_vm.Data.length > 1 ? _c('swiper', {
    ref: "mySwiper",
    staticClass: "wrap",
    attrs: {
      "options": _vm.swiperOptions,
      "auto-update": true,
      "auto-destroy": true,
      "delete-instance-on-destroy": true,
      "cleanup-styles-on-destroy": true
    }
  }, _vm._l(_vm.Data, function (item, index) {
    return _c('swiperSlide', {
      key: index,
      staticClass: "swipe_inner"
    }, [_c('div', [_vm._v(_vm._s(item.id))]), _c('div', [_vm._v(_vm._s(item.time))]), _c('div', [_vm._v(_vm._s(item.content))]), _c('div', [_vm._v(_vm._s(item.status))]), _c('div', [_vm._v(_vm._s(item.istime))])]);
  }), 1) : _vm._e()], 1)]);
};
var Tablevue_type_template_id_f07eb1f4_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/09-其他组件/表格组件/Table.vue?vue&type=template&id=f07eb1f4&scoped=true

// EXTERNAL MODULE: ./node_modules/vue-awesome-swiper/dist/vue-awesome-swiper.js
var vue_awesome_swiper = __webpack_require__("7212");

// EXTERNAL MODULE: ./node_modules/swiper/dist/css/swiper.css
var swiper = __webpack_require__("dfa4");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/09-其他组件/表格组件/Table.vue?vue&type=script&lang=js


/* harmony default export */ var Tablevue_type_script_lang_js = ({
  components: {
    swiper: vue_awesome_swiper["swiper"],
    swiperSlide: vue_awesome_swiper["swiperSlide"]
  },
  props: {
    NavData: {
      type: Array,
      default: () => {
        return ['编号', '时间', '事件详情', '办结情况'];
      }
    },
    TableStyle: {
      type: Object,
      default: () => {
        return {
          TableWidth: '700px',
          NavHeight: '40px',
          NavlineHeight: '40px',
          NavTop: '0px'
        };
      }
    },
    Data: {
      type: Array,
      default: () => {
        return [{
          id: 'B12322',
          time: '2021-6-10',
          content: '安防告警事件',
          status: '已处理'
        }, {
          id: 'B12322',
          time: '2021-6-10',
          content: '安防告警事件',
          status: '已处理'
        }, {
          id: 'B12322',
          time: '2021-6-10',
          content: '安防告警事件',
          status: '已处理'
        }, {
          id: 'B12322',
          time: '2021-6-10',
          content: '安防告警事件',
          status: '已处理'
        }, {
          id: 'B12322',
          time: '2021-6-10',
          content: '安防告警事件',
          status: '已处理'
        }, {
          id: 'B12322',
          time: '2021-6-10',
          content: '安防告警事件',
          status: '已处理'
        }, {
          id: 'B12322',
          time: '2021-6-10',
          content: '安防告警事件',
          status: '已处理'
        }];
      }
    }
  },
  data() {
    return {
      // 轮播图配置
      swiperOptions: {
        direction: 'vertical',
        initialSlide: 0,
        loop: true,
        slidesPerView: 4,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        }
      }
    };
  },
  methods: {
    enterSwiper() {},
    leaveSwiper() {}
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/09-其他组件/表格组件/Table.vue?vue&type=script&lang=js
 /* harmony default export */ var _Tablevue_type_script_lang_js = (Tablevue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/09-其他组件/表格组件/Table.vue?vue&type=style&index=0&id=f07eb1f4&prod&lang=less&scoped=true
var Tablevue_type_style_index_0_id_f07eb1f4_prod_lang_less_scoped_true = __webpack_require__("477f");

// CONCATENATED MODULE: ./src/components/Chart Library/09-其他组件/表格组件/Table.vue






/* normalize component */

var Table_component = Object(componentNormalizer["a" /* default */])(
  _Tablevue_type_script_lang_js,
  Tablevue_type_template_id_f07eb1f4_scoped_true_render,
  Tablevue_type_template_id_f07eb1f4_scoped_true_staticRenderFns,
  false,
  null,
  "f07eb1f4",
  null
  
)

/* harmony default export */ var Table = (Table_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/09-其他组件/视频组件/VideoCommon.vue?vue&type=template&id=6ae5192e&scoped=true
var VideoCommonvue_type_template_id_6ae5192e_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "right",
    style: {
      width: _vm.videoStyle.videoBOXWidth
    }
  }, [_c('div', {
    staticClass: "right_bottom"
  }, _vm._l(_vm.videoList, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "bottom_item",
      style: {
        height: _vm.videoStyle.videoHeight,
        width: _vm.videoStyle.videoWidth
      }
    }, [_c('div', {
      staticClass: "btn",
      on: {
        "click": function ($event) {
          return _vm.sentData(item);
        }
      }
    }), _c('video', {
      staticClass: "video-box",
      attrs: {
        "autoplay": "",
        "loop": "",
        "muted": "",
        "src": item.videopath
      },
      domProps: {
        "muted": true
      }
    }), _c('div', {
      style: {
        bottom: _vm.videoStyle.linearpositions
      }
    }, [_c('span', [_vm._v(_vm._s(item.title))]), _c('span', [_vm._v(_vm._s(_vm.timeObj.year + _vm.timeObj.month + _vm.timeObj.day + _vm.timeObj.h + _vm.timeObj.m + _vm.timeObj.s))])])]);
  }), 0)]);
};
var VideoCommonvue_type_template_id_6ae5192e_scoped_true_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/09-其他组件/视频组件/VideoCommon.vue?vue&type=template&id=6ae5192e&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/09-其他组件/视频组件/VideoCommon.vue?vue&type=script&lang=js
/* harmony default export */ var VideoCommonvue_type_script_lang_js = ({
  props: {
    videoList: {
      type: Array,
      default: () => {
        return [{
          videopath: '/video/fire01.mp4',
          title: '消防车001',
          timer: '20210204 00:00:00'
        }];
      }
    },
    videoStyle: {
      type: Object,
      default: () => {
        return {
          videoHeight: '230px',
          videoWidth: '700px',
          videoBOXWidth: '1223px',
          linearpositions: 'px'
        };
      }
    }
  },
  components: {},
  data() {
    return {
      timer: null,
      timeObj: {}
    };
  },
  methods: {
    setHighLight(cardName, index) {
      this.currentIndex = index;
      if (cardName === this.$store.state.highLight) {
        this.$store.commit('clearHighLight');
      } else {
        this.$store.commit('setHighLight', cardName);
      }
    },
    sentData(item) {
      console.log(item);
      this.$store.commit('setMonitorDetail', item);
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      let sTime = new Date();
      let week = sTime.getDay();
      let year = sTime.getFullYear() + '/';
      let month = sTime.getMonth() + 1;
      let day = sTime.getDate();
      //小时
      let h = sTime.getHours() + ':';
      // 分钟
      let m = sTime.getMinutes() + ':';
      // 秒
      let s = sTime.getSeconds();
      day = day < 10 ? '0' + day : day + ' ';
      month = month < 10 ? '0' + month : month;
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;
      let str = '';
      switch (week) {
        case 0:
          str += '日';
          break;
        case 1:
          str += '一';
          break;
        case 2:
          str += '二';
          break;
        case 3:
          str += '三';
          break;
        case 4:
          str += '四';
          break;
        case 5:
          str += '五';
          break;
        case 6:
          str += '六';
          break;
      }
      this.timeObj = {
        year,
        month,
        day,
        h,
        m,
        s,
        str
      };
    }, 1000);
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/09-其他组件/视频组件/VideoCommon.vue?vue&type=script&lang=js
 /* harmony default export */ var _VideoCommonvue_type_script_lang_js = (VideoCommonvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/09-其他组件/视频组件/VideoCommon.vue?vue&type=style&index=0&id=6ae5192e&prod&lang=less&scoped=true
var VideoCommonvue_type_style_index_0_id_6ae5192e_prod_lang_less_scoped_true = __webpack_require__("28f4");

// CONCATENATED MODULE: ./src/components/Chart Library/09-其他组件/视频组件/VideoCommon.vue






/* normalize component */

var VideoCommon_component = Object(componentNormalizer["a" /* default */])(
  _VideoCommonvue_type_script_lang_js,
  VideoCommonvue_type_template_id_6ae5192e_scoped_true_render,
  VideoCommonvue_type_template_id_6ae5192e_scoped_true_staticRenderFns,
  false,
  null,
  "6ae5192e",
  null
  
)

/* harmony default export */ var VideoCommon = (VideoCommon_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/11矩形树图/背景树图/treeChart.vue?vue&type=template&id=3de6c756
var treeChartvue_type_template_id_3de6c756_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.rowData != null ? _c('div', {
    staticClass: "barChart"
  }, [_c('div', {
    ref: "barChart",
    staticClass: "barEcharts",
    style: {
      width: `${_vm.width}px`,
      height: `${_vm.height}px`,
      marginTop: '20px'
    },
    on: {
      "onmousemove": _vm.move,
      "onmouseout": _vm.leave
    }
  })]) : _vm._e();
};
var treeChartvue_type_template_id_3de6c756_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/11矩形树图/背景树图/treeChart.vue?vue&type=template&id=3de6c756

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/11矩形树图/背景树图/treeChart.vue?vue&type=script&lang=js

// import { mapState } from 'vuex'
/* harmony default export */ var treeChartvue_type_script_lang_js = ({
  computed: {
    // ...mapState(['officesState']),
  },
  data() {
    return {
      option: null,
      barChart: null,
      loopData: [],
      num: 0,
      //当前选中的value
      selectedSeries: {
        category: '',
        value: '',
        sum: ''
      },
      sum: 0
    };
  },
  props: {
    flag: {
      type: String,
      default: '新办'
    },
    height: {
      type: String,
      default: '178'
    },
    //高度
    width: {
      type: String,
      default: '500px'
    },
    //宽度
    rowData: {
      type: Array,
      default: () => {
        return [{
          name: '大数据产业',
          value: 40
        }, {
          name: '人工智能产业',
          value: 20
        }, {
          name: '区块链产业',
          value: 20
        }, {
          name: '服务业',
          value: 5
        }, {
          name: '制造业',
          value: 5
        }, {
          name: '医疗卫生业',
          value: 5
        }];
      }
    },
    rowColor: {
      type: Array,
      default: () => {
        return ['#00FFFF', '#00DD8A', '#00D9D9', '#95FF2B', '#7373FF', '#2693FF', '#00698C'];
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawChart();
    });
  },
  watch: {
    rowData: {
      handler() {
        this.$nextTick(() => {
          this.drawChart();
        });
      },
      immediate: true,
      deep: true
    },
    flag: {
      handler(val) {
        console.log(val);
      }
    }
  },
  methods: {
    drawChart() {
      let that = this;
      this.barChart = this.$echarts.init(this.$refs.barChart);
      // data对象中添加color属性
      this.rowData.forEach((item, index) => {
        // this.rowData[index].itemStyle = {
        //   color: this.rowColor[index],
        //   borderColor: "transparent"
        // };
        this.rowData[index].children = [{
          name: item.name,
          value: item.value,
          itemStyle: {
            color: this.rowColor[index],
            borderWidth: 0,
            borderColor: 'transparent',
            label: {
              show: true,
              formatter: '{b}: {c}'
            }
          },
          emphasis: {
            itemStyle: {
              color: 'rgba(0,0,0,0.6)',
              borderWidth: 50,
              borderColor: 'transparent'
            },
            label: {
              show: true,
              formatter: function (info) {
                that.loopData = that.convertData(that.rowData);
                if (info.name !== '') {
                  let res = `{a|${that.flag ? that.flag : '新办'}户占比}` + '\r\n' + `{b|${that.loopData[index].num}}` + '\r\n' + `{a|${that.flag ? that.flag : '新办'}户数量}` + '\r\n' + `{b|${that.loopData[index].value}户}`;
                  return res;
                } else {
                  return '';
                }
              },
              rich: {
                a: {
                  color: '#fff',
                  lineHeight: 30,
                  fontFamily: '微软雅黑',
                  fontSize: 18,
                  align: 'center'
                },
                b: {
                  color: '#4CFFFF',
                  lineHeight: 30,
                  fontFamily: '微软雅黑',
                  fontSize: 18,
                  align: 'center'
                },
                c: {
                  color: 'blue',
                  height: 40
                }
              },
              textStyle: {
                color: '#fff',
                fontSize: 22
              },
              backgroundColor: 'transparent'
            }
          }
        }];
      });
      this.option = {
        levels: [{
          color: 'rgba(0,0,0,0.0)'
        }],
        series: [{
          type: 'treemap',
          roam: false,
          // 禁止拖拽
          nodeClick: false,
          // 子项禁止点击
          breadcrumb: {
            // 面包屑
            show: false
          },
          width: '100%',
          height: '100%',
          label: {
            show: true,
            formatter: '{b}',
            normal: {
              textStyle: {
                ellipsis: true,
                //圆角,
                fontFamily: '微软雅黑',
                fontSize: 18,
                color: '#00FFFF'
              }
            }
          },
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent',
            gapWidth: 8,
            colorAlpha: [0.3],
            label: {
              show: false,
              formatter: '{b}: {c}'
            }
            // shadowColor: "rgba(0, 0, 0, 0.5)",
            // shadowBlur: 10
          },
          data: this.rowData
        }]
      };
      // 清除点击事件
      // this.barChart.off('click')
      // this.barChart.on('click', function (params) {
      //         this.officesState = !this.officesState
      //   that.$store.commit('changeOfficesState', this.officesState)
      //   that.$store.commit('changeOffices', params.data.name)
      //   that.$store.commit('changeOfficesCode', params.data.code)

      // })

      this.barChart.on('mouseover', function () {
        // alert(111);
      });
      this.barChart.on(' mouseout', function () {
        // alert(222);
      });
      this.barChart.setOption(this.option, true);
    },
    //value转换
    convertData(rowData) {
      this.sum = 0;
      let returnData = [];
      rowData.forEach(d => {
        this.sum += d.value;
        returnData.push({
          value: d.value,
          name: d.name
          // itemStyle: {
          //   color: legends[d.category]
          // }
        });
      });
      returnData.forEach(d => {
        d.num = this.sum == 0 ? '0' : (d.value / this.sum * 100).toFixed(0) + '%';
      });
      return returnData;
    },
    move() {},
    leave() {}
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/11矩形树图/背景树图/treeChart.vue?vue&type=script&lang=js
 /* harmony default export */ var _treeChartvue_type_script_lang_js = (treeChartvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/Chart Library/11矩形树图/背景树图/treeChart.vue





/* normalize component */

var treeChart_component = Object(componentNormalizer["a" /* default */])(
  _treeChartvue_type_script_lang_js,
  treeChartvue_type_template_id_3de6c756_render,
  treeChartvue_type_template_id_3de6c756_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var treeChart = (treeChart_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/11矩形树图/普通树图/RectangleChart.vue?vue&type=template&id=44c10a71
var RectangleChartvue_type_template_id_44c10a71_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.rowData != null ? _c('div', {
    staticClass: "barChart"
  }, [_c('div', {
    ref: "barChart",
    staticClass: "barEcharts",
    style: {
      width: `${_vm.width}px`,
      height: `${_vm.height}px`,
      marginTop: '20px'
    }
  })]) : _vm._e();
};
var RectangleChartvue_type_template_id_44c10a71_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Chart Library/11矩形树图/普通树图/RectangleChart.vue?vue&type=template&id=44c10a71

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/11矩形树图/普通树图/RectangleChart.vue?vue&type=script&lang=js
// import { mapState } from 'vuex'
/* harmony default export */ var RectangleChartvue_type_script_lang_js = ({
  computed: {
    // ...mapState(['officesState']),
  },
  data() {
    return {
      option: null,
      barChart: null
    };
  },
  props: {
    height: {
      type: String,
      default: '178'
    },
    //高度
    width: {
      type: String,
      default: '500px'
    },
    //宽度
    rowData: {
      type: Array,
      default: () => {
        return [{
          name: '大数据产业',
          value: 40
        }, {
          name: '人工智能产业',
          value: 20
        }, {
          name: '区块链产业',
          value: 20
        }, {
          name: '服务业',
          value: 5
        }, {
          name: '制造业',
          value: 5
        }, {
          name: '医疗卫生业',
          value: 5
        }];
      }
    },
    rowColor: {
      type: Array,
      default: () => {
        return ['#00BFFF', '#00DD8A', '#00D9D9', '#95FF2B', '#7373FF', '#2693FF', '#00698C'];
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawChart();
    });
  },
  watch: {
    rowData: {
      handler() {
        this.$nextTick(() => {
          this.drawChart();
        });
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    drawChart() {
      // let that = this
      this.barChart = this.$echarts.init(this.$refs.barChart);
      // data对象中添加color属性
      for (var i = 0; i < this.rowData.length; i++) {
        // this.rowData[i].name =this.rowData[i].Ksmc
        // this.rowData[i].value=this.rowData[i].Tjsz
        // delete(this.rowData[i].Ksmc)
        // delete(this.rowData[i].Tjsz)
        this.rowData[i].itemStyle = {
          color: this.rowColor[i]
        };
      }
      this.option = {
        series: [{
          type: 'treemap',
          roam: false,
          // 禁止拖拽
          nodeClick: false,
          // 子项禁止点击
          breadcrumb: {
            // 面包屑
            show: false
          },
          width: '100%',
          height: '100%',
          label: {
            show: true,
            formatter: '{b}',
            fontFamily: '微软雅黑',
            fontSize: 16,
            color: '#000000'
          },
          itemStyle: {
            borderColor: '#062E43',
            borderWidth: 0,
            gapWidth: 2
          },
          data: this.rowData
        }]
      };
      // 清除点击事件
      // this.barChart.off('click')
      // this.barChart.on('click', function (params) {
      //         this.officesState = !this.officesState
      //   that.$store.commit('changeOfficesState', this.officesState)
      //   that.$store.commit('changeOffices', params.data.name)
      //   that.$store.commit('changeOfficesCode', params.data.code)

      // })
      this.barChart.setOption(this.option, true);
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/11矩形树图/普通树图/RectangleChart.vue?vue&type=script&lang=js
 /* harmony default export */ var _RectangleChartvue_type_script_lang_js = (RectangleChartvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/Chart Library/11矩形树图/普通树图/RectangleChart.vue





/* normalize component */

var RectangleChart_component = Object(componentNormalizer["a" /* default */])(
  _RectangleChartvue_type_script_lang_js,
  RectangleChartvue_type_template_id_44c10a71_render,
  RectangleChartvue_type_template_id_44c10a71_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var RectangleChart = (RectangleChart_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"c022066c-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/09-其他组件/日历图/PunchCard.vue?vue&type=template&id=62630d21&scoped=true
var PunchCardvue_type_template_id_62630d21_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticStyle: {
      "width": "700px",
      "height": "310px"
    }
  }, [_vm._m(0), _c('div', {
    ref: "loop",
    staticClass: "positionloopecharts"
  })])]);
};
var PunchCardvue_type_template_id_62630d21_scoped_true_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "title"
  }, [_c('p', [_vm._v("周一")]), _c('p', [_vm._v("周二")]), _c('p', [_vm._v("周三")]), _c('p', [_vm._v("周四")]), _c('p', [_vm._v("周五")]), _c('p', [_vm._v("周六")]), _c('p', [_vm._v("周日")])]);
}];

// CONCATENATED MODULE: ./src/components/Chart Library/09-其他组件/日历图/PunchCard.vue?vue&type=template&id=62630d21&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chart Library/09-其他组件/日历图/PunchCard.vue?vue&type=script&lang=js

/* harmony default export */ var PunchCardvue_type_script_lang_js = ({
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.drawChart();
    });
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(this.$refs.loop);
      var option;
      var dateList = [['2023-1-1', 'II'], ['2023-1-2', 'I'], ['2023-1-3', 'II'], ['2023-1-4', 'III'], ['2023-1-5', 'III'], ['2023-1-6', 'IV'], ['2023-1-7', 'III'], ['2023-1-8', 'I'], ['2023-1-9', 'II'], ['2023-1-10', 'III'], ['2023-1-11', 'IV'], ['2023-1-12', 'V'], ['2023-1-13', 'III'], ['2023-1-14', 'III'], ['2023-1-15', 'V'], ['2023-1-16', 'V'], ['2023-1-17', 'I'], ['2023-1-18', '劣V'], ['2023-1-19', 'II'], ['2023-1-20', 'I'], ['2023-1-21', 'II'], ['2023-1-22', 'V'], ['2023-1-23', 'I'], ['2023-1-24', 'III'], ['2023-1-25', 'I'], ['2023-1-26', 'V'], ['2023-1-27', 'II'], ['2023-1-28', 'V'], ['2023-1-29', 'II'], ['2023-1-30', 'III'], ['2023-1-31', 'III']];
      var heatmapData = [];
      var lunarData = [];
      for (var i = 0; i < dateList.length; i++) {
        if (dateList[i][1] == 'I') {
          heatmapData.push([dateList[i][0], 1]);
        } else if (dateList[i][1] == 'II') {
          heatmapData.push([dateList[i][0], 2]);
        } else if (dateList[i][1] == 'III') {
          heatmapData.push([dateList[i][0], 3]);
        } else if (dateList[i][1] == 'IV') {
          heatmapData.push([dateList[i][0], 4]);
        } else if (dateList[i][1] == 'V') {
          heatmapData.push([dateList[i][0], 5]);
        } else {
          heatmapData.push([dateList[i][0], 6]);
        }
        // heatmapData.push([dateList[i][0], Math.random() * 300]);
        lunarData.push([dateList[i][0], 1, dateList[i][1], dateList[i][2]]);
      }
      console.log(heatmapData);
      option = {
        tooltip: {
          formatter: function (params) {
            if (params.value[1] == 1) {
              return params.value[0] + '空气质量: I';
            } else if (params.value[1] == 2) {
              return params.value[0] + '空气质量: II';
            } else if (params.value[1] == 3) {
              return params.value[0] + '空气质量: III';
            } else if (params.value[1] == 4) {
              return params.value[0] + '空气质量: IV';
            } else if (params.value[1] == 5) {
              return params.value[0] + '空气质量: V';
            } else {
              return params.value[0] + '空气质量: 劣V';
            }
          }
        },
        visualMap: {
          show: false,
          min: 1,
          max: 6,
          calculable: true,
          seriesIndex: [2],
          orient: 'horizontal',
          left: 'center',
          bottom: 20,
          inRange: {
            color: ['rgba(44,112,195,0.25)', 'rgba(44,171,240,0.25)', 'rgba(86,195,6,0.25)', 'rgba(244,203,0,0.25)', 'rgba(254,159,1,0.25)', 'rgba(253,42,25,0.25)']
          }
        },
        calendar: [{
          left: 'center',
          top: 'middle',
          cellSize: [97, 39],
          yearLabel: {
            show: false
          },
          orient: 'vertical',
          dayLabel: {
            show: false,
            firstDay: 1,
            nameMap: 'cn'
          },
          monthLabel: {
            show: false
          },
          splitLine: {
            show: false,
            color: '#ABDFF2'
          },
          itemStyle: {
            color: 'rgba(44,112,195,0)',
            borderColor: '#ABDFF2'
          },
          range: '2023-01'
        }],
        series: [{
          type: 'scatter',
          coordinateSystem: 'calendar',
          symbolSize: 1,
          label: {
            show: true,
            formatter: function (params) {
              return params.value[2] + '\n\n';
            },
            color: '#fff',
            fontSize: 20,
            lineHeight: -2
          },
          data: lunarData
        }, {
          type: 'scatter',
          coordinateSystem: 'calendar',
          symbolSize: 1,
          label: {
            show: true,
            formatter: function (params) {
              return '\n\n\n' + (params.value[3] || '');
            },
            fontSize: 14,
            fontWeight: 700,
            color: 'red'
          },
          data: lunarData
        }, {
          name: '降雨量',
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: heatmapData
        }]
      };
      option && myChart.setOption(option);
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chart Library/09-其他组件/日历图/PunchCard.vue?vue&type=script&lang=js
 /* harmony default export */ var _PunchCardvue_type_script_lang_js = (PunchCardvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Chart Library/09-其他组件/日历图/PunchCard.vue?vue&type=style&index=0&id=62630d21&prod&lang=less&scoped=true
var PunchCardvue_type_style_index_0_id_62630d21_prod_lang_less_scoped_true = __webpack_require__("096c");

// CONCATENATED MODULE: ./src/components/Chart Library/09-其他组件/日历图/PunchCard.vue






/* normalize component */

var PunchCard_component = Object(componentNormalizer["a" /* default */])(
  _PunchCardvue_type_script_lang_js,
  PunchCardvue_type_template_id_62630d21_scoped_true_render,
  PunchCardvue_type_template_id_62630d21_scoped_true_staticRenderFns,
  false,
  null,
  "62630d21",
  null
  
)

/* harmony default export */ var PunchCard = (PunchCard_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ChartLibraryView/Other.vue?vue&type=script&lang=js

// import Water from '../../components/Chart Library/10-水球图/普通水球图/Water';





/* harmony default export */ var Othervue_type_script_lang_js = ({
  name: 'App',
  components: {
    Table: Table,
    VideoCommon: VideoCommon,
    treeChart: treeChart,
    RectangleChart: RectangleChart,
    PunchCard: PunchCard
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log('submit!', this.form);
    },
    copyImportedFileContent(val) {
      axios_default.a.get(`./data/other/文本/${val}.txt`).then(res => {
        // 获取要复制的内容
        var textArea = document.createElement('textarea');
        textArea.value = res.data;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        // 提示复制成功
        alert('内容已复制到剪贴板');
      }).catch(err => {
        console.error('加载文件失败：', err);
      });
    }
  }
});
// CONCATENATED MODULE: ./src/views/ChartLibraryView/Other.vue?vue&type=script&lang=js
 /* harmony default export */ var ChartLibraryView_Othervue_type_script_lang_js = (Othervue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/ChartLibraryView/Other.vue?vue&type=style&index=0&id=a0b9ac00&prod&lang=less&scoped=true
var Othervue_type_style_index_0_id_a0b9ac00_prod_lang_less_scoped_true = __webpack_require__("f8d6");

// CONCATENATED MODULE: ./src/views/ChartLibraryView/Other.vue






/* normalize component */

var Other_component = Object(componentNormalizer["a" /* default */])(
  ChartLibraryView_Othervue_type_script_lang_js,
  Othervue_type_template_id_a0b9ac00_scoped_true_render,
  Othervue_type_template_id_a0b9ac00_scoped_true_staticRenderFns,
  false,
  null,
  "a0b9ac00",
  null
  
)

/* harmony default export */ var Other = (Other_component.exports);
// CONCATENATED MODULE: ./src/router/index.js
/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-07-22 02:06:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-07 16:09:00
 * @FilePath: \图表库ing\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */







vue_runtime_esm["default"].use(vue_router_esm["a" /* default */]);
const routes = [{
  path: '/',
  name: '首页',
  redirect: '/echarts/zhexian'
}, {
  path: '/echarts',
  name: '图表库',
  children: [
  // 子路由
  {
    path: '/echarts/zhexian',
    name: 'zhexian',
    component: Zhexian
  },
  // 折线
  {
    path: '/echarts/ZhuTu',
    name: 'ZhuTu',
    component: Zhutu
  },
  // 柱图
  {
    path: '/echarts/pieChart',
    name: 'pieChart',
    component: pieChart
  },
  // 饼图
  {
    path: '/echarts/LeiDa',
    name: 'LeiDa',
    component: LeiDa
  },
  // 雷达
  {
    path: '/echarts/Other',
    name: 'Other',
    component: Other
  } // 其他组件
  ],
  component: () => __webpack_require__.e(/* import() */ "chunk-e61a399e").then(__webpack_require__.bind(null, "b0c4"))
}, {
  path: '*',
  name: '404',
  component: () => __webpack_require__.e(/* import() */ "chunk-c1f4851c").then(__webpack_require__.bind(null, "8cdb"))
}];
const router = new vue_router_esm["a" /* default */]({
  routes
});
/* harmony default export */ var src_router = (router);
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./src/store/index.js
/*
 * @Author: 赵姐
 * @Date: 2023-07-22 02:06:03
 * @LastEditTime: 2023-12-02 17:58:39
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 */


vue_runtime_esm["default"].use(vuex_esm["a" /* default */]);
/* harmony default export */ var store = (new vuex_esm["a" /* default */].Store({
  state: {
    topicId: '',
    //当前主题下标
    routerPath: '',
    // 当前主题路径
    scale: 1 //页面缩放倍率
  },
  mutations: {
    setTopicId(state, ind) {
      state.topicId = ind;
    },
    setRouter(state, ind) {
      state.routerPath = ind;
    },
    setUpdataC(state, ind) {
      state.routerPath = ind;
    },
    setScale(state, ind) {
      state.scale = ind;
    }
  },
  actions: {},
  modules: {}
}));
// EXTERNAL MODULE: ./node_modules/element-ui/lib/element-ui.common.js
var element_ui_common = __webpack_require__("5c96");
var element_ui_common_default = /*#__PURE__*/__webpack_require__.n(element_ui_common);

// EXTERNAL MODULE: ./node_modules/element-ui/lib/theme-chalk/index.css
var theme_chalk = __webpack_require__("0fae");

// EXTERNAL MODULE: ./src/assets/style/base.css
var base = __webpack_require__("a531");

// EXTERNAL MODULE: ./node_modules/wowjs/dist/wow.js
var wow = __webpack_require__("bc1b");

// EXTERNAL MODULE: ./node_modules/wowjs/css/libs/animate.css
var animate = __webpack_require__("e9a2");
var animate_default = /*#__PURE__*/__webpack_require__.n(animate);

// EXTERNAL MODULE: ./node_modules/vue-fullscreen/dist/vue-fullscreen.min.js
var vue_fullscreen_min = __webpack_require__("03cd");
var vue_fullscreen_min_default = /*#__PURE__*/__webpack_require__.n(vue_fullscreen_min);

// EXTERNAL MODULE: ./node_modules/vue-seamless-scroll/dist/vue-seamless-scroll.min.js
var vue_seamless_scroll_min = __webpack_require__("a939");
var vue_seamless_scroll_min_default = /*#__PURE__*/__webpack_require__.n(vue_seamless_scroll_min);

// CONCATENATED MODULE: ./src/main.js













vue_runtime_esm["default"].use(vue_seamless_scroll_min_default.a);
vue_runtime_esm["default"].use(vue_fullscreen_min_default.a);
vue_runtime_esm["default"].prototype.$echarts = echarts;
vue_runtime_esm["default"].prototype.$axios = axios_default.a;

//这里需要将样式用起来，
vue_runtime_esm["default"].use(animate_default.a);
//创建全局实例
vue_runtime_esm["default"].prototype.$wow = new wow["WOW"]({
  boxClass: 'wow',
  // 需要执行动画的元素的 class
  animateClass: 'animated',
  //animation.css 动画的 class
  offset: 0,
  // 距离可视区域多少开始执行动画
  mobile: true,
  // 是否在移动设备上执行动画
  live: true // 异步加载的内容是否有效
});
vue_runtime_esm["default"].use(element_ui_common_default.a);
vue_runtime_esm["default"].config.productionTip = false;
// Vue.prototype.$wow = wow;

new vue_runtime_esm["default"]({
  router: src_router,
  store: store,
  render: h => h(App)
}).$mount('#app');

/***/ }),

/***/ "5ab8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CylindricalPlot_vue_vue_type_style_index_0_id_4e19cc23_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a266");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CylindricalPlot_vue_vue_type_style_index_0_id_4e19cc23_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CylindricalPlot_vue_vue_type_style_index_0_id_4e19cc23_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "5c37":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6cdf":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6f70":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LineCharts_xuxian_vue_vue_type_style_index_0_id_53757c96_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4752");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LineCharts_xuxian_vue_vue_type_style_index_0_id_53757c96_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LineCharts_xuxian_vue_vue_type_style_index_0_id_53757c96_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "74aa":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7721":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Zhexian_vue_vue_type_style_index_0_id_c9f38d9e_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("173e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Zhexian_vue_vue_type_style_index_0_id_c9f38d9e_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Zhexian_vue_vue_type_style_index_0_id_c9f38d9e_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "81bd":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8ee6":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9858":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_roseCharts_vue_vue_type_style_index_0_id_39811738_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("81bd");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_roseCharts_vue_vue_type_style_index_0_id_39811738_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_roseCharts_vue_vue_type_style_index_0_id_39811738_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "a266":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a531":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "acb5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DuoHuanTu_vue_vue_type_style_index_0_id_89dbfed6_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("51b9");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DuoHuanTu_vue_vue_type_style_index_0_id_89dbfed6_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DuoHuanTu_vue_vue_type_style_index_0_id_89dbfed6_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "ad08":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DuoZhexianTu_vue_vue_type_style_index_0_id_b73743cc_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e429");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DuoZhexianTu_vue_vue_type_style_index_0_id_b73743cc_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DuoZhexianTu_vue_vue_type_style_index_0_id_b73743cc_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "b7c5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_locaLoopChart_vue_vue_type_style_index_0_id_71066bfb_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("33c8");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_locaLoopChart_vue_vue_type_style_index_0_id_71066bfb_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_locaLoopChart_vue_vue_type_style_index_0_id_71066bfb_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "b9ff":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "be36":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Zhutu_vue_vue_type_style_index_0_id_1bbd5968_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3b6a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Zhutu_vue_vue_type_style_index_0_id_1bbd5968_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Zhutu_vue_vue_type_style_index_0_id_1bbd5968_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "c2b2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pieChart_vue_vue_type_style_index_0_id_0484db75_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("36ca");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pieChart_vue_vue_type_style_index_0_id_0484db75_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pieChart_vue_vue_type_style_index_0_id_0484db75_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "ce7d":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/60x80.604362d6.png";

/***/ }),

/***/ "d4dc":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d5a7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "df3a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e0af":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_d3cffb1c_prod_lang_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b9ff");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_d3cffb1c_prod_lang_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_d3cffb1c_prod_lang_less__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "e429":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "eb51":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HengTwoBarCharts_vue_vue_type_style_index_0_id_5c7b0e26_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3fd2");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HengTwoBarCharts_vue_vue_type_style_index_0_id_5c7b0e26_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HengTwoBarCharts_vue_vue_type_style_index_0_id_5c7b0e26_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "f3d8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CycloneChart_vue_vue_type_style_index_0_id_31c102f8_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8ee6");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CycloneChart_vue_vue_type_style_index_0_id_31c102f8_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CycloneChart_vue_vue_type_style_index_0_id_31c102f8_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "f8d6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Other_vue_vue_type_style_index_0_id_a0b9ac00_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5c37");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Other_vue_vue_type_style_index_0_id_a0b9ac00_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Other_vue_vue_type_style_index_0_id_a0b9ac00_prod_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "ff0c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=app.3a5a61df.js.map