import { useState } from "react";
import axios from "axios";
import { id } from "zod/v4/locales";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { data } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDraggable } from '@dnd-kit/core';
import { Link } from "react-router";




export function Task({task}){

    let navigate = useNavigate(); 

    const schemaCadTask = z.object({ 
       status: z.enum(["Do","Doing","Done"], "Choose the status")// ID da ForeignKey
    })

    //para fazer o uso do draggable eu preciso usar o hook respectivo
    // ele precisa de 4 caracteristicas
    //atributes: permite a seleção dele pelos preriféricos
    //listerns: são os ouvintes que estão sempre ouvido algum evento
    // transform: é quem me da a sensação de movimento
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: task.id
    });

    //style do drag drop
    const style = transform
        ?{transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`}
        :undefined;
    
    const {
            register,
            handleSubmit,
            formState: { errors },
            reset
        } = useForm({ resolver: zodResolver(schemaCadtask)})
    

    //editar status
    const editStatus = async(data,id) => {
        try{
            const payload = {
                status: data.status 
            };

            const response = await axios.patch(`http://127.0.0.1:8000/api/tasks/pkUpdaterDeleteTasks/${id}`,payload)
        
            console.log(response.data)
            alert(`Task status field|${id}| updated`)
            window.location.reload()

        } catch(error){
            console.log("Erro:", error)
        }
    }

   
    // deletar tarefa
    const deleteTask = async () => {
        try{
            const response = await axios.delete(`http://127.0.0.1:8000/api/tasks/pkUpdaterDeleteTasks/${task.id}`)
            console.log(response.data)
            alert("Removed activity")
            window.location.reload();
        } catch(error){
            console.error("Error in delete", error)
            console.error("Erro ", error.response.data)
        }
    }
    

    return(
        <div 
        role="region"
        className="areaTask"
        ref={setNodeRef} 
        draggable="true"
        aria-describedby="Task"
        aria-label={`Task assigned by user ${task.idUser ?? 'ID not available'}`}
        style={style}
        {...listeners}
        {...attributes}>
            
            <dl>
                {/* Area do usuario que pertence a tarefa */}
                <div className="userArea">
                    <dt> Owned by: </dt>
                    <dd>{task.idUser ?? "ID not available "}</dd>
                </div>

                {/* Area da descrição da tarefa */}
                <div className="descriptionArea">
                    <dt>Description: </dt>
                    <dd>{task.descricao}</dd>
                </div>

                {/*Area do setor  */}
                <div className="SetorArea">
                    <dt>Setor: </dt>
                    <dd>{task.setor}</dd>
                </div>

                {/* Area da prioridade */}
                <div className="priorityArea">
                    <dt>Priority: </dt>
                    <dd>{task.prioridade}</dd>
                </div>
                
            </dl>

            {/* Conteiner dos botões */}
            <div className="conteinerButton">
                <Link className="updatelink" to='/Taskupdate'>Edit</Link>
                <button onClick={deleteTask} className="deleteButton" type="button">Delete</button>
            </div>
            
            {/* editar status da tarefa */}
            <form className="checkBox" onSubmit={handleSubmit((data) => editarStatus(data,task.id))}>
                <div className="statusBox">
                    <label htmlFor="status">Status:  </label>
                    <select 
                    id="status" 
                    name="status" 
                    aria-invalid="true"
                    aria-labelledby={errors?.status ? "erroInputStatusTask" : undefined}
                    {...register("status")}>
                        <option value = ''>Select Status</option>
                        <option value = 'Fazer' >Do</option>
                        <option value = 'Fazendo'>Doing</option>
                        <option value = 'Pronto'>Done</option>
                    </select>
                    {errors?.status && <p className="error" id="erroInputTaskStatus">{errors.status.message}</p>}
                </div>

                <div className="conteinerStatusButton">
                    <button className="botaoAlterarStatus" type='submit'>Change Status</button>
                </div>
            </form>
        </div>
    )
}