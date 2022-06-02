import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function Room() {
  const params = useParams<RoomParams>();

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo da Letmeask. &quot;letme&quot; escrito em preto, seguido de um espaço para &quot;ask&quot; escrito nas cores roxa e rosa se misturando, com uma caixa de diálogo em volta com as mesmas cores" />
          <RoomCode code={params.id!}/>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Título da Sala</h1>
          <span>$ perguntas</span>
        </div>

        <form>
          <label htmlFor="question" className='sr-only'>O que você quer perguntar?</label>
          <textarea 
            id='question'
            placeholder='O que você quer perguntar?'
          />
          <div className="form-footer">
            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            <Button type='submit'>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}