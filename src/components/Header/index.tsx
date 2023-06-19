import Image from 'next/image';
import UserInfo from '../UserInfo';
import styles from './header.module.scss';
import {IoHomeOutline} from 'react-icons/io5';

export default function Header() {
    return(
        <header className={styles.header}>
            <IoHomeOutline className={styles.iconHome}/>
            <div className={styles.logo}>
                <Image src={"/assets/LogoRoxa.png"} alt={"NextTask"} height={32} width={32}/>
                <h1>NextTask</h1>
            </div>
            <UserInfo />
        </header>
    )
}