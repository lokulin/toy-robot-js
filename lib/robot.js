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
  locale = typeof locale !== 'undefined' ? locale : this.locale;
  facing = typeof facing !== 'undefined' ? facing : this.facing;
  table = typeof table !== 'undefined' ? table : this.table;

  if (table !== null && table.contains(locale)) {
    return new Robot(locale, facing, table);
  } else {
    return this;
  }
};

Robot.prototype.report = function() {

};

module.exports = Robot;
