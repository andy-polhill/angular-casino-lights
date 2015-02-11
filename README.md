#Casino Lights


**10/02/2015**
*I am currently in the process of migrating this component into an Angular directive.
It is currently in alpha state.*

Flashing "casino" style lights implemented in Angular.

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
- Tidy up and document embedding font data
- Provide usage examples
- Provide skeleton css/scss
- Map Raleway font


##TODO at some stage
- Unit test (confess to not doing TDD on this)
- CI Travis
- Reset all lights when filter changes
- Provide a list of available filters
