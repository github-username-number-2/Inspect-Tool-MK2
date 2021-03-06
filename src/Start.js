let start;

//inspect tool element object stored in navigator.__InspectToolReferenceObject__

//called when bookmark is clicked
(start = () => {
  const tool = navigator.__InspectToolReferenceObject__;
  if (tool) {
    if (tool.style.display === "none") {
      tool.style.display = "block";
    } else {
      tool.style.display = "none";
    }
  } else {
    import("/src/Main.js");
  }
})();

const request = fetch("dist/main.js");
request.then(contents => contents.text()).then(script => {
  newLink.setAttribute("href", `javascript:(${start.toString().replace(`import("/src/Main.js");`, `(()=>{${script}})()`)})()`);
});

newButton.onclick = start;