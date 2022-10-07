import { Awaitable, ClientEvents } from 'discord.js';

export interface EventData<K extends keyof ClientEvents = keyof ClientEvents> {
  name: K;
  once?: boolean;
  execute(...args: ClientEvents[K]): Awaitable<void>;
}

export class Event<K extends keyof ClientEvents = keyof ClientEvents> {
  constructor(data: EventData<K>) {
    this.name = data.name;
    this.once = data.once;
    this.execute = data.execute;
  }

  public name: K;

  public once?: boolean;

  public execute: (...args: ClientEvents[K]) => Awaitable<void>;
}
