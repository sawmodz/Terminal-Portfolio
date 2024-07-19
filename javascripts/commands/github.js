import Command from "../Object/Command.js";

export default class Github extends Command {
  constructor(terminal) {
    super("github", terminal);
  }

  async exec(args) {
    this.terminal.createText(
      `Click <a href='https://github.com/sawmodz' target='_blank'>here</a> to see my Github profile.`
    );
  }
}
