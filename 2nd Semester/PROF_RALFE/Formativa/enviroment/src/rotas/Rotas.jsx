import {BrowserRouter, Routes, Route} from 'react-router'
import {Login} from '../pages/Login'
import {Initial} from '../pages/Initial'
import {Reservation} from '../pages/Reservation'
import {Teachers} from '../pages/Teachers'
import {Discipline} from '../pages/Discipline'
import {Classroom} from '../pages/Classroom'


export function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Login />} />
                <Route path='inicial' element={ <Initial />} >
                    <Route path='reservation' element={<Reservation />}/>
                    <Route path='teachers' element={<Teachers />} />
                    <Route path='discipline' element={<Discipline/>} />
                    <Route path='classroom' element={<Classroom/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

