const options = document.querySelector(".options");
const title = document.querySelectorAll("h2");
const curHours = document.querySelectorAll(".curHours");
const prevHours = document.querySelectorAll(".prevHours");

let activeBtn = "daily";

options.addEventListener("click", function (e) {
  e.preventDefault();
  // Event Delegation
  const clicked = e.target.closest(".option");
  // Guard Clause
  if (!clicked) return;

  activeBtn = clicked.textContent.toLowerCase();
  console.log(activeBtn);
  // Removing Active Class
  [...clicked.parentElement.children].forEach((btn) => {
    if (btn != clicked) btn.classList.remove("option__tab--active");
  });
  // Add Active Class
  clicked.classList.add("option__tab--active");

  const getTitleData = async function () {
    try {
      const res = await fetch(`./data.json`);
      const data = await res.json();

      data.map((d, i) => {
        if (activeBtn === "daily") {
          console.log(d.timeframes.daily.current);
          title[i].textContent = d.title;
          curHours[i].textContent = d.timeframes.daily.current;
          prevHours[i].textContent = d.timeframes.daily.previous;
        }

        if (activeBtn === "weekly") {
          console.log(d.timeframes.weekly.current);
          title[i].textContent = d.title;
          curHours[i].textContent = d.timeframes.weekly.current;
          prevHours[i].textContent = d.timeframes.weekly.previous;
        }

        if (activeBtn === "monthly") {
          console.log(d.timeframes.monthly.current);
          title[i].textContent = d.title;
          curHours[i].textContent = d.timeframes.monthly.current;
          prevHours[i].textContent = d.timeframes.monthly.previous;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  getTitleData();
});

// Alternative of Fetching Data
// fetch("./data.json")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });
