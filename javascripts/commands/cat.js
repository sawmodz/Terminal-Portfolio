import Command from "../Object/Command.js";

export default class Cat extends Command {
  constructor(terminal) {
    super("cat", terminal);
  }

  async exec(args) {
    if (args.length == 2) {
      if (args[1].startsWith("."))
        return this.terminal.createText(
          "Not supported: cat command does not support relative paths"
        );

      let file;
      if (args[1].startsWith("/")) {
        file = this.terminal.getContent(args[1]);
      } else {
        const path = this.terminal.currentDirectory + "/" + args[1];
        file = this.terminal.getContent(path);
      }

      if (file.error) {
        this.terminal.createText(
          "cat: " + args[1] + ": No such file or directory"
        );
        return;
      }
      this.terminal.createText(file.information.content);
      return;
    }

    this.terminal.createText("Usage: cat [file]");
  }
}
