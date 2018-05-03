let urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");
console.log("i want to get article: " + id);


fetch("http://libertadoo.com/kea/second_semester/huset/wordpress/wp-json/wp/v2/event/"+id)
  .then(e=>e.json())
  .then(showSinglePost)


function showSinglePost(Event){
  console.log(Event);
  document.querySelector("#singleEvent h3").textContent=Event.title.rendered;
document.querySelector(".desc").innerHTML = Event.content.rendered;
document.querySelector(".time").innerHTML = Event.acf.time;
document.querySelector(".price").innerHTML = Event.acf.price + " dkk";

let year = Event.acf.date.substring(0, 4);
let month = Event.acf.date.substring(4, 6);
let day = Event.acf.date.substring(6, 8);

document.querySelector(".date").innerHTML = day + "." + month + "." + year;

  //show events
  document.querySelector("#singleEvent").classList.add("slideInEvent");
}
let home = document.querySelector("h1");
home.addEventListener("click", homepage);
function homepage(){
	window.location = "index.html";
}




