document.getElementsByClassName("first_el")[0].addEventListener("click", select);
document.getElementsByClassName("last_el")[0].addEventListener("click", select);


// Select and Move functions
// ###################################################
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

function selectNext() {
	var input = document.getElementById("input_el");
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


// Button functions
// ###################################################
function button(action) {
	var input = document.getElementById("input_el");

	// Create new Input Element
	var new_input = document.createElement("span");
	new_input.innerHTML = action;
	new_input.addEventListener("click", select);
	input.parentNode.insertBefore(new_input, input.nextElementSibling);

	input.id = "";
	input.nextElementSibling.id = "input_el";

	calc();
}


var remove_button = document.getElementById("remove_button");
var timer;

remove_button.onpointerdown = function() {
	remove();
}
remove_button.onpointerup = function() {
	clearTimeout(timer);
}

function remove() {
	var input = document.getElementById("input_el");
	timer = setTimeout(remove, 200);
	// select prev el if input is work el
	if (input.classList.contains("first_el") || input.classList.contains("last_el") || input.id == "input_box") {
		selectPrev(input);
		// Remove operator if no childs
		if (input.classList.contains("first_el") && input.parentElement.childElementCount - input.parentElement.getElementsByClassName("operator").length == 1) {
			selectPrev(input);
			input.parentNode.remove();
		}
	}
	else {
		input.classList.remove("operator");
		
		selectPrev(input);
		input.remove();
	}

	calc();
}

// Power
function supButton() {
	var input = document.getElementById("input_el");

	var new_input = document.createElement("sup");
	new_input.classList.add("operator")

	// Create first_el
	var new_input_first = document.createElement("span");
	new_input_first.classList.add("first_el");
	new_input_first.addEventListener("click", select);
	new_input_first.innerHTML = "&#8203;";

	// Create sup
	var new_input_el = document.createElement("span");
	new_input_el.id = "input_el"
	new_input_el.addEventListener("click", select);
	new_input_el.innerHTML = "2";

	//new_input.addEventListener("click", select);

	input.parentNode.insertBefore(new_input, input.nextElementSibling);
	new_input.insertBefore(new_input_first, null)
	new_input.insertBefore(new_input_el, null)

	input.id = "";
}