// Binary Search Tree
class BST {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }

  static defaultCompare(val1, val2) {
    let result;

    if (val1 === val2) {
      result = 0;
    } else if (val1 < val2) {
      result = -1;
    } else if (val1 > val2) {
      result = 1;
    } else {
      throw new Error('This case should never happen.');
    }

    return result;
  }

  insert(value, comparator) {
    let compare = comparator;
    if (!comparator) {
      compare = this.defaultCompare;
    }

    if (compare(value, this.value) <= 0) {
      if (!this.left) {
        this.left = new BST(value);
      } else {
        this.left.insert(value, compare);
      }
    } else if (compare(value, this.value) === 1) {
      if (!this.right) {
        this.right = new BST(value);
      } else {
        this.right.insert(value, compare);
      }
    }
  }

  contains(value, comparator) {
    let compare = comparator;
    if (!comparator) {
      compare = this.defaultCompare;
    }

    if (compare(this.value, value) === 0) {
      return true;
    }

    if (compare(value, this.value) < 0) {
      if (!this.left) {
        return false;
      }
      return this.left.contains(value, compare);
    } else if (compare(value, this.value) > 0) {
      if (!this.right) {
        return false;
      }
      return this.right.contains(value, compare);
    }

    return null;
  }

  // depth first traversal in order, pre-order, post-order
  depthFirstTraversal(iteratorFunc, order) {
    if (this.order === 'pre-order') { iteratorFunc(this.value); }
    if (this.left) { this.left.depthFirstTraversal(iteratorFunc, order); }
    if (order === 'in-order') { iteratorFunc(this.value); }
    if (this.right) { this.right.depthFirstTraversal(iteratorFunc, order); }
    if (order === 'post-order') { iteratorFunc(this.value); }
  }

  breadthFirstTraversal(iteratorFunc) {
    // start the queue with the root node aka this
    const queue = [this];
    // while loop runs as long as queue is not empty
    while (queue.length) {
      // take node out of queue, and work on it with iteratorFunc
      const treeNode = queue.shift();
      iteratorFunc(treeNode);
      // if the node has left or right child, push them into the queue
      if (treeNode.left) { queue.push(treeNode.left); }
      if (treeNode.right) { queue.push(treeNode.right); }
    }
  }

  // traverse tree recursively and extract min val
  getMinVal() {
    if (!this.left) {
      return this.value;
    }

    return this.left.getMinVal();
  }

  // traverse tree recursively and extract max val
  getMaxVal() {
    if (!this.right) {
      return this.value;
    }

    return this.right.getMaxVal();
  }
}

module.exports = BST;
