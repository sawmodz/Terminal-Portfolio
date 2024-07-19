import Command from "../Object/Command.js";

export default class Help extends Command {
  constructor(terminal) {
    super("help", terminal);
  }

  async exec(args) {
    if (args.length == 1) {
      this.terminal.createText("Available commands:");
      this.terminal.commands.forEach((command) => {
        this.terminal.createText(`- ${command.name} : ${command.description}`);
      });
    }

    if (args.length == 2) {
      const myCommand = this.terminal.commands.find(
        (command) => command.name === args[1]
      );
      if (!myCommand) return this.terminal.createText("Command not found.");
      this.terminal.createText(
        `- ${myCommand.name} : ${myCommand.description}`
      );
    }
  }
}
