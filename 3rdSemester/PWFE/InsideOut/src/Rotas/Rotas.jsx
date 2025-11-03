
import { Routes, Route } from "react-router-dom";
import { Inicial } from "../Pags/Inicial";
import { InsideOut } from "../Pags/InsideOut";
import { Missao} from "../Pags/Mission";
// import { Inventory } from "../Pag/Inventory";
// import { GeolocationMap } from "../Components/GeolocationMap";

export function Rotas() {
    return (
        <Routes>
            <Route path="/" element={<Inicial />} />
            <Route path="/insideout" element={<InsideOut />} >  
                <Route index element ={<InsideOut/>}/>
                <Route path="mission" element={<Mission />} /> 
             {/*     <Route path="inventory" element={<Inventory/>} />
                <Route path="camera" element={<GeolocationMap/>} />*/}
            </Route>   
        </Routes>
    );
}   