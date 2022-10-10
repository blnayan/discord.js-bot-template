import { SlashCommand, SlashCommandData, SlashCommandType } from '@utils';
import { ApplicationCommandSubCommandData } from 'discord.js';

export interface SubcommandSlashCommandData
  extends Omit<SlashCommandData, 'slashCommandType'> {
  data: ApplicationCommandSubCommandData;
}

export class SubcommandSlashCommand extends SlashCommand {
  constructor(data: SubcommandSlashCommandData) {
    super({
      name: data.name,
      guildOnly: data.guildOnly,
      permissions: data.permissions,
      slashCommandType: SlashCommandType.Command,
      data: data.data,
      execute: data.execute,
    });
  }

  public declare slashCommandType: SlashCommandType.Subcommand;

  public declare data: ApplicationCommandSubCommandData;

  public isGuildOnly(): this is SubcommandSlashCommand & { guildOnly: true } {
    return this.guildOnly;
  }
}
