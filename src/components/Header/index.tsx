import UserInfo from '../UserInfo';
import styles from './header.module.scss';

export default function Header() {
    return(
        <header className={styles.header}>
            <UserInfo />
        </header>
    )
}