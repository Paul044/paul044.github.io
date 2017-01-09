/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _RenderPage = __webpack_require__(1);
	
	var _RenderPage2 = _interopRequireDefault(_RenderPage);
	
	var _Search = __webpack_require__(7);
	
	var _Search2 = _interopRequireDefault(_Search);
	
	var _Slide = __webpack_require__(9);
	
	var _Slide2 = _interopRequireDefault(_Slide);
	
	var _Resizer = __webpack_require__(10);
	
	var _Resizer2 = _interopRequireDefault(_Resizer);
	
	var _Pager = __webpack_require__(11);
	
	var _Pager2 = _interopRequireDefault(_Pager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _RenderPage2.default)();
	(0, _Search2.default)();
	(0, _Slide2.default)();
	(0, _Resizer2.default)();
	(0, _Pager2.default)();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _CustomJQuery = __webpack_require__(2);
	
	var _CustomJQuery2 = _interopRequireDefault(_CustomJQuery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function renderPage() {
	    (0, _CustomJQuery2.default)('body').innerHTML = '<div class=wrapper><header><input type="text" class="search" id="search-input" type="text" placeholder="Search videos"/></header>' + '</div><main><div class="videos"></div></main><div class=wrapper><footer><ul class="paging"></ul></footer></div>';
	}
	
	exports.default = renderPage;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function $(selector) {
	    return document.querySelectorAll(selector)[0];
	}
	
	exports.default = $;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var state = {
	    currentPage: 0,
	    elementsOnPage: 4,
	    leftElement: 0,
	    lastRenderedElement: -1,
	    inResizing: false,
	    priorityElement: 0,
	    setCurrentPage: function setCurrentPage(val) {
	        state.currentPage = val;
	    },
	    setElementsOnPage: function setElementsOnPage(val) {
	        state.elementsOnPage = val;
	    },
	    setLeftElement: function setLeftElement(val) {
	        state.leftElement = val;
	    },
	    setLastRenderedElement: function setLastRenderedElement(val) {
	        state.lastRenderedElement = val;
	    },
	    setInResizing: function setInResizing(val) {
	        state.inResizing = val;
	    },
	    setPriorityElement: function setPriorityElement(val) {
	        state.priorityElement = val;
	    },
	    refresh: function refresh() {
	        state.currentPage = 0;
	        state.elementsOnPage = 4;
	        state.leftElement = 0;
	        state.lastRenderedElement = -1;
	        state.inResizing = false;
	        state.priorityElement = 0;
	    }
	};
	
	exports.default = state;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.videos = exports.makeRequest = exports.requestState = undefined;
	
	var _CustomJQuery = __webpack_require__(2);
	
	var _CustomJQuery2 = _interopRequireDefault(_CustomJQuery);
	
	var _State = __webpack_require__(3);
	
	var _State2 = _interopRequireDefault(_State);
	
	var _DrawElements = __webpack_require__(5);
	
	var _DrawElements2 = _interopRequireDefault(_DrawElements);
	
	var _UpdatePaging = __webpack_require__(6);
	
	var _UpdatePaging2 = _interopRequireDefault(_UpdatePaging);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var request = {
	    key: 'AIzaSyA5z46MEi2fhkPtf2M7EioI2AiHQiPrM88',
	    type: 'video',
	    part: 'snippet',
	    maxResults: 15,
	    order: 'relevance',
	    q: '',
	    pageToken: ''
	};
	
	var videos = {};
	
	var requestState = {
	    clearVideos: function clearVideos() {
	        exports.videos = videos = {};
	    },
	    setRequestQuery: function setRequestQuery(val) {
	        request.q = val;
	    },
	    setRequestPageToken: function setRequestPageToken(val) {
	        request.pageToken = val;
	    }
	};
	
	function updateRequest() {
	    var apiUrl = 'https://www.googleapis.com/youtube/v3/search?';
	    for (var property in request) {
	        if (request.hasOwnProperty(property)) {
	            apiUrl += property + '=' + request[property] + '&';
	        }
	    }
	    return apiUrl;
	}
	
	function makeRequest() {
	    var url = updateRequest();
	    var req = new XMLHttpRequest();
	    var tempElements = void 0;
	    var reqStatistics = new XMLHttpRequest();
	    var tempStatistics = void 0;
	    req.onreadystatechange = function () {
	        if (req.readyState === 4) {
	            if (req.status === 200) {
	                tempElements = JSON.parse(req.responseText);
	                var idsStatistics = '';
	                tempElements.items.forEach(function (currentValue) {
	                    idsStatistics += currentValue.id.videoId + ',';
	                });
	                request.pageToken = tempElements.nextPageToken;
	                var urlStatistics = 'https://www.googleapis.com/youtube/v3/videos?key=' + request.key + '&id=' + idsStatistics + '&part=statistics,snippet';
	                reqStatistics.open('GET', urlStatistics, true);
	                reqStatistics.send();
	            } else {
	                // console.log(req.statusText);
	            }
	        }
	    };
	    reqStatistics.onreadystatechange = function () {
	        if (reqStatistics.readyState === 4) {
	            if (reqStatistics.status === 200) {
	                tempStatistics = JSON.parse(reqStatistics.responseText);
	                if (!videos.items) {
	                    Object.assign(videos, tempStatistics);
	                    if (videos.items.length > 0) {
	                        (0, _DrawElements2.default)(_State2.default, _State2.default.elementsOnPage + 4);
	                    } else {
	                        (0, _CustomJQuery2.default)('.search').value = '';
	                    }
	                } else {
	                    tempStatistics.items.forEach(function (currentValue) {
	                        videos.items.push(currentValue);
	                    });
	                }
	                (0, _UpdatePaging2.default)();
	            } else {
	                // console.log(req.statusText);
	            }
	        }
	    };
	    req.open('GET', url, true);
	    req.send();
	}
	
	exports.requestState = requestState;
	exports.makeRequest = makeRequest;
	exports.videos = videos;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _CustomJQuery = __webpack_require__(2);
	
	var _CustomJQuery2 = _interopRequireDefault(_CustomJQuery);
	
	var _Request = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function drawElements(state, number) {
	    var videosContainer = (0, _CustomJQuery2.default)('.videos');
	    var htmlToAppend = '';
	    if (_Request.videos.items) {
	        for (var i = state.lastRenderedElement + 1; i < state.lastRenderedElement + 1 + number; i += 1) {
	            // console.log('adding i::',i);
	            // console.log(videos);
	            htmlToAppend += '<div class="media-element">' + ('<a href="https://www.youtube.com/watch?v=' + _Request.videos.items[i].id + '" class="link">') + ('<img src="' + _Request.videos.items[i].snippet.thumbnails.medium.url + '">') + '</a>' + ('<a href="https://www.youtube.com/watch?v=' + _Request.videos.items[i].id + '" class="link">') + ('<p class="title">' + _Request.videos.items[i].snippet.title + '</p>') + '</a>' + ('<p class="uploader-name">' + _Request.videos.items[i].snippet.channelTitle + '</p>') + ('<p class="date-uploaded">' + new Date(_Request.videos.items[i].snippet.publishedAt).toLocaleDateString() + '</p>') + ('<p class="views">' + _Request.videos.items[i].statistics.viewCount + '</p>') + ('<p class="description">' + _Request.videos.items[i].snippet.description + '</p>') + '</div>';
	        }
	        videosContainer.innerHTML += htmlToAppend;
	        // if(state.lastRenderedElement<state.leftElement+state.elementsOnPage-1){
	        // state.setLastRenderedElement(state.leftElement+state.elementsOnPage-1);
	        state.setLastRenderedElement(state.lastRenderedElement + 1 + number - 1);
	        if (_Request.videos.items.length - state.leftElement <= 15) {
	            (0, _Request.makeRequest)();
	        }
	        // console.log(state);
	    }
	}
	// import {state} from './State';
	exports.default = drawElements;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _State = __webpack_require__(3);
	
	var _State2 = _interopRequireDefault(_State);
	
	var _CustomJQuery = __webpack_require__(2);
	
	var _CustomJQuery2 = _interopRequireDefault(_CustomJQuery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function updatePaging() {
	    var pagingContainer = (0, _CustomJQuery2.default)('.paging');
	    var pages = Math.ceil((_State2.default.lastRenderedElement - 4) / _State2.default.elementsOnPage) + 1;
	    var pagingElNumber = (_State2.default.lastRenderedElement - 4) / _State2.default.elementsOnPage + 1;
	    if (_State2.default.elementsOnPage === 1) {
	        pages += 1;
	        pagingElNumber += 1;
	    }
	    (0, _CustomJQuery2.default)('.videos').style.width = (pages + 5) * 100 + 'vw';
	    // console.log(pages);
	    // console.log(state);
	    if (pages <= 5) {
	        var htmlToAppend = '';
	        for (var i = 1; i < pagingElNumber + 1; i += 1) {
	            if (i - 1 === _State2.default.currentPage) {
	                htmlToAppend += '<li class="page current-page" id="page-' + i + '">' + i + '</li>';
	            } else {
	                htmlToAppend += '<li class="page" id="page-' + i + '">' + i + '</li>';
	            }
	        }
	        pagingContainer.innerHTML = htmlToAppend;
	    }
	    if (pages > 5) {
	        if (_State2.default.currentPage === 0) {
	            pagingContainer.innerHTML = '<li class="page current-page" id="page-1">1</li>' + '<li class="page" id="page-2">2</li>' + '<li class="page" id="page-3">3</li>' + '<li class="page" id="page-4">4</li>' + ('<li class="page" id="page-' + pages + '">' + pages + '</li>');
	        }
	        if (_State2.default.currentPage === 1) {
	            pagingContainer.innerHTML = '<li class="page" id="page-1">1</li>' + '<li class="page current-page" id="page-2">2</li>' + '<li class="page" id="page-3">3</li>' + '<li class="page" id="page-4">4</li>' + ('<li class="page" id="page-' + pages + '">' + pages + '</li>');
	        }
	        if (_State2.default.currentPage > 1 && _State2.default.currentPage < pages - 2) {
	            pagingContainer.innerHTML = '<li class="page" id="page-1">1</li>' + ('<li class="page" id="page-' + _State2.default.currentPage + '">' + _State2.default.currentPage + '</li>') + ('<li class="page current-page" id="page-' + (_State2.default.currentPage + 1) + '">' + (_State2.default.currentPage + 1) + '</li>') + ('<li class="page" id="page-' + (_State2.default.currentPage + 2) + '">' + (_State2.default.currentPage + 2) + '</li>') + ('<li class="page" id="page-' + pages + '">' + pages + '</li>');
	        }
	        if (_State2.default.currentPage === pages - 2) {
	            pagingContainer.innerHTML = '<li class="page" id="page-1">1</li>' + ('<li class="page" id="page-' + (pages - 3) + '">' + (pages - 3) + '</li>') + ('<li class="page" id="page-' + (pages - 2) + '">' + (pages - 2) + '</li>') + ('<li class="page current-page" id="page-' + (pages - 1) + '">' + (pages - 1) + '</li>') + ('<li class="page" id="page-' + pages + '">' + pages + '</li>');
	        }
	        if (_State2.default.currentPage === pages - 1) {
	            pagingContainer.innerHTML = '<li class="page" id="page-1">1</li>' + ('<li class="page" id="page-' + (pages - 3) + '">' + (pages - 3) + '</li>') + ('<li class="page" id="page-' + (pages - 2) + '">' + (pages - 2) + '</li>') + ('<li class="page" id="page-' + (pages - 1) + '">' + (pages - 1) + '</li>') + ('<li class="page current-page" id="page-' + (pages - 0) + '">' + (pages - 0) + '</li>');
	        }
	    }
	}
	
	exports.default = updatePaging;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _CustomJQuery = __webpack_require__(2);
	
	var _CustomJQuery2 = _interopRequireDefault(_CustomJQuery);
	
	var _Request = __webpack_require__(4);
	
	var _State = __webpack_require__(3);
	
	var _State2 = _interopRequireDefault(_State);
	
	var _CalculatePages = __webpack_require__(8);
	
	var _CalculatePages2 = _interopRequireDefault(_CalculatePages);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function search() {
	    var searchContainer = (0, _CustomJQuery2.default)('#search-input');
	    searchContainer.addEventListener('keypress', function (event) {
	        if (event.keyCode === 13) {
	            (0, _CustomJQuery2.default)('.videos').innerHTML = '';
	            (0, _CustomJQuery2.default)('.videos').style.left = '0vw';
	            _Request.requestState.clearVideos();
	            _State2.default.refresh();
	            (0, _CalculatePages2.default)(null);
	            _Request.requestState.setRequestPageToken('');
	            _Request.requestState.setRequestQuery(searchContainer.value);
	            (0, _Request.makeRequest)();
	            (0, _CustomJQuery2.default)('.search').blur();
	        }
	    });
	}
	
	exports.default = search;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _State = __webpack_require__(3);
	
	var _State2 = _interopRequireDefault(_State);
	
	var _CustomJQuery = __webpack_require__(2);
	
	var _CustomJQuery2 = _interopRequireDefault(_CustomJQuery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function calculateNumberOfElementsOnPage() {
	    var bodyElement = (0, _CustomJQuery2.default)('body');
	    _State2.default.setElementsOnPage(1);
	    if (bodyElement.clientWidth > 600) {
	        _State2.default.setElementsOnPage(2);
	    }
	    if (bodyElement.clientWidth > 1024) {
	        _State2.default.setElementsOnPage(3);
	    }
	    if (bodyElement.clientWidth > 1440) {
	        _State2.default.setElementsOnPage(4);
	    }
	    var num = -_State2.default.leftElement / _State2.default.elementsOnPage * 100;
	    (0, _CustomJQuery2.default)('.videos').style.left = num + 'vw';
	    // console.log($('.videos').style['left']);
	}
	
	exports.default = calculateNumberOfElementsOnPage;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _CustomJQuery = __webpack_require__(2);
	
	var _CustomJQuery2 = _interopRequireDefault(_CustomJQuery);
	
	var _State = __webpack_require__(3);
	
	var _State2 = _interopRequireDefault(_State);
	
	var _DrawElements = __webpack_require__(5);
	
	var _DrawElements2 = _interopRequireDefault(_DrawElements);
	
	var _UpdatePaging = __webpack_require__(6);
	
	var _UpdatePaging2 = _interopRequireDefault(_UpdatePaging);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function slide() {
	    var videosContainer = (0, _CustomJQuery2.default)('.videos');
	    var cursorPos = 0;
	    var pressed = false;
	    var num = -_State2.default.leftElement / _State2.default.elementsOnPage * 100;
	
	    function controllerDownEvent(e) {
	        e.preventDefault();
	        if (e.button === 0 || e.changedTouches) {
	            pressed = true;
	            cursorPos = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
	            // console.log('mouseDOWN::' + cursorPos);
	            _State2.default.setInResizing(false);
	        }
	    }
	
	    function controllerUpEvent(e) {
	        if (pressed && (e.button === 0 || e.changedTouches)) {
	            e.preventDefault();
	            var currentCursorPos = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
	            // we want see transition on swipe
	            videosContainer.style.transition = 'left 0.5s';
	            if (currentCursorPos - cursorPos < -3) {
	                _State2.default.setCurrentPage(_State2.default.currentPage + 1);
	                _State2.default.setLeftElement(_State2.default.leftElement + _State2.default.elementsOnPage);
	                num = -_State2.default.leftElement / _State2.default.elementsOnPage * 100;
	                videosContainer.style.left = num + 'vw';
	                if (_State2.default.lastRenderedElement - (_State2.default.leftElement + _State2.default.elementsOnPage + 4) < 0) {
	                    (0, _DrawElements2.default)(_State2.default, _State2.default.leftElement + _State2.default.elementsOnPage - _State2.default.lastRenderedElement - 1 + 4);
	                }
	            }
	            if (currentCursorPos - cursorPos > 3) {
	                if (_State2.default.currentPage <= 0) {
	                    num = 0;
	                    _State2.default.setLeftElement(0);
	                    _State2.default.setCurrentPage(0);
	                } else {
	                    _State2.default.setCurrentPage(_State2.default.currentPage - 1);
	                    _State2.default.setLeftElement(_State2.default.leftElement - _State2.default.elementsOnPage);
	                }
	                num = -_State2.default.leftElement / _State2.default.elementsOnPage * 100;
	                videosContainer.style.left = num + 'vw';
	            }
	            if (Math.abs(currentCursorPos - cursorPos) <= 3) {
	                // e.preventDefault();
	                if (e.target.parentElement.className.includes('link')) {
	                    window.open(e.target.parentElement.getAttribute('href'));
	                }
	            }
	            (0, _UpdatePaging2.default)();
	        }
	
	        pressed = false;
	        // console.log(state);
	    }
	    function controllerMoveEvent(e) {
	        // e.preventDefault();
	        if (pressed) {
	            var bodyWidth = document.body.clientWidth;
	            videosContainer.style.transition = '';
	            var newCursorPos = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
	            var offset = (newCursorPos - cursorPos) * 100 / bodyWidth;
	            // scope-lint
	            num = -_State2.default.currentPage * 100;
	            (0, _CustomJQuery2.default)('.videos').style.left = num + offset + 'vw';
	        }
	    }
	
	    videosContainer.addEventListener('touchstart', controllerDownEvent);
	    videosContainer.addEventListener('mousedown', controllerDownEvent);
	
	    videosContainer.addEventListener('touchend', controllerUpEvent);
	    videosContainer.addEventListener('mouseup', controllerUpEvent);
	    videosContainer.addEventListener('mouseleave', controllerUpEvent);
	    // videosContainer.addEventListener('touchcancel',controllerUpEvent);
	
	    document.addEventListener('touchmove', controllerMoveEvent);
	    document.addEventListener('mousemove', controllerMoveEvent);
	
	    document.addEventListener('touchstart', function (e) {
	        if (!(e.target.className.includes('search') || e.target.className.includes('page'))) {
	            e.preventDefault();
	        }
	    });
	
	    videosContainer.addEventListener('click', function (e) {
	        e.preventDefault();
	        /*  if(e.target.parentElement.className.includes('link')){
	              window.open(e.target.parentElement.getAttribute('href'))
	          }*/
	    });
	}
	
	exports.default = slide;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _CustomJQuery = __webpack_require__(2);
	
	var _CustomJQuery2 = _interopRequireDefault(_CustomJQuery);
	
	var _State = __webpack_require__(3);
	
	var _State2 = _interopRequireDefault(_State);
	
	var _DrawElements = __webpack_require__(5);
	
	var _DrawElements2 = _interopRequireDefault(_DrawElements);
	
	var _UpdatePaging = __webpack_require__(6);
	
	var _UpdatePaging2 = _interopRequireDefault(_UpdatePaging);
	
	var _CalculatePages = __webpack_require__(8);
	
	var _CalculatePages2 = _interopRequireDefault(_CalculatePages);
	
	var _Request = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function resizer() {
	    var videosContainer = (0, _CustomJQuery2.default)('.videos');
	    window.addEventListener('resize', function (event) {
	        if (_Request.videos.items) {
	            // we dont want ot see transition on resize
	            if (!_State2.default.inResizing) {
	                _State2.default.setPriorityElement(_State2.default.leftElement);
	                _State2.default.setInResizing(true);
	            }
	            videosContainer.style.transition = 'left 0s';
	            (0, _CalculatePages2.default)(event);
	            _State2.default.setCurrentPage(Math.floor(_State2.default.priorityElement / _State2.default.elementsOnPage));
	            _State2.default.setLeftElement(_State2.default.currentPage * _State2.default.elementsOnPage);
	            if (_State2.default.lastRenderedElement < _State2.default.leftElement + _State2.default.elementsOnPage - 1 + 4) {
	                (0, _DrawElements2.default)(_State2.default, _State2.default.leftElement + _State2.default.elementsOnPage - 1 + 4 - _State2.default.lastRenderedElement);
	                _State2.default.setLastRenderedElement(_State2.default.leftElement + _State2.default.elementsOnPage - 1 + 4);
	            }
	            (0, _UpdatePaging2.default)();
	            // console.log(state);
	        }
	    });
	}
	
	exports.default = resizer;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _CustomJQuery = __webpack_require__(2);
	
	var _CustomJQuery2 = _interopRequireDefault(_CustomJQuery);
	
	var _State = __webpack_require__(3);
	
	var _State2 = _interopRequireDefault(_State);
	
	var _DrawElements = __webpack_require__(5);
	
	var _DrawElements2 = _interopRequireDefault(_DrawElements);
	
	var _UpdatePaging = __webpack_require__(6);
	
	var _UpdatePaging2 = _interopRequireDefault(_UpdatePaging);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function pager() {
	    var videosContainer = (0, _CustomJQuery2.default)('.videos');
	    var num = -_State2.default.leftElement / _State2.default.elementsOnPage * 100;
	    var paging = document.getElementsByClassName('paging')[0];
	    paging.addEventListener('click', function (e) {
	        e.preventDefault();
	        if (e.target.className.includes('page')) {
	            // we want see transition on swipe
	            videosContainer.style.transition = 'left 0.5s';
	            num = (Number(e.target.innerHTML, 10) - 1) * -100;
	            videosContainer.style.left = num + 'vw';
	            _State2.default.setInResizing(false);
	            _State2.default.setCurrentPage(Number(e.target.innerHTML, 10) - 1);
	            _State2.default.setLeftElement(_State2.default.currentPage * _State2.default.elementsOnPage);
	            if (_State2.default.lastRenderedElement - (_State2.default.leftElement + _State2.default.elementsOnPage + 4) < 0) {
	                (0, _DrawElements2.default)(_State2.default, _State2.default.leftElement + _State2.default.elementsOnPage - _State2.default.lastRenderedElement - 1 + 4);
	                // state.setLastRenderedElement(state.leftElement+state.elementsOnPage);
	            }
	            (0, _UpdatePaging2.default)();
	        }
	    });
	    paging.addEventListener('mousedown', function (e) {
	        e.preventDefault();
	    });
	}
	
	exports.default = pager;

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map