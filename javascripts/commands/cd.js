import Command from "../Object/Command.js";

export default class Cd extends Command {
  constructor(terminal) {
    super("cd", terminal);
  }

  async exec(args) {
    if (args.length != 2) {
      this.terminal.createText("Usage: cd [directory]");
      return;
    }

    let path;

    if (args[1].startsWith("/")) path = args[1];
    else if (args[1] == "..") {
      path = this.terminal.currentDirectory.split("/");
      path.pop();
      path = path.join("/");
    } else path = this.terminal.currentDirectory + "/" + args[1];

    const response = this.terminal.updatePath(path);
    if (response.error) return this.terminal.createText(response.message);
    this.terminal.createText("You are now in " + path);
  }
}
