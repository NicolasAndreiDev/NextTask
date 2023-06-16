import Image from 'next/image';
import UserInfo from '../UserInfo';
import styles from './header.module.scss';

export default function Header() {
    return(
        <header className={styles.header}>
            <Image src={"/assets/LogoRoxa.png"} alt={"NextTask"} height={32} width={32}/>
            <UserInfo />
        </header>
    )
}