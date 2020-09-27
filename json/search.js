const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search search.json and filter it
const searchData = async searchText => {
	const res = await fetch('../search.json');
	const data = await res.json();

	// Get matches to current text input
	let matches = data.filter(data => {
		const regex = new RegExp(`^${searchText}`, 'gi');
		return data.type.match(regex) || data.name.match(regex) || data.name_2.match(regex);
	});

	if(searchText.lenght === 0) {
		match = [];
		matchList.innerHTML = '';
	};

	outputHtml(matches);

};

// Show results in Html

const outputHtml = matches => {
	if(matches.lenght > 0) {
		const html = matches.map(map => `
			<div class="card card-body">
				<h4>${match.type} ($match.name) <span>${match.name_2}</span> </4>
			</div>

			`).join('');

		matchList.innerHTML = html;
	}
};


search.addEventListener('input', () => searchData(search.value));