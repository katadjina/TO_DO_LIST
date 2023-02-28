const input = document.querySelector('.insert');
const add = document.querySelector('.add');
const filter = document.querySelector('.topics');
const todoList = document.querySelector('.todo-list');


document.addEventListener('DOMContentLoaded',getTodos);
add.addEventListener('click',setTodo);
todoList.addEventListener('click',action);
filter.addEventListener('input',filterTodo);



function setTodo(event) {
    event.preventDefault();
    
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo')
  
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = input.value;
    todoDiv.appendChild(newTodo);
  
    let tache = {
        content:input.value,
        action:"undone"
    }
    saveTodo(tache);
   
    const completeButton  = document.createElement('button');
    completeButton.classList.add('complete-btn');
    completeButton.innerHTML = "<i class='fa fa-check'></i>";
    todoDiv.appendChild(completeButton);

    const trashButton  = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = "<i class='fa fa-trash'></i>";
    todoDiv.appendChild(trashButton);
 
    todoList.appendChild(todoDiv);
    input.value="";
    
}

function saveTodo(todo) {
    let todos =[];
    if (localStorage.getItem("todos") != null) {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function getTodos() {
    let todos =[];
    if (localStorage.getItem("todos") != null) {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    todos.forEach(todo => {
       
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo')

    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todo.content;
    todoDiv.appendChild(newTodo);

    const completeButton  = document.createElement('button');
    completeButton.classList.add('complete-btn');
    completeButton.innerHTML = "<i class='fa fa-check'></i>";
    todoDiv.appendChild(completeButton);
   
    const trashButton  = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = "<i class='fa fa-trash'></i>";
    todoDiv.appendChild(trashButton);

    if (todo.action == "done") {
        todoDiv.classList.add("done");
    }

    todoList.appendChild(todoDiv);
    });
}

function action(event) {
    const item = event.target;

    if (item.classList[0] === "trash-btn") {
        item.parentNode.classList.add('fail')
        removeTodo(item.parentNode);
        item.parentNode.addEventListener('transitionend',event=>{
            item.parentNode.remove();
        })
    }

    if (item.classList[0] === "complete-btn") {
        item.parentNode.classList.toggle('done')
        let todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach((todo,index) =>{
            if (todo.content == item.parentNode.firstChild.innerText) {
                if (item.parentNode.classList.contains("done")) {
                    todos[index].action = "done"
                    return;
                } else {
                    todos[index].action = "undone"
                    return;
                }
            }
        });
        localStorage.setItem("todos",JSON.stringify(todos));
    }
}
function removeTodo(tododiv) {

   let todos =[];
   if (localStorage.getItem("todos") != null) {
       todos = JSON.parse(localStorage.getItem("todos"));
   }
   const todoText = tododiv.firstChild.innerText;
   todos.forEach((todo,index)=>{
       if (todo.content === todoText) {
            todos.splice(index,1);
       }
   })
   localStorage.setItem('todos',JSON.stringify(todos));

}
function filterTodo(event) {
    const todos =  todoList.childNodes;
    let i = 0;
     todos.forEach((todo)=>{
        if (i!=0) {
            switch (event.target.value) {
                case "all":
                    todo.style.display = "flex"
                    break;
                case "done":
                    if (todo.classList.contains("done")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            
                case "undone":
                    if (!todo.classList.contains("done")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            }
        }
        i++;
     })
}
