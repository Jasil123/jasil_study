const fs = require('fs');
let content = fs.readFileSync('d:/works_desktop/lbsmca/questions_prog.js', 'utf8');

const replacements = [
  [
    `explanation: "C array indexing is 0-based; arr[0] is first element."`,
    `explanation: "C array indexing is 0-based; arr[0] is first element.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> An array index represents an offset from the memory address of the very first element.</li><li><b>Calculation:</b> To find the $1$st element, you travel $0$ steps away from the start. To find the $5$th element, you travel $4$ steps away.</li></ul>"`
  ],
  [
    `explanation: "Third element is at index 2 (0-based indexing)."`,
    `explanation: "Third element is at index 2 (0-based indexing).<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Because of zero-based indexing, the $N$th element of an array is always located at \`arr[N-1]\`.</li><li><b>Application:</b> The $1$st is \`arr[0]\`, the $2$nd is \`arr[1]\`, and the $3$rd is \`arr[2]\`.</li></ul>"`
  ],
  [
    `explanation: "2D array: datatype name[rows][columns];"`,
    `explanation: "2D array: datatype name[rows][columns];<br><br><b>Key Points:</b><ul><li><b>Theory:</b> A 2D array is functionally an \"array of arrays\".</li><li><b>Syntax matching:</b> Think of it like a spreadsheet or matrix. The first bracket dictates the number of horizontal rows (Y-axis), and the second bracket dictates vertical columns (X-axis).</li></ul>"`
  ],
  [
    `explanation: "Total elements = rows * columns = 3 * 4 = 12."`,
    `explanation: "Total elements = rows * columns = 3 * 4 = 12.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Memory allocation for arrays is contiguous (unbroken). A $[3][4]$ array means $3$ rows, each containing $4$ integers.</li><li><b>Math:</b> $3 \\times 4 = 12$ total blocks of memory reserved sequentially.</li></ul>"`
  ],
  [
    `explanation: "2D array access: arr[row][column]."`,
    `explanation: "2D array access: arr[row][column].<br><br><b>Key Points:</b><ul><li><b>Theory:</b> You must provide coordinates to access a 2D array. First you specify the row index, then the column index inside that specific row.</li><li><b>Indexing:</b> Remember, both row AND column indexes start at $0$. So \"Row 1\" mathematically means index $1$ (the second literal row).</li></ul>"`
  ],
  [
    `explanation: "Matrix is 2D array representing rows and columns of data."`,
    `explanation: "Matrix is 2D array representing rows and columns of data.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> In mathematics and programming, a matrix is a rectangular layout of numbers.</li><li><b>Implementation:</b> C natively maps matrices to its 2-dimensional array structures.</li></ul>"`
  ],
  [
    `explanation: "String is char array terminated with '\\\\0' (null character)."`,
    `explanation: "String is char array terminated with '\\\\0' (null character).<br><br><b>Key Points:</b><ul><li><b>Theory:</b> C has no built-in \`string\` type like Java or Python. It simulates strings using an array of \`char\`s.</li><li><b>Requirement:</b> Since arrays in C do not intrinsically know their own length, the compiler uses the null character (\`'\\\\0'\`) as a stop sign to know where the text finishes.</li></ul>"`
  ],
  [
    `explanation: "String declared as char array with size."`,
    `explanation: "String declared as char array with size.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> When declaring \`char str[50];\`, you are setting aside 50 bytes of contiguous memory.</li><li><b>Capacity Limit:</b> This means the variable can safely hold a word that is 49 characters long, leaving exactly 1 byte at the end for the mandatory \`\\\\0\` terminator.</li></ul>"`
  ],
  [
    `explanation: "C strings end with '\\\\0' to mark end."`,
    `explanation: "C strings end with '\\\\0' to mark end.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> It's an invisible control character (ASCII value $0$).</li><li><b>Importance:</b> Functions like \`printf(\"%s\")\` process memory byte by byte and will literally print garbage data off into infinity until they randomly stumble across a \`\\\\0\` byte in memory.</li></ul>"`
  ],
  [
    `explanation: "strlen() counts characters in string until '\\\\0'."`,
    `explanation: "strlen() counts characters in string until '\\\\0'.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> A built-in function from \`<string.h>\` that measures the length of a string.</li><li><b>Exclusion:</b> It does NOT count the null terminator itself. \`strlen(\"HELLO\")\` returns $5$, even though the array takes up $6$ bytes in memory.</li></ul>"`
  ],
  [
    `explanation: "strcpy(destination, source) copies source string to destination."`,
    `explanation: "strcpy(destination, source) copies source string to destination.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> You cannot use the assignment operator (\`=\`) to copy strings in C (e.g., \`str1 = str2\` is illegal for arrays).</li><li><b>Operation:</b> \`strcpy\` duplicates the string character by character, including the null terminator, from the source into the target.</li></ul>"`
  ],
  [
    `explanation: "strcmp() returns 0 if strings are equal, negative/positive if different."`,
    `explanation: "strcmp() returns 0 if strings are equal, negative/positive if different.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> You cannot use the equality operator (\`==\`) to compare text in C, as that only compares memory addresses.</li><li><b>Mechanics:</b> \`strcmp\` compares ASCII values character by character. A return value of $0$ means a perfect literal match.</li></ul>"`
  ],
  [
    `explanation: "gets() reads entire line from input (including spaces)."`,
    `explanation: "gets() reads entire line from input (including spaces).<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Standard \`scanf(\"%s\")\` stops reading the moment it sees a blank space. \`gets()\` reads the whole sentence until the user presses Enter.</li><li><b>Security Warning:</b> \`gets()\` is highly discouraged in modern C because it has no bounds-checking, opening the door for catastrophic Buffer Overflow hacks. Prefer \`fgets()\`.</li></ul>"`
  ],
  [
    `explanation: "Accessing out-of-bounds index gives undefined behavior."`,
    `explanation: "Accessing out-of-bounds index gives undefined behavior.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> An array of size 3 only legally owns indexes $0, 1, 2$.</li><li><b>C Nature:</b> C does not halt you from asking for index 5. It blindly travels 5 slots down the memory lane and reads whatever random data (or system code) happens to be sitting there, resulting in unpredictable bugs or crashes like \"Segmentation Faults\".</li></ul>"`
  ],
  [
    `explanation: "Set max to arr[0], then iterate comparing each element."`,
    `explanation: "Set max to arr[0], then iterate comparing each element.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> The standard 'King of the Hill' algorithm. Assume the first person (index 0) is the tallest.</li><li><b>Loop:</b> Walk down the line. Every time you meet someone taller than your current King (\`if arr[i] > max\`), swap them out (\`max = arr[i]\`).</li></ul>"`
  ]
];

for (let i = 0; i < replacements.length; i++) {
  content = content.replace(replacements[i][0], replacements[i][1]);
}

fs.writeFileSync('d:/works_desktop/lbsmca/questions_prog.js', content, 'utf8');
console.log('Finished updating Array/String questions.');
