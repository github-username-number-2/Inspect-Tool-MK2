import currentState from "./CurrentState.js";
import images from "./Images.js";
import domUtils from "./DOMUtils.js";
import toolUtils from "./ToolUtils.js";

//the DOM tree of the inspect tool
export default {
  inspectTool: {
    //optional, identifier used for object, id attribute will not be set
    id: "inspectTool",

    //name of element tag
    type: "div",

    //optional, properties that will be set on created element, example: { src: images.image1 }
    properties: {},

    //optional, classes will be set in style attribute
    classes: ["fixed", "backing"],

    //reference to element, will be set on initialization
    element: null,

    //optional
    initialize: (element, x, y, width, height) => {
      element.style.left = x + "px";
      element.style.top = y + "px";
      element.style.width = width + "px";
      element.style.height = height + "px";
    },

    //optional, all child elements
    elements: [
      {
        id: "topBar",
        type: "div",
        classes: ["mainColor", "absolute"],
        initialize: element => {
          element.addEventListener("mousedown", event => {
            toolUtils.startMove(event);
          });
        },
        elements: [
          {
            id: "closeTool",
            type: "img",
            classes: ["absolute"],
            properties: { src: images.closeTool },
            initialize: element => {
              element.addEventListener("mousedown", event => {
                event.stopPropagation();
              });
              element.addEventListener("mouseover", () => {
                element.style.opacity = "0.5";
              });
              element.addEventListener("mouseout", () => {
                element.style.opacity = "0.7";
              });
              element.addEventListener("click", () => {
                toolUtils.hideTool();
              });
            },
          },
          {
            id: "showTools",
            type: "img",
            classes: ["absolute"],
            properties: { src: images.showTools },
            initialize: element => {
              element.addEventListener("mouseover", () => {
                element.style.opacity = "0.5";
              });
              element.addEventListener("mouseout", () => {
                element.style.opacity = "0.7";
              });
            },
          },
          {
            type: "div",
            classes: ["line"],
            initialize: element => {
              element.style.cssText += `
                width: 1px;
                height: 16px;
                right: 46px;
                top: 5px;
              `;
            },
          },
          {
            type: "div",
            classes: ["line"],
            initialize: element => {
              element.style.cssText += `
                width: 1px;
                height: 16px;
                left: 30px;
                top: 5px;
              `;
            },
          },
          {
            id: "selectElements",
            type: "img",
            classes: ["absolute"],
            properties: { src: images.selectElements },
            initialize: element => {
              element.addEventListener("mouseover", () => {
                element.style.opacity = "0.5";
              });
              element.addEventListener("mouseout", () => {
                element.style.opacity = "0.7";
              });
            },
          },
          {
            id: "tabContainer",
            type: "div",
            classes: ["absolute"],
          },
          {
            id: "toolOptionsContainer",
            type: "div",
          },
        ],
      },
      {
        id: "bottomBar",
        type: "div",
        classes: ["mainColor", "absolute"],
        initialize: element => {
          element.addEventListener("mousedown", () => {
            toolUtils.startMove();
          });
        },
        elements: [
          {
            id: "resizeTool",
            type: "img",
            classes: ["absolute"],
            properties: { src: images.resize },
            initialize: element => {
              element.addEventListener("mousedown", event => {
                toolUtils.startResize(event);
              });
            },
          },
        ],
      },
      {
        id: "tabContent",
        type: "div",
      },
      {
        id: "consoleContainer",
        type: "div",
        elements: [
          {
            id: "consoleResize",
            type: "div",
            initialize: element => {
              element.addEventListener("mousedown", () => {
                toolUtils.startConsoleResize();
              });
            },
            elements: [
              {
                id: "consoleResizeIcon",
                type: "img",
                properties: { src: images.resizeConsole },
              },
            ],
          },
          {
            id: "console",
            type: "div",
            elements: [
              {
                id: "consoleInput",
                type: "textarea",
                initialize: element => {
                  element.setAttribute("spellcheck", "false");
                  element.addEventListener("keydown", event => {
                    if (event.code === "Enter") {
                      event.preventDefault();
                      
                      if (event.shiftKey) {
                        const text = element.value,
                          start = element.selectionStart,
                          end = element.selectionEnd;

                        element.value = text.slice(0, start) + "\n" + text.slice(end);
                        element.setSelectionRange(end + 1, end + 1)
                      } else {
                        domUtils.injectCode(element.value, window);
                        element.value = "";
                      }
                    }
                  });
                },
              },
            ],
          },
        ],
      },
    ],
  },

  tab: {
    type: "div",
    classes: ["tab"],
    initialize: (tab, name) => {
      domUtils.createElement(
        {
          type: "p",
          classes: ["tabText"],
          properties: { innerHTML: name },
        },
        [],
        tab,
      );

      domUtils.assignID(tab, "tab:" + name);

      tab.addEventListener("mouseover", () => {
        tab.style.backgroundColor = "#e8e8e8";

        if (currentState.selectedTab !== name) {
          tab.children[0].style.color = "#292929";
          tab.style.borderBottom = "1px solid #e8e8e8";
        }
      });
      tab.addEventListener("mouseout", () => {
        tab.style.backgroundColor = "";

        if (currentState.selectedTab !== name) {
          tab.children[0].style.color = "#737373";
          tab.style.borderBottom = "";
        }
      });

      tab.addEventListener("click", () => {
        toolUtils.switchTabs(name);
      });
    },
  },

  tabContent: {
    type: "div",
    classes: ["tabContent"],
    initialize: (element, name) => {
      element.innerHTML = name;

      domUtils.assignID(element, "tabContent:" + name);
    },
  },

  "Elements": [
    //
  ],
};