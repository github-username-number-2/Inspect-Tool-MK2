/*
main colors:
  #f2f2f2: primary color, used for backgrounds
  #bfbfbf: darker color, used for lines
  #ffffff: used for overall background color
  #e8e8e8: darker background, used for mouseover
  #737373: primary text color
  #292929: darker text color, used on text select

other colors:
  #70a2ff: lighter blue, used for selected tab underline

main z index 2147483600
max z index 2147483647
*/

//all classes that will be used for inspect tool
export default {
  //duplicate ids not allowed
  ids: {
    inspectTool: `
      display: block;
      z-index: 2147483600;
      overflow: hidden;
      font: 12px Arial;
      user-select: none;
    `,

    topBar: `
      width: 100%;
      height: 26px;
      left: 0px;
      top: 0px;
      border-bottom: 1px solid #bfbfbf;
      overflow: hidden;
    `,
    closeTool: `
      right: 4px;
      top: 4px;
      width: 18px;
      height: 18px;
      opacity: 0.7;
    `,
    showTools: `
      right: 28px;
      top: 6px;
      width: 14px;
      height: 14px;
      opacity: 0.7;
    `,
    selectElements: `
      width: 14px;
      height: 14px;
      left: 9px;
      top: 8px;
      opacity: 0.7;
    `,
    tabContainer: `
      display: flex;
      width: calc(100% - 88px);
      height: 26px;
      left: 36px;
      top: 0px;
      overflow-x: auto;
      overflow-y: hidden;
      /*extends height to hide scroll bar*/
      padding-bottom: 30px;
    `,

    bottomBar: `
      width: 100%;
      height: 18px;
      left: 0px;
      bottom: 0px;
    `,

    resizeTool: `
      width: 16px;
      height: 16px;
      right: 1px;
      bottom: 1px;
      opacity: 0.8;
      cursor: se-resize;
    `,

    consoleContainer: `
      position: absolute;
      width: 100%;
      bottom: 18px;
    `,
    consoleResize: `
      width: 100%;
      height: 18px;
      top: 0px;
      border-bottom: 1px solid #bfbfbf;
      background-color: #f2f2f2;
      cursor: ns-resize;
    `,
    consoleResizeIcon: `
      position: absolute;
      width: 16px;
      height: 14px;
      left: calc(50% - 10px);
      top: 2px;
      opacity: 0.8;
    `,
    console: `
      overflow: hidden;
    `,
    consoleInput: `
      position: absolute;
      width: 100%;
      height: calc(100% - 23px);
      left: 0px;
      bottom: 0px;
      margin: 0px;
      padding: 0px;
      padding-left: 6px;
      padding-right: 6px;
      outline: none;
      border: none;
      resize: none;
      overflow-x: hidden;
      font-family: monospace;
      font-size: 12px;
      color: #292929;
    `,

    tabContent: `
      position: absolute;
      width: 100%;
      display: flex;
      left: 0px;
      top: 28px;
    `,

    toolOptionsContainer: `
      display: none;
      position: absolute;
      right: 30px;
      top: 22px;
      border: 1px solid #bfbfbf;
      background-color: #ffffff;
    `,
  },

  //duplicate classes not allowed
  classes: {
    absolute: `
      position: absolute;
    `,
    relative: `
      position: relative;
    `,
    fixed: `
      position: fixed;
    `,
    mainColor: `
      background-color: #f2f2f2;
    `,
    lineColor: `
      background-color: #bfbfbf;
    `,
    backing: `
      background-color: #ffffff;
    `,
    underlined: `
      border-bottom: 1px solid #70a2ff;
    `,
    textColor: `
      color: #737373;
    `,
    selectedTextColor: `
      color: #292929;
    `,
    line: `
      position: absolute;
      background-color: #bfbfbf;
    `,
    tab: `
      display: inline-block;
      position: relative;
      width: auto;
      min-width: 60px;
      height: 25px;
      top: 0px;
      padding-left: 10px;
      padding-right: 10px;
    `,
    tabText: `
      position: relative;
      text-align: center;
      top: -6px;
      font-size: 11px;
      color: #737373;
      line-height: 14px;
      padding: 0px;
      margin-top: 11px;
      top: -6px;
    `,
    tabContent: `
      display: none;
      position: absolute;
    `,

    toolOption: `
      position: relative;
      width: 120px;
      height: 30px;
    `,
    toolOptionText: `
      position: relative;
      top: 8px;
      margin: 0px;
      font-size: 10px;
      color: #292929;
      text-align: center;
    `,
  },
};