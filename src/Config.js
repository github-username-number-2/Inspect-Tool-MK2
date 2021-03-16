export default {
  tabs: [
    {
      name: "Elements",
    },
    {
      name: "Network",
    },
    {
      name: "Sources",
    },
    {
      name: "Application",
    },
    {
      name: "About",
    },
  ],

  //events that are allowed to propagate out of the inspect tool
  allowedEvents: [
    "mousemove",
    "mouseup",
  ],

  positioning: {
    defaultPosition: {
      x: 0,
      y: 0,
    },

    defaultSize: {
      width: 300,
      height: 300.
    },
    defaultConsoleHeight: 100,

    minSize: {
      width: 200,
      height: 200,
    },
  },
};