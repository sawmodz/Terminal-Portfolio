import Command from "../Object/Command.js";

export default class Pwd extends Command {
  constructor(terminal) {
    super("pwd", terminal);
  }

  async exec(args) {
    this.terminal.createText(this.terminal.currentDirectory);
  }
}
