'use client';
import Image from 'next/image';
import UserInfo from '../UserInfo';
import styles from './header.module.scss';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import CreateProjectPopUp from '../CreateProjectPopUp';
import Foco from '../Foco';

export default function Header() {
    const [popUp, setPopUp] = useState(false);
    const PopUpRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (PopUpRef.current && !PopUpRef.current.contains(event.target as Element)) {
                setPopUp(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [PopUpRef])

    function handleClick() {
        setPopUp(prev => !prev)
    }

    return (
        <>
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
                    <button className={styles.createProject} onClick={handleClick}>Criar</button>
                </div>
                <UserInfo />
            </header>
            {popUp && <div ref={PopUpRef} style={{position: "absolute"}}><CreateProjectPopUp /></div>}
            {popUp && <Foco color={"rgba(0,0,0, 0.4)"} />}
        </>
    )
}