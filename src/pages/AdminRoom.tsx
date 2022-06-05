import { useParams, Link } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { Toaster } from 'react-hot-toast';

import logoImg from '../assets/images/logo.svg';
import closeImg from '../assets/images/close.svg'

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id
  
  const { title, questions } = useRoom(roomId!);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <Link to={'/'}>
            <img src={logoImg} alt="Logo da Letmeask. &quot;letme&quot; escrito em preto, seguido de um espaço para &quot;ask&quot; escrito nas cores roxa e rosa se misturando, com uma caixa de diálogo em volta com as mesmas cores" />
          </Link>
          <div className="buttons">
            <RoomCode code={roomId!}/>
            <Button isOutlined>
              <img src={closeImg} alt="Ícone de encerrar sala. Letra X." />
              <span>Encerrar sala</span>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala: {title}</h1>
          {/* Operador ternário sem else */}
          { questions.length > 0 && (
              questions.length === 1 ? (
                <span>{questions.length} pergunta</span>
              ) : (
                <span>{questions.length} perguntas</span>
              )
          ) }
        </div>
        
        {/* O método map() é um for each que retorna algo */}
        <div className='question-list'>
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                children={question.likeCount}
              />
            );
          })}
        </div>
      </main>

      <Toaster />
    </div>
  );
}