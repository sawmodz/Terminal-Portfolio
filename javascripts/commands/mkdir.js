import Command from "../Object/Command.js";

export default class Mkdir extends Command {
  constructor(terminal) {
    super("mkdir", terminal);
  }

  async exec(args) {
    if (args.length != 2) {
      this.terminal.createText("Usage: mkdir [directory]");
      return;
    }

    const directory = args[1];

    if (args[1].startsWith("."))
      return this.terminal.createText(
        "Not supported: mkdir command does not support relative paths"
      );

    let path;

    if (directory.startsWith("/")) path = directory;
    else path = this.terminal.currentDirectory + "/" + directory;

    const response = this.terminal.createDirectory(path);
    if (response.error) return this.terminal.createText(response.message);
    this.terminal.createText("Directory created.");
  }
}
