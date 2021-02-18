import Lesson from "../../lesson";

export default {
    title: "Giving variables values",
    content: `
Now that you have your variable, let's give it a value.

To assign a variable a value, use an equal sign.

Your variable should be on the left, and the value on the right:
\`\`\`js
let variableName;

variableName = 0;
\`\`\`

Here we have assigned it to 0, but you can assign it to whatever number you want.

Now it's your turn to try.

Don't forget the semicolon!`,
    regex: /let\s+(\w+)(\s*;)?\n*\1\s+=\s+\d+(\.d+)?(\s*;)?/,
    author: "508442553754845184",
} as Lesson;
