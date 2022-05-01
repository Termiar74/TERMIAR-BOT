import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ICommand, IParsedArgs, ISimplifiedMessage } from '../../typings'
import { MessageType, Mimetype } from '@adiwajshing/baileys'
import request from '../../lib/request'


export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'help',
            description: 'Displays the help menu or shows the info of the command provided',
            category: 'general',
            usage: `${client.config.prefix}help (command_name)`,
            aliases: ['h','menu','m','bot']
        })
    }

    run = async (M: ISimplifiedMessage, parsedArgs: IParsedArgs): Promise<void> => {
            const n = [
            'https://telegra.ph/file/cc211d2b195ccbef82bff.mp4'
        ]
        let chitoge = n[Math.floor(Math.random() * n.length)]
	if (!parsedArgs.joined) {
			const commands = this.handler.commands.keys();
			const categories: { [key: string]: ICommand[] } = {};
			for (const command of commands) {
				const info = this.handler.commands.get(command);
				if (!command) continue;
				if (!info?.config?.category || info.config.category === "dev") continue;
				if (
					!info?.config?.category ||
					(info.config.category === "nsfw" &&
						!(await this.client.getGroupData(M.from)).nsfw)
				)
					continue;
				if (Object.keys(categories).includes(info.config.category))
					categories[info.config.category].push(info);
				else {
					categories[info.config.category] = [];
					categories[info.config.category].push(info);
				}
			}
            let text = `
╭─「(づ￣ 3￣)づ」
│⋊ 𝐔𝐒𝐄𝐑: *${M.sender.username}*
│⋊ 𝐍𝐀𝐌𝐄: ◥꧁ད𝐓𝐄𝐑𝐌𝐈𝐀𝐑 𝐁𝐎𝐓🎭ཌ꧂◤
│⋊ 𝐏𝐑𝐄𝐅𝐈𝐗: ${this.client.config.prefix}
│⋊ 𝐎𝐖𝐍𝐄𝐑: *${this.client.config.prefix}mod*
│⋊ 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 𝐆𝐑𝐎𝐔𝐏: https://chat.whatsapp.com/Jkw7iPJkjcN4iq1Fe1hwWe
│◥꧁ད𝐓𝐄𝐑𝐌𝐈𝐀𝐑 𝐁𝐎𝐓🎭ཌ꧂◤
│🌟𝐇𝐄𝐘 👋 𝐓𝐇𝐈𝐒 𝐈𝐒 𝐓𝐄𝐑𝐌𝐈𝐀𝐑 𝐁𝐎𝐓 𝟐.𝟎.
│🌟𝐇𝐎𝐖 𝐌𝐀𝐘 𝐈 𝐂𝐀𝐍 𝐇𝐄𝐋𝐏 𝐘𝐎𝐔.
│🌟𝐘𝐎𝐔 𝐂𝐀𝐍 𝐔𝐒𝐄 𝐌𝐄 𝐁𝐘 𝐔𝐒𝐈𝐍𝐆 ${this.client.config.prefix}𝐇𝐄𝐋𝐏.
│🌟𝐀𝐋𝐋𝐀𝐇 𝐃𝐈 𝐑𝐄𝐇𝐄𝐌𝐀𝐓𝐈 𝐁𝐍𝐀𝐈𝐘𝐄 𝐑𝐀𝐊𝐇𝐄 𝐒𝐀𝐁𝐊𝐎 🤲 
│ • 𝐈 𝐇𝐎𝐏𝐄 𝐘𝐎𝐔 𝐀𝐋𝐋 𝐄𝐍𝐉𝐎𝐘𝐈𝐍𝐆 𝐓𝐇𝐈𝐒 𝐁𝐎𝐓
│ • 𝐅𝐎𝐑 𝐀𝐃𝐃𝐈𝐍𝐆 𝐌𝐄 𝐈𝐍 𝐀𝐍𝐘 𝐎𝐓𝐇𝐄𝐑 𝐆𝐑𝐎𝐔𝐏𝐒
│   𝐂𝐎𝐍𝐓𝐀𝐂𝐓 𝐌𝐘 🤴𝐎𝐖𝐍𝐄𝐑 𝐒𝐈𝐑 𝐓𝐄𝐑𝐌𝐈𝐀𝐑🎭
│ • @𝟕𝟎𝟔𝟖𝟏𝟒𝟑𝟎𝟒𝟗 
│ ~ 𝐓𝐞𝐫𝐦𝐢𝐀𝐫 𝐁𝐨𝐭
╰────────────┈平和                            \n\n`
            const keys = Object.keys(categories)
            for (const key of keys)
                text += `*『 ${this.client.util.capitalize(
					key
	         )} 』*\n❐ \`\`\`${categories[key]
                    .map((command) => command.config?.command)
                    .join(', ')}\`\`\`\n\n`
            return void this.client.sendMessage(M.from, { url: chitoge }, MessageType.video, {quoted:M.WAMessage,
            mimetype: Mimetype.gif,
            caption: `${text} 
 ──❅┈[ ◥꧁ད𝐓𝐄𝐑𝐌𝐈𝐀𝐑 𝐁𝐎𝐓ཌ꧂◤ ]┈❅───
┌────────────┈❅
│   🎭 ◥꧁ད𝐓𝐄𝐑𝐌𝐈𝐀𝐑 𝐁𝐎𝐓ཌ꧂◤
│   ©️ 𝟐𝟎𝟐𝟐
└────────────┈⁂
❅┈[𝐇𝐚𝐯𝐞 𝐆𝐫𝐞𝐚𝐭 𝐃𝐚𝐲]┈❅
➨ *Note: Use ${this.client.config.prefix}help <command_name> to view the command info*` }
            )
        }
        const key = parsedArgs.joined.toLowerCase()
        const command = this.handler.commands.get(key) || this.handler.aliases.get(key)
        if (!command) return void M.reply(`No Command of Alias Found | "${key}"`)
        const state = await this.client.DB.disabledcommands.findOne({ command: command.config.command })
        M.reply(
            `❤️ *Command:* ${this.client.util.capitalize(command.config?.command)}\n📉 *Status:* ${
                state ? 'Disabled' : 'Available'
            }\n⛩ *Category:* ${this.client.util.capitalize(command.config?.category || '')}${
                command.config.aliases
                    ? `\n🤍 *Aliases:* ${command.config.aliases.map(this.client.util.capitalize).join(', ')}`
                    : ''
            }\n🎐 *Group Only:* ${this.client.util.capitalize(
                JSON.stringify(!command.config.dm ?? true)
            )}\n💎 *Usage:* ${command.config?.usage || ''}\n\n📒 *Description:* ${command.config?.description || ''}`
        )
    }
}
