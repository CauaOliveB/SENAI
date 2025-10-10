// Formas de validar um formulário usando REACT
// Zod trabalha com mais componentes para fazer sentido na sua validação
// Os três amigos são "zod", "useForm" e "resolvers" (a "mãezona")

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// Zod campo a campo o que eu valido e qual mensagem eu exibo se der erro

const userRegisterSchema = z.object({
  // o que eu recebo
  userName: z.string()
    .trim()
    .min(1, "Please fill in the name field")
    .max(40, "The field allows up to 30 characters")
    .regex(
      new RegExp(/^[^\s][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/),
      "Numbers and special characters are not allowed"
    ),

  userEmail: z.string()
    .trim()
    .min(1, "Please fill in the email field")
    .max(50, "The field allows up to 50 characters")
    .email("Please enter a valid email")
    .regex(
      new RegExp(/^[^\s][a-z0-9]+@[a-z0-9]+\.[c][o][m]+\.?$/i),
      "Invalid format"
    ),
});

// Criação do componente
export function UserRegister() {
  const {
    register, // registra o campo
    handleSubmit, // no momento em que eu submeter (clicar em cadastrar)
    formState: { errors }, // o que está no formulário // se der ruim deixa na variável errors
    reset,
  } = useForm({ resolver: zodResolver(userRegisterSchema) }); // "mãezona" junta os 3 e faz a validação

  async function handleData(data) {
    console.log("Inserted data", data);

    // chamada à API
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/user/createListUser/",
        data
      );

      alert("User successfully registered!");
      reset();
      // se der problema mostro uma mensagem de erro
    } catch (error) {
      alert("An error occurred during registration");
      console.error("Something went wrong", error);
      console.error("error 1", error.response.data);
      console.error("error 2", error.response.status);
      console.error("error 3", error.response.headers);
    }
  }

  return (
    // no momento da submissão chamo as funções
    <form className="form" onSubmit={handleSubmit(handleData)}>
      <h2>User Registration</h2>

      <label htmlFor="nameInput">Name:</label>
      {/* o register pega o valor inserido num campo input */}
      <input
        aria-required="true"
        id="nameInput"
        type="text"
        placeholder="John Doe"
        aria-invalid={!!errors?.userName}
        aria-labelledby={errors?.userName ? "errorInputUserName" : undefined}
        {...register("userName")}
      />
      {/* Se der erro eu crio um novo parágrafo para exibir a mensagem */}
      {errors?.userName && (
        <p id="errorInputUserName">{errors?.userName.message}</p>
      )}

      <label htmlFor="emailInput">Email:</label>
      <input
        aria-required="true"
        id="emailInput"
        type="email"
        placeholder="email@domain.com"
        aria-invalid={!!errors?.userEmail}
        aria-labelledby={errors?.userEmail ? "errorInputEmail" : undefined}
        {...register("userEmail")}
      />
      {errors?.userEmail && (
        <p className="error" id="errorInputEmail">
          {errors.userEmail.message}
        </p>
      )}

      <button aria-label="Register users" type="submit">
        Register
      </button>
    </form>
  );
}
