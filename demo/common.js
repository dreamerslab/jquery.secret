// store some common data and methods 
// which are going to be use through out the whole application
$.secret( 'in', 'name', 'Ben' ).
  secret( 'in', 'age', 30 ).
  secret( 'in', 'sports', [ 'basketball', 'baseball' ]).
  
  secret( 'in', 'showName', function( callback ){
    // append the stored 'name' to page
    this.$playground.
      append( '<p class="name"> Name: ' + this.name + '</p>' );
    // do a callback function if any
    if( callback ) callback.call( this );
    
  }).secret( 'in', 'showAge', function( callback ){
    // append the stored 'age' to page
    this.$playground.
      append( '<p class="age"> Age: ' + this.age + '</p>' );
    // do a callback function if any
    if( callback ) callback.call( this );
    
  }).secret( 'in', 'showSports', function( callback ){
    // cache obj props ouside the loop
    var sports = this.sports,
    fragment = '<p>Sports:<ul>';
    
    $.each( sports, function( key, value ){
      fragment = fragment + '<li>' + value + '</li>';
    });
    
    fragment = fragment + '</ul></p>';
    
    this.$playground.append( fragment );
    if( callback ) callback.call( this );
  });