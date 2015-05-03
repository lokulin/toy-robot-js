#!/usr/bin/env node

var fs = require('fs'),
    byline = require('byline'),
    Robot = require('./lib/robot.js'),
    Point = require('./lib/point.js'),
    Table = require('./lib/table.js');

var dirs = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
var placeExp = new RegExp('^PLACE (\\d+),(\\d+),(' + dirs.join('|') + ')$');

function placeCmd(robot, table, line) {
  var args = line.toString().match(placeExp),
      direction = dirs.indexOf(args[3])/2.0,
      x = parseInt(args[1]),
      y = parseInt(args[2]);

  return robot.place(new Point(x, y), direction , table)
}

function execute(robot, table, line) {
  switch (true) {
    case /^MOVE$/.test(line): return robot.move();
    case /^LEFT$/.test(line): return robot.left();
    case /^RIGHT$/.test(line): return robot.right();
    case /^REPORT$/.test(line): return robot.report(dirs);
    case placeExp.test(line): return placeCmd(robot, table, line);
    default: return robot;
    }
}

function usage() {
  console.log("./toy-robot.js <input.txt> | < <input.txt>");
  process.exit(1);
}

function run() {
  var file;

  if(process.argv.length == 2) file=process.stdin;
  else file = fs.createReadStream(process.argv[2]);

  file.on('error', function(error) { console.log("Can't open file.");});

  var stream = byline.createStream(file);
  var robot = new Robot(new Point(0,0), 0.0);
  var table = new Table(new Point(0,0), new Point(4,4));

  stream.on('data', function(line) {
    robot=execute(robot, table, line);
  });
}

if(process.argv.length > 3) usage();
run();
