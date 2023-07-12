import { useState } from 'react';
import styles from './ConfigCard.module.scss';
import MoveCard from './MoveCard';

type ConfigCard = {
    onClick: () => void, 
    close: () => void,
    optionValue: number[]
}

export default function ConfigCard({onClick, close, optionValue}: ConfigCard) {
    const [move, setMove] = useState(false);

    function handleClick() {
        setMove(prev => !prev)
    }

    return(
        <div className={styles.container}>
            <span className={styles.option}>Delete card</span>
            <span className={styles.option} onClick={onClick}>Add task</span>
            <span className={styles.option} onClick={handleClick}>Move card</span>
            {move && <MoveCard onClick={handleClick} close={close} optionValue={optionValue}/>}
        </div>
    )
}