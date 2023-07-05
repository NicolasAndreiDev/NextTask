"use client";
import { useState } from 'react';
import styles from './AllProjects.module.scss';
import { FiStar } from 'react-icons/fi';
import { ColorOptions } from '@/components/ColorOptions';
import { useRouter } from 'next/navigation';

interface AllProjectsProps {
    title: string,
    icon?: JSX.Element,
    children?: React.ReactNode
}

export default function AllProjects({ title, children, icon }: AllProjectsProps) {
    const route = useRouter();
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

    function handleNavigation() {
        route.push(`/projects/${'Novo-Projeto'}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {icon}
                <span>{title}</span>
            </div>
            <div className={styles.project}>
                <div className={styles.card} style={{background: ColorOptions.color1}} onMouseEnter={handleMouse} onMouseLeave={handleMouse} onClick={handleNavigation}>
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

