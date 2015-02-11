#Casino Lights

*
**10/02/2015**
I am currently in the process of migrating this component into an Angular directive.
It is currently in alpha state.
*


Flashing "casino" style lights implemented in Angular.

Check out the examples [thatguynamedandy.github.com/angular-casino-lights](http://thatguynamedandy.github.com/angular-casino-lights)

##Installation

Installation via [Bower](http://bower.io)

`bower install angular-casino-lights`

You will need angular as a dependency, so if you don't have it already.

`bower install angular`

##Usage

Load the script into the page

`<script src="bower_components/angular-casino-lights/dist/angular-casino-lights.min.js"></script>`

Load google Raleway font, to use your own font read the Font setup section.

`<link href='http://fonts.googleapis.com/css?family=Raleway:900' rel='stylesheet' type='text/css'>`

Add the directive to the element which you would like to give a bit of casino action.

`<h1 casino-lights text="CASINO">CASINO</h1>`

*Due to a limitation in Angular you will also need to provide an attribute of 'text'
which provides a duplicate of the text that you would like to use. I am looking
for a way round this*

Additional config can be altered via an attribute, check the usage examples and API docs.

`<h1 casino-lights config="config" text="CASINO">CASINO</h1>`

##API

## config

#### `power`: Boolean
*Default*: **true**.
Turns the lights on and off, meaning the lights can be controlled outside of the directive

#### `speed`: Object
Provides the maximum, minimum and current speeds of the light cycle.

    speed : {
        min: 50,
        max: 200,
        current: 100
    }

#### `filter`: String
*Default:* **random**.
The current filter cycle for the lights. [Current options](js/filters) are
- Letter
- Vertical
- Random


##Font setup

The biggest caveat with using this directive is that you will need to map the light positions yourself.
I've mapped a few in the [Raleway](http://www.google.com/fonts/specimen/Raleway) font,
and I will endeavour to map the whole font in the near future. So feel free to use that to
get you up and running.

If you do end up using this, please send/pull request any data that you create.



##TODO
-Improve the speed, currently the min value truly controls the speed
-Reset all lights when filter changes
-Provide a list of available filters
