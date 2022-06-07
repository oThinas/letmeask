import { ReactNode } from 'react';

import './style.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
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
  isAnswered = false,
  isHighLighted = false,
  children
}: QuestionProps) {
  return (
    <div 
      className={
        `question 
        ${isAnswered && 'answered'} 
        ${(isHighLighted && !isAnswered) && 'highlighted'}
      `}
    >
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