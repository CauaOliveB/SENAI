import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Task } from "../Componentes/Task";
import { useNavigate } from "react-router-dom";

export const UpdateTask = () => {
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();

  const updateTaskSchema = z.object({
    id: z
      .string() //id da tarefa
      .min(1, "the id field must have at least one character"),

    description: z
      .string()
      .trim()
      .min(1, "Must have more than one character")
      .max(40, "Exceeded the maximum number of characters")
      .regex(
        new RegExp(/^[^\\s][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/),
        "Special characters and numbers are not allowed"
      ),

    department: z
      .string()
      .trim()
      .min(1, "At least one character is required")
      .max(20, "Exceeded the maximum number of characters")
      .regex(
        new RegExp(/^[^\\s][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/),
        "Special characters and numbers are not allowed"
      ),

    priority: z.enum(["Low", "Medium", "High"]),

    userId: z.string().min(1, "Profile is required"),

    status: z.enum(["To Do", "Doing", "Done"]), // ID da ForeignKey
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(updateTaskSchema) });

  //listando usuarios e mudando o status do input de select
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/createListUser/")
      .then((response) => {
        console.log("listing users: ", response.data);
        setUsers(response.data);
      })
      .catch((error) => console.log("Error fetching users:", error));
  }, []);

  //atualizar tarefa
  const handleUpdate = async (data) => {
    try {
      const payload = {
        description: data.description,
        setor: data.department,
        priority: data.priority,
        user: data.userId,
        status: data.status,
      };

      const response = await axios.patch(
        `http://127.0.0.1:8000/api/task/pkUpdateDeleteTasks/${data.id}`,
        payload
      );

      console.log(response.data);
      alert("Task updated successfully");
      navigate("/boards");
      window.location.reload();
    } catch (error) {
      console.error("error", error);
      console.error("error", error.response);
      console.error("error", error.response.data);
    }
  };

  return (
    <>
      <form className="taskForm" onSubmit={handleSubmit(handleUpdate)}>
        <h2>Update Task</h2>

        {/* id tarefa:  */}
        <label htmlFor="taskIdInput">Task ID: </label>
        <input
          aria-required
          id="taskIdInput"
          type="number"
          placeholder="Task ID"
          {...register("id")}
        />
        {errors?.id && <p className="error">{errors?.id.message}</p>}

        {/* Descrição  */}
        <label htmlFor="updateDescriptionInput">Description: </label>
        <input
          aria-required
          id="updateDescriptionInput"
          type="text"
          placeholder="Code back-end"
          {...register("description")}
        />
        {errors?.description && (
          <p className="error">{errors?.description.message}</p>
        )}

        {/* setor:  */}
        <label htmlFor="updateDepartment">Department: </label>
        <input
          aria-required
          id="updateDepartment"
          type="tool shop"
          placeholder=""
          {...register("department")}
        />
        {errors?.department && (
          <p className="error">{errors?.department.message}</p>
        )}

        {/* prioridade:  */}
        <label htmlFor="updatePriority">Priority: </label>
        <select
          aria-required
          name="priority"
          id="updatePriority"
          {...register("priority")}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors?.priority && (
          <p className="error">{errors.priority.message}</p>
        )}

        {/* pertence a:  */}
        <label htmlFor="updateUser">User: </label>
        <select aria-required id="updateUser" {...register("userId")} required>
          <option value="" disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.nameUser}
            </option>
          ))}
        </select>
        {errors?.userId && <p className="error">{errors.userId.message}</p>}

        {/* status tarefa:  */}
        <label htmlFor="status">Status</label>
        <select aria-required id="status" {...register("status")}>
          <option value="To Do">To Do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>

        <button aria-label="Update task" type="submit">
          Update
        </button>
      </form>
    </>
  );
};

export default UpdateTask;
