'use client';
import Image from 'next/image';
import UserInfo from '../UserInfo';
import styles from './header.module.scss';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import CreateProjectPopUp from '../CreateProjectPopUp';
import Foco from '../Foco';
import { UserContext } from '@/providers/UserProvider';
import { IoIosArrowDown } from 'react-icons/io';
import OptionsHeader from './OptionsHeader';

export default function Header() {
    const { user } = useContext(UserContext);
    const [popUp, setPopUp] = useState(false);
    const PopUpRef = useRef<HTMLDivElement>(null);
    const [newPopUp, setNewPopUp] = useState(false);

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

    function handleNewClick() {
        setNewPopUp(prev => !prev)
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.esquerda}>
                    <Link href={'/'} className={styles.logo}>
                        <Image src={"/assets/LogoRoxa.png"} alt={"NextTask"} height={32} width={32} />
                        <h1 className={styles.title}>NextTask</h1>
                    </Link>
                    <div className={styles.headerOptions}>
                        <div className={styles.optionsHeaderMobile} onClick={handleNewClick} style={ newPopUp ? {backgroundColor: 'rgb(142, 78, 245)', color: 'white'} : {}}>
                            <span>More</span>
                            <IoIosArrowDown className={styles.arrow} style={ newPopUp ? {transform: 'rotate(180deg)', color: 'white'}: {}}/>
                        </div>
                        {newPopUp && <OptionsHeader onClick={handleClick} />}
                        <div className={styles.exist}>
                            <OptionsHeader onClick={handleClick} />
                        </div>
                    </div>
                </div>
                <UserInfo perfilColor={user?.perfilColor} />
            </header>
            {popUp && <div ref={PopUpRef} style={{ position: "absolute" }}><CreateProjectPopUp onClick={handleClick} /></div>}
            {popUp && <Foco color={"rgba(0,0,0, 0.4)"} />}
        </>
    )
}