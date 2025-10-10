// hooks são palavras reservadas que nos ajudam a desenvolver nossas aplicações
// começou com "use" 98% de chance de ser um hook do react
// state grava o estado atual de uma variável
// effect é fofoqueiro, ele quer contar o que o usuário precisa saber
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Column } from "./Column";
import { CadTask } from "../Pages/CadTask";
import { Header } from "./Header";
import { DndContext } from "@dnd-kit/core"; // biblioteca que me permite a área que você pode clicar e arrastar

export function Board() {
  const [tasks, setTasks] = useState([]);

  // () recepção de parâmetros, {} scripts, [] dependências
  useEffect(() => {
    const apiURL = "http://127.0.0.1:8000/api/tasks/createListTasks/";
    // axios faz requisição http
    axios
      .get(apiURL)
      // se der bom, armazeno o tasks usando a resposta do axios
      .then((response) => {
        setTasks(response.data);
      })
      // se der ruim, vejo o problema no console
      .catch((error) => {
        console.error("Algo deu errado", error);
      });
  }, []);

  // caminho final do drag and drop
  function handleDragEnd(event) {
    const { active, over } = event;

    if (over && active) {
      const taskID = active.id;
      const newColumn = over.id;

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskID ? { ...task, status: newColumn } : task
        )
      );

      axios
        .patch(
          `http://127.0.0.1:8000/api/tasks/pkUpdateDeleteTasks/${taskID}`,
          {
            status: newColumn,
          }
        )
        .catch((err) => console.error("Houve erro", err));
    }
  }

  // tenho 3 arrays, cada uma com um status de tarefa possível no meu kanban
  const tasksToDo = tasks.filter((task) => task.status === "ToDo");
  const tasksDoing = tasks.filter((task) => task.status === "Doing");
  const tasksDone = tasks.filter((task) => task.status === "Done");

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main>
        <h1 className="board">Tasks</h1>
        <article className="taskCategories">
          <Column id="ToDo" title="To Do" tasks={tasksToDo} />
          <Column id="Doing" title="Doing" tasks={tasksDoing} />
          <Column id="Done" title="Done" tasks={tasksDone} />
        </article>
      </main>
    </DndContext>
  );
}
