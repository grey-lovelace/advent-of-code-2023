Object.prototype.entries = function (this) {
  return Object.entries(this)
}

Object.prototype.let = function (this, func) {
  return func(this)
}

Object.prototype.also = function (this, func) {
  func(this)
  return this
}