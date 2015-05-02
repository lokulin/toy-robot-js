var fs = require('fs'),
    byline = require('byline');

var stream = byline(fs.createReadStream('examples/example5.txt', { encoding: 'utf8' }));

stream.on('data', function(line) {
  console.log(line);
});
