import { getConfig, getDefaultFile } from "../main.js";

export default class Terminal {
  constructor() {
    this.container = document.getElementById("terminal_content");
    this.input = document.getElementById("terminal_input");
    this.prompt = document.getElementById("terminal_prompt");
    this.currentDirectory = "/Linux/home/WinckeThéo";
    this.history = [];
    this.currentHistoryId = -1;
    this.init();
    this.start();
  }

  async init() {
    this.config = await getConfig();
    this.loadCommands();
    await this.initDirectory();
    this.updatePath(this.currentDirectory);
    this.initHistory();

    this.input.addEventListener("blur", function () {
      this.focus();
    });

    document.addEventListener("keydown", (e) => {
      const myHistory = [...this.history].reverse();
      if (e.key === "Enter") {
        this.submitHandler();
      }
      if (e.key === "ArrowUp") {
        if (this.currentHistoryId + 1 === this.history.length) return;
        this.currentHistoryId++;
        this.input.value = myHistory[this.currentHistoryId];
      }
      if (e.key === "ArrowDown") {
        if (this.currentHistoryId - 1 < 0) {
          this.currentHistoryId = -1;
          this.input.value = "";
          return;
        }

        this.currentHistoryId--;
        this.input.value = myHistory[this.currentHistoryId];
      }
    });
  }

  async initDirectory() {
    if (localStorage.getItem("linuxFiles")) return;

    const defaultFiles = await getDefaultFile();
    localStorage.setItem("linuxFiles", JSON.stringify(defaultFiles));
  }

  async initHistory() {
    if (!localStorage.getItem("history")) return;
    this.history = JSON.parse(localStorage.getItem("history"));
  }

  addHistory(value) {
    this.history.push(value);
    localStorage.setItem("history", JSON.stringify(this.history));
    this.currentHistoryId = -1;
  }

  async loadCommands() {
    this.commands = [];
    this.config.commands.forEach((command) => {
      import(`../commands/${command.file}`).then((module) => {
        const Command = module.default;
        this.commands.push({
          name: command.name,
          description: command.description,
          class: new Command(this),
        });
      });
    });
  }

  start() {
    this.createText("Welcome to my portfolio!");
    this.createText("This is a simple terminal emulator.");
    this.createText("You can use some linux commands (ls, cd, touch ...).");
    this.createText(
      "You can also use the 'help' command to see the available commands."
    );
    this.createText("Good discovery 😍");
  }

  createText(text) {
    const p = document.createElement("p");
    p.innerHTML = text;
    this.container.appendChild(p);
  }

  submitHandler() {
    const value = this.input.value;
    this.clearInput();
    this.addHistory(value);

    const args = value.split(" ");
    const myCommand = this.commands.find((command) => command.name === args[0]);

    this.createText(`> ${value}`);

    if (!myCommand) return this.createText("Command not found.");

    myCommand.class.exec(args);
  }

  clearInput() {
    this.input.value = "";
  }

  getFiles(path) {
    try {
      const pathParsed = path.split("/");
      let files = JSON.parse(localStorage.getItem("linuxFiles"))["files"];
      let information;

      for (let i = 1; i < pathParsed.length; i++) {
        information = files.find((file) => file.name === pathParsed[i]);
        files = information.content;
      }

      return { list: files, error: false, information };
    } catch (error) {
      return { list: [], error: true };
    }
  }

  updatePath(path) {
    const pathExist = this.getFiles(path);
    if (pathExist.error) return { error: true, message: "Directory not found" };
    if (pathExist.information.type !== "directory")
      return { error: true, message: "This is not a directory" };

    this.currentDirectory = path;
    this.prompt.innerHTML = `Wincke Théo@Blizz:${this.currentDirectory}#`;
    return { error: false };
  }

  getContent(path) {
    const files = this.getFiles(path);
    if (files.error) return { list: "Directory not found.", error: true };

    if (files.information.type !== "file")
      return { list: "This is not a file.", error: true };

    return files;
  }

  createFile(path, content) {
    const pathParsed = path.split("/");
    const fileName = pathParsed.pop();
    const directory = pathParsed.join("/");
    const exist = this.getFiles(directory);

    if (exist.error) return { error: true, message: "Directory not found" };

    const fileExist = exist.list.find((file) => file.name === fileName);
    if (fileExist) return { error: true, message: "File already exist" };

    if (!this.isValidFileName(fileName))
      return { error: true, message: "Invalid file name" };

    exist.list.push({ name: fileName, type: "file", content });

    this.updateDirectoryFromRoot(directory, exist.list);

    return { error: false };
  }

  createDirectory(path) {
    const pathParsed = path.split("/");
    const fileName = pathParsed.pop();
    const directory = pathParsed.join("/");
    const exist = this.getFiles(directory);

    if (exist.error) return { error: true, message: "Directory not found" };

    const fileExist = exist.list.find((file) => file.name === fileName);
    if (fileExist) return { error: true, message: "Directory already exist" };

    if (this.isValidFileName(fileName))
      return { error: true, message: "Invalid directory name" };

    exist.list.push({ name: fileName, type: "directory", content: [] });

    this.updateDirectoryFromRoot(directory, exist.list);

    return { error: false };
  }

  deleteDirectoryOrFile(path) {
    const pathParsed = path.split("/");
    const fileName = pathParsed.pop();
    const directory = pathParsed.join("/");
    const exist = this.getFiles(directory);

    if (exist.error) return { error: true, message: "Directory not found" };

    const fileExist = exist.list.find((file) => file.name === fileName);
    if (!fileExist)
      return { error: true, message: "File or directory not found" };

    exist.list = exist.list.filter((file) => file.name !== fileName);

    this.updateDirectoryFromRoot(directory, exist.list);

    return { error: false };
  }

  isValidFileName(name) {
    const regex = /^[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9]+)+$/;
    return regex.test(name);
  }

  updateDirectoryFromRoot(path, content) {
    const pathParsed = path.split("/");
    let savePath = [...pathParsed];
    let files;
    let lastContent = content;

    pathParsed.reverse().forEach((directory) => {
      if (directory === "") return;

      const _directory = savePath.join("/");
      savePath.pop();

      const _temp = this.getFiles(_directory);

      files = _temp.information;

      if (Array.isArray(lastContent)) files.content = lastContent;
      else files.content = [lastContent];

      lastContent = files;
    });

    const result = {
      files: [lastContent],
    };
    localStorage.setItem("linuxFiles", JSON.stringify(result));

    return { error: false };
  }

  clear() {
    this.container.innerHTML = "";
  }
}
