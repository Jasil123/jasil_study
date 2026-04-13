const fs = require('fs');
let content = fs.readFileSync('d:/works_desktop/lbsmca/questions_prog.js', 'utf8');

const replacements = [
  [
    `explanation: "Linear search checks each element until match found or end reached."`,
    `explanation: "Linear search checks each element until match found or end reached.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> The most basic way to find something. You start at the beginning of the line and ask every single person, \"Are you the one I'm looking for?\"</li><li><b>Use-case:</b> It is the ONLY way to search through an array that is completely unorganized/unsorted.</li></ul>"`
  ],
  [
    `explanation: "Linear search: iterate and compare each element with key."`,
    `explanation: "Linear search: iterate and compare each element with key.<br><br><b>Key Points:</b><ul><li><b>Algorithm Structure:</b><br>\`for (int i = 0; i < n; i++) {\`<br>&nbsp;&nbsp;&nbsp;&nbsp;\`if (arr[i] == target) return i;\`<br>\`}\`<br>\`return -1;\`</li></ul>"`
  ],
  [
    `explanation: "Linear search worst case compares all n elements: O(n)."`,
    `explanation: "Linear search worst case compares all n elements: O(n).<br><br><b>Key Points:</b><ul><li><b>Time Complexity:</b> Big-O Notation describes the worst-case scenario.</li><li><b>Meaning:</b> If there are $N$ items in the array, in the absolute worst case (the item is at the very end, or not there at all), you will have to make exactly $N$ checks. Hence, $O(n)$.</li></ul>"`
  ],
  [
    `explanation: "Binary search requires sorted array; eliminates half remaining elements."`,
    `explanation: "Binary search requires sorted array; eliminates half remaining elements.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Think of searching for a word in a physical dictionary. You don't read page 1, then page 2. You open to the exact middle.</li><li><b>Mechanics:</b> If the word you want comes alphabetically *before* the middle page, you instantly rip the back half of the dictionary off and throw it away, slashing your workload in half.</li></ul>"`
  ],
  [
    `explanation: "Binary search only works on sorted array."`,
    `explanation: "Binary search only works on sorted array.<br><br><b>Key Points:</b><ul><li><b>Crucial Prerequisite:</b> The algorithm inherently relies on the data being ordered (e.g., $1, 5, 9, 15, 20$).</li><li><b>Reasoning:</b> If the array is random, looking at the middle element tells you absolutely nothing about whether your target is to the left or to the right.</li></ul>"`
  ],
  [
    `explanation: "Binary search compares key with middle, eliminates half based on comparison."`,
    `explanation: "Binary search compares key with middle, eliminates half based on comparison.<br><br><b>Key Points:</b><ul><li><b>Step 1:</b> Find \`mid = (low + high) / 2\`.</li><li><b>Step 2:</b> If \`target == arr[mid]\`, you win!</li><li><b>Step 3:</b> If \`target < arr[mid]\`, adjust your boundary to only look at the left side (\`high = mid - 1\`). Otherwise, look right.</li></ul>"`
  ],
  [
    `explanation: "Binary search divides search space by 2 each step: O(log n)."`,
    `explanation: "Binary search divides search space by 2 each step: O(log n).<br><br><b>Key Points:</b><ul><li><b>Math:</b> How many times can you divide a number $N$ in half until you reach $1$? The mathematical answer is $\\log_2(N)$.</li><li><b>Power:</b> If you have $1,000,000$ items, a Linear Search might take $1,000,000$ checks. A Binary Search will find the answer in a maximum of just $20$ checks!</li></ul>"`
  ],
  [
    `explanation: "Bubble sort: compare adjacent pairs, swap if out of order, repeat."`,
    `explanation: "Bubble sort: compare adjacent pairs, swap if out of order, repeat.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> The simplest sorting algorithm. Heavy elements slowly \"sink\" to the bottom of the array, while light elements \"bubble\" up to the top.</li><li><b>Mechanics:</b> It looks at index $0$ and $1$. If $0$ is bigger, they swap. Then it looks at $1$ and $2$. If $1$ is bigger, they swap. And so on.</li></ul>"`
  ],
  [
    `explanation: "Bubble sort algorithm: nested loops comparing and swapping adjacent elements."`,
    `explanation: "Bubble sort algorithm: nested loops comparing and swapping adjacent elements.<br><br><b>Key Points:</b><ul><li><b>Structure:</b> Requires two loops.</li><li><b>Outer Loop:</b> Keeps track of how many passes to make (Total items - 1).</li><li><b>Inner Loop:</b> Does the actual element-by-element adjacent comparing and swapping for the current pass.</li></ul>"`
  ],
  [
    `explanation: "Bubble sort: nested loops each running n times = O(n^2)."`,
    `explanation: "Bubble sort: nested loops each running n times = O(n^2).<br><br><b>Key Points:</b><ul><li><b>Time Complexity:</b> Because there is a loop of size $N$ sitting *inside* another loop of size $N$, the operations multiply.</li><li><b>Meaning:</b> If you have to sort $10$ items, it takes roughly $100$ steps. If you sort $1000$ items, it takes $1,000,000$ steps. It is very slow for large datasets.</li></ul>"`
  ],
  [
    `explanation: "Selection sort: find minimum, place at position, repeat for remaining."`,
    `explanation: "Selection sort: find minimum, place at position, repeat for remaining.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> It scans the entire unsorted list to find the absolute smallest number, and forcefully swaps it into the 1st position.</li><li><b>Progression:</b> Next, it scans everything from the 2nd position onward, finds the smallest, and puts it in the 2nd position. Repeat.</li></ul>"`
  ],
  [
    `explanation: "Selection sort: select minimum element for each position iteratively."`,
    `explanation: "Selection sort: select minimum element for each position iteratively.<br><br><b>Key Points:</b><ul><li><b>Visual:</b> The array is logically split into two parts: a sorted left side, and an unsorted right side.</li><li><b>Action:</b> In each pass, it selects the minimum from the right side and appends it to the boundary of the left side.</li></ul>"`
  ],
  [
    `explanation: "Selection sort: nested loops finding minimum = O(n^2)."`,
    `explanation: "Selection sort: nested loops finding minimum = O(n^2).<br><br><b>Key Points:</b><ul><li><b>Performance:</b> Like Bubble Sort, it requires an outer loop to track the current insertion slot and an inner loop to scan the rest of the array for the minimum.</li><li><b>Result:</b> $N \\times N$ meaning $O(n^2)$ time complexity.</li></ul>"`
  ],
  [
    `explanation: "Insertion sort: take element, insert in correct position in sorted part."`,
    `explanation: "Insertion sort: take element, insert in correct position in sorted part.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> This is exactly how most humans sort a hand of playing cards.</li><li><b>Mechanics:</b> You pick up the second card, compare it to the first, and place it correctly. Pick up the third card, slide it back into its correct spot among the first two.</li></ul>"`
  ],
  [
    `explanation: "Insertion sort: build sorted array by inserting elements at right position."`,
    `explanation: "Insertion sort: build sorted array by inserting elements at right position.<br><br><b>Key Points:</b><ul><li><b>Process:</b> The algorithm takes the current element, temporarily stores it, and then shifts all larger elements to the right to make a hole for the current element to drop into.</li></ul>"`
  ],
  [
    `explanation: "Insertion sort worst case O(n^2), best case O(n)."`,
    `explanation: "Insertion sort worst case O(n^2), best case O(n).<br><br><b>Key Points:</b><ul><li><b>Worst Case:</b> $O(n^2)$. If the array is backward (e.g., $9, 8, 7$), every card has to slide all the way to the front.</li><li><b>Best Case:</b> $O(n)$. If the array is already perfectly sorted, it just looks at each card once, sees it's fine, and does zero sliding.</li></ul>"`
  ],
  [
    `explanation: "Merge sort: divide into halves recursively, then merge sorted parts."`,
    `explanation: "Merge sort: divide into halves recursively, then merge sorted parts.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> A classic \"Divide and Conquer\" algorithm.</li><li><b>Phase 1 (Divide):</b> It chops the array in half, then chops those halves in half, until every single array has only 1 element.</li><li><b>Phase 2 (Conquer):</b> It stitches (merges) those tiny 1-element arrays back together in sorted order.</li></ul>"`
  ],
  [
    `explanation: "Merge sort: divide (log n) and merge (n) = O(n log n)."`,
    `explanation: "Merge sort: divide (log n) and merge (n) = O(n log n).<br><br><b>Key Points:</b><ul><li><b>Performance:</b> The chopping phase takes $\\log_2 N$ steps. The merging phase touches every element taking $N$ steps.</li><li><b>Result:</b> $O(n \\log n)$. This is mathematically the fastest possible guaranteed worst-case speed for comparative sorting.</li></ul>"`
  ],
  [
    `explanation: "Quick sort: pick pivot, partition around it, recursively sort."`,
    `explanation: "Quick sort: pick pivot, partition around it, recursively sort.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Another \"Divide and Conquer\" titan.</li><li><b>Mechanics:</b> You pick one random number as the 'Pivot'. You throw all numbers smaller than the pivot to its left side, and all larger numbers to its right side. Then, you repeat the process on the left and right groups.</li></ul>"`
  ],
  [
    `explanation: "Quick sort average O(n log n), worst case O(n^2) with poor pivot."`,
    `explanation: "Quick sort average O(n log n), worst case O(n^2) with poor pivot.<br><br><b>Key Points:</b><ul><li><b>Speed:</b> In the real world, this is usually the fastest sorting algorithm, hitting $O(n \\log n)$.</li><li><b>The Flaw:</b> If you consistently pick terrible pivots (like picking the biggest number every single time on an already sorted array), its performance collapses to $O(n^2)$.</li></ul>"`
  ],
  [
    `explanation: "O(1): operation takes same time regardless of input size."`,
    `explanation: "O(1): operation takes same time regardless of input size.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Known as \"Constant Time\".</li><li><b>Analogy:</b> Finding out if the first person in line has a red shirt. It doesn't matter if the line has 10 people or 10 billion people; looking at the first person takes the exact same split-second.</li></ul>"`
  ],
  [
    `explanation: "O(n): time grows linearly with input size."`,
    `explanation: "O(n): time grows linearly with input size.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Known as \"Linear Time\".</li><li><b>Analogy:</b> Reading a book. If reading a 100-page book takes 1 hour, reading a 200-page book will logically take 2 hours. The time scales perfectly with the size of the data.</li></ul>"`
  ],
  [
    `explanation: "O(log n): time grows logarithmically, like binary search."`,
    `explanation: "O(log n): time grows logarithmically, like binary search.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Known as \"Logarithmic Time\". Extremely fast.</li><li><b>Analogy:</b> Looking up a word in the dictionary. You slash the problem in half every step. Data sizes can explode into the trillions, but the time to solve only increases by a few steps.</li></ul>"`
  ],
  [
    `explanation: "O(n^2): time grows quadratically with input size, like bubble sort."`,
    `explanation: "O(n^2): time grows quadratically with input size, like bubble sort.<br><br><b>Key Points:</b><ul><li><b>Theory:</b> Known as \"Quadratic Time\". Generally bad for large data.</li><li><b>Analogy:</b> If you have 10 friends, and every friend must physically shake hands with every other friend, that's $10 \\times 10 = 100$ handshakes.</li></ul>"`
  ]
];

for (let i = 0; i < replacements.length; i++) {
  content = content.replace(replacements[i][0], replacements[i][1]);
}

fs.writeFileSync('d:/works_desktop/lbsmca/questions_prog.js', content, 'utf8');
console.log('Finished updating Searching/Sorting questions.');
