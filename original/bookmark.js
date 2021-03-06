!function () {
  const directory = "https://Inspect-Tool.lilpeen.repl.co/original/";
  window.__inspect__ = () => {
    "use strict";

    let inspectTool = elementId("__inspect_tool__");
    if (inspectTool) {
      const display = inspectTool.style.display;
      if (display === "block") {
        inspectTool.style.display = "none";
      } else {
        inspectTool.style.display = "block";
      }
      return;
    }



    const settings = __inspect__.settings = {
      defaultSize: {
        width: 400,
        height: 400
      },
      minSize: {
        width: 200,
        height: 200
      },

      defaultPos: {
        x: 0,
        y: 0
      },

      padding: "0px",
      mainColor: "#f2f2f2",
      secondaryColor: "#bfbfbf",
      backingColor: "#ffffff",
      zIndex: "2147483547",

      console: {
        defaultSize: {
          height: 100
        }
      },

      tabs: {
        width: 80,
        selectColor: "#292929",
        selectBackgroundColor: "#e8e8e8",
        underlineSelectColor: "#70a2ff",
        fontColor: "#737373",
        fontSize: 12,
        toolFontSize: 10,

        defTab: "Elements",

        allTabs: [
          "Elements",
          "Console",
          "Sources",
          "Network",
          "Application"
        ],

        tabMenu: {
          width: 80,
          heightPerTab: 28
        },

        allTools: {
          "Cancel_element_loading": function () {
            window.stop();
          },
          "Clear_inspect_tool": function () {
            document.body.removeChild(elementId("__inspect_tool__:script"));
            document.body.removeChild(elementId("__inspect_tool__"));

            delete window.__inspect__;
          }
        },

        toolMenu: {
          width: 120,
          heightPerRow: 24
        }
      },

      selectMode: false,
      tabsExpanded: false,
      toolsExpanded: false
    }
    const tabSettings = settings.tabs;

    //settings ^
    //settings ^
    //settings ^
    //settings ^

    inspectTool = createElement("div", document.body, {
      "style":
        `position:fixed;
                overflow:hidden;
                display:block;
                z-index:${settings.zIndex};
                width:${settings.defaultSize.width}px;
                height:${settings.defaultSize.height}px;
                left:${settings.defaultPos.x}px;
                top:${settings.defaultPos.y}px;
                padding:${settings.padding};
                background-color:${settings.backingColor};
                cursor:default;`,
      "id": "__inspect_tool__"
    });

    createElement("div", inspectTool, {
      "style":
        `position:absolute;
                box-sizing:border-box;
                width:100%;
                height:${settings.defaultSize.height - 42}px;
                left:0px;
                top:26px;
                background-color:#ffffff;
                z-index:10;`,
      "id": "__inspect_tool__:content"
    });

    inspectTool.onselectstart = new Function("return false");
    inspectTool.oncontextmenu = new Function("return false");



    const bars = __inspect__.bars = {
      topBar: createBar("0", "0", "100%", "26px", "top", true),
      bottomBar: createBar("0", "0", "100%", "16px", "bottom")
    }

    const separators = [
      createSeparator(16, 30, "left", __inspect__.bars.topBar),
      createSeparator(16, 50, "right", __inspect__.bars.topBar)
    ];

    const imgs = {
      resize: createImg(
        "0px", "0px", "16px", "auto", "right",
        bars.bottomBar, directory + "imgs/resize.png"
      ),
      exit: createButton(
        "4px", "4px", "18px", "auto", "right",
        bars.topBar, directory + "imgs/exit.png",
        ["onmouseover", "onmouseout", "onclick"],
        [
          function () {
            this.style.opacity = "0.5";
          },
          function () {
            this.style.opacity = "0.8";
          },
          function () {
            __inspect__();
          }
        ],
        "Close",
        function (e) {
          e.style.opacity = "0.8";
        }
      ),
      select: createButton(
        "8px", "8px", "14px", "auto", "left",
        bars.topBar, directory + "imgs/select.png",
        ["onmouseover", "onmouseout", "onclick"],
        [
          function () {
            this.style.opacity = "1";
          },
          function () {
            if (!settings.selectMode) {
              this.style.opacity = "0.5";
            }
          },
          function () {
            toggleSelect(this);
          }
        ],
        "Select an element on the page to inspect it",
        function (elm) {
          elm.style.opacity = "0.5";
        }
      ),
      expandTabs: createDivButton(
        "0px", "0px", "26px", "25px", "left", bars.topBar,
        ["onmouseover", "onmouseout", "onclick"],
        [
          function () {
            this.style.backgroundColor = tabSettings.selectBackgroundColor;
          },
          function () {
            if (!settings.tabsExpanded) {
              this.style.backgroundColor = __inspect__.settings.mainColor;
            }
          },
          function () {
            expandTabs(true);
          }
        ],
        "",
        function (e) {
          e.style.opacity = "0.9";
          e.style.left = settings.tabs.allTabs.length * settings.tabs.width + 39 + "px";
          e.id = "__inspect_tool__:imgs:expandTabs";
        }
      ),
      expandTabsImg: createImg(
        "8px", "8px", "10px", "auto", "left",
        elementId("__inspect_tool__:imgs:expandTabs"), directory + "imgs/showTabs.png"
      ),
      moreTools: createButton(
        "29px", "6px", "14px", "auto", "right",
        bars.topBar, directory + "imgs/moreTools.png",
        ["onmouseover", "onmouseout", "onclick"],
        [
          function () {
            this.style.opacity = "0.5";
          },
          function () {
            this.style.opacity = "0.8";
          },
          function () {
            showTools(true);
          }
        ],
        "More Tools",
        function (e) {
          e.style.opacity = "0.8";
          e.id = "__inspect_tool__:imgs:moreTools";
        }
      )
    }

    //creates tabs
    !function () {
      const tabs = settings.tabs.allTabs;

      for (let i = 0, l = tabs.length; i < l; i++) {
        tabs[i] = createTab(tabs[i], i);
      }

      const defTab = elementId("__inspect_tool__:tab:" + settings.tabs.defTab);
      defTab.selected = true;
      defTab.children[0].style.color = settings.tabs.selectColor;
      defTab.style.borderBottom = "1px solid" + settings.tabs.underlineSelectColor;

      const tabMenu = createElement("div", elementId("__inspect_tool__:content"), {
        "style":
          `position:absolute;
                    display:none;
                    width:${tabSettings.tabMenu.width}px;
                    height:${tabSettings.allTabs.length * tabSettings.tabMenu.heightPerTab}px;
                    left:0px;
                    top:0px;
                    border:1px solid ${settings.secondaryColor}`,
        "id": "__inspect_tool__:content:tabMenu"
      });

      for (let i = 0, l = tabs.length - 1; i < l; i++) {
        createExpandableTabs(tabs[i + 1].id.substring(21), i);
      }

      updateVisibleTabs();

      const toolKeys = Object.keys(tabSettings.allTools),
        tools = tabSettings.allTools;
      const toolMenu = createElement("div", elementId("__inspect_tool__:content"), {
        "style":
          `position:absolute;
                    display:none;
                    width:${tabSettings.toolMenu.width}px;
                    height:${toolKeys.length * tabSettings.toolMenu.heightPerRow}px;
                    right:0px;
                    top:0px;
                    border:1px solid ${settings.secondaryColor}`,
        "id": "__inspect_tool__:content:toolMenu"
      });

      for (let i = 0, l = toolKeys.length; i < l; i++) {
        const currentKey = toolKeys[i];
        createTool(currentKey, tools[currentKey], i);
      }
    }();

    //creates console creates console creates console creates console creates console
    //creates console creates console creates console creates console creates console
    //creates console creates console creates console creates console creates console
    !function () {
      //change all logging
      const consoleInfo = [];
      const defConsole = Object.assign({}, console);
      !function () {
        const keys = Object.keys(defConsole);
        for (let i = 0, l = keys.length; i < l; i++) {
          let k = keys[i];
          console[k] = function () {
            consoleInfo.push({
              type: k,
              items: arguments
            });
            defConsole[k].apply(defConsole, arguments);
          }
        }
      }();
      //log errors
      window.addEventListener("error", function (e) {
        consoleInfo.push({
          type: "error",
          items: e
        });
      }, true);

      const consoleSettings = __inspect__.settings.console;

      const consoleBox = createElement("div", elementId("__inspect_tool__:content"), {
        "style":
          `position:absolute;
                    width:100%;
                    height:${consoleSettings.defaultSize.height}px;
                    left:0px;
                    bottom:0px;`,
        "id": "__inspect_tool__:content:console"
      });
      const dragBar = createElement("div", consoleBox, {
        "style":
          `position:absolute;
                    width:100%;
                    height:8px;
                    top:0px;
                    left:0px;
                    background-color:${settings.mainColor}`
      });
    }();
    //creates console creates console creates console creates console creates console
    //creates console creates console creates console creates console creates console
    //creates console creates console creates console creates console creates console

    //element tab element tab element tab element tab element tab element tab element tab
    //element tab element tab element tab element tab element tab element tab element tab



    //element tab element tab element tab element tab element tab element tab element tab
    //element tab element tab element tab element tab element tab element tab element tab

    const mouse = {
      x: null,
      y: null,

      intervals: []
    }

    //dragging
    document.onmousemove = function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    bars.topBar.onmousedown = function (e) {
      const distanceX = e.offsetX - inspectTool.clientLeft,
        distanceY = e.offsetY - inspectTool.clientTop;

      mouse.intervals.push(setInterval(() => {
        inspectTool.style.left = mouse.x - distanceX + "px";
        inspectTool.style.top = mouse.y - distanceY + "px";
      }, 20));
    }
    //dragging
    //resizing
    imgs.resize.title = "Resize";

    imgs.resize.onmousedown = function (e) {
      const minWidth = settings.minSize.width,
        minHeight = settings.minSize.height;

      const distanceX = e.offsetX + imgs.resize.clientLeft,
        distanceY = e.offsetY + imgs.resize.clientTop;

      mouse.intervals.push(setInterval(() => {
        const width = mouse.x - inspectTool.offsetLeft + distanceX,
          height = mouse.y - inspectTool.offsetTop + distanceY;

        if (width > minWidth) {
          inspectTool.style.width = width + "px";
        }
        if (height > minHeight) {
          inspectTool.style.height = height + "px";
          elementId("__inspect_tool__:content").style.height = height - 42 + "px";
        }

        updateVisibleTabs();
      }, 20));
    }
    //resizing
    //clear all mouse intervals
    document.onmouseup = function (e) {
      for (let i = 0, l = mouse.intervals.length; i < l; i++) {
        clearInterval(mouse.intervals[i]);
      }
    }

    //recursive function to disable propagation for all elements
    !function () {
      function disablePropagation(e) {
        e.addEventListener("mousedown", e => {
          e.stopPropagation();
        });

        const c = e.children;
        for (let i = 0, l = c.length; i < l; i++) {
          disablePropagation(c[i]);
        }
      }
      disablePropagation(inspectTool);
    }();
  }





  if (__ready__) {
    __ready__ = false;
    __inspect__();
  }


  function elementId(id) {
    return document.getElementById(id);
  }

  function createElement(node, appendNode, attributes = {}, properties = {}) {
    var e = document.createElement(node);

    for (var l in attributes) {
      e.setAttribute(l, attributes[l]);
    }

    for (var o in properties) {
      e[o] = properties[o];
    }

    appendNode.appendChild(e);
    return e;
  }

  function createBar(x, y, w, h, pos, ul) {
    const e = createElement("div", elementId("__inspect_tool__"), {
      "style":
        `background-color:${__inspect__.settings.mainColor};
                position:absolute;
                box-sizing:border-box;
                left:${x};
                ${pos}:${y};
                width:${w};
                height:${h};`
    });

    if (ul) {
      e.style.borderBottom = "1px solid" + __inspect__.settings.secondaryColor;
    }
    return e;
  }

  function createImg(x, y, w, h, pos, node, src) {
    return createElement("img", node, {
      "style":
        `position:absolute;
                ${pos}:${x};
                top:${y};
                width:${w};
                height:${h};`,
      "draggable": "false",
      "src": src
    });
  }

  function createButton(x, y, w, h, pos, node, src, listeners, events, title, func) {
    const e = createImg(x, y, w, h, pos, node, src);
    if (listeners) {
      for (let i = 0, l = listeners.length; i < l; i++) {
        e[listeners[i]] = events[i];
      }
    }
    e.title = title;
    if (func) {
      func(e);
    }
    return e;
  }
  function createDivButton(x, y, w, h, pos, node, listeners, events, title, func) {
    const e = createElement("div", node, {
      "style":
        `position:absolute;
                ${pos}:${x};
                top:${y};
                width:${w};
                height:${h};`
    });
    if (listeners) {
      for (let i = 0, l = listeners.length; i < l; i++) {
        e[listeners[i]] = events[i];
      }
    }
    e.title = title;
    if (func) {
      func(e);
    }
    return e;
  }

  function createTab(name, index) {
    const tabSettings = __inspect__.settings.tabs;

    const e = createElement("div", __inspect__.bars.topBar, {
      "style":
        `background-color:${__inspect__.settings.mainColor};
                position:absolute;
                margin-top:0px;
                box-sizing:border-box;
                padding:0px;
                left:${index * tabSettings.width + 36}px;
                top:0px;
                width:${tabSettings.width}px;
                height:25px;`,
      "class": "__inspect_tool__:tab"
    }, {
        innerHTML:
          `<p style="position:relative;
                    top:4px;
                    color:${tabSettings.fontColor};
                    text-align:center;
                    margin:0px;
                    font-family:Arial;
                    font-size:${tabSettings.fontSize}px;">
                    ${name}</p>`,
        "id": "__inspect_tool__:tab:" + name
      });

    e.children[0].style.top = 12 - e.children[0].clientHeight / 2 + "px";

    e.onmouseover = function () {
      this.style.backgroundColor = tabSettings.selectBackgroundColor;
      this.children[0].style.color = tabSettings.selectColor;
    }
    e.onmouseout = function () {
      this.style.backgroundColor = __inspect__.settings.mainColor;

      if (!this.selected) {
        this.children[0].style.color = tabSettings.fontColor;
      }
    }
    e.onclick = function () {
      const tabs = document.getElementsByClassName("__inspect_tool__:tab");
      for (let i = 0, l = tabs.length; i < l; i++) {
        tabs[i].selected = false;
        tabs[i].children[0].style.color = tabSettings.fontColor;
        tabs[i].style.borderBottom = null;
        elementId("__inspect_tool__:content:" + tabs[i].id.substring(21)).style.display = "none";
      }

      this.selected = true;
      this.children[0].style.color = tabSettings.selectColor;
      this.style.borderBottom = "1px solid" + tabSettings.underlineSelectColor;
      elementId("__inspect_tool__:content:" + this.id.substring(21)).style.display = "block";
    }

    createElement("div", elementId("__inspect_tool__:content"), {
      "style":
        `background-color:#ffffff;
                position:absolute;
                box-sizing:border-box;
                padding:0px;
                left:0px;
                top:0px;
                width:100%;
                height:100%;`,
      "id": "__inspect_tool__:content:" + name
    });

    return e;
  }

  function createSeparator(height, x, pos, node) {
    return createElement("div", node, {
      "style":
        `background-color:${__inspect__.settings.secondaryColor};
                position:absolute;
                box-sizing:border-box;
                padding:0px;
                ${pos}:${x}px;
                top:${(node.offsetHeight - height) / 2}px;
                width:1px;
                height:${height}px;`
    });
  }



  function toggleSelect(e) {
    const settings = __inspect__.settings;

    if (settings.selectMode) {
      settings.selectMode = false;
      e.src = directory + "imgs/select.png";
    } else {
      settings.selectMode = true;
      e.src = directory + "imgs/select:selected.png";
    }
  }
  function expandTabs(button) {
    if (__inspect__.toolsExpanded && button) {
      showTools();
    }

    const tabSettings = __inspect__.settings.tabs;

    if (__inspect__.tabsExpanded) {
      __inspect__.tabsExpanded = false;
      elementId("__inspect_tool__:imgs:expandTabs").style.backgroundColor = __inspect__.settings.mainColor;
      elementId("__inspect_tool__:content:tabMenu").style.display = "none";
    } else {
      __inspect__.tabsExpanded = true;
      elementId("__inspect_tool__:imgs:expandTabs").style.backgroundColor = tabSettings.selectBackgroundColor;
      elementId("__inspect_tool__:content:tabMenu").style.display = "block";
    }
  }
  function showTools(button) {
    if (__inspect__.tabsExpanded && button) {
      expandTabs();
    }

    if (__inspect__.toolsExpanded) {
      __inspect__.toolsExpanded = false;
      elementId("__inspect_tool__:content:toolMenu").style.display = "none";
    } else {
      __inspect__.toolsExpanded = true;
      elementId("__inspect_tool__:content:toolMenu").style.display = "block";
    }
  }
  function updateVisibleTabs() {
    const tabSettings = __inspect__.settings.tabs;
    const allTabsLen = tabSettings.allTabs.length;

    for (let i = 0; i < allTabsLen; i++) {
      tabSettings.allTabs[i].style.display = "none";
    }

    const width = elementId("__inspect_tool__").offsetWidth - 120,
      num = Math.floor(width / tabSettings.width);

    for (let i = 0, l = num > allTabsLen ? allTabsLen : num; i < l; i++) {
      tabSettings.allTabs[i].style.display = "block";
    }

    elementId(
      "__inspect_tool__:imgs:expandTabs"
    ).style.left = num > allTabsLen ? allTabsLen - 1 : num * tabSettings.width + 36 + "px";

    const tabMenu = elementId("__inspect_tool__:content:tabMenu");
    tabMenu.style.left = elementId("__inspect_tool__:imgs:expandTabs").style.left;
    tabMenu.style.height = (allTabsLen - num) * tabSettings.tabMenu.heightPerTab + "px";

    if (num >= allTabsLen) {
      elementId("__inspect_tool__:imgs:expandTabs").style.display = "none";
      if (__inspect__.tabsExpanded) {
        expandTabs(true);
      }
    } else {
      elementId("__inspect_tool__:imgs:expandTabs").style.display = "block";
    }

    for (let i = 0; i < allTabsLen - 1; i++) {
      elementId(
        "__inspect_tool__:expandableTabs:" + tabSettings.allTabs[i + 1].id.substring(21)
      ).style.display = "none";
    }

    for (let i = num; i < allTabsLen; i++) {
      const currentElm = elementId("__inspect_tool__:expandableTabs:" + tabSettings.allTabs[i].id.substring(21));

      currentElm.style.top = (i - num) * tabSettings.tabMenu.heightPerTab + "px";
      currentElm.style.display = "block";
    }
  }
  function createExpandableTabs(name, index) {
    const tabSettings = __inspect__.settings.tabs;

    createDivButton(
      "0px", index * tabSettings.tabMenu.heightPerTab + "px",
      tabSettings.tabMenu.width + "px", tabSettings.tabMenu.heightPerTab + "px",
      "left", elementId("__inspect_tool__:content:tabMenu"),
      ["onmouseover", "onmouseout", "onclick"],
      [
        function () {
          this.style.backgroundColor = tabSettings.selectBackgroundColor;
        },
        function () {
          this.style.backgroundColor = "#ffffff";
        },
        function () {
          const tabs = document.getElementsByClassName("__inspect_tool__:tab");
          for (let i = 0, l = tabs.length; i < l; i++) {
            tabs[i].selected = false;
            tabs[i].children[0].style.color = tabSettings.fontColor;
            tabs[i].style.borderBottom = null;
            elementId("__inspect_tool__:content:" + tabs[i].id.substring(21)).style.display = "none";
          }

          const mainTab = elementId("__inspect_tool__:tab:" + this.id.substring(32));
          mainTab.selected = true;
          mainTab.children[0].style.color = tabSettings.selectColor;
          mainTab.style.borderBottom = "1px solid" + tabSettings.underlineSelectColor;
          elementId("__inspect_tool__:content:" + this.id.substring(32)).style.display = "block";

          expandTabs(true);
        }
      ],
      "",
      function (e) {
        e.id = "__inspect_tool__:expandableTabs:" + name;
        e.innerHTML =
          `<p style="position:absolute;
                    top:7px;
                    left:8px;
                    color:#000000;
                    margin:0px;
                    font-family:Arial;
                    font-size:${tabSettings.fontSize}px;">
                    ${name}</p>`;
      }
    );
  }
  function createTool(name, func, index) {
    name = name.replace(/_/g, "&nbsp;");

    const tabSettings = __inspect__.settings.tabs;

    createDivButton(
      "0px", index * tabSettings.toolMenu.heightPerRow + "px",
      tabSettings.toolMenu.width + "px", tabSettings.toolMenu.heightPerRow + "px",
      "left", elementId("__inspect_tool__:content:toolMenu"),
      ["onmouseover", "onmouseout", "onclick"],
      [
        function () {
          this.style.backgroundColor = tabSettings.selectBackgroundColor;
        },
        function () {
          this.style.backgroundColor = "#ffffff";
        },
        func
      ],
      "",
      function (e) {
        e.id = "__inspect_tool__:expandableTabs:" + name;
        e.innerHTML =
          `<p style="position:absolute;
                    top:7px;
                    left:8px;
                    color:#000000;
                    margin:0px;
                    font-family:Arial;
                    font-size:${tabSettings.toolFontSize}px;">
                    ${name}</p>`;
      }
    );
  }
}();

