import { set } from 'zod';
import { Tasks } from './Task'; 
import { useDroppable } from '@dnd-kit/core';

export function Column( {id,title, tasks =[]}){
    const {setNodeRef} = useDroppable({id})

    return(
<section className='containerColumn' drop="true" ref={setNodeRef} >
            {/*Title que recebi da Column */}
            <h2 className='titleColumn'>{title}</h2>
            {/* manipulação de array para fazer a exibição, eu posso usar o MAP */}
            {tasks.map(task=>{
                console.log("Datas", task);
                return<Tasks key={task.id} task = {task}/>
            })}
        </section>

    )
}
