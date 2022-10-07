import { CommandSlashCommand } from '@utils';
import { Colors, EmbedBuilder } from 'discord.js';

export const ping = new CommandSlashCommand({
  name: 'ping',
  data: { name: 'ping', description: 'Displays your ping' },
  async execute(interaction) {
    const pingEmbed = new EmbedBuilder({
      title: 'Ping',
      description:
        'Shows the latency of between sending a command and recieving a command response.',
      color: Colors.Blurple,
    });

    try {
      const responseMsg = await interaction.deferReply({ fetchReply: true });
      pingEmbed.setDescription(
        `Your ping is ⏳ ${
          responseMsg.createdTimestamp - interaction.createdTimestamp
        } ms!`,
      );
    } catch (err) {
      pingEmbed
        .setTitle('Error:')
        .setColor(Colors.Red)
        .setDescription('Something went wrong please try again!');
    }

    return interaction.editReply({ embeds: [pingEmbed] });
  },
});
