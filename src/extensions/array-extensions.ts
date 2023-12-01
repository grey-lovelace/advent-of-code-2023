Array.prototype.toInts = function (this) {
  return this.map(l => parseInt(l))
}

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

Array.prototype.groupedBy = function (
  this,
  keyFunc,
  valFunc = (item) => item
) {
  const reduced = this.reduce((a, c) => {
    const key = keyFunc(c)
    a[key] = a[key] || []
    a[key].push(valFunc(c))
    return a
  }, Object.create(null))
  return { ...reduced }
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
  return this.reduce((a, c) => {
    c.forEach((item, i) => {
      if (a.length <= i) a.push([])
      a[i].push(item)
    })
    return a
  }, [])
}