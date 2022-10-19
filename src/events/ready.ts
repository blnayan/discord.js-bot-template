import { Event, Log } from '@utils';

export const ready = new Event({
  name: 'ready',
  once: true,
  async execute(client) {
    Log.success('Client Ready');

    try {
      await client.prisma.$connect();
      Log.success('Database Connected');
    } catch (error) {
      Log.error(error);
    }
  },
});
