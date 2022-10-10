import { APIEmbed, Colors, EmbedBuilder, EmbedData } from 'discord.js';

export class ErrorEmbedBuilder extends EmbedBuilder {
  constructor(data?: EmbedData | APIEmbed) {
    const errorEmbedDefaultData: EmbedData | APIEmbed = {
      title: 'Error:',
      color: Colors.Red,
    };

    const ErrorEmbedData = Object.assign(errorEmbedDefaultData, data) as
      | EmbedData
      | APIEmbed;

    super(ErrorEmbedData);
  }
}
