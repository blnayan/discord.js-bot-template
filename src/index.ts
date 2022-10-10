import 'dotenv/config';
import 'module-alias/register';
import { Client, GatewayIntentBits } from 'discord.js';
import * as events from '@events';
import { Log, Event } from '@utils';
import { generateCommandCollection } from '@functions';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = generateCommandCollection();

// initializes all event listeners from the events folder
const eventList = Object.values(events) as Event[];
for (let i = 0; eventList.length > i; i += 1) {
  const event = eventList[i];
  if (event.once) client.once(event.name, event.execute);
  else client.on(event.name, event.execute);
}

// if login fails reports an error in the terminal or console
client
  .login(process.env.BOT_TOKEN)
  .catch(() => Log.criticalError('Failed to login.'));
