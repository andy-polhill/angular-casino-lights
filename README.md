#Casino Lights

**13/02/2015**
*Currently in alpha state, use at your peril*

Flashing "casino" style lights implemented in Angular.

See it in action http://thatguynamedandy.github.com/angular-casino-lights

##Installation

Installation via [Bower](http://bower.io)

`bower install angular-casino-lights`

##Usage

Load the script into the page

`<script src="bower_components/angular-casino-lights/dist/angular-casino-lights.min.js"></script>`

Load the data script for the font that you are going to use (currently Raleway is the only supported font)

`<script src="bower_components/angular-casino-lights/dist/fonts/casino-raleway.min.js"></script>`

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


#### `dataPath`: String
*Default:* **bower_components/angular-casino-lights/data/**.
By default the directive will look for font data that is already loaded onto the page.
If it doesn't find any it will attempt to load the data asynchronously. If you need to
provide a custom location do so with this variable


##Font setup

The biggest caveat with using this directive is that you will need to map the light positions yourself.
I've mapped a few in the [Raleway](http://www.google.com/fonts/specimen/Raleway) font,
and I will endeavour to map the whole font in the near future. So feel free to use that to
get you up and running.

If you do end up using this, please send/pull request any data that you create.

##TODO before alpha complete
- Determine browser coverage
  - Safari light alignment
- Complete usage examples
- Map Raleway font


##TODO at some stage
- Unit test (confess to not doing TDD on this)
- CI Travis
- Reset all lights when filter changes
- Provide a list of available filters
