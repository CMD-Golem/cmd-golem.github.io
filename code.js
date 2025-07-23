var body = document.querySelector("body");

function loadData() {
	var json = window.localStorage.getItem("user_data");
	if (json == null) return;

	var data = JSON.parse(json);

	// apply styles
	body.style.backgroundColor = data.style.backgroundColor;

	// insert elements
	for (var i = 0; i < data.elements.length; i++) {
		if (data.elements[i].type == "shortcuts") insertShortcuts(data.elements[i]);
	}
}
loadData()

function insertShortcuts(element) {
	var container = document.createElement("div");
	container.classList.add("shortcut_container");
	// container.style.setProperty("--rows", element.style.rows);

	for (var i = 0; i < element.content.length; i++) {
		var link_data = element.content[i];
		var link = document.createElement("a");
		link.href = link_data.link;
		link.innerHTML = `<img src="${link_data.logo}"><p>${link_data.name}</p>`;
		container.appendChild(link);
	}
	body.appendChild(container);
}

// ##################################################
// import
var import_data = document.createElement('input');
import_data.type = 'file';
import_data.accept = '.json';

import_data.onchange = e => { 
	var reader = new FileReader();
	reader.readAsText(e.target.files[0],'UTF-8');

	reader.onload = readerEvent => {
		window.localStorage.setItem("user_data", readerEvent.target.result);
		document.location.reload();
	}
}

function exportData() {
	var link = document.createElement('a');
	link.download = "Startpage.json";
	link.href = "data:text/plain;charset=utf-8," + JSON.stringify(user_data);
	link.click();
}