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
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

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

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true,
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
                isAnswered={question.isAnswered}
                isHighLighted={question.isHighLighted}
              >
                {!question.isAnswered && (
                    <button className={`like-button admin ${question.likeCount > 0 && 'liked'}`}>
                      {question.likeCount > 0 ? (
                        <>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#835afd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </>
                        ) : (
                              <>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </>
                            )
                      }
                    { question.likeCount > 0 && <span>{question.likeCount}</span> }
                  </button>
                )}
                {!question.isAnswered && (
                  <>
                    <button
                      className='delete-button'
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Ícone 'indicando um visto'. Marcar a pergunta como já respondida."  />
                    </button>
                    <button
                      className='delete-button'
                      type="button"
                      onClick={() => handleHighLightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Ícone de diálogo, caixa de texto. Marcar a pergunta como respondendo."  />
                    </button>
                  </>
                )}
                <button
                  className='delete-button'
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Ícone de lixo. Remover pergunta."  />
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