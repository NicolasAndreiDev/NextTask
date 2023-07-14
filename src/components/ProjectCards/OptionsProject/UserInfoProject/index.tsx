import { FaUser } from 'react-icons/fa';
import styles from './UserInfo.module.scss';
import Image from 'next/image';

type UserInfoProps = {
    username: string,
    email: string,
    bannerColor: string,
    perfilColor: string
}

export default function UserInfo({ username, email, perfilColor, bannerColor }: UserInfoProps) {
    return (
        <div className={styles.container}>
            <div className={styles.banner}>
                <div className={styles.fundoBanner} style={{backgroundColor: bannerColor}}></div>
                <div className={styles.user} style={{backgroundColor: perfilColor}}>
                    <FaUser className={styles.icon} />
                </div>
            </div>
            <div className={styles.dados}>
                <span className={styles.username}>{username}</span>
                <span className={styles.email}>{email}</span>
            </div>
        </div>
    )
}