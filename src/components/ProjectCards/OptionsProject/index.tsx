'use client';
import Image from 'next/image';
import styles from './OptionsProject.module.scss';
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2';
import { HiOutlineTemplate } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import LayoutTypePopUp from './LayoutTypePopUp';
import ConfigProject from './ConfigProject';
import InviteUserPopUp from './InviteUserPopUp';
import Foco from '@/components/Foco';
import UsersPopUp from './UsersPopUp';
import UserInfo from './UserInfo';

const users = [1,2,3]

interface OptionsProps {
    layout?: boolean,
    config?: boolean,
    invite?: boolean,
    users?: boolean,
    userInfo?: boolean
}

export default function OptionsProject({ foto }: { foto: string }) {
    const [options, setOptions] = useState<OptionsProps>({
        layout: false,
        config: false,
        invite: false,
        users: false,
        userInfo: false
    });
    const PopUpRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (PopUpRef.current && !PopUpRef.current.contains(event.target as Element)) {
                setOptions({ invite: false })
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [PopUpRef])

    function handleClick(name: keyof OptionsProps) {
        setOptions((prev) => ({ ...prev, [name]: !prev[name] }))
    }

    return (
        <>
            <div className={styles.topProject}>
                <div className={styles.esquerda}>
                    <div className={styles.layoutType} onClick={() => handleClick('layout')} style={options.layout ? { backgroundColor: 'white' } : {}}>
                        <HiOutlineTemplate className={styles.template} style={options.layout ? { color: '#2d333a' } : {}} />
                        <IoIosArrowDown className={styles.arrow} style={options.layout ? { color: '#2d333a', transform: 'rotate(180deg)' } : {}} />
                        {options.layout && <LayoutTypePopUp />}
                    </div>
                    <h2 className={styles.projectName}>Project Name</h2>
                    <div className={styles.linha}></div>
                    <div className={styles.participantes}>
                        {foto ? <Image src={foto} alt={"usuários participantes"} height={24} width={24} /> :
                            <>
                                {users.map((user) => {
                                    return(
                                        <>
                                            <div key={user} className={styles.imagemDefault} onClick={() => handleClick('userInfo')}></div>
                                            {options.userInfo && <UserInfo />}
                                        </>
                                    )
                                })}
                                <div className={styles.divUsers}>
                                    <div className={styles.countUsers} onClick={() => handleClick('users')} style={options.users ? {backgroundColor: 'white'} : {}}>
                                        <span className={styles.count} style={options.users ? {color: '#2d333a'}: {}}>+12</span>
                                    </div>
                                    {options.users && <UsersPopUp onClick={() => handleClick('users')}/>}
                                </div>
                            </>
                        }
                    </div>
                    <button className={styles.inviteButton} onClick={() => handleClick('invite')}>Invite</button>
                </div>
                <div className={styles.optionsDiv}>
                    <div className={styles.options} onClick={() => handleClick('config')} style={options.config ? { backgroundColor: 'white' } : {}}>
                        <HiOutlineEllipsisHorizontal className={styles.icon} style={options.config ? { color: '#2d333a' } : {}} />
                    </div>
                    {options.config && <ConfigProject />}
                </div>
            </div>
            {options.invite && <div ref={PopUpRef}><InviteUserPopUp onClick={() => handleClick('invite')} /></div>}
            {options.invite && <Foco color={"rgba(0, 0, 0, 0.4)"} />}
        </>
    )
}