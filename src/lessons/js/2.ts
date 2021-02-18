import Lesson from "../../lesson";

export default {
    title: "Variable initialization",
    content: `
It's rather slow and inefficient to make a variable and *then* give it a value.

Say, why don't we do both at once?

Well of course we can do that, like so:
\`\`\`js
let variableName = 1;
\`\`\`

We'll **initialize** \`variableName\` to a value of 1, but after that we can change it as before:
\`\`\`js
variableName = 2;
\`\`\`

How about you give it a shot?`,
    regex: /let\s+(\w+)\s+=\s+\d+(\.d+)?(\s*;)?/,
    author: "508442553754845184",
} as Lesson;
