import styles from './Discipline.module.css'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

const disciplinaSchema = z.object({  

    name: z.string().min(2, {message: 'The name must contain at least 2 characters.'})
                    .max(80, {message: 'The name must contain no more than 80 characters.'}),
    course: z.string().min(2, {message: 'The name must contain at least 2 characters.'})
                     .max(100, {message: 'The name must contain no more than 100 characters.'}),
    hourLoad: z.number().min(1, {message: 'Minimum workload of 1h.'}),
    description: z.string().min(1, {message: 'The field should not be empty.'}),                
    responsible: z.string().min(1, {message: 'The field should not be empty.'})
})

export function Discipline(){

    const {
        register, 
        handleSubmit, 
        setValue,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(disciplinaSchema)
    })

    function authDiscipline(data){
        console.log(data.email)
        console.log(data.password)
    }

    const numberConversion = (e) => {
        let value = e.target.value
        let numericValue = value ? Number(value) : undefined
        setValue('hourLoad', numericValue   )
    }

    return(
        <div className={styles.conteiner}>
            <p className={styles.titulo}>Discipline</p>

            <form 
                onSubmit={handleSubmit(authDiscipline)}
                className={styles.formulario}
            >

                <input 
                    {...register('name')}
                    placeholder='Name'
                    className={styles.campo}
                />
                { errors.name && (
                    <p className={styles.mensagem}>
                        {errors.name.message}
                    </p>
                )}

                <input 
                    {...register('course')}
                    placeholder='Course'
                    className={styles.campo}
                />
                { errors.curso && (
                    <p className={styles.mensagem}>
                        {errors.course.message}
                    </p>
                )}


                <input 
                    {...register('hourLoad')}
                    placeholder='Hour Load'
                    className={styles.campo}
                    type='number'
                    onChange={numberConversion}
                    
                />
                { errors.hourLoad && (
                    <p className={styles.mensagem}>
                        {errors.hourLoad.message}
                    </p>
                )}


                <input 
                    {...register('description')}
                    className={styles.campo}
                    placeholder='Description'
                />
                { errors.description && (
                    <p className={styles.mensagem}>
                        {errors.description.message}
                    </p>
                )}


                <input 
                    {...register('responsible')}
                    className={estilos.campo}
                    placeholder='Responsible'
                />
                { errors.responsible && (
                    <p className={styles.mensagem}>
                        {errors.responsible.message}
                    </p>
                )}

                <button
                    className={styles.botao}
                >Confirm</button>
            </form>
        </div>
    )
}