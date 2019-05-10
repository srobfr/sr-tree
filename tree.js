/**
 * Sets a value in the tree.
 * @param keys {Array<*>} The keys "path" in the tree.
 * @param value {*}
 * @return {Tree} Returns itself (for chaining)
 */
function set(keys, value) {
  if (!keys.length) throw new Error(`Empty keys path`);
  let t = this.data;
  const lastKeyIndex = keys.length - 1;
  for (let i = 0; i < lastKeyIndex; i++) {
    const k = keys[i];
    const nt = t.get(k) || new Map();
    t.set(k, nt);
    t = nt;
  }
  t.set(keys[lastKeyIndex], value);
  return this;
}

/**
 * Returns the value at the given path.
 * @param keys {Array<*>} The "path" in the tree.
 * @return {*}
 */
function get(keys) {
  if (!keys.length) throw new Error(`Empty keys path`);
  let t = this.data;
  const lastKeyIndex = keys.length - 1;
  for (let i = 0; i < lastKeyIndex; i++) {
    const k = keys[i];
    const nt = t.get(k);
    if (!nt) return undefined;
    t = nt;
  }
  return t.get(keys[lastKeyIndex]);
}

/**
 * Deletes a value in the tree.
 * Does nothing if the path does not exist.
 * @param keys {Array<*>} The "path" in the tree.
 */
function delete_(keys) {
  if (!keys.length) throw new Error(`Empty keys path`);
  const nodes = [];
  let t = this.data;
  // First walk to find every concerned node
  const lastKeyIndex = keys.length - 1;
  for (let i = 0; i < lastKeyIndex; i++) {
    const k = keys[i];
    t = t.get(k);
    if (!t) return; // value not found.
    nodes.push(t);
  }

  t.delete(keys[lastKeyIndex]);

  // Second walk backward to delete empty nodes
  for (let i = nodes.length - 1; i > 0; i--) {
    if (nodes[i].size > 0) break;
    nodes[i - 1].delete(nodes[i]);
  }
}

function Tree() {
  this.data = new Map();
}

Object.assign(Tree.prototype, {get, set, delete: delete_});

function WeakTree() {
  this.data = new WeakMap();
}

Object.assign(WeakTree.prototype, {get, set, delete: delete_});

module.exports = {Tree, WeakTree};
