
const clickable = document.getElementById("add-option");
clickable.addEventListener("click", ToggleTaskModal);

const clickable2 = document.getElementById("add-option2");
clickable2.addEventListener("click", ToggleTaskModal);

var boxIndex = -1;
singleTaskIndex = -1;

Todos = [];

renderItems();

function ToggleTaskModal() {
    const taskInput = document.getElementById("task-input");
    taskInput.value = "";

    document.getElementById("list").style.display = "none";

    const modal = document.getElementById("task-modal");

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

    document.getElementById("list").style.display = "none";

    const modal = document.getElementById("task-modal");

    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
    taskInput.focus();
}

function ToggleSingleTaskModal() {
    const modal = document.getElementById("single-task-modal");

    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
}

function ToggleItemModal() {
    const modal = document.getElementById("item-modal");
    const itemInput = document.getElementById("item-input");
    itemInput.value = "";

    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
    itemInput.focus();
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

            singleTaskIndex = taskTitle.parentElement.id;
            document.getElementById("single-task-name").innerText =
                Todos[singleTaskIndex].name;
            singlerenderItems();
            renderItems();
        });

        // Limit the task title length to 15 characters and display a warning
        const maxTitleLength = 15;
        const titleText = value.name.length > maxTitleLength ? `${value.name.substring(0, maxTitleLength)}...` : value.name;

        if (value.name.length > maxTitleLength) {
            const warningIcon = document.createElement("span");
            warningIcon.innerText = "⚠️"; // Warning icon
            warningIcon.title = "Title exceeds 15 characters";
            taskTitle.appendChild(warningIcon);
        }

        taskTitle.innerText = titleText;

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("buttonContainer");
        const addBtn = document.createElement("Button");
        addBtn.classList.add("Addbtn");

        addBtn.addEventListener("click", () => {
            ToggleItemModal();
            renderItems();
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
