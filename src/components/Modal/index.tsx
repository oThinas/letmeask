import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import closeRoomImg from '../../assets/images/close-room.svg'
import { database } from '../../services/firebase';
import { Button } from '../Button';

import './style.scss'

type ModalProps = {
  isShow: boolean;
  title: string;
  hasSubtitle: boolean;
  action: string;

  handleCloseModal: () => {};
}

type RoomParams = {
  id: string;
}

export function Modal(props: ModalProps) {
  const params = useParams<RoomParams>();
  const roomId = params.id
  const navigate = useNavigate();

  async function handleEndRoom() {
    props.handleCloseModal();

    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    });

    navigate('/');

    toast.success('Sala encerrada!', {
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

  const closeOnEspaceKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      props.handleCloseModal();
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEspaceKeyDown);
    return function cleanup() {
    document.body.removeEventListener('keydown', closeOnEspaceKeyDown);
    }
  })

  return (
    <div className={`modal ${props.isShow ? 'show' : ''}`} onClick={props.handleCloseModal}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <img src={closeRoomImg} alt='Um "X" vermelho dentro de um círculo vermelho sinalizando o fechamento da sala.' />
        <h2>{props.title}</h2>
        <p className={(props.hasSubtitle ? "" : "hidden")}>Tem certeza que você deseja encerrar esta sala?</p>
        <div className="buttons">
          <Button isGray onClick={props.handleCloseModal}>Cancelar</Button>
          <Button isRed onClick={handleEndRoom}>Sim, {props.action}</Button>
        </div>
      </div>
    </div>
  );
}