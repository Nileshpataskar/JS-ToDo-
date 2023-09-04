const clickable = document.getElementById("add-option");
clickable.addEventListener("click", ToggleTaskModal);

const clickable2 = document.getElementById("add-option2");
clickable2.addEventListener("click", ToggleTaskModal2);

var boxIndex = -1;
singleTaskIndex = -1;

Todos = [];



renderItems();
// singlerenderItems();
function ToggleTaskModal() {
  const taskInput = document.getElementById("task-input");
  taskInput.value = "";

  //if there were no prior element remove the text

  document.getElementById("list").style.display = "none";

  // Acess the Element with the ID as "modal"
  const modal = document.getElementById("task-modal");
  // console.log(modal.style.display);
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
  taskInput.focus();
}
function ToggleTaskModal2() {
  const taskInput = document.getElementById("task-input");
  taskInput.value = "";

  //if there were no prior element remove the text

  document.getElementById("list").style.display = "none";

  // Acess the Element with the ID as "modal"
  const modal = document.getElementById("task-modal");
  // console.log(modal.style.display);
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
  taskInput.focus();
}

function ToggleSingleTaskModal() {
  // Acess the Element with the ID as "modal"
  const modal = document.getElementById("single-task-modal");
  // console.log(modal.style.display);
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
}

//item modal toggle hoga after clicking on add

function ToggleItemModal() {
  // Acess the Element with the ID as "modal"
  const modal = document.getElementById("item-modal");
  const itemInput = document.getElementById("item-input");
  itemInput.value = "";
  // console.log(modal.style.display);
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
  itemInput.focus();
  // newwindow();
}

function removeValueAtIndex(index) {
  const left = Todos.slice(0, index);
  const right = Todos.slice(Number(index) + 1, Todos.length);
  Todos = left.concat(right);
}

function addTask() {
  const taskInput = document.getElementById("task-input");
  const newObj = { name: taskInput.value, items: [] };
  Todos.push(newObj);
  renderItems();
  ToggleTaskModal();
  // singlerenaderItems();
}

function addItem() {
  const itemInput = document.getElementById("item-input");
  const newItemObject = { name: itemInput.value, isCompleted: false };
  Todos[boxIndex].items.push(newItemObject);

  renderItems();
  ToggleItemModal();
  singlerenderItems();
}

function singlerenderItems() {
  const card = document.getElementById("titleBox");
  card.innerHTML = "";

  const singleTask =
    document.getElementsByClassName("taskCard")[singleTaskIndex];
  card.appendChild(singleTask);
  renderItems();
}

function renderItems() {
  var index = 0;
  // var point = 0;
  const taskContainer = document.getElementById("taskContainer");
  taskContainer.innerHTML = "";

  Todos.map((value) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("taskCard");
    taskCard.id = index;
    index++;

    const taskTitle = document.createElement("h2");
    taskTitle.classList.add("taskTitle");
    taskCard.appendChild(taskTitle);
    taskTitle.addEventListener("click", () => {
      ToggleSingleTaskModal();

      //taskcard id is index and as it is its parent elemt elemnt we take the same id

      singleTaskIndex = taskTitle.parentElement.id;
      document.getElementById("single-task-name").innerText =
        Todos[singleTaskIndex].name;
      singlerenderItems();
      renderItems();
    });
    taskTitle.innerText = value.name;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");
    const addBtn = document.createElement("Button");
    addBtn.classList.add("Addbtn");

    addBtn.addEventListener("click", () => {
      // ToggleItemModal();
      // renderItems();
      ToggleItemModal();
      renderItems();
      // singlerenderItems();

      //pay attention

      boxIndex = addBtn.parentElement.parentElement.id;
    });

    const delBtn = document.createElement("Button");
    delBtn.classList.add("deletebtn");

    delBtn.addEventListener("click", () => {
      const delIndex = delBtn.parentElement.parentElement.id;
      removeValueAtIndex(delIndex);
      renderItems();
      ToggleSingleTaskModal();
    });

    buttonContainer.appendChild(addBtn);
    buttonContainer.appendChild(delBtn);

    //creating List
    const itemList = document.createElement("ul");
    itemList.style.flex = "1";
    itemList.style.listStyleType = "disc";
    itemList.style.lineHeight = "35px";

    value.items.map((item) => {
      const markBtn = document.createElement("p");
      markBtn.innerHTML = "mark done";
      markBtn.classList.add("markBtn");

      const item1 = document.createElement("li");
      item1.innerText = item.name;
      item1.append(markBtn);

      markBtn.addEventListener("click", () => {
        item.isCompleted = !item.isCompleted;

        renderItems();
        if (!(singleTaskIndex === -1)) {
          singlerenderItems();
          // renderItems();
        }
      });
      if (item.isCompleted) {
        item1.style.textDecoration = "line-through";
        item1.style.color = "blue";
        markBtn.style.display = "none";
      }
      itemList.appendChild(item1);
    });

    taskContainer.appendChild(taskCard);
    taskCard.appendChild(itemList);
    taskCard.appendChild(buttonContainer);
  });
}
