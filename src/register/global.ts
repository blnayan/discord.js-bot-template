import 'dotenv/config';
import 'module-alias/register';
import { Log } from '@utils';
import { generateApplicationCommandList } from '@functions';
import { Client } from 'discord.js';

const client = new Client({ intents: [] });

client.once('ready', async (client) => {
  await client.application.commands
    .set(generateApplicationCommandList())
    .then(Log.success)
    .catch(Log.error);

  client.destroy();
});

client
  .login(process.env.BOT_TOKEN)
  .catch(() => Log.criticalError('Failed to login.'));
