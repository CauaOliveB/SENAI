import styles from './Login.module.css'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { Rotas } from '../rotas/Rotas';

const loginSchema = z.object({
    Email: z.string()
        .email({message: 'Provide a valid email address!'}),

    Password: z.string()
        .length(6, {message: 'Define a password with 6 characters!'})
})

export function Login(){

    const navegacao = useNavigate()

    const {register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(loginSchema)})

    function autenticarUsuario (data){
        console.log(data.Email)
        console.log(data.Password)

        navegacao('Initial')
    }


    return(
        <div className={styles.container}>
            <p className={styles.titulo}>Login</p>

            <form 
                onSubmit={handleSubmit(autenticarUsuario)}
                className={styles.formulario}
            >

                <input
                    {...register('Email')}
                    placeholder='E-mail'
                    className={styles.campo} 
                />
                { errors.Email && (
                    <p className={styles.mensagem}>
                        {errors.Email.message}
                    </p>
                )}

                <input
                    {...register('Password')}
                    placeholder='Password'
                    className={styles.campo} 
                />
                { errors.Senha && (
                    <p className={styles.mensagem}>
                        {errors.Senha.message}
                    </p>
                )}
                <button
                    className={styles.botao}
                >Entrar</button>
            </form>
        </div>
    )
}