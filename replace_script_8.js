const fs = require('fs');
let content = fs.readFileSync('d:/works_desktop/lbsmca/questions_prog.js', 'utf8');

const replacements = [
  [
    `explanation: "Merge and quick sort are most efficient with O(n log n)."`,
    `explanation: "Merge and quick sort are most efficient with O(n log n).<br><br><b>Key Points:</b><ul><li><b>General Rule:</b> For general-purpose sorting of random data, $O(n \\log n)$ time algorithms (Merge Sort, Quick Sort, Heap Sort) are mathematically the fastest possible comparison-based sorts.</li><li><b>Usage:</b> This is why almost every modern programming language uses a variant of these for their built-in \`sort()\` functions.</li></ul>"`
  ],
  [
    `explanation: "Sorting arranges array/list in specified order."`,
    `explanation: "Sorting arranges array/list in specified order.<br><br><b>Key Points:</b><ul><li><b>Definition:</b> The process of rearranging independent pieces of data into a meaningful sequence (numerical order, alphabetical order, chronological order, etc).</li><li><b>Importance:</b> Searching through sorted data is exponentially faster than searching through random data.</li></ul>"`
  ],
  [
    `explanation: "Searching locates element with given value in collection."`,
    `explanation: "Searching locates element with given value in collection.<br><br><b>Key Points:</b><ul><li><b>Definition:</b> The algorithmic process of finding a particular item in a collection of items.</li><li><b>Outcome:</b> Usually returns either the location (index) where the item was found, or a \"True/False\" boolean indicating if it exists.</li></ul>"`
  ],
  [
    `explanation: "Stable sort: equal elements keep their original relative order."`,
    `explanation: "Stable sort: equal elements keep their original relative order.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Imagine you have a deck of cards sorted by Suit. You now decide to sort them by Number using a Stable Sort.</li><li><b>Result:</b> If you have two $7$s (a $7$ of Hearts and a $7$ of Spades), the algorithm guarantees that whoever was in front *before* the sort, will still be in front *after* the sort.</li></ul>"`
  ],
  [
    `explanation: "Unstable sort: equal elements may be reordered."`,
    `explanation: "Unstable sort: equal elements may be reordered.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> The algorithm does not care about the original order of identical items.</li><li><b>Result:</b> If you have two identical items, their positions might accidentally flip-flop during the sorting process. Quick Sort is famously unstable.</li></ul>"`
  ],
  [
    `explanation: "Stack: last element added is first removed, like stack of plates."`,
    `explanation: "Stack: last element added is first removed, like stack of plates.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> A linear data structure with restricted access.</li><li><b>Analogy:</b> Like a stack of heavy cafeteria plates. You can only put a new plate on the very top. You can only take a plate off the very top. Trying to pull a plate from the middle breaks everything.</li></ul>"`
  ],
  [
    `explanation: "LIFO means last inserted element is first removed."`,
    `explanation: "LIFO means last inserted element is first removed.<br><br><b>Key Points:</b><ul><li><b>Acronym:</b> Last In, First Out.</li><li><b>Real World:</b> Your web browser's \"Back\" button. The last page you visited is the first one that pops off the history stack when you hit back.</li></ul>"`
  ],
  [
    `explanation: "push: insert element at top (top++) of stack."`,
    `explanation: "push: insert element at top (top++) of stack.<br><br><b>Key Points:</b><ul><li><b>Action:</b> The formal computer science term for adding data to a stack.</li><li><b>Limit:</b> If the stack is implemented using an array with a fixed size, and you try to push when it is full, you trigger a \"Stack Overflow\" error.</li></ul>"`
  ],
  [
    `explanation: "pop: remove element from top (top--) of stack."`,
    `explanation: "pop: remove element from top (top--) of stack.<br><br><b>Key Points:</b><ul><li><b>Action:</b> The formal term for removing data from a stack. It both removes the item AND returns its value to you.</li><li><b>Limit:</b> If you try to pop from an empty stack, you trigger a \"Stack Underflow\" error.</li></ul>"`
  ],
  [
    `explanation: "peek: returns top element value without modifying stack."`,
    `explanation: "peek: returns top element value without modifying stack.<br><br><b>Key Points:</b><ul><li><b>Difference:</b> Unlike \`pop\`, which actively deletes the item out of the structure, \`peek\` (or \`top\`) just lets you look at the value safely without destroying it.</li></ul>"`
  ],
  [
    `explanation: "Queue: first element added is first removed, like waiting line."`,
    `explanation: "Queue: first element added is first removed, like waiting line.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> A linear data structure open at both ends.</li><li><b>Setup:</b> One end is strictly for adding new data, the other is strictly for removing data.</li></ul>"`
  ],
  [
    `explanation: "FIFO means first inserted element is first removed."`,
    `explanation: "FIFO means first inserted element is first removed.<br><br><b>Key Points:</b><ul><li><b>Acronym:</b> First In, First Out.</li><li><b>Real World:</b> The drive-thru at a fast food restaurant. The first car to enter the line gets served first and leaves first.</li></ul>"`
  ],
  [
    `explanation: "enqueue: insert element at rear of queue."`,
    `explanation: "enqueue: insert element at rear of queue.<br><br><b>Key Points:</b><ul><li><b>Action:</b> The formal term for adding data to a queue.</li><li><b>Location:</b> Always happens at the \"Tail\" or \"Rear\" pointer.</li></ul>"`
  ],
  [
    `explanation: "dequeue: remove element from front of queue."`,
    `explanation: "dequeue: remove element from front of queue.<br><br><b>Key Points:</b><ul><li><b>Action:</b> The formal term for removing data from a queue.</li><li><b>Location:</b> Always happens at the \"Head\" or \"Front\" pointer.</li></ul>"`
  ],
  [
    `explanation: "Circular queue: rear can wrap around to front position."`,
    `explanation: "Circular queue: rear can wrap around to front position.<br><br><b>Key Points:</b><ul><li><b>Problem with simple arrays:</b> If you enqueue and dequeue from a normal array, the data crawls to the right until you hit the end of the array, even if there are empty spots at the beginning!</li><li><b>Solution:</b> A Circular Queue uses modulo math \`% capacity\` to make the end of the array mathematically loop back to index $0$, like a ring.</li></ul>"`
  ],
  [
    `explanation: "Circular queue reuses space when elements are dequeued."`,
    `explanation: "Circular queue reuses space when elements are dequeued.<br><br><b>Key Points:</b><ul><li><b>Advantage:</b> Pure memory efficiency. As long as the total number of items is less than the maximum capacity, the queue can run forever continuously overwriting empty old spaces.</li></ul>"`
  ],
  [
    `explanation: "Linked list: nodes contain data and reference to next node."`,
    `explanation: "Linked list: nodes contain data and reference to next node.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Unlike arrays where memory is grouped in one solid contiguous block, a Linked List scatters its data randomly all over the RAM.</li><li><b>Connection:</b> Everything is held together by pointers. It works like a scavenger hunt: clue 1 tells you where to find clue 2, and so on.</li></ul>"`
  ],
  [
    `explanation: "Node: struct with data field and pointer field."`,
    `explanation: "Node: struct with data field and pointer field.<br><br><b>Key Points:</b><ul><li><b>Structure:</b> The basic building block. A typical C node looks like:<br>\`struct Node {\`<br>&nbsp;&nbsp;&nbsp;&nbsp;\`int data;\`<br>&nbsp;&nbsp;&nbsp;&nbsp;\`struct Node *next;\`<br>\`};\`</li></ul>"`
  ],
  [
    `explanation: "Singly linked list: unidirectional, each node points to next."`,
    `explanation: "Singly linked list: unidirectional, each node points to next.<br><br><b>Key Points:</b><ul><li><b>Direction:</b> Traffic only flows one way. You can easily go from Node $A$ to Node $B$, but you absolutely cannot go backwards from Node $B$ to Node $A$.</li></ul>"`
  ],
  [
    `explanation: "Doubly linked list: bidirectional, navigate forward and backward."`,
    `explanation: "Doubly linked list: bidirectional, navigate forward and backward.<br><br><b>Key Points:</b><ul><li><b>Structure:</b> Every node pays the price of storing a *second* pointer: \`struct Node *prev;\`.</li><li><b>Advantage:</b> Massive flexibility. You can easily traverse the list forwards or perfectly backwards.</li></ul>"`
  ],
  [
    `explanation: "Circular linked list: last node's next points to first node."`,
    `explanation: "Circular linked list: last node's next points to first node.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> In a normal list, the last node points to \`NULL\` to signify the end of the line.</li><li><b>Change:</b> Here, the last node points back to the Head. This means you can start at *any* node and eventually traverse the entire list. Useful for multiplayer turn-based games (Player $1\\rightarrow2\\rightarrow3\\rightarrow1$).</li></ul>"`
  ],
  [
    `explanation: "Insertion: create new node, update pointers to connect."`,
    `explanation: "Insertion: create new node, update pointers to connect.<br><br><b>Key Points:</b><ul><li><b>Dominant Advantage:</b> This is why Linked Lists beat Arrays. You can insert a node right in the middle without having to physically slide thousands of other elements over. You just neatly re-wire two pointers. Time complexity is $O(1)$ if you are at the location.</li></ul>"`
  ],
  [
    `explanation: "Deletion: remove node, update pointers to maintain linkage."`,
    `explanation: "Deletion: remove node, update pointers to maintain linkage.<br><br><b>Key Points:</b><ul><li><b>Process:</b> If you want to delete $B$ from $A\\rightarrow B\\rightarrow C$, you simply tell $A$'s pointer to look at $C$ instead. The link is bypassed. Then you \`free()\` the memory for $B$.</li></ul>"`
  ],
  [
    `explanation: "Traversal: move through list following pointers."`,
    `explanation: "Traversal: move through list following pointers.<br><br><b>Key Points:</b><ul><li><b>Mechanics:</b> Usually done with a \`while\` loop. You create a temporary pointer \`curr = head;\` and say \`while (curr != NULL) { curr = curr->next; }\`.</li></ul>"`
  ],
  [
    `explanation: "Binary tree: hierarchical structure with max 2 children per node."`,
    `explanation: "Binary tree: hierarchical structure with max 2 children per node.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> A non-linear data structure. Unlike lists which are a straight line, trees branch out.</li><li><b>Rule:</b> \"Binary\" means two. A node is allowed to have $0$, $1$, or exactly $2$ children (usually called Left Child and Right Child). It cannot have $3$.</li></ul>"`
  ],
  [
    `explanation: "BST: ordered binary tree for efficient searching."`,
    `explanation: "BST: ordered binary tree for efficient searching.<br><br><b>Key Points:</b><ul><li><b>The Golden Rule:</b> For ANY given node, everything in its entire Left branch must be mathematically Smaller than it. Everything in its entire Right branch must be mathematically Larger than it.</li><li><b>Result:</b> This structure allows for incredibly fast $O(\\log n)$ searching, inserting, and deleting.</li></ul>"`
  ],
  [
    `explanation: "Root: topmost node of tree structure."`,
    `explanation: "Root: topmost node of tree structure.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Computer science trees are drawn upside down. The Root is the absolute top starting point of the entire data structure. It is the only node that does not have a \"Parent\".</li></ul>"`
  ],
  [
    `explanation: "Leaf: terminal node having no children."`,
    `explanation: "Leaf: terminal node having no children.<br><br><b>Key Points:</b><ul><li><b>Definition:</b> The absolute bottom edges of the tree. A node is classified as a leaf if both its Left and Right pointers are \`NULL\`.</li></ul>"`
  ]
];

for (let i = 0; i < replacements.length; i++) {
  content = content.replace(replacements[i][0], replacements[i][1]);
}

fs.writeFileSync('d:/works_desktop/lbsmca/questions_prog.js', content, 'utf8');
console.log('Finished updating Data Structures questions.');
