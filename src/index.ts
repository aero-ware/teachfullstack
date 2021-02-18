import AeroClient from "@aeroware/aeroclient";
import { MessageReaction, User } from "discord.js";
import { config as dotenv } from "dotenv";
import connect from "./database/connect";
import users from "./database/user";
import teachers from "./teachers";

dotenv();

(async () => {
    try {
        await connect();

        const TeachFullstack = new AeroClient({
            token: process.env.TOKEN,
            prefix: "",
            loggerHeader: "TeachFullstack",
            async readyCallback(this: AeroClient) {
                this.logger.success(`TeachFullstack is ready!`);

                await this.user?.setActivity({
                    type: "WATCHING",
                    name: "for mentions",
                });
            },
            async customHandler(message) {
                if (/^<@!?811767238646300693>$/.test(message.content) && !(await users.findById(message.author.id))) {
                    const confirm = await message.channel.send(`Do you wish to register for TeachFullstack?`);

                    await confirm.react("❌");
                    await confirm.react("✅");

                    const choice = (
                        await confirm.awaitReactions(
                            (r: MessageReaction, u: User) => u.id === message.author.id && ["❌", "✅"].includes(r.emoji.name),
                            {
                                max: 1,
                                time: 10000,
                            }
                        )
                    ).first()?.emoji.name;

                    if (!choice) return;

                    if (choice === "❌") {
                        message.channel.send(`Registration canceled.`);
                        return "invalid";
                    }

                    await users.create({
                        _id: message.author.id,
                    });

                    return message.channel.send(`You have registered at TeachFullstack!`);
                }

                return;
            },
        });

        await teachers(TeachFullstack);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
