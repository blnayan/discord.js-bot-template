import {
  BaseCommand,
  BaseCommandData,
  CommandType,
  Execute,
  CommandSlashCommand,
  SubcommandGroupSlashCommand,
  SubcommandSlashCommand,
} from '@utils';
import {
  ApplicationCommandOptionData,
  ApplicationCommandSubCommandData,
  ApplicationCommandSubGroupData,
  ApplicationCommandType,
  ChatInputApplicationCommandData,
  ChatInputCommandInteraction,
  PermissionResolvable,
} from 'discord.js';

export enum SlashCommandType {
  Command,
  Subcommand,
  SubcommandGroup,
}

export type ApplicationCommandNoSubOptionData = Exclude<
  ApplicationCommandOptionData,
  ApplicationCommandSubGroupData | ApplicationCommandSubCommandData
>;

export interface ChatInputApplicationNoSubOptionCommandData
  extends ChatInputApplicationCommandData {
  options?: ApplicationCommandNoSubOptionData[];
  type: ApplicationCommandType.ChatInput;
}

export interface ChatInputApplicationNoOptionCommandData
  extends Omit<ChatInputApplicationCommandData, 'options'> {
  type: ApplicationCommandType.ChatInput;
}

export interface ApplicationCommandNoOptionSubGroupData
  extends Omit<ApplicationCommandSubGroupData, 'options'> {}

export type SlashCommandApplicationCommandData =
  | ChatInputApplicationNoSubOptionCommandData
  | ApplicationCommandNoOptionSubGroupData
  | ApplicationCommandSubCommandData;

export interface SlashCommandData extends Omit<BaseCommandData, 'type'> {
  guildOnly?: boolean;
  permissions?: PermissionResolvable;
  slashCommandType: SlashCommandType;
  data: SlashCommandApplicationCommandData;
  execute: Execute<ChatInputCommandInteraction>;
}

export abstract class SlashCommand extends BaseCommand {
  constructor(data: SlashCommandData) {
    super({
      name: data.name,
      type: CommandType.SlashCommand,
      execute: data.execute,
    });

    this.guildOnly = data.guildOnly ?? false;
    this.permissions = data.permissions;
    this.slashCommandType = data.slashCommandType;
    this.data = data.data;
  }

  public declare type: CommandType.SlashCommand;

  public declare execute: Execute<ChatInputCommandInteraction>;

  public guildOnly: boolean;

  public permissions?: PermissionResolvable;

  public slashCommandType: SlashCommandType;

  public data: SlashCommandApplicationCommandData;

  public isCommand(): this is CommandSlashCommand {
    return this.slashCommandType === SlashCommandType.Command;
  }

  public isSubcommandGroup(): this is SubcommandGroupSlashCommand {
    return this.slashCommandType === SlashCommandType.SubcommandGroup;
  }

  public isSubcommand(): this is SubcommandSlashCommand {
    return this.slashCommandType === SlashCommandType.Subcommand;
  }

  public isGuildOnly(): this is SlashCommand & { guildOnly: true } {
    return this.guildOnly;
  }
  // public declare isSlashCommand: () => this is SlashCommand<Type>;
}
