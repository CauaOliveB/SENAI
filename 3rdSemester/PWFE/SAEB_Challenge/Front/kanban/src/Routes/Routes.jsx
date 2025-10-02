import { Routes, Route } from "react-router-dom"
import { UserCadaster } from "./pages/userCadaster";
import { TaskCadaster } from "./pages/taskCadaster";
import { Board } from "./components/Board";

export function Routes() {
    return (
        <Routes>
            <Route path="/" element={ <Inicial/> } >
                <Route index element={ <Board/> }/>
                <Route path="UserRegister" element={ <UserCadaster/> }/>
                <Route path="TaskRegister" element={ <TaskCadaster/> }/>
            </Route>
        </Routes>
    );
}
