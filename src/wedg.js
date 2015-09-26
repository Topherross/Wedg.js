(function (window, document) {
    'use strict';

    /**
     *
     * @param deg {number}
     * @returns {number}
     */
    function toRadians(deg) {
        return deg * Math.PI / 180;
    }

    /**
     *
     * @param percent {number}
     * @returns {number}
     */
    function percentToRadians(percent) {
        return toRadians(
            ((360 / 100 * percent) + -90)
        );
    }

    /**
     *
     * @param target {Element}
     * @param options {Object}
     * @returns {Object}
     */
    function createCanvas(target, options) {
        var _options, $canvas, w, h;

        options = options || {};

        _options = {
            radius: options.radius || null,
            color: options.color || '#7F7F7F',
            percent: options.percent || 0,
            stroke: options.stroke || 0,
            cclockwise: options.cclockwise || false,
            id: options.id || null
        };

        if (_options.radius === null) {
            return null;
        }

        $canvas = document.createElement('canvas');
        $canvas.setAttribute('class', 'wedg-circle');

        if (_options.id !== null && typeof _options.id === 'string') {
            $canvas.setAttribute('id', _options.id);
        }

        w = h = (_options.radius * 2).toString();

        $canvas.setAttribute('width', w);
        $canvas.setAttribute('height', h);

        target.appendChild($canvas);
        _options.canvas = $canvas;

        return _options;
    }

    /**
     *
     * @param target {Element}
     * @param radius {Number}
     * @param color {String}
     * @param percent {Number}
     * @param stroke {Number|null}
     * @param counter_clockwise {Boolean}
     */
    function drawCircle(target, radius, color, percent, stroke, counter_clockwise) {
        var context, cx, cy;

        context = target.getContext('2d');
        context.clearRect(0, 0, radius * 2, radius * 2);
        cx = cy = radius;

        if (stroke > 0) {
            context.lineWidth = stroke;
            context.strokeStyle = color;
            context.beginPath();
            context.arc(cx, cy, (radius - (stroke / 2)), toRadians(-90), percentToRadians(percent), counter_clockwise);
            context.stroke();
        } else {
            context.fillStyle = color;
            context.beginPath();
            context.moveTo(cx, cy);
            context.arc(cx, cy, radius, toRadians(-90), percentToRadians(percent), counter_clockwise);
            context.lineTo(cx, cy);
            context.closePath();
            context.fill();
        }
    }

    /**
     *
     * @param target {Element}
     * @param options {Object}
     * @returns {Object}
     * @constructor
     */
    function Wedg(target, options) {
        if (undefined === this) {
            return;
        }

        options = options || {};

        var $canvas = createCanvas(target, options);

        drawCircle($canvas.canvas, $canvas.radius, $canvas.color, $canvas.percent, $canvas.stroke, $canvas.cclockwise);

        $canvas.update = function (percent, cc) {
            cc = typeof cc === 'boolean' ? cc : this.cclockwise;
            drawCircle(this.canvas, this.radius, this.color, percent, this.stroke, cc);
        };

        return $canvas;
    }

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = Wedg;
    } else {
        window.Wedg = Wedg;
    }
}(window, document));