const fs = require('fs');
let content = fs.readFileSync('d:/works_desktop/lbsmca/questions_prog.js', 'utf8');

const replacements = [
  [
    `explanation: "break exits switch statement; without break, execution continues to next case (fall-through)."`,
    `explanation: "break exits switch statement; without break, execution continues to next case (fall-through).<br><br><b>Key Points:</b><ul><li><b>Theory:</b> The \`break\` keyword forcefully ejects the control flow out of the nearest enclosing switch block (or loop).</li><li><b>Fall-through:</b> If omitted, the program won't stop checking cases. It will blindly execute every single line of code in the subsequent cases below it until it hits the end or another \`break\`.</li></ul>"`
  ],
  [
    `explanation: "default case executes when none of the case values match the expression."`,
    `explanation: "default case executes when none of the case values match the expression.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> It acts identically to the final \`else\` in an \`if-else\` ladder.</li><li><b>Placement:</b> By convention, it is placed at the very bottom of the \`switch\` block, though technically C allows it anywhere.</li><li><b>Safety:</b> Always include a \`default\` case to catch unexpected input errors.</li></ul>"`
  ],
  [
    `explanation: "for loop has initialization, condition, and increment separated by semicolons."`,
    `explanation: "for loop has initialization, condition, and increment separated by semicolons.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> It packs all three essential loop control elements onto a single line.</li><li><b>Syntax:</b> \`for (initialization; condition_check; update_step)\`</li><li><b>Flexibility:</b> Any or all of the three sections can technically be left blank (e.g., \`for(;;)\` creates an infinite loop).</li></ul>"`
  ],
  [
    `explanation: "for loop repeats code block for specified number of iterations."`,
    `explanation: "for loop repeats code block for specified number of iterations.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Because the initialization and the limit are defined upfront, it is considered a 'definite' or 'determinate' loop.</li><li><b>Usage:</b> The absolute best choice when iterating over arrays or collections where the exact length is already known.</li></ul>"`
  ],
  [
    `explanation: "Loop runs with i=1,2,3, printing each value."`,
    `explanation: "Loop runs with i=1,2,3, printing each value.<br><br><b>Key Points:</b><ul><li><b>Execution Trace:</b><br>Step 1: \`i=1\`. \`1<=3\` is True. Prints \"1\". \`i\` becomes 2.<br>Step 2: \`i=2\`. \`2<=3\` is True. Prints \"2\". \`i\` becomes 3.<br>Step 3: \`i=3\`. \`3<=3\` is True. Prints \"3\". \`i\` becomes 4.<br>Step 4: \`i=4\`. \`4<=3\` is False. Loop terminates.</li><li><b>Output:</b> \"123\" with no spaces.</li></ul>"`
  ],
  [
    `explanation: "while loop repeats as long as condition is true."`,
    `explanation: "while loop repeats as long as condition is true.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> An 'indefinite' or 'pre-test' loop. It is used when you don't know exactly how many times the loop needs to run in advance.</li><li><b>Condition:</b> The condition is evaluated *before* the first pass. If it is initially false, the loop body equates to dead code and runs zero times.</li></ul>"`
  ],
  [
    `explanation: "while loop checks condition first; if true, executes body; repeats."`,
    `explanation: "while loop checks condition first; if true, executes body; repeats.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Control flow enters the \`while\` statement. If the boolean expression evaluates to non-zero (true), control moves into the block.</li><li><b>Responsibility:</b> Unlike a \`for\` loop, the programmer is entirely responsible for manually updating the control variable inside the loop body to prevent an infinite loop.</li></ul>"`
  ],
  [
    `explanation: "while loop executes with i=1,2,3, then stops when i=4."`,
    `explanation: "while loop executes with i=1,2,3, then stops when i=4.<br><br><b>Key Points:</b><ul><li><b>Execution Trace:</b> \`i\` starts at 1. The \`printf\` outputs the number, and then \`i++\` bumps it up by 1.</li><li><b>Boundary logic:</b> It prints 1, then 2, then 3. When \`i\` becomes 4, the test \`4 <= 3\` fails, and the loop breaks instantly.</li><li><b>Output:</b> \"123\".</li></ul>"`
  ],
  [
    `explanation: "do-while executes body first, then checks condition."`,
    `explanation: "do-while executes body first, then checks condition.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> A 'post-test' loop. The block of code is executed blindly the first time before any condition is evaluated.</li><li><b>Syntax warning:</b> It is the only loop in C that requires a terminating semicolon at the very end: \`} while(condition);\`.</li></ul>"`
  ],
  [
    `explanation: "do-while guarantees one execution even if condition is false initially."`,
    `explanation: "do-while guarantees one execution even if condition is false initially.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Because the boolean check sits at the bottom of the structure, there is no way for the compiler to prevent the first pass.</li><li><b>Use-case:</b> Incredibly useful for giving a user a \"Menu\" to select from. You always want to print the menu at least once before asking if they want to exit.</li></ul>"`
  ],
  [
    `explanation: "do-while body executes once (prints 1) then condition i<=0 is false, loop stops."`,
    `explanation: "do-while body executes once (prints 1) then condition i<=0 is false, loop stops.<br><br><b>Key Points:</b><ul><li><b>Execution Trace:</b> \`i\` starts at 1. The \`do\` block forces an immediate execution, so \"1\" is printed, and \`i\` increments to 2.</li><li><b>The Check:</b> Only now does the program ask: is \`2 <= 0\`? False. The loop immediately terminates.</li><li><b>Output:</b> \"1\".</li></ul>"`
  ],
  [
    `explanation: "Nested loop has one loop inside another, executing multiple iterations."`,
    `explanation: "Nested loop has one loop inside another, executing multiple iterations.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> For every single iteration of the outer loop, the entirely inner loop must run from start to finish.</li><li><b>Math:</b> If the outer loop runs 5 times, and the inner loop runs 5 times, the code inside the innermost block executes $5 \\times 5 = 25$ times total.</li><li><b>Usage:</b> Necessary for processing multi-dimensional data like 2D arrays or image pixels (x, y axes).</li></ul>"`
  ],
  [
    `explanation: "break immediately terminates the current loop or switch block."`,
    `explanation: "break immediately terminates the current loop or switch block.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> The \`break\` statement causes an immediate exit from the innermost closing \`switch\`, \`while\`, \`do-while\`, or \`for\` structure.</li><li><b>Scope:</b> If you have nested loops, a break inside the inner loop will only break the inner loop. The outer loop will continue.</li></ul>"`
  ],
  [
    `explanation: "continue skips remaining statements in current iteration, goes to next iteration."`,
    `explanation: "continue skips remaining statements in current iteration, goes to next iteration.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Unlike \`break\` (which destroys the loop entirely), \`continue\` acts like a \"skip turn\" card.</li><li><b>Mechanics:</b> It immediately jumps control flow back to the top of the loop to evaluate the condition for the next iteration, ignoring any code sitting below it.</li></ul>"`
  ],
  [
    `explanation: "When i=3, continue skips printf, so 3 is not printed."`,
    `explanation: "When i=3, continue skips printf, so 3 is not printed.<br><br><b>Key Points:</b><ul><li><b>Execution Trace:</b> Loop iterates 1 to 5. When \`i\` is 1, 2, 4, and 5, the \`if(i==3)\` is false, so it prints the number normally.</li><li><b>The Skip:</b> When \`i=3\`, the condition is true. \`continue\` triggers, which aborts the current run and skips the \`printf\` statement at the bottom.</li><li><b>Output:</b> \"1245\".</li></ul>"`
  ]
];

for (let i = 0; i < replacements.length; i++) {
  content = content.replace(replacements[i][0], replacements[i][1]);
}

fs.writeFileSync('d:/works_desktop/lbsmca/questions_prog.js', content, 'utf8');
console.log('Finished updating 15 control structure questions.');
