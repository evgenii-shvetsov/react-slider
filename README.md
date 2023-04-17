![react-slider-ddl](https://user-images.githubusercontent.com/46214277/232566216-834a3ae7-ffc4-44f5-9401-7d7936f1fb53.gif)

## Overview

**Carousel built with React 18 and Doubly Linked List Data Structure** <br /> 

[React-slider](https://home-hi1b.onrender.com/)

🚀 Benefits:

1. Circular navigation is more natural and straightforward, as tail and head elements have direct references to each other.
2. Enhanced code organization by encapsulating slide navigation logic, leading to a cleaner and more maintainable codebase.

⚖️ Trade-offs:

1. Increased complexity due to the custom data structure, making the code less familiar to other developers.
2. Higher memory overhead from storing references to next and previous elements for each node.


#### Doubly Linked List Data Structure
```javascript

class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}


class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  appendNode(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }
}

export default DoublyLinkedList;
```








