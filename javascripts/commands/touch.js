import Command from "../Object/Command.js";

export default class Touch extends Command {
  constructor(terminal) {
    super("touch", terminal);
  }

  async exec(args) {
    if (args.length < 3) {
      this.terminal.createText("Usage: touch [file] [content]");
      return;
    }

    const directory = args[1];
    const content = args.slice(2).join(" ");

    if (args[1].startsWith("."))
      return this.terminal.createText(
        "Not supported: cat command does not support relative paths"
      );

    let path;

    if (directory.startsWith("/")) path = directory;
    else path = this.terminal.currentDirectory + "/" + directory;

    const response = this.terminal.createFile(path, content);
    if (response.error) return this.terminal.createText(response.message);
    this.terminal.createText("File created.");
  }
}
