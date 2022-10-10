import {
  SlashCommand,
  SlashCommandData,
  SlashCommandType,
  ApplicationCommandNoOptionSubGroupData,
} from '@utils';

export interface SubcommandGroupSlashCommandData
  extends Omit<SlashCommandData, 'slashCommandType'> {
  data: ApplicationCommandNoOptionSubGroupData;
}

export class SubcommandGroupSlashCommand extends SlashCommand {
  constructor(data: SubcommandGroupSlashCommandData) {
    super({
      name: data.name,
      guildOnly: data.guildOnly,
      permissions: data.permissions,
      slashCommandType: SlashCommandType.SubcommandGroup,
      data: data.data,
      execute: data.execute,
    });
  }

  public declare slashCommandType: SlashCommandType.SubcommandGroup;

  public declare data: ApplicationCommandNoOptionSubGroupData;

  public isGuildOnly(): this is SubcommandGroupSlashCommand & {
    guildOnly: true;
  } {
    return this.guildOnly;
  }
}
