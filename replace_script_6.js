const fs = require('fs');
let content = fs.readFileSync('d:/works_desktop/lbsmca/questions_prog.js', 'utf8');

const replacements = [
  [
    `explanation: "Pointer is variable that holds memory address of another variable."`,
    `explanation: "Pointer is variable that holds memory address of another variable.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Every variable you create lives in a specific numbered mailbox in the computer's RAM.</li><li><b>Analogy:</b> If a variable is a house containing a family (data), a pointer is simply a piece of paper with the house's street address written on it.</li></ul>"`
  ],
  [
    `explanation: "Pointer declared with * after type: type *pointer_name;"`,
    `explanation: "Pointer declared with * after type: type *pointer_name;<br><br><b>Key Points:</b><ul><li><b>Theory:</b> The \`*\` symbol during declaration tells the compiler \"This is not a normal variable, this is an address-holder.\"</li><li><b>Typing:</b> Even though all addresses look the same (hexadecimal numbers), you must specify what type of data the pointer is pointing AT (e.g., \`int *p\` points to integer data).</li></ul>"`
  ],
  [
    `explanation: "& (address-of operator) returns memory address of variable."`,
    `explanation: "& (address-of operator) returns memory address of variable.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> You cannot safely guess memory addresses. The OS gives them out randomly when the program runs.</li><li><b>Usage:</b> To find out where a variable lives right now, you place an \`&\` directly in front of it (e.g., \`&x\`).</li></ul>"`
  ],
  [
    `explanation: "* (dereference operator) accesses value that pointer points to."`,
    `explanation: "* (dereference operator) accesses value that pointer points to.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> If you have a pointer \`p\`, printing \`p\` gives you a raw memory address (like \`0x7ffe...\`).</li><li><b>Action:</b> When you put a \`*\` in front of a pointer outside of declaration (e.g., \`*p\`), you are telling the computer: \"Go to the house at this address and tell me who is inside.\"</li></ul>"`
  ],
  [
    `explanation: "ptr points to x; *ptr gives x's value which is 5."`,
    `explanation: "ptr points to x; *ptr gives x's value which is 5.<br><br><b>Key Points:</b><ul><li><b>Step 1:</b> \`int x = 5;\` puts $5$ in a memory box (say, address 100).</li><li><b>Step 2:</b> \`int *ptr = &x;\` stores the number $100$ inside \`ptr\`.</li><li><b>Step 3:</b> \`*ptr\` basically means \"What is inside box 100?\" The answer is $5$.</li></ul>"`
  ],
  [
    `explanation: "NULL pointer explicitly points to nothing, used to indicate no valid address."`,
    `explanation: "NULL pointer explicitly points to nothing, used to indicate no valid address.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> In C, pointers contain garbage (random addresses) when first created. Dereferencing a garbage pointer causes a fatal crash.</li><li><b>Safety:</b> Setting a pointer to \`NULL\` gives it a well-known, safe \"empty\" state (usually memory address 0). You can safely check \`if(ptr == NULL)\` before using it.</li></ul>"`
  ],
  [
    `explanation: "Pointer arithmetic: increment/decrement moves pointer by data size."`,
    `explanation: "Pointer arithmetic: increment/decrement moves pointer by data size.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Pointers do math differently than normal numbers. They scale by the size of their data type.</li><li><b>Example:</b> If an \`int\` is 4 bytes and \`int *p\` points to address 1000, then doing \`p + 1\` doesn't give you 1001. It mathematically jumps to 1004 (the next full integer slot).</li></ul>"`
  ],
  [
    `explanation: "malloc(size) allocates 'size' bytes and returns pointer to allocated memory."`,
    `explanation: "malloc(size) allocates 'size' bytes and returns pointer to allocated memory.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> \`malloc\` (Memory Allocation) asks the Operating System for raw memory at runtime.</li><li><b>Return Value:</b> It returns a \`void *\` (a generic pointer) pointing to the first byte of that newly reserved memory block.</li><li><b>Initialization:</b> The memory is NOT wiped clean. It contains whatever random garbage was left there by previous programs.</li></ul>"`
  ],
  [
    `explanation: "calloc(n, size) allocates n*size bytes initialized to 0."`,
    `explanation: "calloc(n, size) allocates n*size bytes initialized to 0.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> \`calloc\` (Contiguous Allocation) is the safer sibling to \`malloc\`.</li><li><b>Difference:</b> Not only does it reserve the memory block, but it actively wipes it clean, setting every single bit to 0. This prevents weird bugs caused by leftover garbage data.</li></ul>"`
  ],
  [
    `explanation: "realloc(ptr, new_size) changes size of allocated memory."`,
    `explanation: "realloc(ptr, new_size) changes size of allocated memory.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Used when an array you dynamically created isn't big enough anymore.</li><li><b>Mechanics:</b> It tries to simply extend your current memory block. If there isn't enough empty space next door, it secretly creates a brand new larger block, copies all your old data over, deletes the old block, and returns the new address.</li></ul>"`
  ],
  [
    `explanation: "free(ptr) releases memory previously allocated by malloc/calloc."`,
    `explanation: "free(ptr) releases memory previously allocated by malloc/calloc.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Unlike Java or Python, C has no \"Garbage Collector\". If you ask for memory with \`malloc\`, you own it forever.</li><li><b>Responsibility:</b> If you forget to call \`free()\`, that memory is permanently locked out from the rest of the system until the program completely closes. This is called a \"Memory Leak\".</li></ul>"`
  ],
  [
    `explanation: "struct combines multiple data types into single composite type."`,
    `explanation: "struct combines multiple data types into single composite type.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Arrays only let you group identical things (e.g., $10$ integers). Structures let you package entirely different concepts together.</li><li><b>Example:</b> A \`Student\` structure can hold an \`int\` for their ID, a \`char[]\` for their name, and a \`float\` for their GPA, all bound together in one logical unit.</li></ul>"`
  ],
  [
    `explanation: "struct keyword followed by name and member list in braces."`,
    `explanation: "struct keyword followed by name and member list in braces.<br><br><b>Key Points:</b><ul><li><b>Syntax:</b><br>\`struct Student {\`<br>&nbsp;&nbsp;&nbsp;&nbsp;\`int roll_no;\`<br>&nbsp;&nbsp;&nbsp;&nbsp;\`float marks;\`<br>\`};\`</li><li><b>Requirement:</b> Because a union/struct definition is treated as a single complete C statement, it MUST end with a semicolon \`;\` after the closing brace.</li></ul>"`
  ],
  [
    `explanation: ". for variable, -> for pointer to access members."`,
    `explanation: ". for variable, -> for pointer to access members.<br><br><b>Key Points:</b><ul><li><b>Direct Access:</b> If you have a regular struct variable \`struct Student s1;\`, you use the dot operator: \`s1.marks = 95;\`.</li><li><b>Pointer Access:</b> If you have a pointer to a struct \`struct Student *ptr = &s1;\`, you use the arrow operator: \`ptr->marks = 95;\`. (This is a shorthand for writing \`(*ptr).marks\`).</li></ul>"`
  ],
  [
    `explanation: "typedef defines new name for existing type: typedef int myint;"`,
    `explanation: "typedef defines new name for existing type: typedef int myint;<br><br><b>Key Points:</b><ul><li><b>Theory:</b> It doesn't create a new data type; it simply creates a nickname for an existing one.</li><li><b>Utility:</b> Mostly used to make long struct names shorter. Instead of typing \`struct LinkedListNode myNode;\` everywhere, you typedef it to just \`Node myNode;\`.</li></ul>"`
  ],
  [
    `explanation: "union members share same memory; only one holds value at time."`,
    `explanation: "union members share same memory; only one holds value at time.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> A union looks identical to a struct in code, but acts entirely differently in memory.</li><li><b>Mechanics:</b> Instead of putting members side-by-side, all members in a union sit right on top of each other in the exact same memory space. The union's total size is simply the size of its largest member.</li></ul>"`
  ],
  [
    `explanation: "struct allocates separate memory; union shares single memory location."`,
    `explanation: "struct allocates separate memory; union shares single memory location.<br><br><b>Key Points:</b><ul><li><b>Difference:</b> If a struct has an \`int\` (4 bytes) and a \`double\` (8 bytes), it takes up $12$ bytes total. Both variables live in peace.</li><li><b>Difference:</b> If a union has an \`int\` and a \`double\`, it takes up exactly $8$ bytes total. Writing to the \`int\` immediately destroys whatever data was in the \`double\`.</li></ul>"`
  ],
  [
    `explanation: "enum defines set of named integer constants."`,
    `explanation: "enum defines set of named integer constants.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Enums (Enumerations) are a way to assign readable English words to integer numbers.</li><li><b>Mechanics:</b> By default, the first names word equals $0$, the second equals $1$, the third equals $2$, and so on.</li><li><b>Readability:</b> Makes code understandable. \`if (day == WEDNESDAY)\` is much clearer than \`if (day == 3)\`.</li></ul>"`
  ],
  [
    `explanation: "p.x set to 5; printf displays member value 5."`,
    `explanation: "p.x set to 5; printf displays member value 5.<br><br><b>Key Points:</b><ul><li><b>Execution Trace:</b> We define a structure containing $X$ and $Y$ coordinates. We immediately declare a variable named \`p\` of this type.</li><li><b>Access:</b> We reach into \`p\` using the dot operator and set its internal \`x\` variable to $5$. We then print it back out.</li></ul>"`
  ],
  [
    `explanation: "Dynamic allocation: cast malloc result and use sizeof for memory."`,
    `explanation: "Dynamic allocation: cast malloc result and use sizeof for memory.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> You cannot hardcode memory sizes for structs because different compilers add invisible 'padding' bytes between variables inside a struct for optimization.</li><li><b>Rule:</b> NEVER manually calculate the size of a struct. ALWAYS use \`sizeof(struct MyStruct)\` inside the \`malloc()\` call to let the compiler safely count it for you.</li></ul>"`
  ]
];

for (let i = 0; i < replacements.length; i++) {
  content = content.replace(replacements[i][0], replacements[i][1]);
}

fs.writeFileSync('d:/works_desktop/lbsmca/questions_prog.js', content, 'utf8');
console.log('Finished updating Pointers/Structures questions.');
