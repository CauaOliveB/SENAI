import { useState } from "react";
import { missoes } from '../Datas/missionDatas';
import { MissaoCard } from '../Components/CardMission';
import { MissaoModal } from '../Components/ModalMission';

export function Mission() {
  const [missionSelected, setSelectMission] = useState(null);
  const [concludedMission, setConcludedMission] = useState([]); // New state

  const checkMission = (id) => {
    setConcludedMission((prev) => [...prev, id]); // Add id in array 
    setSelectMission(null); // Close Modal
  };

  return (
    <section className='conteiner'>
      <h2>Mission</h2>
      <div className="missions-grid">
        {missions.map((m) => (
          <MissaoCard
            key={m.id} 
            missao={m}  
            onIniciarMissao={setMissaoSelecionada} 
            concluida={missionsConcluidas.includes(m.id)} 
          />
        ))}
      </div>

      {missaoSelecionada && (
        <MissaoModal 
          missao={missaoSelecionada} 
          onClose={() => setMissaoSelecionada(null)} 
          onConcluir={() => concluirMissao(missaoSelecionada.id)} 
        />
      )}
    </section>
  );
}
