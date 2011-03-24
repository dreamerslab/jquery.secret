# jQuery Secret Plugin

A jQuery plugin that prevents creating global objects.

## Description

[Global objects are evil in javascript](http://bit.ly/e6DUOi). They are easily to be overwritten, especially when you mix your code with others. For more details please take a look at Douglas Crockford's artical at [Yahoo! User Interface Blog (YUIBlog)](http://yuiblog.com/blog/2006/06/01/global-domination/). To fix this we can wrap our code with a namespace. For example:

    someNamespace = {
      lang : 'en',
      authToken : 'MZB/o2hQ2OxhTVB+dV7UPEjKWeJBNNefCpAn2EnW/Aw=',
      getPhotos : function(){
        // some AJAX function to get photos form server
      },
      updatePhotos : function(){
        // some AJAX function to update photos to server
      }
    };

Better, but not good enough. The data is still touchable by every script on the same page and is still easily to be overwritten. In small projects or if you are writing a plugin this can be fix by wrapping all your code in an anonymous function like how jQuery implements it

    ( function(){
      // all your code goes here
    })();

However in a bigger project when you want to split your code into modules with different files you can no longer use this technique. This is where jQuery.secret comes to shine.

## Requires
  - jQuery 1.3.0+

## Browser Compatibility
  - [Firefox](http://mzl.la/RNaI) 2.0+
  - [Internet Explorer](http://bit.ly/9fMgIQ) 6+
  - [Safari](http://bit.ly/gMhzVR) 3+
  - [Opera](http://bit.ly/fWJzaC) 10.6+
  - [Chrome](http://bit.ly/ePHvYZ) 8+

## Installation
  - First, make sure you are using valid [DOCTYPE](http://bit.ly/hQK1Rk)
  - Include nessesary JS files

<!-- -->

      <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
      <script type="text/javascript" src="path-to-file/jquery.secret.js"></script>

## Usage

#### Syntax
> Store data
    
    // val can be a string, integer, hash table, array, object
    $.secret( 'in', 'secretName', val );
    
    // or a function
    $.secret( 'in', 'secretName', function( arg1, arg2, arg3 ){
      // do something here
    });
    
> Withdraw data
    
    $.secret( 'out', 'secretName' );

> Call out a function

    $.secret( 'call', 'secretName', [ arg1, arg2, arg3 ]);
    // or
    $.secret( 'call', 'secretName', arg );

> clear data

    $.secret( 'clear', 'secretName' );
    

#### Example code:

> Store data.
    
    $.secret( 'in', 'lang', 'en' );
    
> 'in', 'call', and 'clear' methods are chainable
    
    $.secret( 'in', 'name', 'Ben' ).
      secret( 'in', 'age', 30 ).
      secret( 'in', 'sport', [ 'basketball', 'baseball' ]),
      secret( 'call', 'showName', $( '#name' )).
      secret( 'clear', 'jobs' );
      
> Use your data; you can even use it in different files.
    
    var lang = $.secret( 'out', 'lang' );
    
> Clear data.
    
    $.secret( 'clear', 'lang' );
    
> The data you store can be a string,
    
    $.secret( 'in', 'username', 'ben' );
    
> an integer

    $.secret( 'in', 'age', 30 );
    
> an array,
    
    $.secret( 'in', 'jobs', [
      'f2e', 'rails developer', 'web developer'
    ]);
    
> a hash table,
    
    $.secret( 'in', 'photos', [
      { id: 1, title: 'Rails Rocks', image_path: 'http://some-where.com/rails-rocks.jpg' },
      { id: 2, title: 'jQuery Rocks', image_path: 'http://some-where.com/jquery-rocks.jpg' },
      { id: 3, title: 'Node.js Rocks', image_path: 'http://some-where.com/node-js-rocks.jpg' }
    ]);
    
> an object,
    
    $.secret( 'in', 'userInfo', {
      name : 'Ben',
      age : '30',
      city : 'Taipei'
      family : {
        mother : {
          name : 'Ajita',
          age : '62'
        },
        father : {
          name : 'Frank',
          age : '66'
        }
      }
    });
    
> or a function,
    
    $.secret( 'in', 'getCheckedVal', function( $checkbox ){
      // 'this' here points to the private $.secret object
      // in this function scope 'this.lang' means $.secret( 'out', 'lang' );
      
      // store 'this' for the inner scope to use
      var self = this;
      // find values of checked checkbox
      $checkbox.filter( ':checked' ).each( function(){
        var $this = $( this );
        // save each of the checked value to $.secret
        self[ $this.attr( 'name' )] = $this.val();
      });
    });
    
    // to use this funciton
    // we can pass arguments in the 3rd parameter
    $.secret( 'call', 'getCheckedVal', $( '#somewhere' ).find( ':checkbox' ));
    
    // create function with multiple arguments
    $.secret( 'in', 'pplDoSomething', function( $ppl, eyes, car, callback ){
      $ppl.find( '.eyes' ).text( eyes );
      $ppl.find( '.car' ).text( car );
      if( callback ) callback.call( this );
    });
    
    // call function with multiple arguments
    $.secret( 'call', 'pplDoSomething', 
      [ $( '#ben' ), 'brown', 'porsche!!!', function(){
        // do something here
        // IMPORTANT 'this' here points to the private $.secret object
      }]);
    
> basicly you can store anything you want.

### Namespace
`$.secret` supports 1 layer namespace. With large application we might need to split our code into modules.
> Example code: 
    
    // create a function that generates flickr api sig
    $.secret( 'in', 'FLICKR.apiSig', function( secret, extraParams ){
      // here 'this.defaultParams' equals to 'FLICKR.defaultParams'
      return md5( secret + this.defaultParams.concat( extraParams.split( "&" )).sort().join('').replace( '=', '' ));
    });
    
    // another function for searching images on google
    $.secret( 'in', 'GOOGLE.searchImage', function( args ){
      // do other stuffs here
    }
    
    // assamble your code in the sandbox
    $.secret( 'in', 'SANDBOX.moduleName', function( args ){
      // assamble your code here
    }

## Demo
See demo/index.html

## License

The expandable plugin is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2011 [Ben Lin](http://dreamerslab.com)