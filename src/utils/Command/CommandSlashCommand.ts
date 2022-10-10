import {
  SlashCommand,
  SlashCommandData,
  SlashCommandType,
  ChatInputApplicationNoSubOptionCommandData,
  ChatInputApplicationNoOptionCommandData,
} from '@utils';

export interface CommandSlashCommandData<HasSub extends boolean = false>
  extends Omit<SlashCommandData, 'slashCommandType'> {
  hasSub?: HasSub;
  data: HasSub extends true
    ? ChatInputApplicationNoOptionCommandData
    : ChatInputApplicationNoSubOptionCommandData;
}

export class CommandSlashCommand<
  HasSub extends boolean = false,
> extends SlashCommand {
  constructor(data: CommandSlashCommandData<HasSub>) {
    super({
      name: data.name,
      guildOnly: data.guildOnly,
      permissions: data.permissions,
      slashCommandType: SlashCommandType.Command,
      data: data.data,
      execute: data.execute,
    });

    this.hasSub = data.hasSub ?? (false as HasSub);
  }

  public hasSub: HasSub;

  public declare slashCommandType: SlashCommandType.Command;

  public declare data: HasSub extends true
    ? ChatInputApplicationNoOptionCommandData
    : ChatInputApplicationNoSubOptionCommandData;

  public isGuildOnly(): this is CommandSlashCommand<HasSub> & {
    guildOnly: true;
  } {
    return this.guildOnly;
  }

  // public hasSubcommands(): this is CommandSlashCommand<true> {
  //   return this.hasSub;
  // }
}
