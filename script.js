"use strict";

let currentPage = 1;
let totalPages;
function all(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (responsData) {
      if (responsData.status !== 200) {
        throw "Server Error";
      } else if (!responsData.ok) {
        throw "Server is not OK";
      }
      return responsData.json();
    })
    .then(function (mosulidata) {
      console.log(mosulidata);
      const fragment = new DocumentFragment();
      mosulidata.data.forEach(function (item) {
        let p = document.createElement("p");
        p.textContent = `${item.first_name} ${item.last_name} `;
        let img = document.createElement("img");
        img.src = item.avatar;
        img.classList.add("avatar");
        p.appendChild(img);
        fragment.appendChild(p);
      });
      if (currentPage == 1) {
        (document.getElementById("load-prev").disabled = true),
          (document.getElementById("load-more").disabled = false);
      }
      if (currentPage == totalPages) {
        (document.getElementById("load-prev").disabled = false),
          (document.getElementById("load-more").disabled = true);
      }
      document.getElementById("ul-users").innerHTML = "";
      document.getElementById("ul-users").appendChild(fragment);
      totalPages = mosulidata.total_pages;
    })
    .catch(function (error) {
      if (error === 400) {
        let eror = document.createElement("p");
        eror.textContent = "Page Not Found";
        document.getElementById("getusers").appendChild(eror);
      }
    });
}
all(currentPage);

document.getElementById("load-prev").addEventListener("click", function () {
  currentPage--;
  all(currentPage);
});

document.getElementById("load-more").addEventListener("click", function () {
  currentPage++;
  all(currentPage);
});
