const { ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, PermissionsBitField, Embed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Setup Status Bot')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    run: async(client, interaction) => {

        const modal = new ModalBuilder()
            .setCustomId('setup')
            .setTitle('GMOD Status Bot | Setup');

        const severip = new TextInputBuilder()
            .setCustomId('serverip')
            .setLabel("What is the Server IP?")
            .setStyle(TextInputStyle.Short);

        const serverport = new TextInputBuilder()
            .setCustomId('serverport')
            .setLabel("What is the Server Port?")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('27015');

        const authPort = new TextInputBuilder()
            .setCustomId('authport')
            .setLabel("What is the Auth Port? (DEFAULT: 4124)")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('4124');

        const authKey = new TextInputBuilder()
            .setCustomId('authkey')
            .setLabel("What is the AuthKey? (KEEP IT PRIVATE)")
            .setStyle(TextInputStyle.Short);

        const firstRow = new ActionRowBuilder().addComponents(severip);
        const secondRow = new ActionRowBuilder().addComponents(serverport);
        const thirdRow = new ActionRowBuilder().addComponents(authPort);
        const fourthRow = new ActionRowBuilder().addComponents(authKey);

        modal.addComponents(firstRow, secondRow, thirdRow, fourthRow)

        interaction.showModal(modal);
    }
};