import Command from "../Object/Command.js";

export default class Test extends Command {
  constructor(terminal) {
    super("test", terminal);
  }

  async exec(args) {
    this.terminal.createText("This is a test command.");
  }
}
