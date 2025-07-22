import styles from './Basis.module.css'
import { Button } from '../components/Button'
import * as Counter from '../components/Counter'
export function Basis() {
    return (
        <div className={styles.container}>
            <p className={styles.title}>Basis</p>
            <h2 className={styles.props}>Props</h2>
            <div className={styles.containerButtons}>
                <Button 
                title='Login'
                act={() => alert('Cliked in login')}
                />
                
                <Button 
                title='Register'
                act={() => alert('Cliked in register')}
                />
                
                <Button 
                title='Sign out'
                act={() => alert('Cliked in Sign out')}
                />
                
                <Button 
                title='Ot'
                act={() => alert('Cliked in Ot')}
                />
            </div>

            <Counter.Counter />
        </div>
    )
}