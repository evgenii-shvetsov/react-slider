import DoublyLinkedListNode from "./DoublyLinkedListNode";

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.currentNode = null;
  }

  append(data) {
    const newNode = new DoublyLinkedListNode(data); // Fixed: used DoublyLinkedListNode instead of Node
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.currentNode = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  prepend(data) {
    const newNode = new DoublyLinkedListNode(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  delete(data) {
    if (!this.head) return;

    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.data === data) {
        if (currentNode.prev) {
          currentNode.prev.next = currentNode.next;
        }
        if (currentNode.next) {
          currentNode.next.prev = currentNode.prev;
        }
        if (currentNode === this.head) {
          this.head = currentNode.next;
        }
        if (currentNode === this.tail) {
          this.tail = currentNode.prev;
        }
        return;
      }
      currentNode = currentNode.next;
    }
  }

  next() {
    if (this.currentNode && this.currentNode.next) {
      this.currentNode = this.currentNode.next;
    }
  }

  prev() {
    if (this.currentNode && this.currentNode.prev) {
      this.currentNode = this.currentNode.prev;
    }
  }
}

export default DoublyLinkedList;
