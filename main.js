import TaskTracker from "./taskTracker.js";

const todo =document.querySelector(".cards.todo");
const pending=document.querySelector(".cards.pending");
const completed =document.querySelector(".cards.completed");
let taskBox=[todo, pending, completed];
const add=document.querySelectorAll(".add");

function addTaskCard(task,index){
    taskBox[index].innerHTML+=`
    <form draggable="true" class="card" data-id="${task.taskId}">
        <input value="${task.content}" name="task" autocomplete="off" disabled="disabled">
        <div>
            
            <span>
                <button class="bi bi-pencil edit" data-id="${task.taskId}"></button>
                <button class="bi bi-check-lg update hide" data-id="${task.taskId}" data-column="${index}"></button>
                <button class="bi bi-trash3 delete" data-id="${task.taskId}"></button>
            </span>
        </div>
    </form>
    `;
}

TaskTracker.gettAllTask().forEach((tasks,index) =>{
    tasks.forEach(task=>{
        addTaskCard(task,index);

    })
})

add.forEach(form =>{
    form.addEventListener('click',event=>{
        event.preventDefault();
        if(form.task.value.trim()){
            const task=TaskTracker.insertTask(form.submit.dataset.id,form.task.value.trim())
            addTaskCard(task,form.submit.dataset.id)
            form.reset();
        }
    })
})

taskBox.forEach(column =>{
    column.addEventListener('click',event =>{
        event.preventDefault();
        let taskInput=event.target.parentElement.parentElement.previousElementSibling
        
        if(event.target.classList.contains("edit")){
            taskInput.removeAttribute("disabled","disabled")
            event.target.classList.add("hide")
            event.target.nextElementSibling.classList.remove("hide")
        }
        
        if(event.target.classList.contains("update")){
            taskInput.setAttribute("disabled","disabled")
            event.target.classList.add("hide")
            event.target.previousElementSibling.classList.remove("hide")
            let taskId=event.target.dataset.id
            let columnId=event.target.dataset.column
            //console.log(taskId)
            TaskTracker.updateTask(taskId,{
                columnId : columnId,
                content : taskInput.value
            })
        }
        
        if(event.target.classList.contains("delete")){
            TaskTracker.deleteTask(event.target.dataset.id)
            taskInput.parentElement.remove();
        }

    })

    column.addEventListener("dragstart",event=>{
        if(event.target.classList.contains("card")){
            event.target.classList.add("dragging");
        }
         
    })

   column.addEventListener("dragover", event => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        
        const card = document.querySelector(".dragging");
       
        console.log(card)

        if (card) {
            column.appendChild(card);
        }
    });
    column.addEventListener("dragend",event=>{
        if(event.target.classList.contains("card")){
            event.target.classList.remove("dragging");
            const taskId=event.target.dataset.id;
            const columnId=event.target.parentElement.dataset.id;
            TaskTracker.updateTask(taskId,{columnId:columnId,content:event.target.task.value})
        }
    })
})




