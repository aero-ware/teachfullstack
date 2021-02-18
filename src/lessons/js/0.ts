import Lesson from "../../lesson";

export default {
    title: "Declaring variables",
    content: `
In JavaScript, the easiest thing is probably declaring variables.
All you have to do is use a **keyword**, which is basically a special word that means something in JavaScript.

The keyword we will be using first is \`let\`:
\`\`\`js
let variableName;
\`\`\`

Next after \`let\` will be the name of the variable.
In this case, it's \`variableName\`. Notice the semicolon at the end.

Semicolons tell JavaScript that it is the end of a statement.
Even though semicolons are optional, you should always use them to avoid problems later.

Try declaring a variable now!`,
    regex: /let\s+\w+(\s*;)?/,
    author: "508442553754845184",
} as Lesson;
