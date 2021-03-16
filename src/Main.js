import currentState from "./CurrentState.js";
import config from "./Config.js";

import domUtils from "./DOMUtils.js";
import toolUtils from "./ToolUtils.js";

(function () {
  const { defaultPosition, defaultSize, defaultConsoleHeight } = config.positioning;

  const inspectTool = currentState.inspectTool = domUtils.createElement(
    "inspectTool",
    [
      defaultPosition.x,
      defaultPosition.y,
      defaultSize.width,
      defaultSize.height,
    ],
  );

  //sets default console height from config
  domUtils.getElementById("console").style.height = defaultConsoleHeight + "px";
  domUtils.getElementById("consoleResize").dispatchEvent(new Event("mousedown"));
  setTimeout(toolUtils.stopAll, 10);

  //creates reference to inspect tool dom element
  Object.defineProperty(navigator, "__InspectToolReferenceObject__", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: inspectTool,
  });

  const tabContainer = domUtils.getElementById("tabContainer");
  const tabContentContainer = domUtils.getElementById("tabContent");

  config.tabs.forEach((tab, index) => {
    domUtils.createElement("tab", [tab.name], tabContainer);
    domUtils.createElement("tabContent", [tab.name], tabContentContainer);
  });

  toolUtils.initialize();
})();