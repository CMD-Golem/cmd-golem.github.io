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

// Remove button
var remove_button = document.getElementById("remove_button");
var remove_timer;

remove_button.onpointerdown = function() {
	remove();
}
remove_button.onpointerup = function() {
	clearTimeout(remove_timer);
}

function remove() {
	var input = document.getElementById("input_el");
	remove_timer = setTimeout(remove, 200);
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

//Double Bracket
function doubleBracket() {
	var input = document.getElementById("input_el");

	// Create new Input Element
	var new_input = document.createElement("span");
	new_input.innerHTML = "(";
	new_input.addEventListener("click", select);
	input.parentNode.insertBefore(new_input, input.nextElementSibling);

	// Create second Input Element
	var sec_input = document.createElement("span");
	sec_input.innerHTML = ")";
	sec_input.addEventListener("click", select);
	new_input.parentNode.insertBefore(sec_input, new_input.nextElementSibling);

	input.id = "";
	input.nextElementSibling.id = "input_el";

	calc();
}