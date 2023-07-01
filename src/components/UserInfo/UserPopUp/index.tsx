import PopUp from "@/components/PopUp";
import styles from './UserPopUp.module.scss';
import { FaUser } from 'react-icons/fa';

export default function UserPopUp() {
    return(
        <PopUp>
            <div className={styles.picture}>
                <FaUser className={styles.icon} />
            </div>
            <button className={styles.buttonExit}>Log out</button>
        </PopUp>
    )
}