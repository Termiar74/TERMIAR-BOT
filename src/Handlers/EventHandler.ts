import { MessageType, WAParticipantAction } from '@adiwajshing/baileys'
import chalk from 'chalk'
import request from '../lib/request'
import WAClient from '../lib/WAClient'

export default class EventHandler {
    constructor(public client: WAClient) {}

    handle = async (event: IEvent): Promise<void> => {
        const group = await this.client.fetchGroupMetadataFromWA(event.jid)
        this.client.log(
            `${chalk.blueBright('EVENT')} ${chalk.green(
                `${this.client.util.capitalize(event.action)}[${event.participants.length}]`
            )} in ${chalk.cyanBright(group?.subject || 'Group')}`
        )
        const data = await this.client.getGroupData(event.jid)
        if (!data.events) return void null
        const add = event.action === 'add'
        const text = add
					? `- ${group.subject || "___"} -\n\n🤍❤️ *𝐆𝐑𝐎𝐔𝐏 𝐃𝐄𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐎𝐍:*\n${
							group.desc
					  }\n\nHope you follow the rules and have fun!\n\n${event.participants
							.map((jid) => `@${jid.split("@")[0]}`)
							.join(", ")}`
					: event.action === "remove"
					? `𝐆𝐎𝐎𝐃𝐁𝐘𝐄 *@${
							event.participants[0].split("@")[0]
					  }* 👋🏻, 𝐰𝐞'𝐫𝐞 𝐩𝐫𝐨𝐛𝐚𝐛𝐥𝐲 𝐧𝐨𝐭 𝐠𝐨𝐧𝐧𝐚 𝐦𝐢𝐬𝐬 𝐲𝐨𝐮.`
					: `𝐀𝐫𝐚 𝐀𝐫𝐚, 𝐋𝐨𝐨𝐤𝐬 𝐋𝐢𝐤𝐞 *@${
							event.participants[0].split("@")[0]
					  }* 𝐠𝐨𝐭 ${this.client.util.capitalize(event.action)}d${
							event.actor ? ` by @${event.actor.split("@")[0]}` : ""
					  }`;
        const contextInfo = {
            mentionedJid: event.actor ? [...event.participants, event.actor] : event.participants
        }
        if (add) {
            let image = (await this.client.getProfilePicture(event.jid)) || this.client.assets.get('404.png')
            if (typeof image === 'string') image = await request.buffer(image)
            if (image)
                return void (await this.client.sendMessage(event.jid, image, MessageType.image, {
                    caption: text,
                    contextInfo
                }))
        }
        return void this.client.sendMessage(event.jid, text, MessageType.extendedText, { contextInfo })
    }
}

interface IEvent {
    jid: string
    participants: string[]
    actor?: string | undefined
    action: WAParticipantAction
}
