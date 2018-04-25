let urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");
console.log("i want to get article: " + id);


fetch("http://libertadoo.com/kea/second_semester/huset/wordpress/wp-json/wp/v2/event"+id)
  .then(e=>e.json())
  .then(showSinglePost)


function showSinglePost(event){
  console.log(event);
  document.querySelector("#singleEvent h1").textContent=event.title.rendered;


  //show carsection
  document.querySelector("#singleEvent").classList.add("slideInEvent");
}
