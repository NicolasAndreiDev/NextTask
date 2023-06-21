import FinishedProjects from './FinishedProjects';
import styles from './InfoHome.module.scss';
import MyProjects from './MyProjects';
import ParticipateProjects from './ParticipateProject';
import RecentProject from './RecentProject';

export default function InfoHome() {
    return(
        <div className={styles.home}>
            <RecentProject />
            <MyProjects />
            <ParticipateProjects />
            <FinishedProjects />
        </div>
    )
}