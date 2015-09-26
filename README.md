# Wedg.js

Wedg.js is a pure javascript widget to enable partial, or full canvas rendering of circles based on percent.

**********************************

## Usage

To create a new `Wedg` object call the following function from your Javascript file.

```javascript
var my_wedg = new Wedg(target, options);
```

Both `target`, and `options` are required.

1. `target` is the HTML element in which to add the newly created `Wedg` object.
2. `options` represents a Javascript Object. See the [options](#options "Wedg.js Options") structure, and default values below:

The newly created `my_wedg` object has one method `my_wedg.update(percent, [cc]);` with two method parameters.

1. `percent` is the new percent `Number` to render the circle with, and is required. 
2. `cc` is optional and will override the constructor `cclockwise`.

__NOTE__ To properly calculate the `percent` use this formula:

```javascript
((current_value / total_value) * 100).toFixed(3);
```

**********************************

### Options

```javascript
{
    radius: 80,
    color: 'green',
    percent: 100,
    stroke: 10,
    cclockwise: true,
    id: 'my_wedg'
}
```

__NOTE__ Any keys other than those listed above will be ignored when creating the new `Wedg`.

#### Options Desriptions

| Option Name | Required | Allowed Values | Default Value | Example Values | Description |
| ----------- | -------- | -------------- | ------------- | -------------- | ----------- |
| radius | Yes | Number | None | `60` | A number representing the radius of the circle. Radius equals half of the total height, and width of the circle. |
| color | No | String | `'#7F7F7F'` | `'#C3C3C3'`, `'blue'`, `'rgb(r,g,b)'`, or `'rgba(r,g,b,a)'` | The color to render the circle with. |
| percent | No | Number | `0` | `0-100` | The percent of the circle to render. |
| stroke | No | Number | `0` | `6` | The stroke width of the circle. If omitted the circle will render with a fill equal to the `options.color`. |
| cclockwise | No | Boolean | `false` | `true`, or `false` | When set to `true` the circle will render in a counter clockwise direction. |
| id | No | String | `null` | `'my_wedg'` | The HTML `id` attribute to add to the newly created `Wedg` object. If omitted no `id` will be added. |
