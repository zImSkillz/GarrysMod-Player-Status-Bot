const { ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, PermissionsBitField, Embed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setupnews')
        .setDescription('Set Server News')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    run: async(client, interaction) => {

        const modal = new ModalBuilder()
            .setCustomId('setupnews')
            .setTitle('GMOD Status Bot | News');

        const news = new TextInputBuilder()
            .setCustomId('news')
            .setLabel("What's the news?")
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('No Information');

        const firstRow = new ActionRowBuilder().addComponents(news);

        modal.addComponents(firstRow)

        interaction.showModal(modal);
    }
};