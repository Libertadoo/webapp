let template = document.querySelector("#myTemplate").content;
let events = document.querySelector("#events");
let page = 1;
let lookingForData = false;

function fetchEvents() {
	lookingForData = true;

	let urlParams = new URLSearchParams(window.location.search);

	let tagid = urlParams.get("tag");
	let endpoint = "http://libertadoo.com/kea/second_semester/huset/wordpress/wp-json/wp/v2/event?_embed&per_page=2&page=" + page
	if (tagid) { // DRY
		endpoint = "http://libertadoo.com/kea/second_semester/huset/wordpress/wp-json/wp/v2/event?_embed&per_page=2&page=" + page + "&tags=" + tagid
	}
	fetch(endpoint)
		.then(e => e.json())
		.then(showEvents);
	// http://libertadoo.com/kea/second_semester/huset/wordpress/wp-json/wp/v2/event

}

function showEvents(data) {
	console.log(data)
	lookingForData = false;
	data.forEach(showSingleEvent);
}

function showSingleEvent(Event) {
	let clone = template.cloneNode(true);
	clone.querySelector("h3").textContent = Event.title.rendered;
	//clone.querySelector(".descript").innerHTML = Event.content.rendered;
	clone.querySelector(".time").textContent = Event.acf.time;
	//	clone.querySelector(".tagName").textContent = item.name;
	// DATE

let year = Event.acf.date.substring(0, 4);
let month = Event.acf.date.substring(4, 6);
let day = Event.acf.date.substring(6, 8);

clone.querySelector(".date").textContent = day + "." + month + "." + year;



	if (Event._embedded["wp:featuredmedia"]) { //img is there
		clone.querySelector("img").setAttribute("src", Event._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
	} else { // no img
		clone.querySelector("img").remove()
	}

	clone.querySelector('.readmore').href = "subpage.html?id=" + Event.id;


	events.appendChild(clone);
}
fetchEvents();


//found this stuff online
setInterval(function () {

	if (bottomVisible() && lookingForData === false) {
		console.log("We've reached rock bottom, fetching articles")
		page++;
		fetchEvents();
	}
}, 1000)

function bottomVisible() {
	const scrollY = window.scrollY
	const visible = document.documentElement.clientHeight
	const pageHeight = document.documentElement.scrollHeight
	const bottomOfPage = visible + scrollY >= pageHeight
	return bottomOfPage || pageHeight < visible
}

let home = document.querySelector("h1");
home.addEventListener("click", homepage);
function homepage(){
	window.location = "index.html";
}



