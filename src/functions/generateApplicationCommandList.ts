import * as commands from '@commands';
import {
  RegCommand,
  SubcommandGroupSlashCommand,
  SubcommandSlashCommand,
  Command,
} from '@utils';
import {
  ApplicationCommandData,
  ApplicationCommandType,
  ChatInputApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandSubGroupData,
} from 'discord.js';

export function generateApplicationCommandList() {
  const regCommandList: RegCommand[] = [];
  const subcommandGroupList: SubcommandGroupSlashCommand[] = [];
  const subcommandList: SubcommandSlashCommand[] = [];

  const commandList = Object.values(commands) as Command[];
  for (let i = 0; commandList.length > i; i += 1) {
    const command = commandList[i];
    if (!command.isSlashCommand()) continue;

    if (command.isCommand()) regCommandList.push(command);
    else if (command.isSubcommandGroup()) subcommandGroupList.push(command);
    else subcommandList.push(command);
  }

  const applicationCommandList = [...regCommandList].map(
    (command) => command.data,
  ) as ApplicationCommandData[];

  // adds the Subcommand Groups to the Application Command list

  for (let i = 0; subcommandGroupList.length > i; i += 1) {
    // TODO: add a name validator
    const subcommandGroup = subcommandGroupList[i];
    const commandName = subcommandGroup.name.split('-')[0];
    const applicationCommand = applicationCommandList.find(
      (command) =>
        command.name === commandName &&
        command.type === ApplicationCommandType.ChatInput,
    ) as ChatInputApplicationCommandData | undefined;

    if (!applicationCommand) throw new SyntaxError();

    const regCommand = regCommandList.find(
      (command) => command.name === commandName,
    );

    // throws syntax error if command matched with subcomand, doesn't have property hasSub to set to true
    if (!regCommand) throw new SyntaxError();
    if (!regCommand.hasSub) throw new SyntaxError();

    if (applicationCommand.options)
      applicationCommand.options.push(subcommandGroup.data);
    else {
      applicationCommand.options = [subcommandGroup.data];
    }
  }

  // adds the Subcommands to the Application Command list
  for (let i = 0; subcommandList.length > i; i += 1) {
    const subcommand = subcommandList[i];
    // TODO: add a name validator
    const subcommandNameArr = subcommand.name.split('-');
    const commandName = subcommandNameArr[0];
    const subcommandGroupName =
      subcommandNameArr.length === 3 ? subcommandNameArr[1] : undefined;
    const applicationCommand = applicationCommandList.find(
      (command) =>
        command.name === commandName &&
        command.type === ApplicationCommandType.ChatInput,
    ) as ChatInputApplicationCommandData | undefined;

    if (!applicationCommand) throw new SyntaxError();

    const regCommand = regCommandList.find(
      (command) => command.name === commandName,
    );

    // throws syntax error if command matched with subcomand, doesn't have property hasSub to set to true
    if (!regCommand) throw new SyntaxError();
    if (!regCommand.hasSub) throw new SyntaxError();

    if (!applicationCommand.options) {
      applicationCommand.options = [subcommand.data];
    } else {
      const subcommandGroup = applicationCommand.options.find(
        (subcommandGroup) =>
          subcommandGroup.name === subcommandGroupName &&
          subcommandGroup.type === ApplicationCommandOptionType.SubcommandGroup,
      ) as ApplicationCommandSubGroupData | undefined;

      if (!subcommandGroup) {
        applicationCommand.options.push(subcommand.data);
      } else if (subcommandGroup.options)
        subcommandGroup.options.push(subcommand.data);
      else {
        applicationCommand.options = [subcommand.data];
      }
    }
  }

  return applicationCommandList;
}
