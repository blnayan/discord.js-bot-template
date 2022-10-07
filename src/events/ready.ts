import { Event, Log } from '@utils';

export const ready = new Event({
  name: 'ready',
  once: true,
  execute() {
    console.log('BOT READY!');
    Log.error('LOL');
    Log.criticalError('ERR');
  },
});
