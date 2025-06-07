document.getElementById("year").innerText = new Date().getFullYear();

function closeForm() {
  var form = document.getElementById("contactForm");
  form.classList.remove("fadeIn");
  form.classList.add("fadeOut");
  setTimeout(function () {
    form.style.display = "none";
  }, 370);
}
function toggleForm() {
  var form = document.getElementById("contactForm");
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
    form.classList.remove("fadeOut");
    form.classList.add("fadeIn");
  } else {
    form.classList.remove("fadeIn");
    form.classList.add("fadeOut");
    setTimeout(function () {
      form.style.display = "none";
    }, 370);
  }
}

document.addEventListener("click", function (event) {
  let form = document.getElementById("contactForm");
  let button = document.querySelector(".contact-button");
  let image = document.querySelector(".contact-button img");
  if (
    event.target !== form &&
    event.target !== button &&
    event.target !== image &&
    !form.contains(event.target)
  ) {
    form.classList.remove("fadeIn");
    form.classList.add("fadeOut");
    setTimeout(function () {
      form.style.display = "none";
    }, 370);
  }
});
if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
  // Disable right-click
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // Disable F12
  document.addEventListener("keydown", function (event) {
    if (event.key === "F12") {
      event.preventDefault();
    }
  });
}



const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();

  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
        closeForm();
      }, 3000);
    });
});


