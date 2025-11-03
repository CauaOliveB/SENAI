import { Outlet } from 'react-router-dom';
import { Menu } from '../Components/Menu';

export function InsideOut(){
    return(
        <main className="corpo">
            <Outlet/>
            <Menu/>            
        </main>

    )
}