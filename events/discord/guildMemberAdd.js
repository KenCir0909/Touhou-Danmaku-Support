const { Client, GuildMember, MessageEmbed } = require('discord.js');

/**
 * @param {Client} client
 * @param {GuildMember} member 
 */

module.exports = async (client, member) => {
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
}
