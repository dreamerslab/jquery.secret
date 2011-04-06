/*! Copyright 2011, Ben Lin (http://dreamerslab.com/)
* Licensed under the MIT License (LICENSE.txt).
*
* Version: 1.0.0
*
* Requires: jQuery 1.3.0+
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
    // in a namespace under '_' in an anonymous function to prevent global
    'in' : function( name, args ){
      
      // build new namespace if it is not found
      if( _[ namespace ] === undefined ){
        _[ namespace ] = {};
      }
      
      // store data
      _[ namespace ][ name ] = args;
      
      // return self to enable chaining
      return self;
    },

    // withdraw data
    out : function( name ){
      
      // make sure the calling out name exist, otherwise do nothing
      if( _[ namespace ] !== undefined && _[ namespace ][ name ] !== undefined ){
        return _[ namespace ][ name ];
      }
      return false;
    },

    // call out secret function
    'call' : function( name, args ){
      var tmp;
      
      // make sure the calling function exist, otherwise do nothing
      if( _[ namespace ] !== undefined && _[ namespace ][ name ] !== undefined ){
        
        // execute store function
        tmp = _[ namespace ][ name ];
        if( $.isFunction( tmp )){
          tmp.apply( _[ namespace ], $.isArray( args ) ? args : [ args ]);
        }else{
          throw '$.secret error: on action "call" - "' + name + '" is not a function';
        }
      }
      
      // return self to enable chaining
      return self;
    },

    // clear data
    clear : function( name ){
      var found = false, prop;
      
      // check if the name is a namespace
      for( prop in _ ){
        if( prop === name ){
          found = true;
          break;
        }
      }
      
      // if it is a namespace, delete the whole namespace
      // otherwise just delete the prop under that namespace
      if( found ) delete _[ name ];
      else delete _[ namespace ][ name ];
      
      // return self to enable chaining
      return self;
    }
  };

  $.secret = function( action, name, args ){
    var tmp, _name;

    // make sure user pass the second arg
    if( name === undefined || typeof( name ) !== 'string' ){
      throw '$.secret error: on action "' + action + '" - second argument "' + name + '" is undefined or is not a string';
    }

    // !IMPORTANT, do not use 'var' here
    // store jquery 'this' to 'self' so that it can be access
    // outside of the plugin scope
    self = this;

    // check if the action name has a name space
    tmp = name.split( '.' );

    // if the name contains a namespace, use it
    // otherwise we use default name space 'trunk'
    // !IMPORTANT, we only support 1 layer namespace!!
    if( tmp.length > 1 ){
      namespace = tmp[ 0 ];
      _name = tmp[ 1 ];
    }else{
      namespace = 'trunk';
      _name = name;
    }

    // execute 'in', 'out', 'call' or 'clear' and return the result
     return publicMethods[ action ]( _name, args );
  };
})( jQuery );