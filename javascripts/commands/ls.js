import Command from "../Object/Command.js";

export default class ListFile extends Command {
  constructor(terminal) {
    super("ls", terminal);
  }

  async exec(args) {
    if (args.length == 1) {
      const files = this.terminal.getFiles(this.terminal.currentDirectory);

      if (files.error) return this.terminal.createText("Directory not found.");

      files.list.forEach((file) => {
        const emoji = file.type === "directory" ? "📁" : "📄";
        this.terminal.createText(`${emoji} ${file.name}`);
      });
    }
  }
}
