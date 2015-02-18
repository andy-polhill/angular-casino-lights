#Casino Lights

[![Build Status](https://travis-ci.org/thatguynamedandy/angular-casino-lights.svg?branch=master)](https://travis-ci.org/thatguynamedandy/angular-casino-lights)

Flashing "casino" style lights implemented in Angular.

See it in action http://thatguynamedandy.github.com/angular-casino-lights

##Installation

Installation via [Bower](http://bower.io)

`bower install angular-casino-lights`

##Usage

Load the script into the page

`<script src="bower_components/angular-casino-lights/dist/angular-casino-lights.min.js"></script>`

Load google Raleway font, to use your own font read the Font setup section.

`<link href='http://fonts.googleapis.com/css?family=Raleway:900' rel='stylesheet' type='text/css'>`

If using SASS include the provided scss file into your workflow, overriding any neccessary properties

    $header-font-size:110px !default;
    @import '../bower_components/angular-casino-lights/scss/_casino-lights.scss';

If using CSS load the provided, css directly into your page. You will need to manually override any styles
to control font/light size etc. The css in this module is mainly for guidance.

Add the directive to the element which you would like to give a bit of casino action.

`<h1 casino-lights>CASINO</h1>`

Additional config can be altered via an attribute, check the usage examples and API docs.

`<h1 casino-lights config="config">CASINO</h1>`

##API

The following config options are available

#### `power`: Boolean
*Default*: **true**.
Turns the lights on and off, meaning the lights can be controlled outside of the directive


#### `speed`: Integer
*Default:* **80**.
This is the time in milliseconds between animation frames, a shorter speed means a quicker frame rate.


#### `filter`: String
*Default:* **random**.
The current filter cycle for the lights. [Current options](js/filters) are
- Letter
- Vertical
- Random

##Font setup

The biggest caveat with using this directive is that it is currently restricted
to the [Raleway](http://www.google.com/fonts/specimen/Raleway) font.

I don't think it's currently possible to programmatically determine the light positions.
So if you want to use another font you will have to manually map your own light positions.
This is a bit time consuming, but not the end of the world if you only need to map a couple
of words.

Have a look at [the data file for Raleway](fonts/casino-raleway.js) to get an idea of what is required.
You may also need to edit the scss to deal with the additional spacing at the top and bottom of a font.
(If people start using this I may eventually provide a CSS file per font)
Once you have marked out your light locations, simply include the JavaScript file,
ensure that your CSS has the correct font-family set and the directive will do the rest for you.

If you need help, or have any success mapping other fonts let me know. Pull requests
would also be welcomed.

##TODO
- Increase test coverage
- Provide a list of available filters
- Map alternative fonts
