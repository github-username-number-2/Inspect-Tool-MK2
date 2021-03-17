import currentState from "./CurrentState.js";
import config from "./Config.js";

import domUtils from "./DOMUtils.js";

const mouseIntervals = [];

const events = [];

const toolUtils = {
  initialize() {
    const inspectTool = domUtils.getElementById("inspectTool");
    currentState.inspectToolElement = inspectTool;

    domUtils.addEventListener("mousemove", event => {
      currentState.mouse.x = event.clientX;
      currentState.mouse.y = event.clientY;
    }, window);
    domUtils.addEventListener("mouseup", event => {
      //stops all mousemove events
      this.stopAll();

      //hides tool options
      domUtils.getElementById("toolOptionsContainer").style.display = "none";
    }, window);

    //gets list of all events
    const allowedEvents = config.allowedEvents;
    for (const key in document.createElement("p")) {
      if (key.indexOf("on") === 0 && !allowedEvents.includes(key.slice(2))) {
        events.push(key.slice(2));
      }
    }

    for (const eventName of events) {
      inspectTool.addEventListener(eventName, event => {
        event.stopPropagation();
      });
    }

    this.switchTabs(currentState.selectedTab);
  },

  clearTool() {
    const inspectTool = currentState.inspectToolElement;

    domUtils.clearEventListeners();

    inspectTool.parentElement.removeChild(inspectTool);

    delete navigator.__InspectToolReferenceObject__;
  },

  switchTabs(tabName) {
    currentState.selectedTab = tabName;

    for (const tab of domUtils.getElementById("tabContainer").children) {
      tab.children[0].style.color = "#737373";
      tab.style.borderBottom = "none";
    }

    const tab = domUtils.getElementById("tab:" + tabName);
    tab.children[0].style.color = "#292929";
    tab.style.borderBottom = "1px solid #70a2ff";

    for (const tabContent of domUtils.getElementById("tabContent").children) {
      tabContent.style.display = "none";
    }

    domUtils.getElementById("tabContent:" + tabName).style.display = "block";
  },

  showTool() {
    currentState.inspectTool.style.display = "block";
    currentState.visible = true;
  },
  hideTool() {
    currentState.inspectTool.style.display = "none";
    currentState.visible = false;
  },


  startMove() {
    const inspectTool = domUtils.getElementById("inspectTool");

    const distanceX = currentState.mouse.x - inspectTool.offsetLeft,
      distanceY = currentState.mouse.y - inspectTool.offsetTop;
    const screenWidth = innerWidth,
      screenHeight = innerHeight;

    const interval = setInterval(() => {
      let scheduledX = currentState.mouse.x - distanceX,
        scheduledY = currentState.mouse.y - distanceY;

      if (scheduledX < 0) {
        scheduledX = 0;
      }
      if (scheduledX + inspectTool.offsetWidth > screenWidth) {
        scheduledX = screenWidth - inspectTool.offsetWidth;
      }
      if (scheduledY < 0) {
        scheduledY = 0;
      }
      if (scheduledY + inspectTool.offsetHeight > screenHeight) {
        scheduledY = screenHeight - inspectTool.offsetHeight;
      }

      inspectTool.style.left = scheduledX + "px";
      inspectTool.style.top = scheduledY + "px";
    }, 10);

    mouseIntervals.push(interval);
  },
  startResize(event) {
    event.stopPropagation();

    const inspectTool = domUtils.getElementById("inspectTool");
    const consoleElement = domUtils.getElementById("console");
    const minSize = config.positioning.minSize;
    const { x, y } = currentState.mouse;

    const topBarHeight = domUtils.getElementById("topBar").offsetHeight,
      bottomBarHeight = domUtils.getElementById("bottomBar").offsetHeight,
      resizeHeight = domUtils.getElementById("consoleResize").offsetHeight;

    const left = inspectTool.offsetLeft,
      top = inspectTool.offsetTop,
      width = inspectTool.offsetWidth,
      height = inspectTool.offsetHeight;
    const distanceX = left - (left + width - x),
      distanceY = top - (top + height - y);

    const interval = setInterval(() => {
      let scheduledWidth = currentState.mouse.x - distanceX,
        scheduledHeight = currentState.mouse.y - distanceY;

      if (scheduledWidth < minSize.width) {
        scheduledWidth = minSize.width;
      }
      if (scheduledHeight < minSize.height) {
        scheduledHeight = minSize.height;
      }
      const maxConsoleHeight = scheduledHeight - topBarHeight - bottomBarHeight - resizeHeight;
      if (consoleElement.offsetHeight > maxConsoleHeight) {
        consoleElement.style.height = maxConsoleHeight + "px";
      }

      inspectTool.style.width = scheduledWidth + "px";
      inspectTool.style.height = scheduledHeight + "px";
    }, 10);
    mouseIntervals.push(interval);
  },
  startConsoleResize() {
    const inspectTool = domUtils.getElementById("inspectTool");
    const consoleElement = domUtils.getElementById("console");
    const tabContent = domUtils.getElementById("tabContent");
    const { y } = currentState.mouse;

    const topBarHeight = domUtils.getElementById("topBar").offsetHeight,
      bottomBarHeight = domUtils.getElementById("bottomBar").offsetHeight,
      resizeHeight = domUtils.getElementById("consoleResize").offsetHeight,
      consoleTop = domUtils.getElementById("consoleContainer").offsetTop;

    const top = inspectTool.offsetTop,
      height = inspectTool.offsetHeight;
    const distanceY = y - (top + consoleTop);

    const maxHeight = height - topBarHeight - bottomBarHeight - resizeHeight;

    const interval = setInterval(() => {
      let scheduledHeight = height - (currentState.mouse.y + bottomBarHeight - top + (resizeHeight - distanceY));

      if (scheduledHeight < 0) {
        scheduledHeight = 0;
      }
      if (scheduledHeight > maxHeight) {
        scheduledHeight = maxHeight;
      }

      consoleElement.style.height = scheduledHeight + "px";
      tabContent.style.height = height - scheduledHeight - topBarHeight - bottomBarHeight - resizeHeight + "px";
    }, 10);
    mouseIntervals.push(interval);
  },
  stopAll() {
    for (const id of mouseIntervals) {
      clearInterval(mouseIntervals.pop());
    }
  },

  runToolOption(optionName) {
    for (const tool of config.toolOptions) {
      if (tool.name === optionName) {
        tool.func();
        
        break;
      }
    }
  },
};

export default toolUtils;