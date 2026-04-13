const fs = require('fs');
let content = fs.readFileSync('d:/works_desktop/lbsmca/questions_prog.js', 'utf8');

const replacements = [
  [
    `explanation: "Iteration represents looping/repeating a set of operations."`,
    `explanation: "Iteration represents looping/repeating a set of operations.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Executing the same block of logic multiple times until a certain condition is met.</li><li><b>Flowchart Layout:</b> Drawn using a decision diamond where one of the exit arrows eventually loops backwards up the page, re-entering the flow above the diamond.</li></ul>"`
  ],
  [
    `explanation: "After START symbol, typically comes input or first process."`,
    `explanation: "After START symbol, typically comes input or first process.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> You cannot perform logic without data. An algorithm starts by either initializing baseline variables (Rectangle) or requesting data from the user/system (Parallelogram).</li><li><b>Structure:</b> A flowchart ALWAYS begins with a single START oval, which has exactly one outgoing arrow and zero incoming arrows.</li></ul>"`
  ],
  [
    `explanation: "END is represented by oval/terminal symbol, similar to START."`,
    `explanation: "END is represented by oval/terminal symbol, similar to START.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> The oval shape is universally called the 'Terminal' symbol. It designates absolute boundaries.</li><li><b>Rules:</b> An END or STOP symbol must have at least one incoming flowline, but absolutely zero outgoing flowlines. An algorithm stops dead when this is reached.</li></ul>"`
  ],
  [
    `explanation: "IF-ELSE is shown as diamond with condition and two paths for true/false cases."`,
    `explanation: "IF-ELSE is shown as diamond with condition and two paths for true/false cases.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> A single diamond sits at the fork. The True path leads to one set of operations (Statement 1), and the False path leads to another (Statement 2).</li><li><b>Re-convergence:</b> In structured programming, both of these distinct paths must eventually merge back together into a single flowline to continue the program.</li></ul>"`
  ],
  [
    `explanation: "WHILE loop shows diamond (condition) with a path looping back if true."`,
    `explanation: "WHILE loop shows diamond (condition) with a path looping back if true.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> It's a pre-test loop. The control flow hits the diamond *first*.</li><li><b>True Path:</b> Operations execute, then an arrow draws explicitly UPWARD to re-enter the flow exactly *before* the diamond.</li><li><b>False Path:</b> Exits the loop entirely and continues downward.</li></ul>"`
  ],
  [
    `explanation: "FOR loop uses diamond for condition check with increment step in loop."`,
    `explanation: "FOR loop uses diamond for condition check with increment step in loop.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Flowcharts don't have a specific 'FOR' shape. They construct it using basic blocks.</li><li><b>Construction:</b> 1) A rectangle initializes the counter. 2) A diamond tests the limit. 3) A rectangle at the bottom of the loop body increments the counter before the arrow loops back up.</li></ul>"`
  ],
  [
    `explanation: "Structured flowchart avoids goto and uses only three basic control structures."`,
    `explanation: "Structured flowchart avoids goto and uses only three basic control structures.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Spaghetti code is created when flowlines cross each other wildly. Structured charts strictly adhere to Sequence, Selection, and Iteration.</li><li><b>Readability:</b> Any complex algorithm can be legally drawn using only those three fundamental patterns without arbitrary jumping.</li></ul>"`
  ],
  [
    `explanation: "Process rectangle has one entry and one exit point."`,
    `explanation: "Process rectangle has one entry and one exit point.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> A process is deterministic and linear. It receives control, performs arithmetic or assignment, and immediately passes control to the next step.</li><li><b>Contrast:</b> Only decision diamonds (and terminal nodes) deviate from the strict 1-in/1-out rule of standard flowchart symbols.</li></ul>"`
  ],
  [
    `explanation: "Decision diamond can have multiple exit paths (usually 2 for binary decision)."`,
    `explanation: "Decision diamond can have multiple exit paths (usually 2 for binary decision).<br><br><b>Key Points:</b><ul><li><b>Theory:</b> A standard boolean IF statement requires exactly 2 exits (True/False).</li><li><b>Switch/Case:</b> For multiple discrete choices (e.g., evaluating a user's menu selection of 1, 2, or 3), a single diamond can conceptually have multiple labeled exits, simulating a \`switch\` statement.</li></ul>"`
  ],
  [
    `explanation: "Arrows from diamond are labeled T (True) or F (False) or condition results."`,
    `explanation: "Arrows from diamond are labeled T (True) or F (False) or condition results.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> An unlabeled branch from a decision node is a critical logic error in diagramming.</li><li><b>Terminology:</b> Labels can be Boolean (True/False), binary (1/0), or explicit answers to the condition's question (Yes/No).</li></ul>"`
  ]
];

for (let i = 0; i < replacements.length; i++) {
  content = content.replace(replacements[i][0], replacements[i][1]);
}

fs.writeFileSync('d:/works_desktop/lbsmca/questions_prog.js', content, 'utf8');
console.log('Script finished. Replaced 10 flowcharts items.');
