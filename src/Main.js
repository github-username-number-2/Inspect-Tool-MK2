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
  (() => {
    const inspectTool = domUtils.getElementById("inspectTool");
    const consoleElement = domUtils.getElementById("console");
    const tabContent = domUtils.getElementById("tabContent");
    
    const topBarHeight = domUtils.getElementById("topBar").offsetHeight,
      bottomBarHeight = domUtils.getElementById("bottomBar").offsetHeight,
      resizeHeight = domUtils.getElementById("consoleResize").offsetHeight;

    const height = inspectTool.offsetHeight;
    
    const maxHeight = height - topBarHeight - bottomBarHeight - resizeHeight;

    let scheduledHeight = defaultConsoleHeight;

    if (scheduledHeight < 0) {
      scheduledHeight = 0;
    }
    if (scheduledHeight > maxHeight) {
      scheduledHeight = maxHeight;
    }

    consoleElement.style.height = scheduledHeight + "px";
    tabContent.style.height = height - scheduledHeight - topBarHeight - bottomBarHeight - resizeHeight + "px";
  })();

  //creates reference to inspect tool dom element
  Object.defineProperty(navigator, "__InspectToolReferenceObject__", {
    configurable: true,
    enumerable: false,
    writable: false,
    value: inspectTool,
  });

  const tabContainer = domUtils.getElementById("tabContainer");
  const tabContentContainer = domUtils.getElementById("tabContent");
  const toolOptionsContainer = domUtils.getElementById("toolOptionsContainer");

  config.tabs.forEach(tab => {
    domUtils.createElement("tab", [tab.name], tabContainer);
    domUtils.createElement("tabContent", [tab.name], tabContentContainer);
  });
  config.toolOptions.forEach(option => {
    domUtils.createElement("toolOption", [option.name, option.text], toolOptionsContainer);
  });

  toolUtils.initialize();
})();