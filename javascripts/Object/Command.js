export default class Command {
  constructor(name, terminal) {
    this.name = name;
    this.terminal = terminal;
  }

  async exec(args) {
    this.terminal.createText("Command not implemented.");
  }
}
