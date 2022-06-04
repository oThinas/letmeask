type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
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
}: QuestionProps) {
  return(
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={"Foto de perfil de " + author.name} />
        </div>
        <div>{/* Botões de ação do admin ou botão de like do usuário */}</div>
      </footer>
    </div>
  );
}