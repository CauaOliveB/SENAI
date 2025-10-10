import React, { useEffect, useState } from "react";
import { Header } from "../Componentes/Header";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

// validações de campos do formulário
const taskSchema = z.object({ 
    description: z.string()
        .trim()
        .min(1, "Must have at least one character")
        .max(40, "Exceeded the character limit")
        .regex(
            new RegExp(/^[^\\s][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/),
            "Special characters and numbers are not allowed"
        ),

    department: z.string()
        .trim()
        .min(1, "Must have at least one character")
        .max(20, "Exceeded the character limit")
        .regex(
            new RegExp(/^[^\\s][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/),
            "Special characters and numbers are not allowed"
        ),

    priority: z.enum(["Low", "Medium", "High"]),

    userId: z.string().min(1, "User profile is required"),

    status: z.enum(["ToDo", "Doing", "Done"]) // ID da ForeignKey
});

export function TaskForm() {

    const [users, setUsers] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ resolver: zodResolver(taskSchema) });

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/user/createListUsers/")
            .then(response => {
                console.log("Listing users: ", response.data);
                setUsers(response.data);
            })
            .catch(error => console.log("Error fetching users:", error));
    }, []);

    async function handleData(data) {
        console.log(`Inserted data: ${data}`);
        
        try {
            await axios.post("http://127.0.0.1:8000/api/tasks/createListTasks/", data);
            alert("Task registration completed");
            reset();
        } catch (error) {
            console.log("Error", error);
            console.log("Error details", error.response.data);
        }
    }

    return (
        <>
            <form className="taskForm" onSubmit={handleSubmit(handleData)}>
                <h1>Create Task</h1>
                
                {/* descrição da atividade */}
                <label htmlFor="descriptionInput">Description: </label>
                <input 
                    aria-required="true"
                    id="descriptionInput"
                    type="text"
                    placeholder="Code the back-end"
                    aria-invalid={!!errors.description}
                    aria-labelledby={errors?.description ? "errorDescriptionInput" : undefined}
                    {...register("description")}
                />
                {errors?.description && <p id="errorDescriptionInput">{errors?.description.message}</p>}

                {/* setor da atividade */}
                <label htmlFor="departmentInput">Department: </label>
                <input 
                    id="departmentInput"
                    type="text"
                    placeholder="BISB"
                    aria-required="true"
                    aria-invalid={!!errors?.department}
                    aria-labelledby={errors?.department ? "errorDepartmentInput" : undefined}
                    {...register("department")}
                />
                {errors?.department && <p id="errorDepartmentInput">{errors?.department.message}</p>}

                {/* prioridade da tarefa */}
                <label htmlFor="prioritySelect">Priority: </label>
                <select 
                    name="priority"
                    id="prioritySelect"
                    defaultValue="Low"
                    {...register("priority")}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                {errors?.priority && <p className="error">{errors.priority.message}</p>}

                {/* usuario pertecente a tarefa */}
                <label htmlFor="userSelect">User: </label>
                <select 
                    id="userSelect"
                    aria-required="true"
                    aria-invalid={!!errors?.userId}
                    aria-labelledby={errors?.userId ? "errorUserId" : undefined}
                    {...register("userId")}
                    required
                >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.userName}
                        </option>
                    ))}
                </select>
                {errors?.userId && <p className="error" id="errorUserId">{errors.userId.message}</p>}

                {/* status da atividade */}
                <label htmlFor="statusSelect">Status</label>
                <select 
                    id="statusSelect"
                    defaultValue="ToDo"
                    {...register("status")}
                >
                    <option value="ToDo">To Do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>

                <button aria-label="Create Task" type="submit">
                    Create
                </button>
            </form>
        </>
    );
}
