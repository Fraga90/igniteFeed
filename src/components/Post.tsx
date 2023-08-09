import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import styles from './Post.module.css';
import './Comment.jsx';
import { Comment } from './Comment.jsx';
import { Avatar } from './Avatar';
import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react'

// Author: { avatar_url:"", name: "", role: ""}
// publishedAt: Date
// content: String

interface Author{
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content{
  type: 'paragraph' | 'link' ;
  content: string;
}

export interface PostType{
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps{
  post: PostType;
}

export function Post(props: PostProps) {
  const [comments, setComment] = useState(['Post muito bacana',]);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormated = format(props.post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBr, });
  const publishedDateRelativeToNow = formatDistanceToNow(props.post.publishedAt, { locale: ptBr, addSuffix: true, });
  const isNewCommentEmpty = newCommentText.length == 0;

  function handleCreateNewComment(event: FormEvent) {
    // const newCommentText = event.target.comment.value;
    event.preventDefault();
    setComment([...comments, newCommentText])
    setNewCommentText('');
    // event.target.comment.value = '';
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Esse campo é obrigatório');
  }

  function deleteComment(commentToDelete: string) {
    const commentWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })
    setComment(commentWithoutDeletedOne)
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder={true} src={props.post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{props.post.author.name}</strong>
            <span>{props.post.author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormated} dateTime={props.post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {props.post.content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a href="">{line.content}</a></p>
          }
        })}

      </div>

      <form onSubmit={handleCreateNewComment}  className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea name='comment' placeholder='Deixe um comentário'
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
          
        />
        <footer>
          <button type='submit' disabled={isNewCommentEmpty} >Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment key={comment} content={comment} onDeleteComment={deleteComment} />
        })}
      </div>
    </article>
  );
}