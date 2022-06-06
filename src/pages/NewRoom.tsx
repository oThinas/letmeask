import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    // Verifica se o nome da sala não é vazia
    if (newRoom.trim() === '') {
      toast.error('Impossível criar sala com nome vazio!', {
        iconTheme: {
          primary: '#e73f5d',
          secondary: 'white',
        },
        style: {
          fontFamily: '"Roboto", sans-serif',
          fontWeight: '500'
        }
      });
      return;
    }

    const roomRef = database.ref('rooms');
    // Joga uma nova sala em "rooms". Faz parte da documentação do Firebase API
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    // Retorna o id da sala do firebase
    navigate(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom} autoComplete="off">
            <label
              htmlFor="id-name"
              className='sr-only'
            >
             Nome da sala
            </label>
            <input 
              type="text"
              placeholder="Nome da sala"
              id='id-name'
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>

      <Toaster />
    </div>
  )
}