import { MessageType } from '@adiwajshing/baileys'
import WAClient from '../lib/WAClient'

export default class CallHandler {
    constructor(public client: WAClient) {}

    rejectCall = async (caller: string, callID: string): Promise<void> => {
        const tag = this.client.generateMessageTag()
        const json = [
            'action',
            'call',
            [
                'call',
                {
                    from: this.client.user.jid,
                    to: caller,
                    id: tag
                },
                [
                    [
                        'reject',
                        {
                            'call-id': callID,
                            'call-creator': caller,
                            count: '0'
                        },
                        null
                    ]
                ]
            ]
        ]

        await this.client.sendWA(`${tag},${JSON.stringify(json)}`)
        await this.client.sendMessage(
					caller,
					`𝙔𝙤𝙪'𝙡𝙡 𝙗𝙚 𝙗𝙖𝙣𝙣𝙚𝙙 𝙛𝙤𝙧 𝙘𝙖𝙡𝙡𝙞𝙣𝙜 𝙩𝙝𝙚 𝙗𝙤𝙩, 𝘽𝙖𝙠𝙖!`,
					MessageType.text
				);
				await this.client.blockUser(caller);
				await this.client.banUser(caller);
    }
}
