'use client';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from './UserInfo.module.scss';
import UserPopUp from "./UserPopUp";
import Foco from "../Foco";
import { FaUser } from "react-icons/fa";

export default function UserInfo() {
    const [foto, setFoto] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const PopUpRef = useRef<HTMLDivElement>(null)

    function handleClick() {
        setPopUp(true);
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
            { popUp && <div ref={PopUpRef} style={{position: "absolute"}}><UserPopUp /></div> }
            { popUp && <Foco color={"rgba(0,0,0, 0.4)"}/> }
            { foto ? <Image src={'/Logo.png'} alt={"user_picture"} height={40} width={40} /> : 
              <div className={styles.user} onClick={handleClick}>
                <div className={styles.imagemDefault}>
                  <FaUser className={styles.icon}/>
                </div>
              </div>
            }
        </>
    )
}