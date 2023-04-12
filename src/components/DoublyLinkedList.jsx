import DoublyLinkedListNode from "./DoublyLinkedListNode";

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(data) {
    const newNode = new DoublyLinkedListNode(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
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
    if (!this.head) return null;
    return this.head.next ? this.head.next : this.head;
  }

  prev() {
    if (!this.head) return null;
    return this.head.prev ? this.head.prev : this.head;
  }
}

export default DoublyLinkedList;
