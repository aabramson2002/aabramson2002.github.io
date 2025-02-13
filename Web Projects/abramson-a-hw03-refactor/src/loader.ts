import * as main from "./main";
window.onload = () => {
	console.log("window.onload called");
	// 1 - do preload here - load fonts, images, additional sounds, etc...

	//function that loads in preliminary data stored in data-av.json
	const loadData = () => {
		const songs = document.querySelector("#select-track");
	  
		const url = "data/data-av.json";
		const xhr = new XMLHttpRequest();
		xhr.onload = e => {
			const target = e.target as XMLHttpRequest;
		  console.log(`HTTP Staus Code: ${target.status}`);
		  const text = target.responseText;
		  let json;
		  try {
			json = JSON.parse(text);
		  }
		  catch {
			console.log("JSON.parse Failed!");
			return;
		  }
		  document.querySelector("#title").innerHTML = json.title;
		  let html = "";
		  for (let s of json.songs) {
			html += `<option value="${s.link}">${s.name}</option>`;	  
		  }
		  songs.innerHTML = html;
		  
		  document.querySelector("#instructions").innerHTML = json.instructions;

		};
		xhr.onerror = () => { "Error" };
		xhr.open("GET", url);
		xhr.send();
	  }

	  loadData();
	// 2 - start up app
	main.init();
}