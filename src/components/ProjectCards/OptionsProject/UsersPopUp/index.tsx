import { MdClose } from 'react-icons/md';
import styles from './UsersPopUp.module.scss';

const users = [1,2,3,4,5,6]

export default function UsersPopUp({onClick}: {onClick: () => void}) {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h2 className={styles.title}>Project participants</h2>
                <MdClose className={styles.icon} onClick={onClick}/>
            </div>
            <input className={styles.input} placeholder={"Search members"} />
            <span className={styles.members}>Members</span>
            <div className={styles.allUsers}>
                {users.map((user) => {
                    return(
                        <div key={user} className={styles.user}></div>
                    )
                })}
            </div>
        </div>
    )
}