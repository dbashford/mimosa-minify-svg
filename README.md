mimosa-minify-svg
===========

## Overview

This module uses [SVGO](https://github.com/svg/svgo) to minify SVG files.

For more information regarding Mimosa, see http://mimosa.io.

## Usage

Add `'minify-svg'` to your list of modules.  That's all!  Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

## Functionality

During `mimosa watch` and `mimosa build` this module will optimize`.svg` files.

Why?

> SVG files, especially exported from various editors, usually contains a lot of redundant and useless information such as editor metadata, comments, hidden elements, default or non-optimal values and other stuff that can be safely removed or converted without affecting SVG rendering result.

## Default Config

```javascript
minifySvg: {
  options: {}
}
```

* `options` an object, pass-through options/plugins to the [SVGO](https://github.com/svg/svgo) library.