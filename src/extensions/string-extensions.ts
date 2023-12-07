String.prototype.paragraphs = function (this) {
  return this.split(/(?:\r?\n){2}/);
};

String.prototype.lines = function (this) {
  return this.split(/(?:\r?\n){1}/);
};

String.prototype.findNumbers = function (this) {
  return this.matchAllAsList(/[\-\d]+/g)
    .map(i => i[0])
    .toInts();
};

String.prototype.matchAllAsList = function (this, regexp) {
  return [...this.matchAll(regexp)]
}

String.prototype.parseInt = function (this) {
  return parseInt(this)
}