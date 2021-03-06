import elements from "./Elements.js";
import styles from "./Styles.js";

const elementIDs = {};
const elementClasses = {};

const eventListeners = [];

export default {
  //element data can be passed as name
  createElement(name, args = [], parent = document.body) {
    const elementData = typeof name === "string" ? elements[name] : name;

    const element = document.createElement(elementData.type);
    //always disable drag
    element.addEventListener("dragstart", event => event.preventDefault());

    let elementStyles = "";
    if (elementData.id) {
      elementIDs[elementData.id] = element;
    }
    if (styles.ids[elementData.id]) {
      elementStyles += styles.ids[elementData.id];
    }

    if (elementData.classes) {
      for (const className of elementData.classes) {
        elementStyles += styles.classes[className].trim();

        elementClasses[className] = elementClasses[className] || [];
        elementClasses[className].push(element);
      }
    }
    element.style.cssText += elementStyles;

    elementData.initialize && elementData.initialize(element, ...args);

    if (elementData.elements) {
      for (const child of elementData.elements) {
        this.createElement(child, [], element);
      }
    }

    elementData.properties && Object.assign(element, elementData.properties);
    elementData.element = element;

    parent.appendChild(element);

    return element;
  },

  injectCode(code, targetWindow) {
    targetWindow.eval(code);
  },

  addEventListener(event, listener, object) {
    object.addEventListener(event, listener);
    eventListeners.push({
      event,
      listener,
      object,
    });
  },

  clearEventListeners() {
    for (const listenerData of eventListeners) {
      const { event, listener, object } = eventListeners.shift();
      object.removeEventListener(event, listener);
    }
  },

  getElementById(id) {
    return elementIDs[id];
  },
  getElementsByClassName(className) {
    return elementClasses[className];
  },

  assignID(element, id) {
    elementIDs[id] = element;
  },
  assignClasses(element, classes) {
    for (const className of classes) {
      elementClasses[className] = elementClasses[className] || [];
      elementClasses.push(className);
    }
  }
};