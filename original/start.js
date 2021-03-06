//__inspect__ will be the name of the function
//color: #a1a1a1
function start() {
  !function () {
    const directory = "https://Inspect-Tool.lilpeen.repl.co/original/";
    if (typeof __inspect__ === "function") {
      __inspect__();
    } else {
      let e = document.createElement("script");
      e.src = directory + "bookmark.js";
      e.id = "__inspect_tool__:script";
      document.body.appendChild(e);

      window.__ready__ = true;
    }
  }();
}


button.onclick = () => {
  start();
};

window.addEventListener("error", function (e) {
  errortext.innerHTML += "<br>" + e.message + "&nbsp;" + e.filename + "&nbsp;" + e.lineno + "&nbsp;" + e.colno;
}, true);


link.setAttribute("href", "javascript:" + start.toString().substring(18, start.toString().length - 1).replace("/\r?\n|\r/g", ""));


/*var xhttp = new XMLHttpRequest;
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.write(this.responseText)
    }
  };
  xhttp.open("POST", window.location.href, true);
  xhttp.send();*/