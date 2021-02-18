import AeroClient, { AeroEmbed } from "@aeroware/aeroclient";
import { Message } from "discord.js";
import correct from "./data/correct";
import incorrect from "./data/incorrect";
import users from "./database/user";
import Lesson from "./lesson";

export default function teach(client: AeroClient, token: string, id: string, name: string, language: string) {
    const ping = new RegExp(`^<@!?${id}>$`);
    const codeblock = new RegExp(`^\`\`\`${language}.+\`\`\`$`, "s");
    const raw = new RegExp(`^\`\`\`${language}\n(.+)\n\`\`\`$`, "s");

    return new AeroClient({
        token,
        prefix: "",
        loggerHeader: `Teach${name}`,
        async readyCallback(this: AeroClient) {
            this.logger.success(`Teach${name} is ready!`);

            await this.user?.setActivity({
                type: "WATCHING",
                name: `for mentions | ${language}`,
            });
        },
        async customHandler(message) {
            const user = await users.findById(message.author.id);
            if (ping.test(message.content) && user) {
                //@ts-ignore
                const index = user[name.toLowerCase()];

                try {
                    const lesson: Lesson = (await import(`./lessons/${name.toLowerCase()}/${index}.ts`)).default;

                    try {
                        const author = await client.users.fetch(lesson.author);

                        await message.channel.send(
                            new AeroEmbed()
                                .setTitle(lesson.title)
                                .setDescription(lesson.content)
                                .setColor("RANDOM")
                                .setAuthor(author.username, author.displayAvatarURL() || author.defaultAvatarURL)
                        );

                        const collector = message.channel.createMessageCollector(
                            (msg: Message) => msg.author.id === message.author.id,
                            {
                                time: 600000,
                            }
                        );

                        collector.on("collect", async (msg) => {
                            if (!codeblock.test(msg)) return;

                            const code = msg.content.match(raw)?.[1];

                            if (!code) return message.channel.send(`Watch your formatting!`);

                            if (lesson.regex.test(code)) {
                                //@ts-ignore
                                user[name.toLowerCase()]++;
                                await user.save();

                                collector.stop("correct");

                                return message.channel.send(correct[Math.floor(Math.random() * correct.length)]);
                            } else return message.channel.send(incorrect[Math.floor(Math.random() * incorrect.length)]);
                        });

                        collector.on("end", (_, reason) => {
                            if (reason === "correct") return;
                            return message.channel.send(`Sorry, time's up! Try again.`);
                        });
                    } catch {
                        return message.channel.send(`Sorry, there was an error in preparing the lesson.`);
                    }
                } catch {
                    return message.channel.send(`There are no more lessons as of right now. Check back soon!`);
                }
            }

            return;
        },
    });
}
