/**
 * ES6 Map with a loose comparator (==) instead of the strict (===) one by default.
 * 
 * Technically Sets use SameValueZero comparison which is pretty much strict comparison.
 * @see http://www.ecma-international.org/ecma-262/6.0/#sec-samevaluezero
 */
export default class <K, V> extends Map<K, V> {
  private readonly keyMap = new Map<string, K>()
  private readonly valueMap = new Map<string, V>()

  // Push both the stringified and raw versions
  set(key: K, value: V) {
    this.keyMap.set(JSON.stringify(key), key)
    this.valueMap.set(JSON.stringify(key), value)
    return this
  }

  // Check against only the stringified
  has(key: K) {
    return this.keyMap.has(JSON.stringify(key))
  }

  get(key: K) {
    return this.valueMap.get(JSON.stringify(key))
  }

  // Check against only the stringified
  delete(key: K) {
    const str = JSON.stringify(key)
    return this.valueMap.delete(str) && this.keyMap.delete(str)
  }

  get size() {
    return this.keyMap.size
  }

  [Symbol.iterator]() {
    return this.entries()
  }

  clear() {
    this.keyMap.clear()
    this.valueMap.clear()
  }

  values() {
    return this.valueMap.values()
  }

  keys() {
    return this.keyMap.values()
  }

  *entries() {
    for (const [raw, key] of this.keyMap)
      yield [key, this.valueMap.get(raw)] as [K, V]
  }

  forEach(cb: (value: V, key: K, map: this) => void) {
    for (const [key, value] of this)
      cb(value, key, this)
  }
}
