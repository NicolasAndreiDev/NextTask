import { FaUser } from 'react-icons/fa';
import styles from './UserInfo.module.scss';

export default function UserInfo() {
    return(
        <div className={styles.container}>
            <div className={styles.banner}>
                <div className={styles.fundoBanner}></div>
                <div className={styles.user}>
                    <FaUser className={styles.icon}/>
                </div>
            </div>
            <div className={styles.dados}>
                <span className={styles.username}>Nicolas</span>
                <span className={styles.email}>nicolas@gmail.com</span>
            </div>
        </div>
    )
}