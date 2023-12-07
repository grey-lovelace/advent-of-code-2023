Array.prototype.toInts = function (this) {
  return this.map(l => parseInt(l))
}
// Object.defineProperty(Array.prototype, 'toInts', {
//   writable: false,
//   enumerable: false,
//   configurable: false,
//   value() {
//     return this.map(l => parseInt(l))
//   }
// });

Array.prototype.sum = function (this) {
  return this.reduce((a, c) => a + c, 0)
}

Array.prototype.product = function (this) {
  return this.reduce((a, c) => a * c, 1)
}

Array.prototype.max = function (this) {
  return Math.max(...this)
}

Array.prototype.min = function (this) {
  return Math.min(...this)
}

Array.prototype.mapNonNull = function (this, func) {
  return this.map(func)
    .filter(item => item != null)
    .map(item => item!)
}

Array.prototype.groupedBy = function<T, K extends string | number | symbol, V> (
  this: T[],
  keyFunc: (item: T) => K,
  valFunc: ((item: T) => V) | ((item: T) => T) = (item) => item
) {
  const reduced = this.reduce((a, c) => {
    const key = keyFunc(c)
    a[key] = a[key] || []
    a[key].push(valFunc(c))
    return a
  }, Object.create(null))
  return { ...reduced }
}

Array.prototype.unique = function (this) {
  return [...new Set(this)]
}

Array.prototype.count = function (this, func) {
  return this.filter(func).length
}

Array.prototype.look = function (
  this,
  func = (i) => console.log(i)
) {
  return this.map(i => {
    func(i)
    return i
  })
}

Array.prototype.transposed = function (this) {
  return this.reduce((a: any[], c) => {
    c.forEach((item, i) => {
      if (a.length <= i) a.push([])
      a[i].push(item)
    })
    return a
  }, [])
}