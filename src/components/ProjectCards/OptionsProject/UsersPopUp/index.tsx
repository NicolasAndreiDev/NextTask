import { MdClose } from 'react-icons/md';
import styles from './UsersPopUp.module.scss';
import { useState } from 'react';
import UserInfo from '../UserInfo';

const users = [1, 2, 3, 4, 5, 6]

export default function UsersPopUp({ onClick }: { onClick: () => void }) {
    const [info, setInfo] = useState<{
        userInfo: boolean,
        activeUser: number | null,
    }>({
        userInfo: false,
        activeUser: null,
    });

    function handleClick(user: number) {
        setInfo((prev) => ({ ...prev, userInfo: !prev.userInfo, activeUser: user }))
    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h2 className={styles.title}>Project participants</h2>
                <MdClose className={styles.icon} onClick={onClick} />
            </div>
            <input className={styles.input} placeholder={"Search members"} />
            <span className={styles.members}>Members</span>
            <div className={styles.allUsers}>
                {users.map((user) => {
                    return (
                        <div key={user} className={styles.user} onClick={() => handleClick(user)}>
                            {info.userInfo && info.activeUser === user && <UserInfo />}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}