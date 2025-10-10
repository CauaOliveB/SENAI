import { Outlet } from "react-router-dom";
import { Header } from "../Componentes/Header";
import { Board } from "../Componentes/Board"


export function Inicial (){
    return(
        <>
            <Header/>
            <Outlet/>
        </>
    )
}