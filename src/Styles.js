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
*/

//all classes that will be used for inspect tool
export default {
  //duplicate ids not allowed
  ids: {
    inspectTool: `
      display: block !important;
      z-index: 2147483647 !important;
      overflow: hidden !important;
      font: 12px Arial !important;
      user-select: none !important;
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
  },

  //duplicate classes not allowed
  classes: {
    absolute: `
      position: absolute !important;
    `,
    relative: `
      position: relative !important;
    `,
    fixed: `
      position: fixed !important;
    `,
    mainColor: `
      background-color: #f2f2f2 !important;
    `,
    lineColor: `
      background-color: #bfbfbf !important;
    `,
    backing: `
      background-color: #ffffff !important;
    `,
    underlined: `
      border-bottom: 1px solid #70a2ff !important;
    `,
    textColor: `
      color: #737373 !important;
    `,
    selectedTextColor: `
      color: #292929 !important;
    `,
    line: `
      position: absolute;
      background-color: #bfbfbf;
    `,
    tab: `
      display: inline-block;
      position: relative;
      width: 70px;
      height: 25px;
      min-width: 70px;
      top: 0px;
    `,
    tabText: `
      position: relative;
      text-align: center;
      top: -6px;
      font-size: 11px;
      color: #737373;
    `,
  },
};