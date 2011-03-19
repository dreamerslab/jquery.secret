// wrap code in a document ready function
$( function(){

  $( '#click-me' ).bind( 'click', function(){
    // pass the $( '#play-ground' ) to $.secret private obj
    $.secret( 'in', '$playground', $( '#play-ground' )).
    
      // execute predefined methods
      secret( 'call', 'showName', function(){
        alert( 'callback function from showName' );
      }).secret( 'call', 'showAge', function(){
        alert( 'callback function from showAge' );
      }).secret( 'call', 'showSports', function(){
        alert( 'callback function from showSports' );
      });
  });
});