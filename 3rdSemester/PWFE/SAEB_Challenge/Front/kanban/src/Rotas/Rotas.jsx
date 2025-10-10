import {Routes, Route} from 'react-router-dom';
import { CadUser } from '../Pages/CadUser'; 
import { Board } from '../Componentes/Board';
import { Inicial } from '../Pages/Inicial';
import {CadTask } from '../Pages/CadTask';
import { Task } from '../Componentes/Task';
import AtualizarTarefa from '../Pages/UpdateTask';


export function Rotas(){
    return(
        <>
            <Routes>
                <Route path='/' element={<Inicial/>}>
                    <Route path='cadasterUser' element={<CadUser/>}/>
                    <Route path='cadTasks' element={<CadTask/>}/>    
                    <Route path='boards' element={<Board/>}/>    
                    <Route path='updateTask' element={<UpdateTask />} />
                </Route>
            </Routes>
        </>
    )
}