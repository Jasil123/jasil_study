const fs = require('fs');
let content = fs.readFileSync('d:/works_desktop/lbsmca/questions_prog.js', 'utf8');

const replacements = [
  [
    `explanation: "strcmp returns 0 when strings are equal."`,
    `explanation: "strcmp returns 0 when strings are equal.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> \`strcmp\` returns $0$ if both strings match exactly.</li><li><b>Execution:</b> Since \`s1\` (\"AB\") and \`s2\` (\"AB\") contain the same characters in the exact same sequence, they are equal.</li></ul>"`
  ],
  [
    `explanation: "Function is modular code block that performs defined operation."`,
    `explanation: "Function is modular code block that performs defined operation.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Functions are the building blocks of C. They break down a large program into smaller, manageable, and reusable pieces.</li><li><b>Purpose:</b> They reduce code duplication. If you need to do something 10 times, you write one function and call it 10 times.</li></ul>"`
  ],
  [
    `explanation: "Function declaration (prototype) tells compiler about function before definition."`,
    `explanation: "Function declaration (prototype) tells compiler about function before definition.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> C compilers read a file from top to bottom. If you call a function before the compiler has seen it, it throws a fit.</li><li><b>Purpose:</b> A prototype acts as a \"promise\" to the compiler: \"Hey, this function exists later in the file, and here is what its inputs and outputs look like.\"</li></ul>"`
  ],
  [
    `explanation: "Function definition contains actual code that function executes."`,
    `explanation: "Function definition contains actual code that function executes.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Unlike a declaration which is just the header ending in a semicolon, the definition includes the curly braces \`{}\` and all the logic inside.</li><li><b>Analogy:</b> A declaration is the title of a chapter; the definition is the actual text of the chapter.</li></ul>"`
  ],
  [
    `explanation: "Function syntax: return_type name(params) { body };"`,
    `explanation: "Function syntax: return_type name(params) { body };<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Every function must declare what math type it spits out (\`return_type\`), its identifier (\`name\`), and what inputs it requires inside the parentheses.</li><li><b>Example:</b> \`int add(int a, int b) { return a + b; }\`</li></ul>"`
  ],
  [
    `explanation: "Return type specifies what data function returns (int, void, float, etc.)."`,
    `explanation: "Return type specifies what data function returns (int, void, float, etc.).<br><br><b>Key Points:</b><ul><li><b>Theory:</b> It is a strict contract. If a function says it returns an \`int\`, it MUST end with \`return <integer_value>;\`.</li><li><b>Compilation:</b> Returning the wrong data type (like a string when an integer was promised) will cause compiler warnings or errors.</li></ul>"`
  ],
  [
    `explanation: "void means function performs action but returns no value."`,
    `explanation: "void means function performs action but returns no value.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> The keyword \`void\` literally means \"empty\".</li><li><b>Usage:</b> It is used for functions that just 'do stuff' (like printing text to the screen or modifying global state) but don't need to hand a mathematical result back to the caller.</li></ul>"`
  ],
  [
    `explanation: "Parameter (formal parameter) is variable in function definition."`,
    `explanation: "Parameter (formal parameter) is variable in function definition.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Parameters act as blank placeholders (empty buckets) created when the function is defined.</li><li><b>Scope:</b> They are strictly local variables that only exist while the function is actively running.</li></ul>"`
  ],
  [
    `explanation: "Argument (actual parameter) is value passed during function call."`,
    `explanation: "Argument (actual parameter) is value passed during function call.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Arguments are the actual, concrete data values (the water filling the buckets) you pass into the function when you invoke it.</li><li><b>Analogy:</b> In \`y = f(x)\`, $x$ is the parameter variable. If you do \`f(5)\`, $5$ is the actual argument.</li></ul>"`
  ],
  [
    `explanation: "Call by value passes copy; changes to parameter don't affect original."`,
    `explanation: "Call by value passes copy; changes to parameter don't affect original.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> The default way C passes arguments. It creates a complete xerox copy of the variable's value and hands the copy to the function.</li><li><b>Safety:</b> The function can modify its copy all it wants, but the original variable back in \`main()\` remains completely untouched and safe.</li></ul>"`
  ],
  [
    `explanation: "Call by reference passes pointer; function can modify original variable."`,
    `explanation: "Call by reference passes pointer; function can modify original variable.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Instead of passing the data itself, you pass the memory address (the house key) of where the data lives using pointers.</li><li><b>Danger/Power:</b> Because the function has the actual address, any changes it makes will permanently alter the original variable in memory.</li></ul>"`
  ],
  [
    `explanation: "Call by reference uses pointer (*) to receive address."`,
    `explanation: "Call by reference uses pointer (*) to receive address.<br><br><b>Key Points:</b><ul><li><b>Syntax:</b> The caller must pass the address using the address-of operator: \`func(&variable)\`.</li><li><b>Receiver:</b> The function must declare a pointer to catch that address: \`void func(int *p)\`.</li></ul>"`
  ],
  [
    `explanation: "Recursion is function calling itself directly or indirectly."`,
    `explanation: "Recursion is function calling itself directly or indirectly.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> It's a method of solving problems where the solution depends on solutions to smaller instances of the exact same problem.</li><li><b>Analogy:</b> Like nesting dolls. The outer doll opens to reveal a smaller doll, which opens to reveal an even smaller doll.</li></ul>"`
  ],
  [
    `explanation: "Base case prevents infinite recursion by providing termination condition."`,
    `explanation: "Base case prevents infinite recursion by providing termination condition.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Every recursive function MUST have an \"escape hatch\". This is an \`if\` statement that tells the function to stop calling itself and finally return a concrete value.</li><li><b>Consequence:</b> Without a base case, the function will call itself forever until the computer runs out of memory (Stack Overflow).</li></ul>"`
  ],
  [
    `explanation: "Recursive case makes function call itself with changed arguments toward base case."`,
    `explanation: "Recursive case makes function call itself with changed arguments toward base case.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> This is the part of the function where the actual self-call happens.</li><li><b>Rule:</b> The arguments passed into the self-call MUST step closer to the base case every single time (e.g., if finding $N!$, the recursive call must be for $N-1$).</li></ul>"`
  ],
  [
    `explanation: "Factorial recursion: fact(n) = n * fact(n-1), base case n<=1 returns 1."`,
    `explanation: "Factorial recursion: fact(n) = n * fact(n-1), base case n<=1 returns 1.<br><br><b>Key Points:</b><ul><li><b>Math:</b> $5! = 5 \\times 4!$. And $4! = 4 \\times 3!$. This perfectly translates to recursion.</li><li><b>Implementation:</b> \`return n * factorial(n - 1);\` exactly models the mathematical definition.</li></ul>"`
  ],
  [
    `explanation: "factorial(5) = 5*4*3*2*1 = 120."`,
    `explanation: "factorial(5) = 5*4*3*2*1 = 120.<br><br><b>Key Points:</b><ul><li><b>Execution Trace:</b> \`fact(5)\` waits for \`fact(4)\`. \`fact(4)\` waits for \`fact(3)\`. This continues down to \`fact(1)\`.</li><li><b>Unwinding:</b> \`fact(1)\` returns $1$. Then \`fact(2)\` is $2 \\times 1 = 2$. Then \`fact(3)\` is $3 \\times 2 = 6$. The calls evaluate backwards sequentially up the chain.</li></ul>"`
  ],
  [
    `explanation: "Fibonacci: fib(n) = fib(n-1) + fib(n-2), base case n<=1 returns n."`,
    `explanation: "Fibonacci: fib(n) = fib(n-1) + fib(n-2), base case n<=1 returns n.<br><br><b>Key Points:</b><ul><li><b>Math:</b> In the Fibonacci sequence, any number is the sum of the two preceding ones.</li><li><b>Implementation:</b> \`return fib(n-1) + fib(n-2);\` models this directly. The base cases are $f(0)=0$ and $f(1)=1$.</li></ul>"`
  ],
  [
    `explanation: "Storage class determines where and how long variable exists (auto, static, extern, register)."`,
    `explanation: "Storage class determines where and how long variable exists (auto, static, extern, register).<br><br><b>Key Points:</b><ul><li><b>Theory:</b> A variable is more than just a type (like \`int\`). It has a 'Lifetime' (when it is destroyed) and a 'Scope' (who can read it).</li><li><b>Control:</b> Storage classes give the programmer precise control over these memory management laws.</li></ul>"`
  ],
  [
    `explanation: "auto is default for local variables; exists within function scope."`,
    `explanation: "auto is default for local variables; exists within function scope.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Whenever you type \`int x = 5;\` inside a function, the compiler secretly treats it as \`auto int x = 5;\`.</li><li><b>Lifecycle:</b> It is automatically created when the function starts and automatically destroyed the millisecond the function ends.</li></ul>"`
  ],
  [
    `explanation: "static variable persists across function calls; initialized once."`,
    `explanation: "static variable persists across function calls; initialized once.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> A static variable remembers its value.</li><li><b>Mechanics:</b> If a function has a static variable counting up off $0$, it will be $1$ on the first call, $2$ on the second call, and so on. It is NOT reset back to $0$ every time the function runs.</li></ul>"`
  ],
  [
    `explanation: "extern declares variable defined elsewhere; allows access across files."`,
    `explanation: "extern declares variable defined elsewhere; allows access across files.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Used heavily in multi-file projects.</li><li><b>Purpose:</b> It tells the current file, \"Don't allocate memory for this variable. I promise it already exists in another file somewhere, just link it up.\"</li></ul>"`
  ],
  [
    `explanation: "register requests fast access by storing in CPU register (compiler decides)."`,
    `explanation: "register requests fast access by storing in CPU register (compiler decides).<br><br><b>Key Points:</b><ul><li><b>Theory:</b> RAM is slow compared to the CPU. A CPU register is the absolute fastest memory available on the computer.</li><li><b>Caveat:</b> It is only a request, not an order. Modern compilers generally ignore it because their built-in optimization algorithms are smarter than human guesses.</li></ul>"`
  ],
  [
    `explanation: "Scope defines where variable is visible and usable."`,
    `explanation: "Scope defines where variable is visible and usable.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Scope is the \"visibility domain\" of a variable.</li><li><b>Boundaries:</b> In C, scope is largely dictated by curly braces \`{}\`. A variable born inside a set of braces cannot be seen by the code outside of those braces.</li></ul>"`
  ],
  [
    `explanation: "Local variable exists only within function block where declared."`,
    `explanation: "Local variable exists only within function block where declared.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> It is private to the function.</li><li><b>Advantage:</b> This is why you can safely use the variable name \`i\` in five different functions at the same time; they are distinct, isolated variables with no knowledge of each other.</li></ul>"`
  ],
  [
    `explanation: "Global variable declared outside functions; accessible from any function."`,
    `explanation: "Global variable declared outside functions; accessible from any function.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Placed at the very top of the file, above \`main()\`.</li><li><b>Warning:</b> Generally frowned upon in modern software engineering because any random function in the program can alter it, making bugs incredibly hard to track down.</li></ul>"`
  ],
  [
    `explanation: "Prototype declares function before main(); tells compiler about signature."`,
    `explanation: "Prototype declares function before main(); tells compiler about signature.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> By placing prototypes at the top of the file, you are then free to organize your actual function definitions below \`main()\` in any arbitrary order you please.</li></ul>"`
  ]
];

for (let i = 0; i < replacements.length; i++) {
  content = content.replace(replacements[i][0], replacements[i][1]);
}

fs.writeFileSync('d:/works_desktop/lbsmca/questions_prog.js', content, 'utf8');
console.log('Finished updating Functions/Recursion questions.');
