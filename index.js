const showContactsBtn = document.getElementById("show-contacts");
const left_side = document.getElementById("left-side");

showContactsBtn.addEventListener("click", function () {
  left_side.classList.toggle("active");
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
const menuItems = document.querySelectorAll("#menubar-ul li a");

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
