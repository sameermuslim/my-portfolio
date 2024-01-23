const showContactsBtn = document.getElementById("show-contacts");
const left_side = document.getElementById("left-side");
const overlay_panel = document.getElementById("overlay");
const dialog_panel = document.getElementById("full-screen-dialog");
const dialog_close_btn = document.getElementById("dialog-close-btn");

document.addEventListener("keydown", function (event) {
  // Check if the pressed key is the "Escape" key (key code 27)
  if (event.key === "Escape" || event.keyCode === 27) {
    if (dialog_panel && dialog_panel.classList.contains("active")) {
      // Your code to handle the "Escape" key press goes here
      dialog_panel.classList.remove("active");
      overlay_panel.classList.remove("active");
    }
  }
});

dialog_close_btn.addEventListener("click", dialogToggle);
overlay_panel.addEventListener("click", dialogToggle);
function dialogToggle() {
  dialog_panel.classList.toggle("active");
  overlay_panel.classList.toggle("active");
}
showContactsBtn.addEventListener("click", function () {
  left_side.classList.toggle("active");
});

// get testimonials  items
const testimonialsItem = document.querySelectorAll(".card-item.team");

// Add a click listener to each list item
testimonialsItem.forEach(function (item) {
  item.addEventListener("click", function () {
    // Your click event code goes here
    dialogToggle();
    const imageSrc = item.querySelector(".photo img").src;
    const cardItemTitle = item.querySelector(".card-item-title").textContent;
    const cardItemPosition = item.querySelector(
      ".card-item-position"
    ).textContent;
    const itemText = item.querySelector(".item-text").textContent;
    const itemDate = item.querySelector(".item-test-mo-date").textContent;

    // Get references to dialog elements
    const dialogPersonImg = document.querySelector(".dialog-person-img");
    const dialogPersonName = document.querySelector(".dialog-person-name");
    const dialogPersonPosition = document.querySelector(
      ".dialog-person-position"
    );
    const dialogText = document.querySelector(".dialog-text");
    const dialogDate = document.querySelector(".dialog-date");

    // Set values in the dialog
    dialogPersonImg.src = imageSrc;
    dialogPersonName.textContent = cardItemTitle;
    dialogPersonPosition.textContent = cardItemPosition;
    dialogText.textContent = itemText;
    dialogDate.textContent = itemDate;
    console.log("Clicked on:", imageSrc + cardItemTitle + itemText); // Example: Log the text content of the clicked item
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the main-container element
  const mainContainer = document.querySelector(".main-container");

  // Add an event listener to check window width and add/remove the "active" class
  window.addEventListener("resize", function () {
    if (window.innerWidth <= 1240) {
      mainContainer.classList.remove("active");
    } else {
      mainContainer.classList.add("active");
    }
  });

  // Initial check on page load
  if (window.innerWidth <= 1240) {
    mainContainer.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  function showSection(sectionName) {
    // Your existing code for the showSection function
  }
});
const menuItems = document.querySelectorAll("#menu-bar-ul li a");

// Add click event listener to each menu item
menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Remove "active" class from all menu items
    menuItems.forEach((item) => item.classList.remove("active"));

    // Add "active" class to the clicked menu item
    this.classList.add("active");

    // Hide all sections
    const sections = document.querySelectorAll(".the-section");
    sections.forEach((section) => section.classList.remove("active"));

    // Show the corresponding section
    const sectionName = this.textContent.trim().toLowerCase() + "-section";
    const clickedSection = document.querySelector(`.${sectionName}`);
    clickedSection.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get all category buttons
  const categoryButtons = document.querySelectorAll(".category-li-btn");

  // Get all project items
  const projectItems = document.querySelectorAll(
    ".section-list.projects .port-list-li"
  );

  // Add click event listener to each category button
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove "active" class from all category buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      // Add "active" class to the clicked category button
      this.classList.add("active");

      // Get the category name of the clicked button
      const categoryName = this.textContent.trim();

      // Show/hide project items based on the category
      projectItems.forEach((item) => {
        const itemCategory = item
          .querySelector(".card-item-port-text")
          .textContent.trim();
        const isAllCategory = categoryName === "All";

        if (isAllCategory || itemCategory === categoryName) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});

function validateForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Basic non-empty check
  if (name === "" || email === "" || message === "") {
    alert("Please fill in all fields.");
    return;
  }

  // Advanced email validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // If all checks pass, proceed to submit the form
  submitForm();
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
      }, 3000);
    });
});

function submitForm() {
  // Fetch form data
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Create a FormData object
  var formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("message", message);

  // Send the form data to the server-side script using fetch
  fetch("process.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      // Handle the response from the server (optional)
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

const mode_toggle_btn = document.getElementById("mode-toggle-btn");
const mode_btn = document.getElementById("mood-btn");
const mode_icon = document.getElementById("mood-icon");

let lightMode = localStorage.getItem("light-mode");

const enableLightMode = () => {
  // 1. Add the class to the body
  document.body.classList.add("light-mode");
  mode_btn.classList.add("light-mode");
  mode_icon.src = "images/moon.svg";

  // 2. Update darkMode in localStorage
  localStorage.setItem("light-mode", "enabled");
};

const disableLightMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove("light-mode");
  mode_btn.classList.remove("light-mode");
  mode_icon.src = "images/sun.svg";
  // 2. Update darkMode in localStorage
  localStorage.setItem("light-mode", null);
};

// If the user already visited and enabled darkMode
// start things off with it on
if (lightMode === "enabled") {
  enableLightMode();
} else {
  disableLightMode();
}

// When someone clicks the button
mode_toggle_btn.addEventListener("click", () => {
  // get their darkMode setting
  lightMode = localStorage.getItem("light-mode");

  // if it not current enabled, enable it
  if (lightMode !== "enabled") {
    enableLightMode();
    console.log(lightMode + " enabled");
    // if it has been enabled, turn it off
  } else {
    disableLightMode();
    console.log(lightMode + " enabled");
  }
});
