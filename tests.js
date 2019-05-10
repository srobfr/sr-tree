const assert = require('assert');
const {Tree, WeakTree} = require('./tree');

describe(`Tree`, function () {
  it(`set + get`, function () {
    const tree = new Tree();
    tree.set(['foo', 'bar'], 'plop');
    assert.equal('plop', tree.get(['foo', 'bar']));
  });

  it(`data`, function () {
    const tree = new Tree();
    tree.set(['foo', 'bar'], 'plop');
    assert.equal('plop', tree.data.get('foo').get('bar'));
  });

  it(`not found`, function () {
    const tree = new Tree();
    assert.equal(undefined, tree.get(['foo', 'bar']));
  });

  it(`delete`, function () {
    const tree = new Tree();
    tree.set(['foo', 'bar'], 'plop');
    assert.equal('plop', tree.get(['foo', 'bar']));
    tree.delete(['foo', 'bar']);
    assert.equal(undefined, tree.get(['foo', 'bar']));
  });
});

describe(`WeakTree`, function () {
  it(`set + get`, function () {
    const tree = new WeakTree();
    const k1 = {};
    const k2 = {};
    tree.set([k1, k2], 'plop');
    assert.equal('plop', tree.get([k1, k2]));
  });

  it(`not found`, function () {
    const tree = new WeakTree();
    assert.equal(undefined, tree.get([{}]));
  });

  it(`delete`, function () {
    const tree = new WeakTree();
    const k = {};
    tree.set([k], 'plop');
    assert.equal('plop', tree.get([k]));
    tree.delete([k]);
    assert.equal(undefined, tree.get([k]));
  });
});
