// Get references to elements
const showContactsBtn = document.getElementById("show-contacts");
const leftSide = document.getElementById("left-side");
const overlayPanel = document.getElementById("overlay");
const dialogPanel = document.getElementById("full-screen-dialog");
const dialogCloseBtn = document.getElementById("dialog-close-btn");

// Close dialog on "Escape" key press
document.addEventListener("keydown", function (event) {
  // Check if the pressed key is the "Escape" key (key code 27)
  if (event.key === "Escape" || event.keyCode === 27) {
    if (dialogPanel && dialogPanel.classList.contains("active")) {
      // Your code to handle the "Escape" key press goes here
      dialogPanel.classList.remove("active");
      overlayPanel.classList.remove("active");
    }
  }
});

// Add click listeners for dialog toggle
dialogCloseBtn.addEventListener("click", toggleDialog);
overlayPanel.addEventListener("click", toggleDialog);

function toggleDialog() {
  dialogPanel.classList.toggle("active");
  overlayPanel.classList.toggle("active");
}

// Toggle left side on button click
showContactsBtn.addEventListener("click", function () {
  leftSide.classList.toggle("active");
});

// Add click listeners for testimonial items
const testimonialsItem = document.querySelectorAll(".card-item.team");
testimonialsItem.forEach(function (item) {
  item.addEventListener("click", function () {
    toggleDialog();
    // Retrieve data for dialog
    updateDialog(item);
  });
});

// Function to update dialog content
function updateDialog(item) {
  const imageSrc = item.querySelector(".photo img").src;
  const cardItemTitle = item.querySelector(".card-item-title").textContent;
  const cardItemPosition = item.querySelector(
    ".card-item-position"
  ).textContent;
  const itemText = item.querySelector(".item-text").textContent;
  const itemDate = item.querySelector(".item-test-mo-date").textContent;

  // Set values in the dialog
  const dialogPersonImg = document.querySelector(".dialog-person-img");
  const dialogPersonName = document.querySelector(".dialog-person-name");
  const dialogPersonPosition = document.querySelector(
    ".dialog-person-position"
  );
  const dialogText = document.querySelector(".dialog-text");
  const dialogDate = document.querySelector(".dialog-date");

  dialogPersonImg.src = imageSrc;
  dialogPersonName.textContent = cardItemTitle;
  dialogPersonPosition.textContent = cardItemPosition;
  dialogText.textContent = itemText;
  dialogDate.textContent = itemDate;
}

// document.addEventListener("DOMContentLoaded", function () {
//   // Get the main-container element
//   const mainContainer = document.querySelector(".main-container");

//   // Add an event listener to check window width and add/remove the "active" class
//   window.addEventListener("resize", function () {
//     if (window.innerWidth <= 1240) {
//       mainContainer.classList.remove("active");
//     } else {
//       mainContainer.classList.add("active");
//     }
//   });

//   // Initial check on page load
//   if (window.innerWidth <= 1240) {
//     mainContainer.classList.remove("active");
//   }
// });

// document.addEventListener("DOMContentLoaded", function () {
//   function showSection(sectionName) {
//     // Your existing code for the showSection function
//   }
// });
const menuItems = document.querySelectorAll(".menu-bar-link ");

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
    button.addEventListener("click", () => {
      // Remove "active" class from all category buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      // Add "active" class to the clicked category button
      button.classList.add("active");

      // Get the category name of the clicked button
      const categoryName = button.textContent.trim();

      // Show/hide project items based on the category
      projectItems.forEach((item) => {
        const subCategory = item
          .querySelector(".sub-category")
          .textContent.trim();
        const itemCategory = item
          .querySelector(".card-item-port-text")
          .textContent.trim();
        const isAllCategory = categoryName === "All";

        if (
          isAllCategory ||
          itemCategory === categoryName ||
          (categoryName === "Open Source Project" &&
            subCategory === "Open Source Project")
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});

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
