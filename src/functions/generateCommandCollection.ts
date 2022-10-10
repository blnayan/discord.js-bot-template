import * as commands from '@commands';
import { SlashCommand } from '@utils';
import { Collection } from 'discord.js';

export function generateCommandCollection() {
  const commandCollection = new Collection<string, SlashCommand>();
  const commandList = Object.values(commands) as SlashCommand[];

  for (let i = 0; commandList.length > i; i += 1) {
    const command = commandList[i];
    commandCollection.set(command.name, command);
  }

  return commandCollection;
}
