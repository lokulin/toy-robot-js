function Table(llc, urc) {
  this.llc = llc;
  this.urc = urc;
}

Table.prototype.contains = function(point) {
  return this.llc.le(point) && this.urc.ge(point);
}

module.exports = Table;
