
import React,{useState,useEffect} from "react"

function ToDoList(){

    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
      });
      const [newTask, setNewTasks] = useState("");
      const [editIndex, setEditIndex] = useState(null);
      useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }, [tasks]);
    
function handleInputChange(event){
setNewTasks(event.target.value)
}

function addTask(){
if(newTask.trim('')!==""){
    setTasks(t=>[...t,newTask])
    setNewTasks("")
}
   
}

function deleteTask(index){
setTasks(tasks.filter((_,i)=>i!==index))
}

function moveTaskUp(index){

    if(index>0){
        const updatedTask=[...tasks];

        [updatedTask[index], updatedTask[index-1]] = [updatedTask[index-1], updatedTask[index]];
        setTasks(updatedTask);
    }

}

function editTask(index) {
    setEditIndex(index);
    setNewTasks(tasks[index]); 
  }

  function saveEditedTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newTask; 
    setTasks(updatedTasks);
    setEditIndex(null); 
    setNewTasks(""); 
  }
function moveTaskDown(index){

    if(index<tasks.length-1){
        const updatedTask=[...tasks];

        [updatedTask[index], updatedTask[index+1]] = [updatedTask[index+1], updatedTask[index]];
        setTasks(updatedTask);
    }
}

return (<>

<div className="to-do-list">
<h2>To-Do-List</h2>
    <input type="text" 
    placeholder="Enter a task..." 
    value={newTask}
    onChange={handleInputChange}/>

    <button className="add-button" onClick={addTask}>Add</button>
</div>

<ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? ( 
              <>
                <input
                  type="text"
                  value={newTask}
                  onChange={handleInputChange}
                />

                <button
                  className="save-button"
                  onClick={() => saveEditedTask(index)}
                >
                  Save
                </button>
              </>
              
            ) : (
              <>
                <span className="text">{task}</span>
                <button className="edit-button" onClick={() => editTask(index)}>
                  Edit
                </button>
              </>
            )}

            <button className="delete-button" onClick={() => deleteTask(index)}>
              ❌
            </button>
            <button className="move-button" onClick={() => moveTaskUp(index)}>
              ⬆️
            </button>
            <button className="move-button" onClick={() => moveTaskDown(index)}>
              ⬇️
            </button>
          </li>
        ))}
      </ol>
</>)

}

export default ToDoList