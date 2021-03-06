var
  express = require( 'express' ),
  chai    = require( 'chai' ),
  should  = chai.should(),
  expect  = chai.expect,
  fs      = require('fs'),
  path    = require('path'),
  dir     = __dirname + '/html';

var pEl = "<p><em>Lorem ipsum</em> dolor sit amet, consectetur adipisicing elit.</p>";
var h1El = "<h1>Header 1</h1>";
var scriptBody  = '<script>console.log(\'test\');</script>';
var files;
var load = function(){
  files = {};
  var list = fs
    .readdirSync(dir)
  var i = 0
    , l = list.length
    , file;

    for(; i<l; i++){
      file = path.join(dir, list[i]);
      files[i] = fs.readFileSync(file, 'utf8');
    }
  return files;  
}

if(!files) load();

describe( 'Templating', function () {
  it( 'should correctly compile markdown', function ( done ) {
    var
      app = express.createServer(),
      poet = require( '../lib/poet' )( app );

    poet.set({ posts: './test/_postsJson' }).init(function () {
      var posts = app._locals.postList;
      posts[2].content.should.contain(files[0]);
      posts[2].content.should.contain(files[1]);
      done();
    });
  });
  
  it( 'should correctly compile jade', function ( done ) {
    var
      app = express.createServer(),
      poet = require( '../lib/poet' )( app );

    poet.set({ posts: './test/_postsJson' }).init(function () {
      var posts = app._locals.postList;
      posts[3].content.should.contain(pEl);
      posts[3].content.should.contain(h1El);
      done();
    });
  });

  it( 'should correctly render with any custom formatter', function ( done ) {
    var
      app = express.createServer(),
      poet = require( '../lib/poet' )( app );

    poet.set({ posts: './test/_postsJson' })
      .addTemplate({
        ext: 'custom',
        fn: function (s) {
          s = s.replace(/\*(.*?)\*/g, '<$1>');
          return s;
        }
      }).init(function () {
      var posts = app._locals.postList;
      posts[4].content.should.contain(pEl);
      posts[4].content.should.contain(h1El);
      done();
    });
  });

  describe( 'Markdown parsing', function () {
    it( 'should not strip out HTML elements', function () {
      var app = express.createServer(), poet = require( '../lib/poet' )( app );
      poet.set({ posts: './test/_postsJson', metaFormat: 'json' }).init(function () {
        var posts = app._locals.postList;
        posts[1].content.should.contain( scriptBody );
      });
    });
  });
});
