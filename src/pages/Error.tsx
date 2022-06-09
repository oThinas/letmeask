import { Link } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import '../styles/error.scss';

export function Error() {
  return (
    <div className="page-error">
      <Link to={'/'}>
        <img src={logoImg} alt="Logo da Letmeask. &quot;letme&quot; escrito em preto, seguido de um espaço para &quot;ask&quot; escrito nas cores roxa e rosa se misturando, com uma caixa de diálogo em volta com as mesmas cores" />
      </Link>
      <h2>404</h2>
      <em>Página não encontrada, mas... por quê...?</em>
    </div>
  );
}