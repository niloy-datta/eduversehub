export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  correctAnswer: string;
}

export interface TableContent {
  headers: string[];
  rows: string[][];
}

export interface Section {
  type: 'text' | 'code' | 'note' | 'list' | 'image' | 'table';
  title?: string;
  content: string | string[] | string[][] | QuizQuestion[];
}

export interface LessonContent {
  id: string;
  title: string;
  subtitle: string;
  sections: Section[];
  quiz?: QuizQuestion[];
  practiceCode?: string;
  prevLesson?: string;
  nextLesson?: string;
}

export const dsaJavaLessons: Record<string, LessonContent> = {
  'introduction': {
    id: 'introduction',
    title: 'Introduction to DSA',
    subtitle: 'Data Structures and Algorithms Fundamentals',
    sections: [
      { 
        type: 'text', 
        title: 'What is DSA?',
        content: 'Data Structures and Algorithms (DSA) are fundamental concepts in computer science that form the foundation of efficient programming and problem-solving.' 
      },
      { 
        type: 'text', 
        title: 'Why Learn DSA?',
        content: 'Understanding DSA helps you write efficient code, solve complex problems, ace technical interviews, and build scalable applications. It teaches you to think logically and optimize solutions.' 
      },
      { 
        type: 'list', 
        title: 'Key Benefits',
        content: [
          'Improve problem-solving skills',
          'Write more efficient and optimized code',
          'Excel in technical interviews at top companies',
          'Build high-performance applications',
          'Understand algorithmic complexity (Time & Space)'
        ]
      },
      { 
        type: 'note', 
        content: 'Mastering DSA is essential for software engineers. Companies like Google, Amazon, and Microsoft heavily test DSA knowledge in interviews.' 
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does DSA stand for?',
        options: [
          { id: 'a', text: 'Data Science and Analysis' },
          { id: 'b', text: 'Data Structures and Algorithms' },
          { id: 'c', text: 'Database Systems Architecture' },
          { id: 'd', text: 'Digital Signal Analysis' }
        ],
        correctAnswer: 'b'
      },
      {
        id: 2,
        question: 'Why is DSA important for software engineers?',
        options: [
          { id: 'a', text: 'Only for academic purposes' },
          { id: 'b', text: 'To write efficient code and solve problems' },
          { id: 'c', text: 'It is not important anymore' },
          { id: 'd', text: 'Only for game development' }
        ],
        correctAnswer: 'b'
      }
    ],
    nextLesson: 'arrays'
  },
  'arrays': {
    id: 'arrays',
    title: 'Arrays in Java',
    subtitle: 'Contiguous Memory Storage',
    sections: [
      { 
        type: 'text', 
        title: 'What is an Array?',
        content: 'An array is a collection of elements of the same type stored at contiguous memory locations. It provides constant-time access to elements using an index.' 
      },
      { 
        type: 'code', 
        title: 'Array Declaration and Initialization',
        content: `// Declaration
int[] numbers;

// Initialization
numbers = new int[5];

// Declaration + Initialization
int[] scores = {95, 87, 92, 88, 90};

// Creating an array of objects
String[] names = new String[3];
names[0] = "Alice";
names[1] = "Bob";
names[2] = "Charlie";` 
      },
      { 
        type: 'code', 
        title: 'Array Operations',
        content: `// Accessing elements
int firstScore = scores[0];  // 95

// Modifying elements
scores[0] = 100;

// Finding length
int length = scores.length;  // 5

// Iterating with for loop
for (int i = 0; i < scores.length; i++) {
    System.out.println(scores[i]);
}

// Iterating with enhanced for loop
for (int score : scores) {
    System.out.println(score);
}` 
      },
      { 
        type: 'list', 
        title: 'Array Characteristics',
        content: [
          'Fixed size - cannot grow or shrink',
          'O(1) access time using index',
          'Elements stored in contiguous memory',
          'Index starts from 0',
          'Can store primitives or objects'
        ]
      },
      { 
        type: 'note', 
        content: 'Arrays have O(1) access time but O(n) insertion/deletion time (except at the end). Use ArrayList if you need dynamic sizing.' 
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the time complexity of accessing an element in an array by index?',
        options: [
          { id: 'a', text: 'O(n)' },
          { id: 'b', text: 'O(log n)' },
          { id: 'c', text: 'O(1)' },
          { id: 'd', text: 'O(n²)' }
        ],
        correctAnswer: 'c'
      },
      {
        id: 2,
        question: 'What is the starting index of an array in Java?',
        options: [
          { id: 'a', text: '1' },
          { id: 'b', text: '0' },
          { id: 'c', text: '-1' },
          { id: 'd', text: 'Depends on declaration' }
        ],
        correctAnswer: 'b'
      }
    ],
    prevLesson: 'introduction',
    nextLesson: 'stacks'
  },
  'stacks': {
    id: 'stacks',
    title: 'Stack Data Structure',
    subtitle: 'Last In First Out (LIFO)',
    sections: [
      { 
        type: 'text', 
        title: 'What is a Stack?',
        content: 'A stack is a linear data structure that follows the Last In First Out (LIFO) principle. The element inserted last is the first one to be removed, like a stack of plates.' 
      },
      { 
        type: 'list', 
        title: 'Stack Operations',
        content: [
          'push() - Add element to top - O(1)',
          'pop() - Remove element from top - O(1)',
          'peek()/top() - View top element - O(1)',
          'isEmpty() - Check if stack is empty - O(1)',
          'size() - Get number of elements - O(1)'
        ]
      },
      { 
        type: 'code', 
        title: 'Stack Implementation using Array',
        content: `class Stack {
    private int[] arr;
    private int top;
    private int capacity;
    
    public Stack(int size) {
        arr = new int[size];
        capacity = size;
        top = -1;
    }
    
    public void push(int value) {
        if (top == capacity - 1) {
            throw new RuntimeException("Stack Overflow");
        }
        arr[++top] = value;
    }
    
    public int pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack Underflow");
        }
        return arr[top--];
    }
    
    public int peek() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return arr[top];
    }
    
    public boolean isEmpty() {
        return top == -1;
    }
}` 
      },
      { 
        type: 'code', 
        title: 'Using Java Stack Class',
        content: `import java.util.Stack;

Stack<Integer> stack = new Stack<>();

// Push elements
stack.push(10);
stack.push(20);
stack.push(30);

// Peek at top element
int topElement = stack.peek();  // 30

// Pop element
int popped = stack.pop();  // 30

// Check if empty
boolean empty = stack.isEmpty();  // false` 
      },
      { 
        type: 'list', 
        title: 'Stack Applications',
        content: [
          'Function call management (Call Stack)',
          'Undo/Redo functionality in editors',
          'Expression evaluation and syntax parsing',
          'Backtracking algorithms',
          'Browser history (Back button)'
        ]
      },
      { 
        type: 'note', 
        content: 'Modern Java recommends using Deque<Integer> stack = new ArrayDeque<>() instead of Stack class for better performance.' 
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Which principle does a stack follow?',
        options: [
          { id: 'a', text: 'FIFO' },
          { id: 'b', text: 'LIFO' },
          { id: 'c', text: 'Random Access' },
          { id: 'd', text: 'Priority Based' }
        ],
        correctAnswer: 'b'
      },
      {
        id: 2,
        question: 'What is the time complexity of push and pop operations in a stack?',
        options: [
          { id: 'a', text: 'O(n)' },
          { id: 'b', text: 'O(log n)' },
          { id: 'c', text: 'O(1)' },
          { id: 'd', text: 'O(n log n)' }
        ],
        correctAnswer: 'c'
      }
    ],
    prevLesson: 'arrays',
    nextLesson: 'queues'
  },
  'queues': {
    id: 'queues',
    title: 'Queue Data Structure',
    subtitle: 'First In First Out (FIFO)',
    sections: [
      { 
        type: 'text', 
        title: 'What is a Queue?',
        content: 'A queue is a linear data structure that follows the First In First Out (FIFO) principle. The element inserted first is removed first, like people standing in a line.' 
      },
      { 
        type: 'list', 
        title: 'Queue Operations',
        content: [
          'enqueue() - Add element to rear - O(1)',
          'dequeue() - Remove element from front - O(1)',
          'peek()/front() - View front element - O(1)',
          'isEmpty() - Check if queue is empty - O(1)',
          'size() - Get number of elements - O(1)'
        ]
      },
      { 
        type: 'code', 
        title: 'Queue using Java Queue Interface',
        content: `import java.util.Queue;
import java.util.LinkedList;

Queue<Integer> queue = new LinkedList<>();

// Enqueue elements
queue.offer(10);
queue.offer(20);
queue.offer(30);

// Peek at front element
int front = queue.peek();  // 10

// Dequeue element
int removed = queue.poll();  // 10

// Check size
int size = queue.size();  // 2

// Check if empty
boolean empty = queue.isEmpty();  // false` 
      },
      { 
        type: 'code', 
        title: 'Circular Queue Implementation',
        content: `class CircularQueue {
    private int[] arr;
    private int front, rear, size, capacity;
    
    public CircularQueue(int k) {
        capacity = k;
        arr = new int[k];
        front = rear = -1;
        size = 0;
    }
    
    public boolean enqueue(int value) {
        if (isFull()) return false;
        
        if (isEmpty()) {
            front = rear = 0;
        } else {
            rear = (rear + 1) % capacity;
        }
        
        arr[rear] = value;
        size++;
        return true;
    }
    
    public boolean dequeue() {
        if (isEmpty()) return false;
        
        if (front == rear) {
            front = rear = -1;
        } else {
            front = (front + 1) % capacity;
        }
        
        size--;
        return true;
    }
    
    public boolean isEmpty() {
        return size == 0;
    }
    
    public boolean isFull() {
        return size == capacity;
    }
}` 
      },
      { 
        type: 'list', 
        title: 'Queue Applications',
        content: [
          'CPU task scheduling',
          'Print job spooling',
          'Breadth-First Search (BFS) in graphs',
          'Handling async requests in web servers',
          'Message queuing systems'
        ]
      },
      { 
        type: 'note', 
        content: 'For thread-safe operations, use BlockingQueue implementations like LinkedBlockingQueue or ArrayBlockingQueue in Java.' 
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Which principle does a queue follow?',
        options: [
          { id: 'a', text: 'LIFO' },
          { id: 'b', text: 'FIFO' },
          { id: 'c', text: 'Priority Based' },
          { id: 'd', text: 'Random Access' }
        ],
        correctAnswer: 'b'
      },
      {
        id: 2,
        question: 'In a circular queue with capacity 5, if front=2 and rear=4, what happens when we enqueue one more element?',
        options: [
          { id: 'a', text: 'Queue overflow' },
          { id: 'b', text: 'rear becomes 0' },
          { id: 'c', text: 'rear becomes 5' },
          { id: 'd', text: 'Operation fails' }
        ],
        correctAnswer: 'b'
      }
    ],
    prevLesson: 'stacks',
    nextLesson: 'linked-lists'
  },
  'linked-lists': {
    id: 'linked-lists',
    title: 'Linked Lists',
    subtitle: 'Dynamic Node-Based Structure',
    sections: [
      { 
        type: 'text', 
        title: 'What is a Linked List?',
        content: 'A linked list is a linear data structure where elements (nodes) are stored in non-contiguous memory locations. Each node contains data and a reference (link) to the next node.' 
      },
      { 
        type: 'list', 
        title: 'Types of Linked Lists',
        content: [
'Singly Linked List - Each node points to next node',
          'Doubly Linked List - Each node has next and previous pointers',
          'Circular Linked List - Last node points back to first node',
          'Circular Doubly Linked List - Combination of both'
        ]
      },
      { 
        type: 'code', 
        title: 'Singly Linked List Implementation',
        content: `class Node {
    int data;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    Node head;
    
    // Insert at beginning - O(1)
    public void insertAtBeginning(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }
    
    // Insert at end - O(n)
    public void insertAtEnd(int data) {
        Node newNode = new Node(data);
        
        if (head == null) {
            head = newNode;
            return;
        }
        
        Node current = head;
        while (current.next != null) {
            current = current.next;
        }
        current.next = newNode;
    }
    
    // Delete node with given data - O(n)
    public void delete(int data) {
        if (head == null) return;
        
        if (head.data == data) {
            head = head.next;
            return;
        }
        
        Node current = head;
        while (current.next != null && current.next.data != data) {
            current = current.next;
        }
        
        if (current.next != null) {
            current.next = current.next.next;
        }
    }
    
    // Display list - O(n)
    public void display() {
        Node current = head;
        while (current != null) {
            System.out.print(current.data + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }
}` 
      },
      { 
        type: 'list', 
        title: 'Advantages vs Arrays',
        content: [
          'Dynamic size - can grow/shrink',
          'Easy insertion/deletion at beginning - O(1)',
          'No memory wastage',
          'Efficient memory utilization'
        ]
      },
      { 
        type: 'list', 
        title: 'Disadvantages vs Arrays',
        content: [
          'No random access - O(n) to access element',
          'Extra memory for pointers',
          'Not cache-friendly',
          'Reverse traversal difficult in singly linked list'
        ]
      },
      { 
        type: 'note', 
        content: 'Use LinkedList when you need frequent insertions/deletions. Use ArrayList when you need random access frequently.' 
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the time complexity of inserting a node at the beginning of a singly linked list?',
        options: [
          { id: 'a', text: 'O(n)' },
          { id: 'b', text: 'O(log n)' },
          { id: 'c', text: 'O(1)' },
          { id: 'd', text: 'O(n²)' }
        ],
        correctAnswer: 'c'
      },
      {
        id: 2,
        question: 'What does each node in a singly linked list contain?',
        options: [
          { id: 'a', text: 'Only data' },
          { id: 'b', text: 'Data and pointer to next node' },
          { id: 'c', text: 'Data and pointers to next and previous nodes' },
          { id: 'd', text: 'Only pointer' }
        ],
        correctAnswer: 'b'
      }
    ],
    prevLesson: 'queues',
    nextLesson: 'trees'
  },
  'trees': {
    id: 'trees',
    title: 'Binary Trees',
    subtitle: 'Hierarchical Non-Linear Structure',
    sections: [
      { 
        type: 'text', 
        title: 'What is a Binary Tree?',
        content: 'A binary tree is a hierarchical data structure where each node has at most two children - left child and right child. It\'s widely used for hierarchical data representation.' 
      },
      { 
        type: 'list', 
        title: 'Binary Tree Properties',
        content: [
          'Maximum nodes at level i = 2^i',
          'Maximum nodes in tree of height h = 2^(h+1) - 1',
          'Minimum height for n nodes = log₂(n+1) - 1',
          'Total nodes = internal nodes + leaf nodes + 1'
        ]
      },
      { 
        type: 'code', 
        title: 'Binary Tree Implementation',
        content: `class TreeNode {
    int data;
    TreeNode left, right;
    
    TreeNode(int data) {
        this.data = data;
        left = right = null;
    }
}

class BinaryTree {
    TreeNode root;
    
    // Inorder Traversal: Left -> Root -> Right
    public void inorder(TreeNode node) {
        if (node == null) return;
        
        inorder(node.left);
        System.out.print(node.data + " ");
        inorder(node.right);
    }
    
    // Preorder Traversal: Root -> Left -> Right
    public void preorder(TreeNode node) {
        if (node == null) return;
        
        System.out.print(node.data + " ");
        preorder(node.left);
        preorder(node.right);
    }
    
    // Postorder Traversal: Left -> Right -> Root
    public void postorder(TreeNode node) {
        if (node == null) return;
        
        postorder(node.left);
        postorder(node.right);
        System.out.print(node.data + " ");
    }
    
    // Calculate height
    public int height(TreeNode node) {
        if (node == null) return -1;
        
        int leftHeight = height(node.left);
        int rightHeight = height(node.right);
        
        return Math.max(leftHeight, rightHeight) + 1;
    }
}` 
      },
      { 
        type: 'list', 
        title: 'Types of Binary Trees',
        content: [
          'Full Binary Tree - Every node has 0 or 2 children',
          'Complete Binary Tree - All levels filled except possibly last',
          'Perfect Binary Tree - All internal nodes have 2 children, all leaves at same level',
          'Balanced Binary Tree - Height difference ≤ 1 for all nodes',
          'Degenerate Tree - Each parent has only one child'
        ]
      },
      { 
        type: 'note', 
        content: 'Tree traversals (Inorder, Preorder, Postorder) have O(n) time complexity. Level-order traversal uses a queue and is also O(n).' 
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'In Inorder traversal of a binary tree, what is the order of visiting nodes?',
        options: [
          { id: 'a', text: 'Root -> Left -> Right' },
          { id: 'b', text: 'Left -> Root -> Right' },
          { id: 'c', text: 'Left -> Right -> Root' },
          { id: 'd', text: 'Right -> Root -> Left' }
        ],
        correctAnswer: 'b'
      },
      {
        id: 2,
        question: 'What is the maximum number of nodes in a binary tree of height 3?',
        options: [
          { id: 'a', text: '7' },
          { id: 'b', text: '8' },
          { id: 'c', text: '15' },
          { id: 'd', text: '16' }
        ],
        correctAnswer: 'c'
      }
    ],
    prevLesson: 'linked-lists',
    nextLesson: 'bst'
  },
  'bst': {
    id: 'bst',
    title: 'Binary Search Tree',
    subtitle: 'Ordered Binary Tree for Efficient Searching',
    sections: [
      { 
        type: 'text', 
        title: 'What is a BST?',
        content: 'A Binary Search Tree (BST) is a binary tree where for each node, all elements in the left subtree are smaller and all elements in the right subtree are greater. This property enables efficient searching.' 
      },
      { 
        type: 'list', 
        title: 'BST Properties',
        content: [
          'Left subtree values < Node value',
          'Right subtree values > Node value',
          'Both left and right subtrees are also BSTs',
          'Inorder traversal gives sorted sequence',
          'No duplicate values (in standard BST)'
        ]
      },
      { 
        type: 'code', 
        title: 'BST Operations Implementation',
        content: `class BST {
    TreeNode root;
    
    // Insert a value - O(h) where h is height
    public TreeNode insert(TreeNode node, int value) {
        if (node == null) {
            return new TreeNode(value);
        }
        
        if (value < node.data) {
            node.left = insert(node.left, value);
        } else if (value > node.data) {
            node.right = insert(node.right, value);
        }
        
        return node;
    }
    
    // Search for a value - O(h)
    public boolean search(TreeNode node, int value) {
        if (node == null) return false;
        
        if (node.data == value) return true;
        
        if (value < node.data) {
            return search(node.left, value);
        }
        return search(node.right, value);
    }
    
    // Find minimum value - O(h)
    public TreeNode findMin(TreeNode node) {
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }
    
    // Delete a node - O(h)
    public TreeNode delete(TreeNode node, int value) {
        if (node == null) return null;
        
        if (value < node.data) {
            node.left = delete(node.left, value);
        } else if (value > node.data) {
            node.right = delete(node.right, value);
        } else {
            // Node with only one child or no child
            if (node.left == null) return node.right;
            if (node.right == null) return node.left;
            
            // Node with two children
            TreeNode minNode = findMin(node.right);
            node.data = minNode.data;
            node.right = delete(node.right, minNode.data);
        }
        
        return node;
    }
}` 
      },
      { 
        type: 'list', 
        title: 'Time Complexities',
        content: [
          'Search: O(h) - Best O(log n), Worst O(n)',
          'Insert: O(h) - Best O(log n), Worst O(n)',
          'Delete: O(h) - Best O(log n), Worst O(n)',
          'Space: O(h) for recursion stack',
          'h = height of tree'
        ]
      },
      { 
        type: 'note', 
        content: 'BST degenerates to a linked list (height = n) when elements are inserted in sorted order. Use self-balancing trees like AVL or Red-Black trees for guaranteed O(log n) operations.' 
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the time complexity of searching in a balanced BST?',
        options: [
          { id: 'a', text: 'O(n)' },
          { id: 'b', text: 'O(log n)' },
          { id: 'c', text: 'O(1)' },
          { id: 'd', text: 'O(n log n)' }
        ],
        correctAnswer: 'b'
      },
      {
        id: 2,
        question: 'In a BST, where is the minimum value located?',
        options: [
          { id: 'a', text: 'Root node' },
          { id: 'b', text: 'Rightmost node' },
          { id: 'c', text: 'Leftmost node' },
          { id: 'd', text: 'Any leaf node' }
        ],
        correctAnswer: 'c'
      }
    ],
    prevLesson: 'trees',
    nextLesson: 'graphs'
  },
  'graphs': {
    id: 'graphs',
    title: 'Graph Data Structure',
    subtitle: 'Network of Vertices and Edges',
    sections: [
      { 
        type: 'text', 
        title: 'What is a Graph?',
        content: 'A graph is a non-linear data structure consisting of vertices (nodes) connected by edges. It\'s used to represent networks like social connections, maps, and dependencies.' 
      },
      { 
        type: 'list', 
        title: 'Graph Types',
        content: [
          'Directed Graph (Digraph) - Edges have direction',
          'Undirected Graph - Edges have no direction',
          'Weighted Graph - Edges have weights/costs',
          'Unweighted Graph - All edges are equal',
          'Cyclic Graph - Contains at least one cycle',
          'Acyclic Graph - No cycles (DAG if directed)'
        ]
      },
      { 
        type: 'code', 
        title: 'Graph Representation using Adjacency List',
        content: `import java.util.*;

class Graph {
    private int V; // Number of vertices
    private List<List<Integer>> adj;
    
    Graph(int v) {
        V = v;
        adj = new ArrayList<>(v);
        for (int i = 0; i < v; i++) {
            adj.add(new ArrayList<>());
        }
    }
    
    // Add edge
    void addEdge(int u, int v) {
        adj.get(u).add(v);
        adj.get(v).add(u); // For undirected graph
    }
    
    // BFS Traversal - O(V + E)
    void BFS(int start) {
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[start] = true;
        queue.offer(start);
        
        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            System.out.print(vertex + " ");
            
            for (int neighbor : adj.get(vertex)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
    }
    
    // DFS Traversal - O(V + E)
    void DFSUtil(int vertex, boolean[] visited) {
        visited[vertex] = true;
        System.out.print(vertex + " ");
        
        for (int neighbor : adj.get(vertex)) {
            if (!visited[neighbor]) {
                DFSUtil(neighbor, visited);
            }
        }
    }
    
    void DFS(int start) {
        boolean[] visited = new boolean[V];
        DFSUtil(start, visited);
    }
}` 
      },
      { 
        type: 'list', 
        title: 'Graph Algorithms',
        content: [
          'BFS (Breadth-First Search) - Level-by-level traversal',
          'DFS (Depth-First Search) - Go deep before wide',
          'Dijkstra - Shortest path in weighted graph',
          'Bellman-Ford - Shortest path with negative edges',
          'Kruskal/Prim - Minimum Spanning Tree',
          'Topological Sort - Linear ordering of vertices'
        ]
      },
      { 
        type: 'note', 
        content: 'Use adjacency list for sparse graphs (few edges) and adjacency matrix for dense graphs (many edges). Most real-world graphs are sparse.' 
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'What data structure is used in BFS traversal?',
        options: [
          { id: 'a', text: 'Stack' },
          { id: 'b', text: 'Queue' },
          { id: 'c', text: 'Heap' },
          { id: 'd', text: 'Array' }
        ],
        correctAnswer: 'b'
      },
      {
        id: 2,
        question: 'What is the time complexity of BFS/DFS in a graph?',
        options: [
          { id: 'a', text: 'O(V)' },
          { id: 'b', text: 'O(E)' },
          { id: 'c', text: 'O(V + E)' },
          { id: 'd', text: 'O(V * E)' }
        ],
        correctAnswer: 'c'
      }
    ],
    prevLesson: 'bst',
    nextLesson: 'sorting'
  },
  'sorting': {
    id: 'sorting',
    title: 'Sorting Algorithms',
    subtitle: 'Arranging Elements in Order',
    sections: [
      { 
        type: 'text', 
        title: 'What is Sorting?',
        content: 'Sorting is the process of arranging elements in a specific order (ascending or descending). It\'s fundamental to many algorithms and essential for efficient searching and data organization.' 
      },
      { 
        type: 'code', 
        title: 'Bubble Sort - O(n²)',
        content: `public void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break; // Already sorted
    }
}` 
      },
      { 
        type: 'code', 
        title: 'Quick Sort - O(n log n) average',
        content: `public void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return i + 1;
}` 
      },
      { 
        type: 'code', 
        title: 'Merge Sort - O(n log n)',
        content: `public void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

private void merge(int[] arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    int[] L = new int[n1];
    int[] R = new int[n2];
    
    System.arraycopy(arr, left, L, 0, n1);
    System.arraycopy(arr, mid + 1, R, 0, n2);
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
    
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}` 
      },
      { 
        type: 'list', 
        title: 'Sorting Algorithm Comparison',
        content: [
          'Bubble Sort: O(n²) - Simple but slow',
          'Selection Sort: O(n²) - Minimizes swaps',
          'Insertion Sort: O(n²) - Good for small/nearly sorted',
          'Merge Sort: O(n log n) - Stable, needs O(n) space',
          'Quick Sort: O(n log n) avg - Fast, in-place',
          'Heap Sort: O(n log n) - In-place, not stable'
        ]
      },
      { 
        type: 'note', 
        content: 'Java\'s Arrays.sort() uses dual-pivot quicksort for primitives and TimSort (merge+insertion) for objects. Both achieve O(n log n) average time.' 
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Which sorting algorithm has the best average time complexity?',
        options: [
          { id: 'a', text: 'Bubble Sort' },
          { id: 'b', text: 'Quick Sort' },
          { id: 'c', text: 'Insertion Sort' },
          { id: 'd', text: 'Selection Sort' }
        ],
        correctAnswer: 'b'
      },
      {
        id: 2,
        question: 'Which sorting algorithm is stable?',
        options: [
          { id: 'a', text: 'Quick Sort' },
          { id: 'b', text: 'Heap Sort' },
          { id: 'c', text: 'Merge Sort' },
          { id: 'd', text: 'Selection Sort' }
        ],
        correctAnswer: 'c'
      }
    ],
    prevLesson: 'graphs',
    nextLesson: 'searching'
  },
  'searching': {
    id: 'searching',
    title: 'Searching Algorithms',
    subtitle: 'Finding Elements Efficiently',
    sections: [
      { 
        type: 'text', 
        title: 'What is Searching?',
        content: 'Searching is the process of finding a specific element in a data structure. The efficiency of searching depends on the data structure and whether the data is sorted.' 
      },
      { 
        type: 'code', 
        title: 'Linear Search - O(n)',
        content: `public int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i; // Element found at index i
        }
    }
    return -1; // Element not found
}

// Use case: Unsorted arrays, small datasets
// Advantage: Works on any array
// Disadvantage: Slow for large datasets` 
      },
      { 
        type: 'code', 
        title: 'Binary Search - O(log n)',
        content: `// Iterative Binary Search
public int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Recursive Binary Search
public int binarySearchRecursive(int[] arr, int target, int left, int right) {
    if (left > right) return -1;
    
    int mid = left + (right - left) / 2;
    
    if (arr[mid] == target) return mid;
    
    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    }
    return binarySearchRecursive(arr, target, left, mid - 1);
}

// Prerequisite: Array must be sorted!` 
      },
      { 
        type: 'code', 
        title: 'Jump Search - O(√n)',
        content: `public int jumpSearch(int[] arr, int target) {
    int n = arr.length;
    int step = (int) Math.sqrt(n);
    int prev = 0;
    
    // Jump to find block where element may be present
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += (int) Math.sqrt(n);
        if (prev >= n) return -1;
    }
    
    // Linear search in the block
    while (arr[prev] < target) {
        prev++;
        if (prev == Math.min(step, n)) return -1;
    }
    
    if (arr[prev] == target) return prev;
    return -1;
}` 
      },
      { 
        type: 'list', 
        title: 'Search Algorithm Comparison',
        content: [
          'Linear Search: O(n) - Works on unsorted data',
          'Binary Search: O(log n) - Requires sorted data',
          'Jump Search: O(√n) - Better than linear, worse than binary',
          'Interpolation Search: O(log log n) avg - For uniformly distributed data',
          'Exponential Search: O(log n) - For unbounded/infinite arrays'
        ]
      },
      { 
        type: 'note', 
        content: 'Binary search is the gold standard for sorted arrays. For unsorted data, consider sorting first if you need multiple searches, or use hash tables for O(1) average lookup.' 
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the time complexity of binary search?',
        options: [
          { id: 'a', text: 'O(n)' },
          { id: 'b', text: 'O(log n)' },
          { id: 'c', text: 'O(n log n)' },
          { id: 'd', text: 'O(1)' }
        ],
        correctAnswer: 'b'
      },
      {
        id: 2,
        question: 'What is the prerequisite for binary search?',
        options: [
          { id: 'a', text: 'Array must be sorted' },
          { id: 'b', text: 'Array must have unique elements' },
          { id: 'c', text: 'Array must be small' },
          { id: 'd', text: 'No prerequisite' }
        ],
        correctAnswer: 'a'
      }
    ],
    prevLesson: 'sorting'
  }
};
