import copyImg from '../../assets/images/copy.svg'

import './style.scss'

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipBoard() {
    navigator.clipboard.writeText(props.code);
  }
  
  return (
    <button className="room-code" onClick={copyRoomCodeToClipBoard}>
      <div>
        <img src={copyImg} alt="Ícone de copiar o texto para a área de transferência. Uma folha de papel em cima da outra." />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
