import Terminal from "./Object/Terminal.js";
const fullscreen = document.getElementById("fullscreen");
const terminalComponent = document.getElementById("terminal");

const getConfig = async () => {
  const response = await fetch("/config.json");
  const data = await response.json();
  return data;
};

const getDefaultFile = async () => {
  const response = await fetch("/defaultFiles.json");
  const data = await response.json();
  return data;
};

export { getConfig, getDefaultFile };

const terminal = new Terminal();

fullscreen.addEventListener("click", () => {
  if (terminalComponent.classList.contains("fullscreen"))
    terminalComponent.classList.remove("fullscreen");
  else terminalComponent.classList.add("fullscreen");
});
