/*! Copyright 2011, Ben Lin (http://dreamerslab.com/)
* Licensed under the MIT License (LICENSE.txt).
*
* Version: 1.0.0
*
* Requires: jQuery 1.2.3+
*/

// wrap everything in an anonymous function
;( function( $ ){
  
  // self will be over written by jquery instance "this"
  // a higher scope let private mathods to access jquery obj
  var self,

  // default namespace
  namespace = 'trunk',

  // private props
  _ = {
    // default place to store secret data 
    trunk : {}
  },

  publicMethods = {

    // store string, integer, function, array whatever you want 
    // in a '_' namespace in an anonymous function to prevent global
    'in' : function( name, val ){
      if( _[ namespace ] === undefined ){
        _[ namespace ] = {};
      }
      _[ namespace ][ name ] = val;
      // return self to enable chaining
      return self;
    },

    // withdraw data or execute stored function
    out : function( name, args ){
      // to tell if the store secret is a function
      // if it is, return the executed result
      // otherwise return stored data
      var tmp = _[ namespace ][ name ];
      if( $.isFunction( tmp )){
        tmp.call( _[ namespace ], args ); 
        return self;
      }else{
        return tmp;
      }
    },

    // clear data
    clear : function( name ){
      var found = false,
      prop;
      // check if the name is a namespace
      for( prop in _ ){
        if( prop === name ){
          found = true;
          break;
        }
      }
      // if it is a namespace, delete the whole name space
      // otherwise just delete the prop under that namespace
      if( found ) delete _[ name ];
      else delete _[ namespace ][ name ];
      // return self to enable chaining
      return self;
    }
  };

  $.secret = function( action, name, val ){
    var tmp, _name;
    
    // store jquery 'this' to 'self' so that it can be access
    // outside of the plugin scope
    self = this;

    // make sure user pass the second arg
    if( name === undefined || typeof( name ) !== 'string' ){
      throw '$.secret error: second argument "name" is undefined or is not a string';
    }
    // check if the action name has a name space
    tmp = name.split( '.' );

    // if the name contains a namespace, use it
    // otherwise we use default name space 'trunk'
    // **important, we only support 1 layer namespace!!
    if( tmp.length > 1 ){
      namespace = tmp[ 0 ];
      _name = tmp[ 1 ];
    }else{
      namespace = 'trunk';
      _name = name;
    }

    // execute 'in', 'out' or 'clear' and return the result
     return publicMethods[ action ]( _name, val );
  };

})( jQuery );