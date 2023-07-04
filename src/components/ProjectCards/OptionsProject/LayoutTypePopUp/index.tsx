import styles from './LayoutTypePopUp.module.scss';
import { LuCalendarDays, LuTable2 } from 'react-icons/lu';

export default function LayoutTypePopUp() {
    return (
        <div className={styles.typeLayout}>
            <div className={styles.type}>
                <LuCalendarDays className={styles.icon} />
                <span className={styles.text}>Calendar</span>
            </div>
            <div className={styles.type}>
                <LuTable2 className={styles.icon} />
                <span className={styles.text}>Table</span>
            </div>
        </div>
    )
}