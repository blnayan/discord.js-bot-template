import * as chalk from 'chalk';

export class Log {
  public static success = (message: any) =>
    console.log(chalk.green('SUCCESS:'), message);

  public static error = (message: any) =>
    console.log(chalk.red('ERROR:'), message);

  public static criticalError = (message: any) =>
    console.log(chalk.bgRed('CRITICAL ERROR:'), message);
}
