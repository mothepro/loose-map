# Loose Map

> ES6 Map with loose type checking

## Install

`yarn add @mothepro/loose-map`

## How to Use

Just like a normal ES6 Map, however object identical literals will match each other.

```typescript
  const map = new LooseMap

  map
    .add({ hello: 'world' }, 123)
    .add({ hello: 'world' }, 321)

  map.size == 1
  map.has({ hello: 'world' }) == true
  map.get({ hello: 'world' }) == 321
```
