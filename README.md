[![homeLogo](https://user-images.githubusercontent.com/46214277/212250398-fb77b52e-3f22-4afd-9ad5-ba01abab63de.png)](https://home-hi1b.onrender.com/)  <br/> <br/> 
[Home](https://home-hi1b.onrender.com/)

<br />

![react-slider-ddl](https://user-images.githubusercontent.com/46214277/232566216-834a3ae7-ffc4-44f5-9401-7d7936f1fb53.gif)


## Technologies

**Frontend:** React 18 <br/>





#### Doubly Linked List Data Structure
```javascript
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
```








