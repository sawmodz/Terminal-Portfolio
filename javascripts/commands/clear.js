import Command from "../Object/Command.js";

export default class Clear extends Command {
  constructor(terminal) {
    super("clear", terminal);
  }

  async exec(args) {
    this.terminal.clear();
  }
}
