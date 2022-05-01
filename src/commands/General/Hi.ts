/** @format */

import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "hi",
			description: "Generally used to check if bot is Up",
			category: "general",
			usage: `${client.config.prefix}hi`,
			baseXp: 10,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		const chitoge =
			"https://a.uguu.se/vBatxuL.mp4";
		return void this.client.sendMessage(
			M.from,
			{ url: chitoge },
			MessageType.video,
			{
				quoted: M.WAMessage,
				mimetype: Mimetype.gif,
				caption: `𝐈 𝐝𝐨𝐧'𝐭 𝐡𝐚𝐯𝐞 𝐭𝐢𝐦𝐞 𝐭𝐨 𝐡𝐚𝐯𝐞 𝐚 𝐜𝐨𝐧𝐯𝐞𝐫𝐬𝐚𝐭𝐢𝐨𝐧 𝐰𝐢𝐭𝐡 𝐬𝐨𝐦𝐞𝐨𝐧𝐞 𝐥𝐢𝐤𝐞 𝐲𝐨𝐮. 𝐔𝐬𝐞 𝐬𝐨𝐦𝐞𝐭𝐡𝐢𝐧𝐠 𝐟𝐫𝐨𝐦 *${this.client.config.prefix}𝙝𝙚𝙡𝙥* 𝐥𝐢𝐬𝐭 𝐢𝐟 𝐲𝐨𝐮 𝐰𝐚𝐧𝐭 𝐚𝐧𝐲𝐭𝐡𝐢𝐧𝐠. \n`,
			}
		);
	};
}
