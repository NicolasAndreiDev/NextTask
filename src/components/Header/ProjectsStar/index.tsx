import { useState } from 'react';
import styles from './ProjectsStar.module.scss';
import { FiStar } from 'react-icons/fi';
import { ColorOptions } from '@/components/ColorOptions';
import { useRouter } from 'next/navigation';

export default function ProjectsStar({onClick}: {onClick: () => void}) {
    const route = useRouter();
    const [projectsFav, setProjectsFav] = useState(true);

    function handleNavigation(value: string) {
        route.push(`/projects/${value}`)
    }

    return (
        <div className={styles.projects} style={projectsFav ? {} : {display: 'grid', placeItems: 'center'}}>
            {projectsFav ?
                <div className={styles.project} onClick={() => {onClick(), handleNavigation('Novo-Projeto')}}>
                    <div className={styles.fundoProject} style={{background: ColorOptions.color1}}></div>
                    <div className={styles.projectInfo}>
                        <span className={styles.title}>Novo-projeto</span>
                        <span className={styles.info}>Area de trabalho do projeto</span>
                    </div>
                    <FiStar className={styles.star} />
                </div> 
                :
                <span className={styles.text}>Projetos marcados com estrela aparecerão aqui</span>}
        </div>
    )
}