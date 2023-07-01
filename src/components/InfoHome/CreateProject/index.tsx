"use client";
import { useEffect, useRef, useState } from 'react';
import styles from './CreateProject.module.scss';
import CreateProjectPopUp from '../../CreateProjectPopUp';
import Foco from '@/components/Foco';

export default function CreateProject() {
    const [ popUp, setPopUp ] = useState(false);
    const PopUpRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (PopUpRef.current && !PopUpRef.current.contains(event.target as Element)) {
            setPopUp(false);
          }
        }
        document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    }, [PopUpRef]);

    function handleClick() {
        setPopUp(prev => !prev)
    }

    return(
        <>
        <div className={styles.newProject} onClick={handleClick} >
            <span>Create project</span>
        </div> 
        { popUp && <div style={{position: 'absolute'}} ref={PopUpRef}><CreateProjectPopUp onClick={handleClick}/></div> }
        { popUp && <Foco color={"rgba(0,0,0, 0.4)"}/>}
        </>
    )
}