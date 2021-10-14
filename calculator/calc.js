var input_box = document.getElementById("input_box");
var show_result = input_box.getElementsByClassName("result")[0];

function calc() {
	show_result.innerHTML = start_calc();
}

function start_calc() {
	var input = input_box.childNodes;

	var input_string = "";

	for (var i = 0; i < input.length; i++) {
		if (!input[i].classList.contains("first_el") && !input[i].classList.contains("last_el") && !input[i].classList.contains("result")) {
			if (input[i].innerHTML == " × ") {
				var string_add = " * ";
			}
			else if (input[i].innerHTML == " ÷ ") {
				var string_add = " / ";
			}
			else {
				var string_add = input[i].innerHTML;
			}

			var input_string = input_string + string_add;
		}
	}

	try {
		//console.log(input_string);
		var result = new Function('return ' + input_string)();
		if (result == undefined) {
			result = "";
		}
		return result;
	}
	catch (e) {
		return "undef";
	}
}