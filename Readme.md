# sr-tree

Efficient in-memory tree data structure built on ES6 Map

## Installation

```bash
npm install --save sr-tree
```

## Usage

### Tree

This tree structure is built on ES6 Map, so any types are allowed both for keys and values.

```js
const {Tree, WeakTree} = require('sr-tree');

const myTree = new Tree();
const keyPart2 = {keyPart2: true}; // Any key type is allowed.
const keyPart3 = /keyPart3/;
myTree.set(['keyPart1', keyPart2, keyPart3], 'value');

const value = myTree.get(['keyPart1', keyPart2, keyPart3]);
console.log(value); // "value"

myTree.delete(['keyPart1', keyPart2, keyPart3]);
const valueAfterDelete = myTree.get(['keyPart1', keyPart2, keyPart3]);
console.log(valueAfterDelete); // undefined
```

The internal Map is accessible :

```js
const myTree = new Tree();
myTree.set(['foo', 'bar'], 'value');
console.log(myTree.data); // Outputs : Map { 'foo' => Map { 'bar' => 'value' } }
```

### WeakTree

The same tree implementation is also available built on WeakMap :

```js
const {Tree, WeakTree} = require('sr-tree');

const myTree = new WeakTree();
```

Please note that WeakMaps does not allow scalar values as keys, so neither does WeakTree. 
