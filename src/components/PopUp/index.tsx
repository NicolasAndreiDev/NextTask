import styles from './PopUp.module.scss';

export default function PopUp({children, largura}: {children: React.ReactNode, largura?: string}) {
    return(
        <div className={styles.popUp} style={{width: largura}}>
            {children}
        </div>
    )
}