import Command from "../Object/Command.js";

export default class Skills extends Command {
  constructor(terminal) {
    super("skills", terminal);
  }

  async exec(args) {
    this.terminal.createText("Technical skills are:");
    this.terminal.createText(
      "- JavaScript (5⭐), ReactJs (3⭐), NodeJs (4⭐), ReactNative (3⭐), Html (5⭐), Css (3⭐), Java (4⭐), Spring (2⭐), Python (3⭐)"
    );
    this.terminal.createText("- Database: MySQL (3⭐), MongoDB (5⭐)");
    this.terminal.createText("- Version control: Git (4⭐)");
    this.terminal.createText("- Tools: VS Code, Eclipse, Postman, Git Bash");
    this.terminal.createText(" ");
    this.terminal.createText("Soft skills are:");
    this.terminal.createText(
      "- Communication, Teamwork, Problem-solving, Adaptability"
    );
    this.terminal.createText(" ");
    this.terminal.createText("Languages:");
    this.terminal.createText("- French (Main), English (Professional)");
  }
}
