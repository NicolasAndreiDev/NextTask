import Task from '../Task';
import styles from './Card.module.scss';
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2';
import { IoMdAdd } from 'react-icons/io';

export default function Card({ numTasks }: { numTasks: number }) {
  const tasks = [];

  for (let i = 0; i < numTasks; i++) {
    tasks.push(<Task key={i} />);
  }

  return (
    <div className={styles.card}>
      <div className={styles.infoCard}>
        <h2 className={styles.titleCard}>To do</h2>
        <HiOutlineEllipsisHorizontal className={styles.options}/>
      </div>
      <div className={styles.tasks}>{tasks}</div>
      <button className={styles.adicionarTask}>
        <IoMdAdd className={styles.icon}/>
        <span className={styles.text}>Add task</span>
      </button>
    </div>
  );
}
