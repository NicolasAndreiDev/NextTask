import Image from 'next/image';
import styles from './OptionsProject.module.scss';
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2';
import { HiOutlineTemplate } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';

export default function OptionsProject({ foto }: { foto: string }) {
    return (
        <div className={styles.topProject}>
            <div className={styles.esquerda}>
                <div className={styles.layoutType}>
                    <HiOutlineTemplate className={styles.template} />
                    <IoIosArrowDown className={styles.arrow} />
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
            <div className={styles.options}>
                <HiOutlineEllipsisHorizontal className={styles.icon} />
            </div>
        </div>
    )
}