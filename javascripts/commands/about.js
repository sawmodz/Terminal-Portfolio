import Command from "../Object/Command.js";

export default class About extends Command {
  constructor(terminal) {
    super("about", terminal);
  }

  async exec(args) {
    this.terminal.createText(`Hello 😊,
      I am a young French developer passionate about development. I am proficient in several languages, particularly JavaScript, and I specialize in working with frameworks such as ReactJS, NodeJS, and React Native. I'm actually work in freelance, where I take on various projects for the joy of development!
      I also work at a company where I develop web interfaces to change the world of tomorrow. With five years of experience under my belt, I strive every day to improve and perfect my skills.`);
  }
}
