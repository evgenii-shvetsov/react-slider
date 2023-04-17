// Node class
class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

// Doubly linked list class
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
