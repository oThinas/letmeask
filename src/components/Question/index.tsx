import { ReactNode } from 'react';

import './style.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children: ReactNode
}

// São a mesma coisa
// export function Question(props: QuestionProps) {
//   return(
//     <div className="question">
//       <p>{props.content}</p>
//     </div>
//   );
// }

export function Question({
  content,
  author,
  children
}: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={"Foto de perfil de " + author.name} />
          <span>{author.name}</span>
        </div>
        <div className='actions'>
          {children}
        </div>
      </footer>
    </div>
  );
}