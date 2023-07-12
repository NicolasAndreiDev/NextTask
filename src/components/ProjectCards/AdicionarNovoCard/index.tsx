"use client";
import { useState } from 'react';
import styles from './AdicionarNovoCard.module.scss';
import { IoMdAdd } from 'react-icons/io';
import NewCard from './NewCard';

export default function AdicionarNovoCard({userId, projectId}: {userId: string, projectId: string}) {
    const [popUp, setPopUp] = useState(false);

    function handleClick() {
        setPopUp(prev => !prev)
    }

    return(
        <div className={styles.createList}>
            <button className={styles.novaLista} onClick={handleClick}>
                <IoMdAdd className={styles.icon} />
                <span>Add card</span>
            </button>
            {popUp && <NewCard close={handleClick} userId={userId} projectId={projectId} />}
        </div>
    )
}