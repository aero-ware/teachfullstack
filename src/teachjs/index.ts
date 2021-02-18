import AeroClient, { AeroEmbed } from "@aeroware/aeroclient";
import { Message } from "discord.js";
import users from "../database/user";
import { Lesson } from "../types";

export default function teachJS() {
    return new AeroClient({
        token: process.env.JS_TOKEN,
        prefix: "",
        loggerHeader: "TeachJS",
        async customHandler(message) {
            const user = await users.findById(message.author.id);
            if (/^<@!?811775862365749258>$/.test(message.content) && user) {
                const index = user.js;

                try {
                    const lesson: Lesson = (await import(`./lessons/${index}.ts`)).default;

                    await message.channel.send(
                        new AeroEmbed()
                            .setTitle(lesson.title)
                            .setDescription(lesson.content)
                            .setColor("RANDOM")
                            .setAuthor(
                                message.author.username,
                                message.author.avatarURL() || message.author.defaultAvatarURL
                            )
                    );

                    const collector = message.channel.createMessageCollector(
                        (msg: Message) => msg.author.id === message.author.id
                    );

                    collector.on("collect", async (msg) => {
                        if (!/^```js.+```$/s.test(msg)) return;

                        const code = msg.content.match(/^```js\n(.+)\n```$/s)![1];

                        if (lesson.regex.test(code)) {
                            user.js++;
                            await user.save();
                            return message.channel.send(`Correct! Move on to the next lesson!`);
                        }

                        console.log(code);

                        return;
                    });
                } catch {
                    return message.channel.send(
                        `There are no more lessons as of right now. Check back soon!`
                    );
                }
            }

            return;
        },
    });
}
