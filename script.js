let taskList = [];
const form = document.querySelector('form');

const list = document.getElementById('list');

if (localStorage.getItem("array") === null) {
    localStorage.setItem("array", JSON.stringify(taskList));
}
else {
    let todos = JSON.parse(localStorage.getItem("array"));
    addListElements(todos);
}

const span = document.querySelector('span');
span.addEventListener('click', () => {
    if (getArr().length == 0) return;
    let check = prompt("Type 'Yes' to DELETE all Tasks");
    if (check === 'Yes') {
        list.innerHTML = "";
        let empty = [];
        setArr(empty);
    }
});

form.addEventListener('submit', (e) => {

    e.preventDefault();

    let task = document.querySelector('form input').value;

    if (task === "") {
        alert("Please provide input before adding!!")
        return;
    }

    let listElement = createTask(task);

    addToLocalStorage(listElement.children[1].innerText);

    list.appendChild(listElement);

    document.querySelector('form input').value = "";
});



function addListElements(array) {
    for (const task of array) {

        let listElement = createTask(task);

        list.appendChild(listElement);
    }
}

function addToLocalStorage (e) {

    let todolist = getArr();

    todolist.push(e);

    setArr(todolist);

}

function removeFromLocalStorage(e) {
    
    let todolist = getArr();
    
    let ind = todolist.indexOf(e);

    todolist.splice(ind, 1);
    
    setArr(todolist);

}


function create(tag, text, cname) {
    let x = document.createElement(tag);
    if (text.charAt(0) == '<') 
        x.innerHTML = text;
    else
        x.innerText = text;
    if (cname != ""){
        for (let c of cname.split(" ")) {
            x.classList.add(c);
        }
    }  
    return x;
}

function createTask(task) {
    let li = create('li', "", "task-li-element li-des");
    let point = create('div', 'atr', 'material-symbols-outlined');
    point.style.color = 'blue';
    let btn1 = create('button', 'arrow_upward', 'bor up material-symbols-outlined');
    let btn2 = create('button', 'arrow_downward', 'bor down material-symbols-outlined');
    let btn3 = create('button', 'delete', 'bor delete material-symbols-outlined');
    let btn4 = create('button', 'done', 'bor done material-symbols-outlined');
    let box = create('div', task, 'box');

    li.appendChild(point); 
    li.appendChild(box);
    li.appendChild(btn1);
    li.appendChild(btn2);
    li.appendChild(btn3);
    li.appendChild(btn4);

    li.children[4].addEventListener('click', (e) => {

        e.target.parentElement.remove();
        removeFromLocalStorage(li.children[1].innerText);

    });

    li.children[5].addEventListener('click', (e) => {
        if (e.target.innerText == 'done') {
            e.target.innerText = 'remove_done';
            e.target.parentElement.children[1].style.textDecoration = "line-through";
        }
        else {
            e.target.innerText = 'done';
            e.target.parentElement.children[1].style.textDecoration = "none";
        }
        
    });

    li.children[2].addEventListener('click', (e) => {
        bringUp(e.target.parentElement);
    });
    li.children[3].addEventListener('click', (e) => {
        bringDown(e.target.parentElement);
    });

    return li;
}

function getArr() {
    return JSON.parse(localStorage.getItem("array"));
}

function setArr(arr) {
    localStorage.setItem("array", JSON.stringify(arr));
}

function bringUp(e) {
    let arr = getArr();
    let ind = arr.indexOf(e.children[1].innerText);
    let task_current = e.children[1].innerText;
    if (ind > 0) {
        let task_prev = e.previousElementSibling.children[1].innerText;
        arr[ind] = task_prev;
        arr[ind-1] = task_current;
        setArr(arr);
        e.previousElementSibling.children[1].innerText = task_current;
        e.children[1].innerText = task_prev;
    }
}

function bringDown(e) {
    let arr = getArr();
    let ind = arr.indexOf(e.children[1].innerText);
    let task_current = e.children[1].innerText;
    if (ind < arr.length - 1) {
        let task_prev = e.nextElementSibling.children[1].innerText;
        arr[ind] = task_prev;
        arr[ind+1] = task_current;
        setArr(arr);
        e.nextElementSibling.children[1].innerText = task_current;
        e.children[1].innerText = task_prev;
    }
}