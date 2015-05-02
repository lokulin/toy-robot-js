function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.plus = function(other) {
  return new Point(this.x + other.x, this.y + other.y);
}

Point.prototype.le = function(other) {
  return this.x <= other.x && this.y <= other.y;
}

Point.prototype.ge = function(other) {
  return this.x >= other.x && this.y >= other.y;
}

module.exports = Point;
