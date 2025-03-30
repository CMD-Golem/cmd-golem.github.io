var el_year = document.getElementById("year");
var el_week = document.getElementById("week");
var el_main = document.querySelector("main");
var coop;

async function load() {
	// show year selection
	var current_year = new Date().getFullYear();
	while (current_year - 2013 >= 0) {
		var element = document.createElement('option');
		element.value = current_year;
		element.innerHTML = current_year;
		el_year.appendChild(element);
		current_year--;
	}

	var response = await fetch("https://proxy.tabq.workers.dev?url=https%3A%2F%2Fepaper.coopzeitung.ch%2Faviator%2F_resources%2Fphp%2FgetEditionsByYear.php%3Fnewspaper%3DCZ%26edition%3DCZ51%26year%3D2025");

	if (response.status != 200) {
		console.error(response);
		coop = [];
		return;
	}

	var obj = await response.json();
	coop = obj.editions;
}

load();

function getWeeks(year) {
	el_week.innerHTML = "";
	for (var i = 0; i < coop.length; i++) {
		if (coop[i].year == year) {
			var element = document.createElement('option');
			element.value = coop[i].issue;
			element.innerHTML = coop[i].week;
			el_week.appendChild(element);
		}
	}
}

// pdfjs
var { pdfjsLib } = globalThis;
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.mjs';
pdfjsLib.GlobalWorkerOptions.disableFontFace = false;


async function loadCoop() {
	el_main.innerHTML = "";
	var issue = el_week.value;

	var magazin_load = await fetch(`https://proxy.tabq.workers.dev?url=https%3A%2F%2Fepaper.coopzeitung.ch%2Faviator%2F_resources%2Fphp%2Fget_timone.php%3Fnewspaper%3DCZ%26issue%3D${issue}%26edition%3DCZ51`);
	if (magazin_load.status != 200) {
		console.error(magazin_load);
		return;
	}

	// 	List of all editions: https://epaper.coopzeitung.ch/aviator/_resources/php/getEditionsByYear.php?newspaper=CZ&edition=CZ51&year=2024
	// 	List of edition: https://epaper.coopzeitung.ch/aviator/_resources/php/get_timone.php?newspaper=CZ&issue=20241119&edition=CZ51
	// 	Link to PDF: https://epaper.coopzeitung.ch/_deploy/CZ/20241119/CZ51/20241118052356440/whole/CZ_20241119_CZ51.pdf

	var magazin = await magazin_load.json();

	var pdfDoc = await pdfjsLib.getDocument(`https://proxy.tabq.workers.dev?type=pdf&url=https%3A%2F%2Fepaper.coopzeitung.ch%2F_deploy%2FCZ%2F${issue}%2FCZ51%2F${magazin.timone.version}%2Fwhole%2FCZ_${issue}_CZ51.pdf`).promise;
	
	// scale size
	var page = await pdfDoc.getPage(1);
	var viewport = page.getViewport({ scale: 1});
	var width = el_main.clientWidth;
	var scale = width*2 / viewport.width;

	// render pages
	for (var i = 1; i < pdfDoc.numPages; i++) {
		var canvas = document.createElement("canvas");
		el_main.appendChild(canvas);

		var page = await pdfDoc.getPage(i);
		var viewport = page.getViewport({scale: scale});
		canvas.width = viewport.width;
		canvas.height = viewport.height;

		await page.render({canvasContext: canvas.getContext('2d'), viewport: viewport, textLayerMode: 2}).promise;
	}
}


async function loadMigros() {
	// 	List with links to images of all pages: https://reader3.isu.pub/m-magazin/migros-magazin-45-2024-d-os/reader3_4.json
	el_main.innerHTML = "";
	var magazin_load = await fetch(`https://reader3.isu.pub/m-magazin/migros-magazin-${el_week.options[el_week.selectedIndex].innerHTML}-${el_year.value}-d-os/reader3_4.json`);

	if (magazin_load.status != 200) {
		console.error(magazin_load);
		return;
	}

	var magazin = await magazin_load.json();

	for (var i = 0; i < magazin.document.pages.length; i++) {
		var element = document.createElement('img');
		element.src = "https://" + magazin.document.pages[i].imageUri;
		el_main.appendChild(element);
	}
}
