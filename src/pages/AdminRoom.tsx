import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';
import closeImg from '../assets/images/close.svg'

import '../styles/room.scss';
import '../components/Question/style.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id
  
  const { title, questions } = useRoom(roomId!);

  const [modalIsShow, setModalIsShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalHasSubtitle, setModalHasSubtitle] = useState(false);
  const [modalAction, setModalAction] = useState("");
  
  function handleOpenModal() {
    // TODO: Implementar Modal
    setModalIsShow(true);
    setModalTitle("Encerrar sala");
    setModalHasSubtitle(true);
    setModalAction("encerrar")

  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

    toast.success('Pergunta apagada!', {
      iconTheme: {
        primary: '#835afd',
        secondary: 'white',
      },
      style: {
        fontFamily: '"Roboto", sans-serif',
        fontWeight: '500'
      }
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <Link to={'/'}>
            <img src={logoImg} alt="Logo da Letmeask. &quot;letme&quot; escrito em preto, seguido de um espaço para &quot;ask&quot; escrito nas cores roxa e rosa se misturando, com uma caixa de diálogo em volta com as mesmas cores" />
          </Link>
          <div className="buttons">
            <RoomCode code={roomId!}/>
            <Button isOutlined onClick={handleOpenModal}>
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
              >
                <button
                  className='delete-button'
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5.99988H5H21" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Question>
            );
          })}
        </div>
      </main>

      <Toaster />
      <Modal
        isShow={modalIsShow}
        title={modalTitle}
        hasSubtitle={modalHasSubtitle}
        action={modalAction}
        handleCloseModal={async () => setModalIsShow(false)}
      />
    </div>
  );
}