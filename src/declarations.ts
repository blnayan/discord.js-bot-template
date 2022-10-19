import { Collection } from 'discord.js';
import { SlashCommand } from '@utils';
import { PrismaClient } from '@prisma/client';

declare global {}

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, SlashCommand>;
    prisma: PrismaClient;
  }
}
