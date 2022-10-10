import { CommandInteraction } from 'discord.js';

export function getFullCommandName(interaction: CommandInteraction) {
  let fullCommandName = interaction.commandName;
  if (interaction.isChatInputCommand()) {
    const subcommandGroupName = interaction.options.getSubcommandGroup(false);
    const subcommandName = interaction.options.getSubcommand(false);

    // eslint-disable-next-line no-nested-ternary
    fullCommandName += subcommandGroupName
      ? `-${subcommandGroupName}`
      : subcommandName
      ? `-${subcommandName}`
      : '';
  }

  return fullCommandName;
}
