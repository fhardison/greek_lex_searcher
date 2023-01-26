import * as  data  from '../static/dict_data.js';


function prepDicts() {
	let out = {};
	console.log('starting data prep');
	console.log(data.dicts);
	for (let d in data.dicts) {
		console.log('preping data');
		out[d] = new Fuse(Object.keys(data.dicts[d]), {includeScore: false, threshold: 0.001, location:0, distance:1});
	}

	return out;
}

const mydata = prepDicts();

function search(searchBox, elem) {
	const target = searchBox.value;
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
					console.log(res[key].item);
					elem.innerHTML += "<p>" + res[key].item + ": " + data.dicts[d][res[key].item] + "</p>";
				}
			}
			results.push([d, mydata[d].search(target)])
		}
		console.log(results);
		//elem.innerHTML = results;
	}

}

window.search = search
