import React, { useState, useEffect } from "react";
   
 //include images into your bundle

 //create your first component
 const Home = () => {
     
 const [inputValue, setInputValue] = useState("")
 const [tareas, setTareas] = useState([])
 const USER = "mariana-patico-2026";
 const obtenerTareas = async () => {
const response = await fetch(
    `https://playground.4geeks.com/todo/users/${USER}`
  );
   if (response.status === 404) {
    await fetch(
      `https://playground.4geeks.com/todo/users/${USER}`,
      {
        method: "POST"
      }
    );

    return;
  }
const data = await response.json();
setTareas(data.todos);
};
useEffect(() => {
obtenerTareas();
}, []);

const agregarTarea = async () => {
const tareaNueva = {
    label: inputValue,
    is_done: false
  };

await fetch(
    `https://playground.4geeks.com/todo/todos/${USER}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tareaNueva)
    }
  );

  setInputValue("");
  obtenerTareas();
};

const eliminarTarea = async (id) => {
  await fetch(
    `https://playground.4geeks.com/todo/todos/${id}`,
    {
      method: "DELETE"
    }
  );

  obtenerTareas();
};

const limpiarTareas = async () => {
  for (const tarea of tareas) {
    await fetch(
      `https://playground.4geeks.com/todo/todos/${tarea.id}`,
      {
        method: "DELETE"
      }
    );
  }

  obtenerTareas();
};
 return (
 <div>
 <div className="container">
 <div className="todo-card">
 <h1>Tareas</h1>
 <input type="text" className="todo-input" 
 value={inputValue} 
 placeholder="¿Qué hay que hacer?"
 onChange={e => setInputValue(e.target.value)} 
 onKeyUp={e => { 
 if (e.key === "Enter" && inputValue.trim().length > 0) { 
 agregarTarea()
 } }} />
 <ul>
 {
 tareas.length === 0 ? (
  <li>No hay tareas, añadir tareas</li>
  ) : (tareas.map((tarea, index) => {
  return (
  <li key={index}>
  {tarea.label}
  <span
  className="delete"
  onClick={() => eliminarTarea(tarea.id)}>
  ❌
  </span>
  </li>
  );
  })
  )
  }
</ul>
<button onClick={limpiarTareas}>
  Limpiar tareas
</button>
<div className="footer">
{tareas.length} {tareas.length === 1 ? "item" : "items"} left
</div>
</div>      
</div>
</div>
);
};
export default Home;