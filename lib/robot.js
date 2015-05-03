var Point=require('./point.js'),
    utils=require('./utils.js');

function Robot(locale, facing, table) {
  this.locale = locale;
  this.facing = facing;
  this.table = table;
}

Robot.prototype.move = function() {
  return this.place(this.locale.plus(new Point(Math.sin(Math.PI * this.facing)
                                          ,Math.cos(Math.PI * this.facing)))
                   ,this.facing
                   ,this.table);
};

Robot.prototype.left = function() {
  return this.place(this.locale, utils.fmod(this.facing - 0.5, 2), this.table);
};

Robot.prototype.right = function() {
  return this.place(this.locale, utils.fmod(this.facing + 0.5, 2), this.table);
};

Robot.prototype.place = function(locale, facing, table) {
  if (typeof(table) !== 'undefined' && table.contains(locale)) {
    return new Robot(locale, facing, table);
  } else {
    return this;
  }
};

Robot.prototype.report = function(dirs) {
  if (typeof(this.table) !== 'undefined') {
    console.log(this.locale.x + "," + this.locale.y + "," + dirs[this.facing * 2]);
  }
  return this;
};

module.exports = Robot;
