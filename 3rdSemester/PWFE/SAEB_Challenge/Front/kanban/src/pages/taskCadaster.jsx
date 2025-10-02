import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";

const schemaCadasterTask = z.object({
  description: z.string()
    .min(1, "Enter a description")
    .max(100, "Enter at most 100 characters"),
  sector: z.string()
    .min(1, "Enter a sector")
    .max(50, "Enter at most 50 characters"),
  priority: z.enum(["Low", "Medium", "High"], {
    errorMap: () => ({ message: "Choose what level of priority" }),
  }),
  user: z.string().min(1, "Select a user"),
});

export function CadasterTask() {
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schemaCadasterTask),
  });

  async function obtainDatas(data) {
    console.log(data);

    const userID = parseInt(data.user);
    const today = new Date().toISOString().split("/")[0];

    const payLoad = {
      ...data,
      user: userID,
      dtCadastro: today,
      status: "To Do",
    };

    console.log(payLoad);
    reset();
  }

  return (
    <section className="form">
      <h2> Task Register </h2>
      <form onSubmit={handleSubmit(obtainDatas)}>
        <label>Description:</label>
        <textarea {...register("description")} />
        {errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}

        <label>Sector:</label>
        <textarea {...register("sector")} />
        {errors.sector && <p style={{ color: "red" }}>{errors.sector.message}</p>}

        <label>Priority:</label>
        <select {...register("priority")}>
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.priority && <p style={{ color: "red" }}>{errors.priority.message}</p>}

        <label>Users:</label>
        <select {...register("user")}>
          <option value="">Select a user</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        {errors.user && <p style={{ color: "red" }}>{errors.user.message}</p>}

        <button type="submit">Register</button>
      </form>
    </section>
  );
}
