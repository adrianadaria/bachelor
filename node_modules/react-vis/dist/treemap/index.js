'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Hierarchy = require('d3-hierarchy');

var _theme = require('../theme');

var _animation = require('../animation');

var _scalesUtils = require('../utils/scales-utils');

var _treemapLeaf = require('./treemap-leaf');

var _treemapLeaf2 = _interopRequireDefault(_treemapLeaf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TREEMAP_TILE_MODES = {
  squarify: _d3Hierarchy.treemapSquarify,
  resquarify: _d3Hierarchy.treemapResquarify,
  slice: _d3Hierarchy.treemapSlice,
  dice: _d3Hierarchy.treemapDice,
  slicedice: _d3Hierarchy.treemapSliceDice,
  binary: _d3Hierarchy.treemapBinary
};

var TREEMAP_LAYOUT_MODES = ['circlePack', 'partition', 'partition-pivot'];

var NOOP = function NOOP(d) {
  return d;
};

var ATTRIBUTES = ['opacity', 'color'];

/**
 * Get the map of scale functions from the given props.
 * @param {Object} props Props for the component.
 * @returns {Object} Map of scale functions.
 * @private
 */
function _getScaleFns(props) {
  var data = props.data;

  var allData = data.children || [];

  // Adding _allData property to the object to reuse the existing
  // getAttributeFunctor function.
  var compatibleProps = _extends({}, props, (0, _scalesUtils.getMissingScaleProps)(props, allData, ATTRIBUTES), {
    _allData: allData
  });
  return {
    opacity: (0, _scalesUtils.getAttributeFunctor)(compatibleProps, 'opacity'),
    color: (0, _scalesUtils.getAttributeFunctor)(compatibleProps, 'color')
  };
}

var Treemap = function (_React$Component) {
  _inherits(Treemap, _React$Component);

  _createClass(Treemap, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        animation: _animation.AnimationPropType,
        className: _propTypes2.default.string,
        data: _propTypes2.default.object.isRequired,
        height: _propTypes2.default.number.isRequired,
        mode: _propTypes2.default.oneOf(Object.keys(TREEMAP_TILE_MODES).concat(TREEMAP_LAYOUT_MODES)),
        onLeafClick: _propTypes2.default.func,
        onLeafMouseOver: _propTypes2.default.func,
        onLeafMouseOut: _propTypes2.default.func,
        useCirclePacking: _propTypes2.default.bool,
        padding: _propTypes2.default.number.isRequired,
        width: _propTypes2.default.number.isRequired
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        className: '',
        colorRange: _theme.CONTINUOUS_COLOR_RANGE,
        _colorValue: _theme.DEFAULT_COLOR,
        data: {
          children: []
        },
        mode: 'squarify',
        onLeafClick: NOOP,
        onLeafMouseOver: NOOP,
        onLeafMouseOut: NOOP,
        opacityType: _theme.OPACITY_TYPE,
        _opacityValue: _theme.DEFAULT_OPACITY,
        padding: 1
      };
    }
  }]);

  function Treemap(props) {
    _classCallCheck(this, Treemap);

    var _this = _possibleConstructorReturn(this, (Treemap.__proto__ || Object.getPrototypeOf(Treemap)).call(this, props));

    _this.state = { scales: _getScaleFns(props) };
    return _this;
  }

  _createClass(Treemap, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({ scales: _getScaleFns(props) });
    }

    /**
     * Create the list of nodes to render.
     * @returns {Array} Array of nodes.
     * @private
     */

  }, {
    key: '_getNodesToRender',
    value: function _getNodesToRender() {
      var _props = this.props,
          data = _props.data,
          height = _props.height,
          width = _props.width,
          mode = _props.mode,
          padding = _props.padding;

      if (data && (mode === 'partition' || mode === 'partition-pivot')) {
        var partitionFunction = (0, _d3Hierarchy.partition)().size([width, height]).padding(padding);
        var structuredInput = (0, _d3Hierarchy.hierarchy)(data).sum(function (d) {
          return d.size;
        });
        var mappedNodes = partitionFunction(structuredInput).descendants();
        if (mode === 'partition-pivot') {
          return mappedNodes.map(function (node) {
            return _extends({}, node, {
              x0: node.y0,
              x1: node.y1,
              y0: node.x0,
              y1: node.x1
            });
          });
        }
        return mappedNodes;
      }
      if (data && mode === 'circlePack') {
        var packingFunction = (0, _d3Hierarchy.pack)().size([width, height]).padding(padding);
        var _structuredInput = (0, _d3Hierarchy.hierarchy)(data).sort(function (a, b) {
          return a.size - b.size;
        }).sum(function (d) {
          return d.size;
        });
        return packingFunction(_structuredInput).descendants();
      }
      if (data) {
        var tileFn = TREEMAP_TILE_MODES[mode];
        var treemapingFunction = (0, _d3Hierarchy.treemap)(tileFn).tile(tileFn).size([width, height]).padding(padding);
        var _structuredInput2 = (0, _d3Hierarchy.hierarchy)(data).sort(function (a, b) {
          return a.size - b.size;
        }).sum(function (d) {
          return d.size;
        });

        return treemapingFunction(_structuredInput2).descendants();
      }
      return [];
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          animation = _props2.animation,
          className = _props2.className,
          height = _props2.height,
          mode = _props2.mode,
          width = _props2.width;

      var nodes = this._getNodesToRender();
      var useCirclePacking = mode === 'circlePack';
      return _react2.default.createElement(
        'div',
        {
          className: 'rv-treemap ' + (useCirclePacking ? 'rv-treemap-circle-packed' : '') + ' ' + className,
          style: {
            width: width + 'px',
            height: height + 'px'
          } },
        nodes.map(function (node, index) {
          // throw out the rootest node
          if (!useCirclePacking && !index) {
            return null;
          }

          var nodeProps = _extends({
            animation: animation,
            node: node
          }, _this2.props, {
            x0: useCirclePacking ? node.x : node.x0,
            x1: useCirclePacking ? node.x : node.x1,
            y0: useCirclePacking ? node.y : node.y0,
            y1: useCirclePacking ? node.y : node.y1,
            r: useCirclePacking ? node.r : 1,
            scales: _this2.state.scales
          });
          return _react2.default.createElement(_treemapLeaf2.default, _extends({}, nodeProps, { key: 'leaf-' + index }));
        })
      );
    }
  }]);

  return Treemap;
}(_react2.default.Component);

Treemap.displayName = 'Treemap';

exports.default = Treemap;