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
    const itemText = item.querySelector(".item-text").textContent;
    const itemDate = item.querySelector(".item-test-mo-date").textContent;

    // Get references to dialog elements
    const dialogPersonImg = document.querySelector(".dialog-person-img");
    const dialogPersonName = document.querySelector(".dialog-person-name");
    const dialogText = document.querySelector(".dialog-text");
    const dialogDate = document.querySelector(".dialog-date");

    // Set values in the dialog
    dialogPersonImg.src = imageSrc;
    dialogPersonName.textContent = cardItemTitle;
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
