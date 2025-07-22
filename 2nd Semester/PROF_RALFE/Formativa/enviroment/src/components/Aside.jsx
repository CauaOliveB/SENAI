import styles from './Aside.module.css'
import foto from '../assets/User.jpg'
import { RiBookShelfLine } from "react-icons/ri";
import { HiAcademicCap } from "react-icons/hi2";
import { SiGoogleclassroom } from "react-icons/si";
import { RiCalendarScheduleLine } from "react-icons/ri";
import {Link} from 'react-router'

export function Aside(){
    return(
        <aside className={styles.container}>
            <header>
                
                <img className={styles.imagemHeader} 
                src={'https://plus.unsplash.com/premium_photo-1678734268618-3f754fd821a4?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} 
                />

                <div className={styles.imagemUser}>
                    <img className={styles.photoUser} 
                    src={foto}
                    />
                    <p className={styles.nameUser}>Hussein Abshila</p>
                </div>
            </header>

            <section className={styles.container.Botoes}>

                <Link className={styles.botao} to={'/professor'}>
                    <HiAcademicCap size={22} className={styles.icons}/>
                    Professor
                    
                </Link>

                <Link className={styles.botao}>
                    <RiBookShelfLine size={22} className={styles.icons}/>
                    Disciplina
                    {/* to={'/discipline'} */}
                </Link>
                
                <Link className={styles.botao}>
                    <SiGoogleclassroom size={22} className={styles.icons}/>
                    Reserva
                </Link>
                
                <Link className={styles.botao}>
                    <RiCalendarScheduleLine size={22} className={styles.icons}/>Agendamento
                    {/* to={'/classroom'} */}
                </Link>
                
            </section>

        </aside>
    )
};