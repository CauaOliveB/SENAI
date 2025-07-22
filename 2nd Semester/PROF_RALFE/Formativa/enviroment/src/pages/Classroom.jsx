import styles from './Classroom.module.css'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

const salaSchema = z.object({  

    description: z.string().min(2, {message: 'The description must have 2 characters minimum.'})
                         .max(80, {message: 'The description must have 80 characters maximum.'}),
    location: z.string().min(2, {message: 'The location must have 2 characters minimum.'})
                           .max(40, {message: 'The location must have 80 characters maximum.'})
})

export function Classroom(){

    const {
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm({
        resolver: zodResolver(salaSchema)
    })

    function authClassroom(data){
        console.log(data)
    }

    return(
        <div className={styles.conteiner}>
            <p className={styles.titulo}>Classroom</p>

            <form 
                onSubmit={handleSubmit(authClassroom)}
                className={styles.formulario}
            >
                <input 
                    {...register('description')}
                    placeholder='Description'
                    className={styles.campo}
                />
                { errors.descricao && (
                    <p className={styles.mensagem}>
                        {errors.description.message}
                    </p>
                )}

                <input 
                    {...register('location')}
                    placeholder='Location'
                    className={styles.campo}
                />
                { errors.location && (
                    <p className={styles.mensagem}>
                        {errors.location.message}
                    </p>
                )}

                <button
                    className={styles.botao}
                >Confirm</button>
            </form>
        </div>
    )
}