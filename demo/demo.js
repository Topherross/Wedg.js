(function (window, document) {
    'use strict';

    var day_const = (24 * 60 * 60 * 1000),
        hour_const = (60 * 60 * 1000),
        minute_const = (60 * 1000),
        second_const = (1000),
        interval,
        radius = 40,
        stroke = 6,
        cc = true,
        end_time,
        $els,
        $percent,
        day_display = document.querySelector('#day_display'),
        hour_display = document.querySelector('#hour_display'),
        minute_display = document.querySelector('#minute_display'),
        second_display = document.querySelector('#second_display'),
        circle_target = document.querySelector('#circle_target'),
        percent_target = document.querySelector('#percent_target'),
        time_form = document.querySelector('#time_form');

    $els = {
        days: {
            canvas: null,
            label: 'days',
            percent: 0,
            interval: day_const,
            configs: {
                radius: radius, color: 'rgb(149, 81, 236)',
                stroke: stroke, cclockwise: cc, id: 'wedg_days'
            }
        },
        hours: {
            canvas: null,
            label: 'hours',
            percent: 0,
            interval: hour_const,
            configs: {
                radius: radius, color: 'rgb(49, 199, 140)',
                stroke: stroke, cclockwise: cc, id: 'wedg_hours'
            }
        },
        minutes: {
            canvas: null,
            label: 'minutes',
            percent: 0,
            interval: minute_const,
            configs: {
                radius: radius, color: 'rgb(50, 184, 210)',
                stroke: stroke, cclockwise: cc, id: 'wedg_minutes'
            }
        },
        seconds: {
            canvas: null,
            label: 'seconds',
            percent: 0,
            interval: second_const,
            configs: {
                radius: radius, color: 'rgb(236, 78, 141)',
                stroke: stroke, cclockwise: cc, id: 'wedg_seconds'
            }
        }
    };

    function updateCircles(time) {
        $els.days.canvas.update(100 - (((time.days / 365) * 100)).toFixed(3), true);
        $els.hours.canvas.update(100 - (((time.hours / 24) * 100)).toFixed(3), true);
        $els.minutes.canvas.update(100 - (((time.minutes / 60) * 100)).toFixed(3), true);
        $els.seconds.canvas.update(100 - (((time.seconds / 60) * 100)).toFixed(3), true);
    }

    function updateDisplay(time) {
        var $time = time || getTimeDiff();

        day_display.innerHTML = $time.days;
        hour_display.innerHTML = $time.hours;
        minute_display.innerHTML = $time.minutes;
        second_display.innerHTML = $time.seconds;

        updateCircles($time);
    }

    function getTimeDiff() {
        var diff = end_time % Date.now(), values;

        values = {
            days: parseInt((diff / day_const)),
            hours: ( parseInt((diff / hour_const)) % 24 ),
            minutes: ( parseInt((diff / minute_const)) % 60 ),
            seconds: ( parseInt((diff / second_const)) % 60 ) + 1
        };

        return values;
    }

    function initTimer() {
        var el;

        circle_target.innerHTML = '';

        for (el in $els) {
            if ($els.hasOwnProperty(el) && el !== 'length') {
                $els[el].canvas = new window.Wedg(circle_target, $els[el].configs);
                $els[el].canvas.update($els[el].percent, $els[el].configs.cclockwise);
            }
        }

        updateDisplay();
        updateCircles({days: 0, hours: 0, minutes: 0, seconds: 0});

        interval = window.setInterval(function () {
            if ((end_time - Date.now()) <= 0) {
                window.clearInterval(interval);
                updateDisplay({days: 0, hours: 0, minutes: 0, seconds: 0});
            } else {
                updateDisplay();
            }
        }, second_const);
    }

    function showPercent(percent) {
        percent_target.innerHTML = '';
        $percent = new window.Wedg(percent_target, {
            radius: 30,
            color: 'rgb(255, 130, 50)',
            stroke: 6,
            id: 'wedg_percent',
            percent: percent
        });
    }

    time_form.onsubmit = function (event) {
        event.preventDefault();

        var els = {
            days: this.day_input.value || 0,
            hours: this.hour_input.value || 0,
            minutes: this.minute_input.value || 0,
            seconds: this.second_input.value || 0
        };

        end_time = (
            Date.now() + (els.days * day_const) +
            (els.hours * hour_const) +
            (els.minutes * minute_const) +
            (els.seconds * second_const)
        );

        initTimer();
    };

    showPercent(((9883 / 15860) * 100).toFixed(3));
}(window, document));
