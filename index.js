require('dotenv').config();
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ ws: { intents: Intents.ALL } });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (newMember.guild.id !== '794380572323086358' || newMember.channelID === '812347318086008902' || oldMember.channelID === '812347318086008902' || newMember.member.user.bot) return;
    if (oldMember.channelID === null) {
        client.channels.cache.get('811254308989042789').send(`${newMember.member.user.tag}が${newMember.channel.name}に入室しました`);
    }
    else if (newMember.channelID === null) {
        client.channels.cache.get('811254308989042789').send(`${oldMember.member.user.tag}が${oldMember.channel.name}から退室しました`);
    }
    else if (newMember.channelID !== oldMember.channelID) {
        client.channels.cache.get('811254308989042789').send(`${newMember.member.user.tag}が${oldMember.channel.name}から${newMember.channel.name}に移動しました`);
    }
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
    if (oldMessage.author.bot || oldMessage.author.id === '714455926970777602') return;
    client.channels.cache.get('816236462730248233').send(
        new MessageEmbed()
            .setDescription(`送信したユーザー: <@${oldMessage.author.id}>\n編集前のメッセージ: ${oldMessage.content}\n編集後のメッセージ: ${newMessage.content}`)
            .setColor('RANDOM')
            .setTimestamp()
    );
});

client.on('messageDelete', message => {
    if (message.author.bot || message.author.id === '714455926970777602') return;
    client.channels.cache.get('816236462730248233').send(
        new MessageEmbed()
            .setDescription(`送信したユーザー: <@${message.author.id}>\n削除したメッセージ: ${message.content}`)
            .setColor('RANDOM')
            .setTimestamp()
    );
});

client.on('guildMemberAdd', member => {
    if (member.guild.id !== '794380572323086358') return;
    if (member.user.bot) return member.roles.add('794410823564918835');
    client.channels.cache.get('811254308989042789').send(`${member} よおこそ！幻想地底国へ！`);
    client.channels.cache.get('794380572931391511').send(
        new MessageEmbed()
            .setTitle('ユーザー参加情報')
            .addField('User名', member.user.tag)
            .addField('UserID', member.user.id)
            .addField('垢作ってから経った日数', Math.round((Date.now() - member.user.createdAt) / 86400000))
            .setColor('RANDOM')
            .setTimestamp()
    );
});

client.on('guildMemberRemove', member => {
    if (member.guild.id !== '794380572323086358') return;
    if (member.user.bot) return;
    client.channels.cache.get('811254308989042789').send(`${member.user.tag}は去ってしまった...`);
    client.channels.cache.get('794380572931391511').send(
        new MessageEmbed()
            .setTitle('ユーザー退出情報')
            .addField('User名', member.user.tag)
            .addField('UserID', member.user.id)
            .addField('垢作ってから経った日数', Math.round((Date.now() - member.user.createdAt) / 86400000))
            .addField('参加してた日数', Math.round((Date.now() - member.joinedAt) / 86400000))
            .setColor('RANDOM')
            .setTimestamp()
    )
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
    client.users.cache.get('714455926970777602').send(
        new MessageEmbed()
            .setDescription('エラー内容:\n```' + reason + '```')
            .setColor('RANDOM')
            .setTimestamp()
    );
});

client.login();