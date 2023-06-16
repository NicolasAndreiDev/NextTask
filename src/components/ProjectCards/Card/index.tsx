import Task from '../Task';
import styles from './Card.module.scss';

export default function Card({hg}: {hg: string}) {
    return(
        <div className={styles.card} style={{height: hg}}>
            <Task />
        </div>
    )
}