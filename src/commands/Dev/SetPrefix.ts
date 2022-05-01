import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'setprefix',
            description: 'Will replace the old prefix with the given term',
            category: 'dev',
            dm: true,
            usage: `${client.config.prefix}setprefix [new_prefix]`,
            modsOnly: true,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        const newprefix = joined.trim().split(' ')[0].toLowerCase()
        if (!newprefix) return void (await M.reply(`𝐏𝐋𝐄𝐀𝐒𝐄 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐭𝐡𝐞 𝐧𝐞𝐰 𝐩𝐫𝐞𝐟𝐢𝐱.\n\n*𝐄𝐗𝐀𝐌𝐏𝐋𝐄: ${this.client.config.prefix}setprefix $`))
        this.client.config.prefix = newprefix
        const text = `✅ *𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘 𝐜𝐡𝐚𝐧𝐠𝐞𝐝 𝐭𝐡𝐞 𝐩𝐫𝐞𝐟𝐢𝐱 𝐭𝐨 ${newprefix}.*`
        M.reply(text)
     }
}
