import {
  ChatInputCommandInteraction,
  CommandInteraction,
  MessageContextMenuCommandInteraction,
  UserContextMenuCommandInteraction,
  PermissionResolvable,
} from 'discord.js';
import {
  CommandSlashCommand,
  SlashCommand,
  SubcommandGroupSlashCommand,
  SubcommandSlashCommand,
} from '@utils';

export enum CommandType {
  SlashCommand,
}

export type Execute<I extends CommandInteraction> = (
  interaction: I,
) => Awaited<void>;

export type ExecuteType =
  | Execute<ChatInputCommandInteraction>
  | Execute<UserContextMenuCommandInteraction>
  | Execute<MessageContextMenuCommandInteraction>;

export interface BaseCommandData {
  name: string;
  type: CommandType;
  execute: ExecuteType;
  guildOnly?: boolean;
  permissions?: PermissionResolvable;
}

export abstract class BaseCommand {
  constructor(data: BaseCommandData) {
    this.name = data.name;
    this.type = data.type;
    this.execute = data.execute;
    this.guildOnly = data.guildOnly ?? false;
    this.permissions = data.permissions;
  }

  public name: string;

  public type: CommandType;

  public guildOnly: boolean;

  public permissions?: PermissionResolvable;

  public execute: ExecuteType;

  public isSlashCommand(): this is SlashCommand {
    return this.type === CommandType.SlashCommand;
  }

  public isGuildOnly(): this is BaseCommand & { guildOnly: true } {
    return this.guildOnly;
  }
}

export type Command =
  | CommandSlashCommand
  | SubcommandGroupSlashCommand
  | SubcommandSlashCommand;

export type RegCommand = CommandSlashCommand;
