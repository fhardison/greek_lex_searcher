import * as  data  from '../static/dict_data.js';


function prepDicts() {
	let out = {};
	console.log('starting data prep');
	for (let d in data.dicts) {
		out[d] = new Fuse(Object.keys(data.dicts[d]), {includeScore: false, threshold: 0.008, location:0, distance:200, ignoreLocation:true, useExtendedSearch:true});
	}

	return out;
}

const mydata = prepDicts();

function search(searchBox, elem) {
	const target = searchBox.value.normalize('NFD');
	console.log(target);
	if (target) {
		elem.innerHTML = "";
		const results = []
		for(let d in mydata) {
			let res = mydata[d].search(target);
			if (res) {
				elem.innerHTML += "<h2>" + d + "</h2>";
				console.log(res);
				for (let key in res) {
					elem.innerHTML += "<p><strong>" + res[key].item + "</strong>: " + data.dicts[d][res[key].item] + "</p>";
				}
			}
			results.push([d, mydata[d].search(target)])
		}
	}
}

window.search = search