/*
var domTree = elementId("dom-tree");
//output
var page = elementId("page");
//body
var highlight = elementId("highlight");



// THE CREATION OF THE DOM TREE LOGIC

function createDomTree() {
  domTree.innerHTML = "";

  function walkElement(element, indent = 0) {
    domTree.appendChild(document.createTextNode("  ".repeat(indent)));

    var span = document.createElement("span");
    span.textContent = "<" + element.tagName.toLowerCase() + ">";
    span.attachedElement = element;
    element.attachedDomTreeElement = span;
    span.className = "dom-element";
    domTree.appendChild(span);

    domTree.appendChild(document.createTextNode("\n"));

    for (let child of element.children) {
      walkElement(child, indent + 1);
    }
  }

  walkElement(page);
}



// THE HIGHLIGHTING LOGIC

let currentlyHighlightedItem = null;

function highlightElement(element, domTreeElement) {
  if (currentlyHighlightedItem == element)
    return;

  let rect = element.getBoundingClientRect();

  highlight.style.left = rect.x + "px";
  highlight.style.top = rect.y + "px";
  highlight.style.width = rect.width + "px";
  highlight.style.height = rect.height + "px";

  page.appendChild(highlight);
  
  let selectedDomTreeElement = document.querySelector(".dom-element.selected");
  if(selectedDomTreeElement) {
  	selectedDomTreeElement.classList.remove("selected");
  }
  domTreeElement.classList.add("selected");

  currentlyHighlightedItem = element;
}



// EVENTS

// on the dom tree elements

domTree.addEventListener("mousemove", function(e) {
  let target = e.target;
  if (target.classList.contains("dom-element")) {
    highlightElement(target.attachedElement, target);
  }
}, true);

domTree.addEventListener("mouseleave", function(e) {
  highlight.remove();
  currentlyHighlightedItem = null;
  let selectedDomTreeElement = document.querySelector(".dom-element.selected");
  if(selectedDomTreeElement) {
  	selectedDomTreeElement.classList.remove("selected");
  }
});

// on the page itself

page.addEventListener("mousemove", function(e) {
  let target = e.target;
  if (target.attachedDomTreeElement) {
    highlightElement(target, target.attachedDomTreeElement);
  }
}, true);

page.addEventListener("mouseleave", function(e) {
  highlight.remove();
  currentlyHighlightedItem = null;
  let selectedDomTreeElement = document.querySelector(".dom-element.selected");
  if(selectedDomTreeElement) {
  	selectedDomTreeElement.classList.remove("selected");
  }
});

// BOOTSTRAP

createDomTree();

*/