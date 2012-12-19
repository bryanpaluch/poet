var
  markdown = require( 'marked' ),
  jade     = require( 'jade' ).compile;

markdown.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: false,
});

module.exports = {
  jade : {
    ext : 'jade',
    fn : function ( string ) {
      return jade( string )();
    }
  },
  markdown : {
    ext : [ 'markdown', 'md' ],
    fn : function ( string ) {
      return markdown( string );
    }
  }
};
