'use client';
import Image from 'next/image';
import styles from './OptionsProject.module.scss';
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2';
import { HiOutlineTemplate } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';
import LayoutTypePopUp from './LayoutTypePopUp';
import ConfigProject from './ConfigProject';

interface OptionsProps {
    layout: boolean,
    config: boolean,
}

export default function OptionsProject({ foto }: { foto: string }) {
    const [options, setOptions] = useState<OptionsProps>({
        layout: false,
        config: false
    });

    function handleClick(name: keyof OptionsProps) {
        setOptions((prev) => ({...prev, [name]: !prev[name]}))
    }

    return (
        <div className={styles.topProject}>
            <div className={styles.esquerda}>
                <div className={styles.layoutType} onClick={() => handleClick('layout')} style={options.layout ? {backgroundColor: 'white'} : {}}>
                    <HiOutlineTemplate className={styles.template} style={options.layout ? {color: '#2d333a'}: {}}/>
                    <IoIosArrowDown className={styles.arrow} style={options.layout ? {color: '#2d333a', transform: 'rotate(180deg)'}: {}}/>
                    {options.layout && <LayoutTypePopUp />}
                </div>
                <h2 className={styles.projectName}>Project Name</h2>
                <div className={styles.linha}></div>
                <div className={styles.participantes}>
                    {foto ? <Image src={foto} alt={"usuários participantes"} height={24} width={24} /> :
                        <>
                            <div className={styles.imagemDefault}></div>
                            <div className={styles.imagemDefault}></div>
                            <div className={styles.imagemDefault}></div>
                            <div className={styles.countUsers}>
                                <span className={styles.count}>+12</span>
                            </div>
                        </>
                    }
                </div>
                <button className={styles.inviteButton}>Invite</button>
            </div>
            <div className={styles.options} onClick={() => handleClick('config')}>
                <HiOutlineEllipsisHorizontal className={styles.icon} />
                {options.config && <ConfigProject />}
            </div>
        </div>
    )
}