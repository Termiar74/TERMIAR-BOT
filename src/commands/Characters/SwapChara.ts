import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "schara",
      description: `Swaps the index number of characters in your gallery.`,
      category: "characters",
      usage: `${client.config.prefix}schara [character_index_number_in_your_gallery] [character_index_number_in_your_gallery]`,
      baseXp: 0,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    if (!joined)
      return void M.reply(
        `🟥 *𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐭𝐡𝐞 𝐢𝐧𝐝𝐞𝐱 𝐧𝐮𝐦𝐛𝐞𝐫𝐬 𝐨𝐟 𝐭𝐡𝐞 𝐜𝐡𝐚𝐫𝐚𝐜𝐭𝐞𝐫𝐬 𝐢𝐧 𝐲𝐨𝐮𝐫 𝐠𝐚𝐥𝐥𝐞𝐫𝐲 𝐭𝐡𝐚𝐭 𝐲𝐨𝐮 𝐰𝐚𝐧𝐧𝐚 𝐬𝐰𝐚𝐩. 𝐄𝐗𝐀𝐌𝐏𝐋𝐄 - ${this.client.config.prefix}schara 3 1*`
      );
    const terms: any = joined.split(" ");
    if (!terms[1] || terms[1] === "")
      return void M.reply(
        `🟥 *𝐘𝐨𝐮 𝐚𝐫𝐞 𝐝𝐨𝐢𝐧𝐠 𝐢𝐭 𝐰𝐫𝐨𝐧𝐠. 𝐄𝐗𝐀𝐌𝐏𝐋𝐄 - ${this.client.config.prefix}schara 1 4*`
      );
    const user = M.sender.jid;
    const data = await await this.client.getUser(user);
    if (
      isNaN(terms[0]) ||
      isNaN(terms[1]) ||
      terms[0] < 1 ||
      terms[0] > data.gallery.length ||
      terms[1] < 1 ||
      terms[1] > data.gallery.length
    )
      return void M.reply(
        `🟥 *𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐠𝐚𝐥𝐥𝐞𝐫𝐲 𝐢𝐧𝐝𝐞𝐱 𝐧𝐮𝐦𝐛𝐞𝐫. *𝐄𝐗𝐀𝐌𝐏𝐋𝐄 - ${this.client.config.prefix}swap 1 4*`
      );
    const i = terms[0] - 1;
    const w = terms[1] - 1;
    const t = data.gallery[i];
    data.gallery[i] = data.gallery[w];
    data.gallery[w] = t;
    await this.client.DB.user.updateOne(
      { jid: user },
      { $set: { gallery: data.gallery } }
    );
    await M.reply(`🟩 *𝐒𝐰𝐚𝐩𝐩𝐞𝐝 ${terms[0]} & ${terms[1]}*`);
  };
}
