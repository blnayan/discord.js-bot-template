import { getFullCommandName } from '@functions';
import { Event, ErrorEmbedBuilder } from '@utils';
import { Log } from '../utils/Log';

export const interactionCreate = new Event({
  name: 'interactionCreate',
  async execute(interaction) {
    const { client } = interaction;
    if (interaction.isChatInputCommand()) {
      const commandName = getFullCommandName(interaction);
      const command = client.commands.get(commandName);

      if (!command) {
        const commandNotFoundErrorEmbed = new ErrorEmbedBuilder({
          description: 'An internal error occured.',
        });

        return interaction
          .reply({ embeds: [commandNotFoundErrorEmbed] })
          .catch(Log.error);
      }

      if (command.isGuildOnly()) {
        if (!interaction.inCachedGuild()) {
          const notInGuildErrorEmbed = new ErrorEmbedBuilder({
            description:
              "This command is for servers only and can't be used in a DM.",
          });

          return interaction
            .reply({ embeds: [notInGuildErrorEmbed] })
            .catch(Log.error);
        }

        if (
          command.permissions &&
          !interaction.member.permissions.has(command.permissions)
        ) {
          const insufficientPermissionsErrorEmbed = new ErrorEmbedBuilder({
            description:
              'You have insufficient server permissions to run this command.',
          });

          return interaction.reply({
            embeds: [insufficientPermissionsErrorEmbed],
          });
        }
      }

      try {
        return command.execute(interaction);
      } catch (err) {
        Log.error(err);

        const chatInputCommandFailedErrorEmbed = new ErrorEmbedBuilder({
          description:
            'The following slash command failed to run, report to the support server.',
        });

        return interaction
          .reply({
            embeds: [chatInputCommandFailedErrorEmbed],
          })
          .catch(Log.error);
      }
    }
  },
});
