import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'support',
            aliases: ['support'],
            description: 'Gets the support group links',
            category: 'general',
            usage: `${client.config.prefix}Support`,
            baseXp: 10
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        (await this.client.sendMessage(
        M.sender.jid,
        `    ♥️𝐌𝐘 𝐌𝐀𝐒𝐓𝐄𝐑 𝐆𝐑𝐎𝐔𝐏♥️\n\n*🎇ད𝐓𝐄𝐑𝐌𝐈𝐀𝐑 𝐂𝐎𝐌𝐌𝐔𝐍𝐈𝐓𝐘ཌ:😉* *https://chat.whatsapp.com/Jkw7iPJkjcN4iq1Fe1hwWe*`,
           MessageType.text
        ))
        const n = [
            'https://c.tenor.com/DnRViqnLNsUAAAPo/gotoubun-no-hanayome-anime.mp4'
        ]
        let beckylynch = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url:beckylynch }, MessageType.video, {quoted:M.WAMessage,
            mimetype: Mimetype.gif,
            caption: `𝐒𝐄𝐍𝐓 𝐘𝐎𝐔 𝐒𝐔𝐏𝐏𝐎𝐑𝐓 𝐋𝐈𝐍𝐊 𝐏𝐄𝐑𝐒𝐎𝐍𝐀𝐋𝐋𝐘👀❤️ \n` }
        )

        }
}
