webpackHotUpdate(0,{

/***/ 184:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(9), RootInstanceProvider = __webpack_require__(10), ReactMount = __webpack_require__(4), React = __webpack_require__(2); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(48);

	var _Chat = __webpack_require__(187);

	var _Chat2 = _interopRequireDefault(_Chat);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ChatList = function (_Component) {
	    _inherits(ChatList, _Component);

	    function ChatList() {
	        _classCallCheck(this, ChatList);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ChatList).apply(this, arguments));
	    }

	    _createClass(ChatList, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _props = this.props;
	            var socket = _props.socket;
	            var addMsgToList = _props.addMsgToList;
	            var setWillScroll = _props.setWillScroll;

	            var dom = (0, _reactDom.findDOMNode)(this);

	            socket.on('chat', function (data) {
	                var willScroll = dom.scrollTop + dom.clientHeight >= dom.scrollHeight;
	                setWillScroll(willScroll);
	                addMsgToList(data);
	                if (willScroll) dom.scrollTop = dom.scrollHeight - dom.clientHeight;
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props2 = this.props;
	            var records = _props2.records;
	            var willScroll = _props2.willScroll;
	            var scrollHandler = _props2.scrollHandler;


	            return _react2.default.createElement(
	                'ul',
	                { style: { backgroundColor: 'grey' }, className: 'chatlist', onScroll: scrollHandler },
	                records.map(function (record, i) {
	                    var user = record.user;
	                    var monitor = record.monitor;
	                    var msg = record.msg;

	                    return _react2.default.createElement(
	                        _Chat2.default,
	                        { key: i, user: user, monitor: monitor },
	                        msg
	                    );
	                })
	            );
	        }
	    }]);

	    return ChatList;
	}(_react.Component);

	exports.default = ChatList;

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(11); if (makeExportsHot(module, __webpack_require__(2))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "ChatList.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ }

})