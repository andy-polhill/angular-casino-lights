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

Add the directive to the element which you would like to give a bit of spice.

`<h1 casino-lights></h1>`


##Font setup

The biggest caveat with using this directive is that you either have to use the [Raleway](http://www.google.com/fonts/specimen/Raleway) font.

Or manually map the light positions yourself. I'm pretty sure it's impossible to
automate the position of the lights within the letters, so it's a case of creating
a data file of all the light locations

##API
