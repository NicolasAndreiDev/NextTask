import styles from './Foco.module.scss';

export default function Foco({color}: {color?: string}) {
    return(
        <div className={styles.foco} style={{backgroundColor: color}}></div>
    )
}