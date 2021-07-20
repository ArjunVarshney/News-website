let country = "all";
let q = `"all"`;
let lang = "en";
let topic = "all";

//printing the initial results
showres();

//printing time and date
let datedom = document.getElementById("date");
let timedom = document.getElementById("time");
let daydom = document.getElementById("day");
let month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
setInterval(() => {
  let date = new Date();
  let time =
    date.getHours() +
    ":" +
    getnumber(date.getMinutes()) +
    ":" +
    getnumber(date.getSeconds());
  let fulldate =
    date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();
  let day = days[date.getDay()];
  datedom.innerHTML = fulldate;
  timedom.innerHTML = time;
  daydom.innerHTML = day;
}, 1000);

function getnumber(x) {
  if (x < 10) {
    return "0" + x;
  } else {
    return x;
  }
}

//mode toggle script
function modetoggle() {
  let togglebtn = document.getElementById("modetoggle");
  let root = document.querySelector(":root");
  if (togglebtn.innerText == "light_mode") {
    togglebtn.innerText = "dark_mode";
    root.style.setProperty("--black", "#e2e3ff");
    root.style.setProperty("--white", "#050024");
    root.style.setProperty("--acent", "#b5b1ec");
  } else {
    togglebtn.innerText = "light_mode";
    root.style.setProperty("--white", "#f1eff1");
    root.style.setProperty("--black", "#050024");
    root.style.setProperty("--acent", "#1C1E52");
  }
}

//showing all countries to the user
function showallcountries() {
  document.getElementById("allcountries").classList.toggle("allcountries");
  document.getElementById("opentoggle").classList.toggle("opentoggle");
}

//assighning country
let countries = document.getElementsByClassName("countries");
function assigncountry(id) {
  country = id;
  Array.from(countries).forEach(function (element) {
    if (element.id == id) {
      document.getElementById(element.id).classList.add("selected");
    } else {
      document.getElementById(element.id).classList.remove("selected");
    }
  });
  showres();
}
//asigning language
let langs = document.getElementsByClassName("langopt");
function languageselector(id) {
  lang = id;
  Array.from(langs).forEach(function (element) {
    if (element.id == id) {
      document.getElementById(element.id).classList.add("selected");
    } else {
      document.getElementById(element.id).classList.remove("selected");
    }
  });
  showres();
}
//assighning category
let topics = document.getElementsByClassName("topicopt");
function categoryselector(id) {
  topic = id;
  if (topic == "none") {
    topic = "all";
  }
  Array.from(topics).forEach(function (element) {
    if (element.id == id) {
      document.getElementById(element.id).classList.add("selected");
    } else {
      document.getElementById(element.id).classList.remove("selected");
    }
  });
  showres();
}

//opening search bar
let search = document.querySelector(".searchout");
search.style.height = "0px";
function opensearch() {
  if (search.style.height == "0px") {
    search.style.display = "flex";
    search.style.height = "fit-content";
  } else {
    search.style.height = "0px";
    search.style.display = "none";
  }
}

//initiating search
function initiatesearch() {
  q = `"` + document.getElementById("search").value + `"`;
  document.getElementById("search").value = "";
  showres();
}

//showing all languages
let alllangs = document.getElementsByClassName("langexp")[0];
alllangs.style.display = "none";
function showalllangs() {
  if (alllangs.style.display == "none") {
    alllangs.style.display = "flex";
  } else {
    alllangs.style.display = "none";
  }
}

//showing all categories
let allcategories = document.getElementsByClassName("langexp")[1];
allcategories.style.display = "none";
function showallcategories() {
  if (allcategories.style.display == "none") {
    allcategories.style.display = "flex";
  } else {
    allcategories.style.display = "none";
  }
}

//toggling menu
function togglemenu() {
  document.getElementById("fullmenu").classList.toggle("openmenu");
}

//showing results
function showres() {
  url = `https://gnews.io/api/v4/top-headlines?q=${q}&country=${country}&topic=${topic}&lang=${lang}&token=ebe23220484ada7a5cf04d94c0fd9d83`;
  console.log(url);
  let cate = document.querySelector("#body > h4");
  cate.innerHTML = document.getElementById(topic).innerHTML;

  let xhr = new XMLHttpRequest();
  let str = `<h4>${document.getElementById(topic).innerHTML}</h4>`;
  console.log(str);
  xhr.open(`GET`, `${url}`, true);
  xhr.onload = function () {
    let text = JSON.parse(xhr.responseText).articles;
    text.forEach((element) => {
      let pubdate = new Date(element.publishedAt);
      let finaldate =
        pubdate.getHours() +
        ":" +
        pubdate.getMinutes() +
        " " +
        pubdate.getDate() +
        "/" +
        month[pubdate.getMonth()] +
        "/" +
        pubdate.getFullYear();
      str += `
             <div class="bodyins">
               <div>
                  <div class="news" id="1">
                     <div class="image"><img src=${element.image}></div>
                     <div class="title">${element.title}</div>
                     <div class="dateofpublish">${finaldate}</div>
                  </div>
               </div>
            </div>
     `;
    });
    let body = document.getElementById("body");
    body.innerHTML = str;
  };
  xhr.send();
}
