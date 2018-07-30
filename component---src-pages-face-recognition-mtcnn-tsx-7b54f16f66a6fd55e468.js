webpackJsonp([137470533303075],{

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _templateObject = _taggedTemplateLiteralLoose(["\n  margin: 10px !important;\n"], ["\n  margin: 10px !important;\n"]),
	    _templateObject2 = _taggedTemplateLiteralLoose(["\n  width: 40px;\n  height: 40px;\n"], ["\n  width: 40px;\n  height: 40px;\n"]);
	
	function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }
	
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(36);
	var React = __webpack_require__(2);
	var styled_components_1 = __webpack_require__(48);
	var SideBySide_1 = __webpack_require__(118);
	exports.StyledFormControl = styled_components_1.default(core_1.FormControl)(_templateObject);
	exports.StyledButton = styled_components_1.default(core_1.Button)(_templateObject2);
	exports.AdjustableInput = function (props) {
	  return React.createElement(exports.StyledFormControl, null, React.createElement(SideBySide_1.SideBySide, null, React.createElement(core_1.InputLabel, { htmlFor: props.inputId }, props.label), React.createElement(core_1.Input, { id: props.inputId, value: props.value }), React.createElement(exports.StyledButton, { variant: "outlined", onClick: function onClick() {
	      return props.onChange(Math.max(props.value - props.step, props.minValue));
	    } }, "-"), React.createElement(exports.StyledButton, { variant: "outlined", onClick: function onClick() {
	      return props.onChange(Math.min(props.value + props.step, props.maxValue));
	    } }, "+")));
	};

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(2);
	var DisplayResults_1 = __webpack_require__(117);
	exports.DisplayFullFaceDescriptions = function (props) {
	    var fullFaceDescriptions = props.fullFaceDescriptions,
	        overlay = props.overlay,
	        withScore = props.withScore,
	        drawLandmarks = props.drawLandmarks,
	        getBestMatch = props.getBestMatch;
	
	    var faceDetections = fullFaceDescriptions.map(function (fd) {
	        return fd.detection;
	    });
	    var faceLandmarks = drawLandmarks ? fullFaceDescriptions.map(function (fd) {
	        return fd.landmarks;
	    }) : [];
	    var bestMatches = fullFaceDescriptions.map(function (fd) {
	        return getBestMatch(fd.descriptor);
	    });
	    var displayResultsProps = {
	        overlay: overlay,
	        withScore: withScore,
	        faceDetections: faceDetections,
	        faceLandmarks: faceLandmarks,
	        bestMatches: bestMatches
	    };
	    return React.createElement(DisplayResults_1.DisplayResults, _extends({}, displayResultsProps));
	};

/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(2);
	var CenterContent_1 = __webpack_require__(177);
	var AdjustableInput_1 = __webpack_require__(171);
	exports.MtcnnParamControls = function (props) {
	    return React.createElement(CenterContent_1.CenterContent, { flexDirection: "column" }, React.createElement(AdjustableInput_1.AdjustableInput, { inputId: "scaleFactor", label: "scaleFactor:", value: props.detectionParams.scaleFactor, minValue: 0.1, maxValue: 0.9, step: 0.05, onChange: function onChange(scaleFactor) {
	            return props.onChange(_extends({}, props.detectionParams, { scaleFactor: scaleFactor }));
	        } }), React.createElement(AdjustableInput_1.AdjustableInput, { inputId: "minFaceSize", label: "minFaceSize:", value: props.detectionParams.minFaceSize, minValue: 40, maxValue: 400, step: 40, onChange: function onChange(minFaceSize) {
	            return props.onChange(_extends({}, props.detectionParams, { minFaceSize: minFaceSize }));
	        } }));
	};

/***/ }),

/***/ 641:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", { value: true });
	var faceapi = __webpack_require__(40);
	var withAllFaces_1 = __webpack_require__(176);
	exports.AllFacesMtcnn = withAllFaces_1.withAllFaces(function (img, detectionParams) {
	  return faceapi.allFacesMtcnn(img, detectionParams);
	});

/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var initRefDescriptors = function () {
	    var _ref = _asyncToGenerator(function* (props) {
	        var refDescriptors = yield Promise.all(props.refDataSources.map(function () {
	            var _ref2 = _asyncToGenerator(function* (_ref3) {
	                var label = _ref3.label,
	                    url = _ref3.url;
	
	                var img = yield faceapi.bufferToImage((yield (yield fetch(url)).blob()));
	                var descriptor = yield props.faceRecognitionNet.computeFaceDescriptor(img);
	                return {
	                    label: label.replace('1.png', ''),
	                    descriptor: descriptor
	                };
	            });
	
	            return function (_x2) {
	                return _ref2.apply(this, arguments);
	            };
	        }()));
	        var getBestMatch = function getBestMatch(queryDescriptor) {
	            return refDescriptors.map(function (ref) {
	                return {
	                    label: ref.label,
	                    distance: faceapi.euclideanDistance(ref.descriptor, queryDescriptor)
	                };
	            }).reduce(function (best, curr) {
	                return curr.distance < best.distance ? curr : best;
	            });
	        };
	        return {
	            refDescriptors: refDescriptors,
	            getBestMatch: getBestMatch
	        };
	    });
	
	    return function initRefDescriptors(_x) {
	        return _ref.apply(this, arguments);
	    };
	}();
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	Object.defineProperty(exports, "__esModule", { value: true });
	var faceapi = __webpack_require__(40);
	var React = __webpack_require__(2);
	var ModalLoader_1 = __webpack_require__(29);
	var withAsyncRendering_1 = __webpack_require__(32);
	
	exports.ComputeRefDescriptors = withAsyncRendering_1.withAsyncRendering(initRefDescriptors, function () {
	    return React.createElement(ModalLoader_1.ModalLoader, { title: "Computing Reference Descriptors" });
	});

