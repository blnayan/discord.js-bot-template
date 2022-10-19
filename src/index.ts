import 'dotenv/config';
import 'module-alias/register';
import { Client, GatewayIntentBits } from 'discord.js';
import * as events from '@events';
import { Log, Event } from '@utils';
import { generateCommandCollection } from '@functions';
import { PrismaClient } from '@prisma/client';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = generateCommandCollection();
client.prisma = new PrismaClient();

// initializes all event listeners from the events folder
const eventList = Object.values(events) as Event[];
for (let i = 0; eventList.length > i; i += 1) {
  const event = eventList[i];
  if (event.once) client.once(event.name, event.execute);
  else client.on(event.name, event.execute);
}

async function stopEvent(code: String) {
  Log.error(code);
  await client.prisma.$disconnect().catch(Log.error);
  client.destroy();
}

process.addListener('SIGINT', stopEvent);
process.addListener('SIGTERM', stopEvent);

// if login fails reports an error in the terminal or console
client
  .login(process.env.BOT_TOKEN)
  .catch(() => Log.criticalError('Failed to login.'));
