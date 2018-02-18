FeastOn-SASS is a small **BETA** SASS library/framework. The project aims to provide a customized CSS reset combined with the below features. 

## Features 
- Modular rhythm and scale
- Palette management
- Base site and Responsive settings
- Helpers
- A few shape and effect mix-ins
- etc... see the docs and examples for now

## Installation  
Install with `npm` or `yarn`.
  `npm i FeastOn-SASS`

## Getting Started 
Running the below command will copy all customizable style sheets to a folder of your choosing. 

  `FeastOnSass -f /destination/folder`

After the copy operation you can import the `_lib.scss` and `_base.scss` files found in your destination folder to your site or applications style sheets. 

In most cases you will want the `_base.scss` to be the first thing added to your distributable style sheet. Wherever you import the file it's important to only include this file once in your project.

The `_lib.scss`file contains SASS helpers and utilities which can be imported to any style sheet where you would like to utilize the FeastOn-SASS library. Just importing the file will not compile any CSS to your project, so you can safely add it to every SASS file you use. CSS will only be written when you call or use one of the functions, mix-ins, helpers...

## Documentation
The docs provided were created with `sassdoc`. They're incomplete at the moment, though the source code is fairly straight forward to follow. 

## Examples
To come.

## Naming Conventions
ish.sass uses both BEM (block__element--modifier), and Hungarian Notation.

### Hungarian Notation Reference:
- d- device
- p- page
- l- layout
- c- component
- m- module/composite
- u- utility
- t- type
- i- icon
- f- form

## TODO:
- Finalize documentation