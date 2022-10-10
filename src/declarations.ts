import { Collection } from 'discord.js';
import { SlashCommand } from '@utils';

declare global {}

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, SlashCommand>;
  }
}
