"use client";
import { useState } from 'react';
import styles from './AllProjects.module.scss';
import { FiStar } from 'react-icons/fi';
import Link from 'next/link';

interface AllProjectsProps {
    title: string,
    iconExist?: boolean,
    children?: React.ReactNode
}

export default function AllProjects({ title, iconExist = false, children }: AllProjectsProps) {
    const [star, setStar] = useState(false);
    const [favorite, setFavorite] = useState(false);
    
    function handleMouse() {
        if(favorite) {
            return
        }
        setStar(prev => !prev)
    }

    function handleClick() {
        setFavorite(prev => !prev)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <span>{title}</span>
            </div>
            <div className={styles.project}>
                <div className={styles.card} onMouseEnter={handleMouse} onMouseLeave={handleMouse}>
                    <div className={styles.infoCard}>
                        <h2 className={styles.nameProject}>Project</h2>
                        <FiStar className={styles.star} onClick={handleClick} style={favorite ? (star ? {transform:'translateX(0)', fill: 'gold', color: 'gold'}: {}) : (star ? {transform:'translateX(0)'}: {})}/>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

