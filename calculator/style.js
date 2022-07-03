document.getElementsByClassName("first_el")[0].addEventListener("click", select);
document.getElementsByClassName("last_el")[0].addEventListener("click", select);


// Mobile submenu
// ###################################################
if (window.matchMedia("(pointer: coarse)").matches) {
	var last_menu, last_td;
    var submenu = document.getElementsByClassName("has_submenu");

	for (var i = 0; i < submenu.length; i++) {
		submenu[i].addEventListener("touchstart", SubMenuStart);
		submenu[i].addEventListener("touchmove", SubMenuMove);
		submenu[i].addEventListener("touchend", SubMenuEnd);
	}
}

function SubMenuStart(event) {
	// Add hover class to td
	var touch_td = event.target;
	var td = touch_td.closest(".has_submenu");
	if (touch_td.classList.contains("has_submenu")) {
		td = touch_td;
	}

	last_td = td;
	last_menu = td.getElementsByTagName("p")[0];

	td.classList.add("hover");
}

function SubMenuMove(event) {
	// Get p element
	var touch_el = event.changedTouches[0];
	var el_cord = document.elementFromPoint(touch_el.clientX, touch_el.clientY);

	var menu = el_cord.closest("P");
	if (el_cord.tagName == "P") {
		menu = el_cord;
	}

	// Remove/ Add hover class to p
	if (last_menu != undefined) {
		last_menu.classList.remove("hover");
		last_menu = undefined;
	}
	if (menu != null) {
		last_menu = menu;

		menu.classList.add("hover");
	}
}

function SubMenuEnd() {
	// Execute onclick
	if (last_menu != undefined) {
		last_menu.click();
		last_menu.classList.remove("hover");
	}

	// Remove classes
	last_td.classList.remove("hover");
	last_td.getElementsByTagName("p")[0].classList.add("hover");
}


// Mouse Submenu
// ###################################################
if (window.matchMedia("(pointer: fine)").matches) {
	document.getElementsByTagName("main")[0].addEventListener('contextmenu', event => {
		event.preventDefault();

		var td_click = event.target;
		var td_menu = td_click.closest(".has_submenu");
		if (td_click.classList.contains("has_submenu")) {
			td_menu = td_click;
		}

		if (td_menu != null) {
			td_menu.addEventListener("click", SubMenuHide);
			td_menu.addEventListener("mouseleave", SubMenuHide);

			var submenu = td_menu.getElementsByClassName("submenu");
			for (var i = 0; i < submenu.length; i++) {
				submenu[i].style.display = "flex";
			}
		}
	});
}

function SubMenuHide(event) {
	var td_menu = event.target.closest(".has_submenu");

	td_menu.removeEventListener("click", SubMenuHide);
	td_menu.removeEventListener("mouseleave", SubMenuHide);

	var submenu = td_menu.getElementsByClassName("submenu");
	for (var i = 0; i < submenu.length; i++) {
		submenu[i].style.display = "none";
	}
}

// Select and Move functions
// ###################################################
var timer;

function select(e) {
	var input = e.target;
	document.getElementById("input_el").id = "";

	// Get position of cursour relative to element
	var cursor_pos = e.clientX - input.getBoundingClientRect().left;
	var center = input.offsetWidth / 2;

	if (cursor_pos >= center) {
		input.id = "input_el";
	}
	else {
		selectPrev(input);
	}
}

// select next
var select_prev_button = document.getElementById("select_prev");
var select_prev_timer;

select_prev_button.onpointerdown = function() {
	preSelectPrev();
}
select_prev_button.onpointerup = function() {
	clearTimeout(select_prev_timer);
}

function preSelectPrev() {
	select_prev_timer = setTimeout(preSelectPrev, 200);
	selectPrev(document.getElementById('input_el'));
}

function selectPrev(input) {
	input.id = "";
	// If el is operator select child
	if (input.classList.contains("operator")) {
		input.lastElementChild.id = "input_el";
	}
	// test if prev el exists
	else if (input.previousElementSibling != null) {
		input.previousElementSibling.id = "input_el";
	}
	// test if parent node isn't input box
	else if (input.parentNode.id != "input_box") {
		input.parentNode.previousElementSibling.id = "input_el";
	}
	else {
		input.id = "input_el";
	}
}

// select next
var select_next_button = document.getElementById("select_next");
var select_next_timer;

select_next_button.onpointerdown = function() {
	selectNext();
}
select_next_button.onpointerup = function() {
	clearTimeout(select_next_timer);
}

function selectNext() {
	var input = document.getElementById("input_el");
	select_next_timer = setTimeout(selectNext, 200);
	input.id = "";
	// test if next el exists
	if (input.nextElementSibling != null) {
		// test if next el is operator
		if (input.nextElementSibling.classList.contains("operator")) {
			input.nextElementSibling.firstElementChild.id = "input_el";
		}
		// if last el readd input
		else if (input.nextElementSibling.classList.contains("last_el")) {
			input.id = "input_el";
		}
		else {
			input.nextElementSibling.id = "input_el";
		}
	}
	// test if parent node isn't input box
	else if (input.parentNode.id != "input_box") {
		input.parentNode.id = "input_el";
	}
	else {
		input.id = "input_el";
	}
}