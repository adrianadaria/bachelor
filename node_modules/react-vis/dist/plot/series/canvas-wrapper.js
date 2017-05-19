'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var CanvasWrapper = function (_Component) {
  _inherits(CanvasWrapper, _Component);

  function CanvasWrapper() {
    _classCallCheck(this, CanvasWrapper);

    return _possibleConstructorReturn(this, (CanvasWrapper.__proto__ || Object.getPrototypeOf(CanvasWrapper)).apply(this, arguments));
  }

  _createClass(CanvasWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.drawChildren(this.props, this.refs.canvas.getContext('2d'));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      this.drawChildren(nextProps, this.refs.canvas.getContext('2d'));
    }
  }, {
    key: 'drawChildren',
    value: function drawChildren(props, ctx) {
      var children = props.children,
          innerHeight = props.innerHeight,
          innerWidth = props.innerWidth;

      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      children.forEach(function (layer) {
        return layer.type.renderLayer(layer.props, ctx);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          marginLeft = _props.marginLeft,
          marginTop = _props.marginTop,
          innerHeight = _props.innerHeight,
          innerWidth = _props.innerWidth;


      return _react2.default.createElement(
        'div',
        {
          style: {
            left: marginLeft,
            top: marginTop
          },
          className: 'rv-xy-canvas' },
        _react2.default.createElement('canvas', {
          className: 'rv-xy-canvas-element',
          height: innerHeight,
          width: innerWidth,
          ref: 'canvas' })
      );
    }
  }]);

  return CanvasWrapper;
}(_react.Component);

CanvasWrapper.displayName = 'CanvasWrapper';
CanvasWrapper.propTypes = {
  marginLeft: _propTypes2.default.number.isRequired,
  marginTop: _propTypes2.default.number.isRequired,
  innerHeight: _propTypes2.default.number.isRequired,
  innerWidth: _propTypes2.default.number.isRequired
};

exports.default = CanvasWrapper;