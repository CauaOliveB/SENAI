import { Link } from "react-router-dom"

export function Header(){
    return(
        <header className="conteiner">
            <section className="textBar">
                <h1 className="titulo">Task Management</h1>
            </section>

            {/* links de cada página */}
            <nav className="bar">
                <ul>
                    <li><Link to ='/updateTasks'>Task update </Link></li>
                    <li><Link to ='/cadUser'>User Cadaster </Link></li>
                    <li><Link to= '/cadTasks'>Task Cadaster</Link></li>
                    <li><Link to='/boards'>Tasks</Link></li>
                </ul>
            </nav>

        </header>
    )
}