import styles from './Teachers.module.css'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema de validação
const teachersSchema = z.object({
  NI: z.string().length(6, { message: 'Coloque seu NI de 6 caracteres!' }),
  Senha: z.string().min(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
})

export function Teachers() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(teachersSchema)
  })

  function onSubmit(data) {
    console.log('Dados enviados:', data)
    // aqui você pode fazer a lógica de login
  }

  return (
    <div className={styles.container}>
      <p className={styles.titulo}>Professores</p>

      <form className={styles.formulario} onSubmit={handleSubmit(onSubmit)}>

        <input
          {...register('NI')}
          placeholder='NI'
          className={styles.campo}
        />
        {errors.NI && (
          <p className={styles.mensagem}>
            {errors.NI.message}
          </p>
        )}

        <input
          type="Name"
          {...register('Name')}
          placeholder='Name'
          className={styles.campo}
        />
        {errors.Senha && (
          <p className={styles.mensagem}>
            {errors.Name.message}
          </p>
        )}

        <input
          type="Email"
          {...register('Email')}
          placeholder='Email'
          className={styles.campo}
        />
        {errors.Senha && (
          <p className={styles.mensagem}>
            {errors.Name.message}
          </p>
        )}

        <input
          type="telephone"
          {...register('Telefone')}
          placeholder='Telefone'
          className={styles.campo}
        />
        {errors.Senha && (
          <p className={styles.mensagem}>
            {errors.Telefone.message}
          </p>
        )}

        <input
          type="date"
          {...register('Data de Nascimento')}
          placeholder='Data de Nascimento'
          className={styles.campo}
        />
        {errors.Senha && (
          <p className={styles.mensagem}>
            {errors.Data_de_Nascimento.message}
          </p>
        )}

        <input
          type="date"
          {...register('Data de Contratação')}
          placeholder='Data de Contratação'
          className={styles.campo}
        />
        {errors.Senha && (
          <p className={styles.mensagem}>
            {errors.Data_de_Contratacao.message}
          </p>
        )}

        <input
          type="Disciplinas"
          {...register('Data de Contratação')}
          placeholder='Disciplinas Atribuídas'
          className={styles.campo}
        />
        {errors.Senha && (
          <p className={styles.mensagem}>
            {errors.Data_de_Contratacao.message}
          </p>
        )}


        <button type="submit" className={styles.botao}>
          Entrar
        </button>
      </form>
    </div>
  )
}
