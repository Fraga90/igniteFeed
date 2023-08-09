import { Avatar } from './Avatar';
import styles from './Sidebar.module.css';
import { PencilLine } from '@phosphor-icons/react';
export function Sidebar(){
  return(
    <aside className={styles.sidebar}>
      <img 
          className={styles.cover}
          src="https://images.unsplash.com/photo-1536859355448-76f92ebdc33d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGV2fGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=50"/>

      <div className={styles.profile}>
        <Avatar src={"https://github.com/Fraga90.png"} />

        <strong>Daniel Fraga Cidreira</strong>
        <span>Web Developer </span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20}/>
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}