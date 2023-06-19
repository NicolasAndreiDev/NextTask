"use client";
import { useState } from 'react';
import styles from './AdicionarNovaLista.module.scss';
import NewList from './NewList';
import { IoMdAdd } from 'react-icons/io';

export default function AdicionarNovaLista() {
    const [popUp, setPopUp] = useState(false);

    function handleClick() {
        setPopUp(prev => !prev)
    }

    return(
        <div className={styles.createList}>
            <button className={styles.novaLista} onClick={handleClick}>
                <IoMdAdd className={styles.icon} />
                <span>Add list</span>
            </button>
            {popUp && <NewList close={handleClick} />}
        </div>
    )
}