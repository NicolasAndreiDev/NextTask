import { useContext, useState } from 'react';
import styles from './ConfigCard.module.scss';
import MoveCard from './MoveCard';
import { useMutation } from '@apollo/client';
import { DELETE_CARD } from '@/graphql/card/DeleteCard';
import { UserContext } from '@/providers/UserProvider';

type ConfigCard = {
    onClick: () => void, 
    close: () => void,
    optionValue: number[],
    userId: string,
    projectId: string,
    cardId: string,
    position: number
}

export default function ConfigCard({onClick, close, position, optionValue, userId, projectId, cardId}: ConfigCard) {
    const { updateUserInfo } = useContext(UserContext);
    const [move, setMove] = useState(false);
    const [deleteCard, {loading, error}] = useMutation(DELETE_CARD);

    function handleDelete() {
        deleteCard({
            variables: {
                userId,
                projectId,
                cardId
            }
        })
        .then(() => {
            updateUserInfo()
            close()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function handleClick() {
        setMove(prev => !prev)
    }

    return(
        <div className={styles.container}>
            <span className={styles.option} onClick={handleDelete}>Delete card</span>
            <span className={styles.option} onClick={onClick}>Add task</span>
            <span className={styles.option} onClick={handleClick}>Move card</span>
            {move && <MoveCard position={position} cardId={cardId} projectId={projectId} userId={userId} onClick={handleClick} close={close} optionValue={optionValue}/>}
        </div>
    )
}