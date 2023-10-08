export default class TaskTracker{
    static getTask(columnId){
        const data = read()[columnId];
        return data.tasks
    }
    static insertTask(columnId, content){
        let data= read();
        let column =data.find(column =>{
            return column.columnId == columnId;
        });
        let task={
            taskId: Math.floor(Math.random()*10000),
            content:content
        };
        
        column.tasks.push(task)
        
        if(!column){
            throw new Error("Column doesn't exist");
        }
        save(data);
        return task;

    }
    static updateTask(taskId, updateInfo){
        const data= read();
        function findColumnTask(){
            for(const column of data){
                const task = column.tasks.find(item =>{
                    // console.log(item.taskId+"=="+taskId)
                    return item.taskId==taskId;
                })
                // console.log(Boolean(task))
                if(task){
                    return [task, column]
                }
                
            }
        }
        // console.log(findColumnTask())
        let [task, columnNum]= findColumnTask();
        columnNum.tasks.splice(columnNum.tasks.indexOf(task),1);
        
        task.content=updateInfo.content;
        const targetColumn=data.find(column =>{
            return column.columnId==updateInfo.columnId;
        })
        
        targetColumn.tasks.push(task);
        
        // console.log(data);
        save(data);

    }
    static deleteTask(taskId){
        const data =read();
        for(const column of data){
            const task = column.tasks.find(task =>{
                return task.taskId==taskId;
            })
            if(task){
            column.tasks.splice(column.tasks.indexOf(task),1);
            }
        }
        save(data);
        return data;
    }
    static gettAllTask(){
        const data = read();
        colCount()
       
    return [data[0].tasks, data[1].tasks, data[2].tasks ];
    }
}

function read(){
    const data = localStorage.getItem("data");
    if(!data){
        return [
            {columnId:0, tasks:[]},
            {columnId:1, tasks:[]},
            {columnId:2, tasks:[]},
        ]
    }
    return JSON.parse(data);

}

function save(data){
    localStorage.setItem("data",JSON.stringify(data));
    colCount()
}
function colCount(){
    const data =read();
    let todoCount=document.querySelector("span.todo")
    let pendingCount=document.querySelector("span.pending")
    let completedCount=document.querySelector("span.completed")

    todoCount.textContent=data[0].tasks.length;
    pendingCount.textContent=data[1].tasks.length;
    completedCount.textContent=data[2].tasks.length;

}






//  console.log(TaskTracker.gettAllTask());
//  console.log(TaskTracker.getTask(2))
//console.log(TaskTracker.insertTask(0,"column 2 task1"))
// console.log(TaskTracker.deleteTask(7274))
// console.log(TaskTracker.deleteTask(5911))


// TaskTracker.updateTask(7658,{columnId:1, content:"sadfasdfasdf"})
// console.log(TaskTracker.gettAllTask());