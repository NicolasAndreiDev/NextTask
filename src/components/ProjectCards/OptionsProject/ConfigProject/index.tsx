import { useMutation } from '@apollo/client';
import styles from './Config.module.scss';
import { UserContext } from '@/providers/UserProvider';
import { useContext } from 'react';
import { FINISHED_PROJECT } from '@/graphql/projects/FinishedProject';
import { useRouter } from 'next/navigation';

export default function ConfigProject({projectId}: {projectId: string}) {
    const { user, updateUserInfo } = useContext(UserContext);
    const route = useRouter();
    const [finishedProject, {loading, error}] = useMutation(FINISHED_PROJECT);

    function handleClick() {
        finishedProject({
            variables: {
                userId: user?.id,
                projectId
            }
        })
        .then(() => {
            updateUserInfo()
            route.push('/')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <div className={styles.config}>
            <span className={styles.text} onClick={handleClick}>Finished Project</span>
            <span className={styles.text}>Leave the project</span>
        </div>
    )
}