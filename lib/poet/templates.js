var
  markdown = require( 'marked' ),
  hljs = require('highlight.js'),
  jade     = require( 'jade' ).compile;

markdown.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: true,
  highlight: function(code,lang){
    console.log(code,lang);
    if(lang)
      return hljs.highlight(lang, code).value; 
    else
      return hljs.highlightAuto(code).value;
  }
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
