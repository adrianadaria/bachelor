'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3SankeyAlign = require('d3-sankey-align');

var _voronoi = require('../plot/voronoi');

var _voronoi2 = _interopRequireDefault(_voronoi);

var _theme = require('../theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NOOP = function NOOP(f) {
  return f;
};

var DEFAULT_LINK_COLOR = _theme.DISCRETE_COLOR_RANGE[1];
var DEFAULT_LINK_OPACITY = 0.7;
var DEFAULT_NODE_COLOR = _theme.DISCRETE_COLOR_RANGE[0];
var DEFAULT_NODE_OPACITY = 1;

var Sankey = function (_Component) {
  _inherits(Sankey, _Component);

  function Sankey() {
    _classCallCheck(this, Sankey);

    return _possibleConstructorReturn(this, (Sankey.__proto__ || Object.getPrototypeOf(Sankey)).apply(this, arguments));
  }

  _createClass(Sankey, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          align = _props.align,
          className = _props.className,
          hasVoronoi = _props.hasVoronoi,
          height = _props.height,
          layout = _props.layout,
          links = _props.links,
          margin = _props.margin,
          nodePadding = _props.nodePadding,
          nodes = _props.nodes,
          nodeWidth = _props.nodeWidth,
          onBlur = _props.onBlur,
          _onClick = _props.onClick,
          onHover = _props.onHover,
          width = _props.width;


      var sankeyInstance = (0, _d3SankeyAlign.sankey)().size([width, height]).nodeWidth(nodeWidth).nodePadding(nodePadding).nodes(nodes).links(links).align(align).layout(layout);

      var nWidth = sankeyInstance.nodeWidth();
      var path = sankeyInstance.link();

      return _react2.default.createElement(
        'svg',
        { height: height + margin, width: width + margin, className: 'rv-sankey ' + className },
        _react2.default.createElement(
          'g',
          { transform: 'translate(' + margin / 2 + ', ' + margin / 2 + ')' },
          links.map(function (link, i) {
            return _react2.default.createElement('path', {
              d: path(link),
              className: 'rv-sankey__link',
              opacity: Number.isFinite(link.opacity) ? link.opacity : DEFAULT_LINK_OPACITY,
              stroke: link.color || DEFAULT_LINK_COLOR,
              strokeWidth: Math.max(1, link.dy),
              fill: 'none',
              key: link.id || link.key || 'link-' + i });
          }),
          nodes.map(function (node, i) {
            return _react2.default.createElement(
              'g',
              {
                transform: 'translate(' + node.x + ', ' + node.y + ')',
                className: 'rv-sankey__node',
                opacity: Number.isFinite(node.opacity) ? node.opacity : DEFAULT_NODE_OPACITY,
                key: node.id || node.key || 'node-' + i },
              _react2.default.createElement('rect', {
                onClick: function onClick() {
                  return _onClick(node);
                },
                onMouseOver: function onMouseOver() {
                  return onHover(node);
                },
                onMouseOut: function onMouseOut() {
                  return onBlur(node);
                },
                fill: node.color || DEFAULT_NODE_COLOR,
                height: node.dy,
                width: nWidth })
            );
          }),
          hasVoronoi && _react2.default.createElement(_voronoi2.default, {
            className: 'rv-sankey__voronoi',
            extent: [[-margin, -margin], [width + margin, height + margin]],
            nodes: nodes,
            onBlur: onBlur,
            onClick: _onClick,
            onHover: onHover,
            x: function x(d) {
              return d.x + d.dx / 2;
            },
            y: function y(d) {
              return d.y + d.dy / 2;
            }
          })
        )
      );
    }
  }]);

  return Sankey;
}(_react.Component);

Sankey.defaultProps = {
  align: 'justify',
  className: '',
  hasVoronoi: false,
  layout: 50,
  margin: 20,
  nodePadding: 10,
  nodeWidth: 10,
  onBlur: NOOP,
  onClick: NOOP,
  onHover: NOOP
};
Sankey.propTypes = {
  align: _propTypes2.default.oneOf(['justify', 'left', 'right', 'center']),
  className: _propTypes2.default.string,
  hasVoronoi: _propTypes2.default.bool,
  height: _propTypes2.default.number.isRequired,
  layout: _propTypes2.default.number,
  links: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    source: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.object]).isRequired,
    target: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.object]).isRequired
  })).isRequired,
  margin: _propTypes2.default.number,
  nodePadding: _propTypes2.default.number,
  nodes: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  nodeWidth: _propTypes2.default.number,
  onBlur: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onHover: _propTypes2.default.func,
  width: _propTypes2.default.number.isRequired
};
exports.default = Sankey;