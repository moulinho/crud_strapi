const URL = "http://localhost:1337";
let allFood = [];
let foodDiv = document.querySelector(".food");
let formFood = document.forms.formFood;
let foodTitle = formFood.foodTitle;
let expiration = formFood.expiration;

let itemAdd = null;

let adddFood = (e) => {
  e.preventDefault();
  // console.dir(e.target);
  let title = foodTitle.value.trim();
  let dataExpiration = expiration.value;
  // console.log(title, dataExpiration);
  const payload = {
    title: title,
    expirationdate: dataExpiration,
    category: "default",
  };

  fetch(`${URL}/food-items`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      foodTitle.value = "";
      expiration.value = "";
      itemAdd = data;
      getFood();
    });
};

formFood.addEventListener("submit", adddFood);

function flashEffectItem(item, action) {
  // console.log(item);
  // console.log(action);
  let lastItem = document.getElementById(`${item.id}`);
  // console.log("lastItem", lastItem);
  // let timeming = (dealted) => {
  //   setTimeout(() => {
  //     lastItem.classList.remove(dealted);
  //   }, 500);
  // };
  let myClassRemove = "item-remove";
  let myClassAdd = "item-added";
  lastItem.classList.add(myClassAdd);
  setTimeout(() => {
    lastItem.classList.remove(myClassAdd);
  }, 2000);

  // if (action && action !== undefined) {
  //   lastItem.classList.add(myClassRemove);
  //   setTimeout(() => {
  //     lastItem.classList.remove(myClassRemove);
  //   }, 500);
  // } else {
  //   lastItem.classList.add(myClassAdd);
  //   setTimeout(() => {
  //     lastItem.classList.remove(myClassAdd);
  //   }, 2000);
  // }

  // console.log(lastItem);
}

let getFood = () => {
  fetch(`${URL}/food-items?_sort=expirationdate:DESC`)
    .then((data) => data.json())
    .then((result) => {
      allFood = result;
      updateItem(allFood);
      getAllFood(allFood);
      if (itemAdd !== null) {
        flashEffectItem(itemAdd);
      }
      // console.log("allFood", allFood);
    })
    .catch((err) => {
      console.log(err);
    });
};

let dateConvert = (dateString) => {
  if (dateString !== null && dateString !== undefined) {
    const fragmentDate = dateString.split("-");
    // console.log(fragmentDate[2]);
    return `${fragmentDate[2]}/${fragmentDate[1]}/${fragmentDate[0]}`;
  }
  return "Date non defini";
};

let getAllFood = (allFood) => {
  let list = [];
  allFood.forEach((element) => {
    const dateConverted = dateConvert(element.expirationdate);

    const item = `<li id='${element.id}'  ><button data-id="${element.id}">X</button> ${element.title} expire le ${dateConverted}</li> `;
    list = [...list, item];
  });

  // console.log("list", list.join(""));
  foodDiv.innerHTML = `<ul>${list.join("")}</ul>`;
};
let updateItem = (element) => {
  let tab = [];
  tab.push(element);
  console.log("tab", tab);
  // if (e.target.nodeName.toLowerCase() === "button") {
  //   const parentElement = e.target.parentNode;
  //   // console.log("parentElement", parentElement);
  //   // console.log("deleteFoodItem", e.type);
  //   const parentNodeId = e.target.parentNode.id;

  //   // flashEffectItem(parentElement, e.type);

  //   fetch(`${URL}/food-items/${parentNodeId}`, {
  //     method: "PUT",
  //   }).then(() => {
  //     getFood();
  //   });
  // }
};
let deleteFoodItem = (e) => {
  if (e.target.nodeName.toLowerCase() === "button") {
    const parentElement = e.target.parentNode;
    // console.log("parentElement", parentElement);
    // console.log("deleteFoodItem", e.type);
    const parentNodeId = e.target.parentNode.id;

    // flashEffectItem(parentElement, e.type);

    fetch(`${URL}/food-items/${parentNodeId}`, {
      method: "DELETE",
    }).then(() => {
      getFood();
    });
  }
};

foodDiv.addEventListener("click", deleteFoodItem);
foodDiv.addEventListener("click", updateItem);

let init = () => {
  getFood();
};

init();
