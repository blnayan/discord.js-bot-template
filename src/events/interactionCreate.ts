import { Event } from '@utils';

export const interactionCreate = new Event({
  name: 'interactionCreate',
  async execute(interaction) {},
});
