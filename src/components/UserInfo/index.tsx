'use client';
import { useEffect, useRef, useState } from "react";
import styles from './UserInfo.module.scss';
import UserPopUp from "./UserPopUp";
import Foco from "../Foco";
import { FaUser } from "react-icons/fa";

export default function UserInfo({perfilColor}: {perfilColor?: string}) {
    const [popUp, setPopUp] = useState(false);
    const PopUpRef = useRef<HTMLDivElement>(null)

    function handleClick() {
        setPopUp(prev => !prev);
    }

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

    return (
        <>
            { popUp && <div ref={PopUpRef} style={{position: "absolute"}}><UserPopUp onClick={handleClick}/></div> }
            { popUp && <Foco color={"rgba(0,0,0, 0.4)"}/> }
              <div className={styles.user} onClick={handleClick}>
                <div className={styles.imagemDefault} style={{backgroundColor: perfilColor}}>
                  <FaUser className={styles.icon}/>
                </div>
              </div>
        </>
    )
}