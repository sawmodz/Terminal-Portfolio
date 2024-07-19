import Command from "../Object/Command.js";

export default class Node extends Command {
  constructor(terminal) {
    super("node", terminal);
  }

  async exec(args) {
    if (args.length != 2) {
      this.terminal.createText("Usage: mkdir [file]");
      return;
    }

    let file;
    if (args[1].startsWith("/")) {
      file = this.terminal.getContent(args[1]);
    } else {
      const path = this.terminal.currentDirectory + "/" + args[1];
      file = this.terminal.getContent(path);
    }

    if (file.error)
      return this.terminal.createText(
        "node: " + args[1] + ": No such file or directory"
      );

    if (!this.isJsFile(file.information.name))
      return this.terminal.createText(
        "Your file need to be a .js file to be executed"
      );

    this.terminal.createText(`Node : executing ${file.information.name}`);

    try {
      file.information.content = this.changeConsolelogByTerminalCreateText(
        file.information.content
      );
      eval(file.information.content);
    } catch (e) {
      this.terminal.createText("Error: " + e.message);
    }
  }

  isJsFile(file) {
    return file.endsWith(".js");
  }

  changeConsolelogByTerminalCreateText(content) {
    return content.replaceAll(/console.log/g, "this.terminal.createText");
  }
}
