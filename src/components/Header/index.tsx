import Image from 'next/image';
import UserInfo from '../UserInfo';
import styles from './header.module.scss';
import Link from 'next/link';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.esquerda}>
                <Link href={'/'} className={styles.logo}>
                    <Image src={"/assets/LogoRoxa.png"} alt={"NextTask"} height={32} width={32} />
                    <h1>NextTask</h1>
                </Link>
                <div className={styles.projects}>
                    <span>recentes</span>
                </div>
                <div className={styles.projects}>
                    <span>Marcado com estrela</span>
                </div>
                <button className={styles.createProject}>Criar</button>
            </div>
            <UserInfo />
        </header>
    )
}