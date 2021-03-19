const { Client, GuildMember, MessageEmbed } = require('discord.js');

/**
 * @param {Client} client
 * @param {GuildMember} member 
 */

module.exports = async (client, member) => {
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
    );
}