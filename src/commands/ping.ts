import { CommandSlashCommand, Log } from '@utils';
import { Colors, EmbedBuilder } from 'discord.js';

export const ping = new CommandSlashCommand({
  name: 'ping',
  data: { name: 'ping', description: 'Displays your ping' },
  async execute(interaction) {
    const deferedMessage = await interaction
      .deferReply({ fetchReply: true })
      .catch(Log.error);

    if (!deferedMessage) return;

    const pingMeasuredEmbed = new EmbedBuilder({
      title: 'Ping',
      color: Colors.Blurple,
      description: `Your ping is ⏳ ${
        deferedMessage.createdTimestamp - interaction.createdTimestamp
      } ms!`,
    });

    return interaction
      .editReply({ embeds: [pingMeasuredEmbed] })
      .catch(Log.error);
  },
});