/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	Object.defineProperty(exports, "__esModule", { value: true });
	var withAsyncRendering_1 = __webpack_require__(32);
	var ModalLoader_1 = __webpack_require__(29);
	var React = __webpack_require__(2);
	exports.withAllFaces = function (allFacesFunction) {
	    var allFaces = function () {
	        var _ref = _asyncToGenerator(function* (props) {
	            var fullFaceDescriptions = yield allFacesFunction(props.img.img, props.detectionParams);
	            return {
	                fullFaceDescriptions: fullFaceDescriptions
	            };
	        });
	
	        return function allFaces(_x) {
	            return _ref.apply(this, arguments);
	        };
	    }();
	
	    return withAsyncRendering_1.withAsyncRendering(allFaces, function () {
	        return React.createElement(ModalLoader_1.ModalLoader, { title: "Detecting Faces" });
	    });
	};

/***/ }),

/***/ 652:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(2);
	var DisplayFullFaceDescriptions_1 = __webpack_require__(172);
	var ModalLoader_1 = __webpack_require__(29);
	var MtcnnParamControls_1 = __webpack_require__(173);
	var SelectableImage_1 = __webpack_require__(95);
	var const_1 = __webpack_require__(70);
	var AllFacesMtcnn_1 = __webpack_require__(641);
	var ComputeRefDescriptors_1 = __webpack_require__(174);
	var LoadModels_1 = __webpack_require__(71);
	var ImageWrap_1 = __webpack_require__(68);
	var Root_1 = __webpack_require__(69);
	var REF_DATA_SOURCES = const_1.ALIGNED_FACE_IMAGES_BY_CLASS.map(function (srcsByClass) {
	    return srcsByClass[0];
	});
	
	var default_1 = function (_React$Component) {
	    _inherits(default_1, _React$Component);
	
	    function default_1() {
	        _classCallCheck(this, default_1);
	
	        var _this = _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	
	        _this.state = {
	            inputImg: new ImageWrap_1.ImageWrap(const_1.EXAMPLE_IMAGES[0].url),
	            detectionParams: {
	                minFaceSize: 40,
	                scaleFactor: 0.7
	            }
	        };
	        return _this;
	    }
	
	    default_1.prototype.render = function render() {
	        var _this2 = this;
	
	        if (!(typeof window !== 'undefined' && window.document)) {
	            return null;
	        }
	        return React.createElement(Root_1.Root, null, React.createElement(SelectableImage_1.SelectableImage, { items: const_1.EXAMPLE_IMAGES, initialImageSrc: this.state.inputImg.imageSrc, onLoaded: function onLoaded(_ref) {
	                var inputImg = _ref.img,
	                    overlay = _ref.overlay;
	                return _this2.setState({ inputImg: inputImg, overlay: overlay });
	            }, maxImageWidth: 800 }), React.createElement(MtcnnParamControls_1.MtcnnParamControls, { detectionParams: this.state.detectionParams, onChange: function onChange(detectionParams) {
	                return _this2.setState({ detectionParams: detectionParams });
	            } }), React.createElement(LoadModels_1.LoadModels, { mtcnnModelUrl: const_1.MODELS_URI, faceRecognitionModelUrl: const_1.MODELS_URI }, function (_ref2) {
	            var faceRecognitionNet = _ref2.faceRecognitionNet;
	            return React.createElement(ComputeRefDescriptors_1.ComputeRefDescriptors, { faceRecognitionNet: faceRecognitionNet, refDataSources: REF_DATA_SOURCES }, function (_ref3) {
	                var getBestMatch = _ref3.getBestMatch;
	                return React.createElement(AllFacesMtcnn_1.AllFacesMtcnn, { img: _this2.state.inputImg, detectionParams: _this2.state.detectionParams }, function (_ref4) {
	                    var fullFaceDescriptions = _ref4.fullFaceDescriptions,
	                        isBusy = _ref4.isBusy;
	                    return isBusy ? React.createElement(ModalLoader_1.ModalLoader, { title: "Computing" }) : React.createElement(DisplayFullFaceDescriptions_1.DisplayFullFaceDescriptions, { fullFaceDescriptions: fullFaceDescriptions, overlay: _this2.state.overlay, getBestMatch: getBestMatch, drawLandmarks: true });
	                });
	            });
	        }));
	    };
	
	    return default_1;
	}(React.Component);
	
	exports.default = default_1;

/***/ })

});
//# sourceMappingURL=component---src-pages-face-recognition-mtcnn-tsx-7b54f16f66a6fd55e468.js.map