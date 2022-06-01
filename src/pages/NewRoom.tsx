import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Button } from '../components/Button';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { AuthContext } from '../App';

export function NewRoom() {
  const { user } = useContext(AuthContext)

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
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form>
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
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}