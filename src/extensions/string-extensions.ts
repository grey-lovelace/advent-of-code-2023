String.prototype.paragraphs = function (this) {
  return this.split(/(?:\r?\n){2}/);
};

String.prototype.lines = function (this) {
  return this.split(/(?:\r?\n){1}/);
};

String.prototype.findNumbers = function (this) {
  return [...this.matchAll(/[\-\d]+/g)]
    .map((i) => i.toString())
    .toInts();
};
