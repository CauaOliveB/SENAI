import { useForm } from 'react-hook-form';
import { email, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schemauserCadaster = z.object({
    name : z.string()
        .min(1, "Enter at least a valid value")
        .max(50, "Enter until 50 characters"),
    email : z.string()
        .min(1, "Enter at least a valid value")
        .max(50, "Enter until 50 characters")
        .email("Email format Invalid")
});

export function userCadaster() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemauserCadaster)
    });

    async function obtainDatas(data) {
        console.log('Received datas', data);
    }

    return (
        <section className='Form'>
            <h2>User Cadaster</h2>
            <form onSubmit={handleSubmit(obtainDatas)}>

                <label>Name</label>
                <input type="text" {...register('name')} placeholder=' Name Surname ' />
                { errors.name && <p>{errors.name.message}</p> }

                <label>Email</label>
                <input type="email" {...register('email')} placeholder=' email@domain.com ' />
                { errors.email && <p>{errors.email.message}</p> }

                <button type='submit'> Cadaster </button>
            </form>
        </section>
    )
}