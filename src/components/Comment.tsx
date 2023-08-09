import { ThumbsUp, Trash } from '@phosphor-icons/react';
import styles from './Comment.module.css';
import { Avatar } from './Avatar';
import { useState } from 'react'

interface CommentProps{
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment(props: CommentProps){

  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment(){
    props.onDeleteComment(props.content);
  }
  function handleLikeComment(){
    setLikeCount(likeCount + 1);
  }


  return(
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/Fraga90.png" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Diego Fernandes</strong>
              <time title='11 De Maio' dateTime='2023-05-11 8:13:30'>Cerca de 1h atrás</time>
            </div>
            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>
          <p>{props.content}</p>
        </div>

        <footer>
            <button onClick={handleLikeComment}>
              <ThumbsUp />
              Aplaudir <span>{likeCount}</span>
            </button>
          </footer>
      </div>
    </div>
  );
}