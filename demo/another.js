// wrap code in a document ready function
$( function(){
  // trigger all the 
  $( '#click-me' ).bind( 'click', function(){
    // pass the $( '#play-ground' ) to $.secret private obj
    $.secret( 'in', '$playground', $( '#play-ground' )).
    
      // execute predefined methods
      secret( 'out', 'showName', function(){
        alert( 'callback function from showName' );
      }).secret( 'out', 'showAge', function(){
        alert( 'callback function from showAge' );
      }).secret( 'out', 'showSports', function(){
        alert( 'callback function from showSports' );
      })
  });
});