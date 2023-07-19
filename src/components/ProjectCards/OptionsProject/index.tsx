'use client'
import Image from 'next/image';
import styles from './OptionsProject.module.scss';
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2';
import { HiOutlineTemplate } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import LayoutTypePopUp from './LayoutTypePopUp';
import ConfigProject from './ConfigProject';
import InviteUserPopUp from './InviteUserPopUp';
import Foco from '@/components/Foco';
import UsersPopUp from './UsersPopUp';
import UserInfo from './UserInfoProject';
import { FaUser } from 'react-icons/fa';

interface OptionsProps {
  layout?: boolean;
  config?: boolean;
  invite?: boolean;
  users?: boolean;
  userInfo?: boolean;
  activeUser?: string | null;
}

interface OptionsProjectProps {
  titleProject: string,
  projectId: string,
  username: string,
  userId: string,
  participantes: [{
    id: string,
    username: string, 
    email: string, 
    bannerColor: string, 
    perfilColor: string
  }]
}

export default function OptionsProject({ titleProject, projectId, username, userId, participantes }: OptionsProjectProps) {
  const [options, setOptions] = useState<OptionsProps>({
    layout: false,
    config: false,
    invite: false,
    users: false,
    userInfo: false,
    activeUser: null,
  });
  const PopUpRef = useRef<HTMLDivElement>(null);
  const userList = participantes.slice(0, 4);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (PopUpRef.current && !PopUpRef.current.contains(event.target as Element)) {
        setOptions((prev) => ({ ...prev, invite: false }));
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [PopUpRef]);

  function handleClick(name: keyof OptionsProps) {
    setOptions((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  function handleClickUser(user: string) {
    setOptions((prev) => ({ ...prev, userInfo: !prev.userInfo, activeUser: user }));
  }

  return (
    <>
      <div className={styles.topProject}>
        <div className={styles.esquerda}>
          <div className={styles.layoutType} onClick={() => handleClick('layout')} style={options.layout ? { backgroundColor: 'white' } : {}}>
            <HiOutlineTemplate className={styles.template} style={options.layout ? { color: '#2d333a' } : {}}/>
            <IoIosArrowDown className={styles.arrow} style={options.layout ? { color: '#2d333a', transform: 'rotate(180deg)' } : {}}/>
            {options.layout && <LayoutTypePopUp />}
          </div>
          <h2 className={styles.projectName}>{titleProject}</h2>
          <div className={styles.linha}></div>
          <div className={styles.participantes}>
              <>
                <div className={styles.allUsers}>
                  {userList.map((user) => {
                    return (
                      <div key={user.id} className={styles.userOptionsInfo}>
                        <div className={styles.imagemDefault} style={{backgroundColor: user.perfilColor}} onClick={() => handleClickUser(user.id)}>
                          <FaUser className={styles.icon} />
                        </div>
                        {options.userInfo && options.activeUser === user.id && <UserInfo bannerColor={user.bannerColor} perfilColor={user.perfilColor} username={user.username} email={user.email} />}
                      </div>
                    );
                  })}
                </div>
                {participantes.length >= 4 && <div className={styles.divUsers}>
                  <div className={styles.countUsers} onClick={() => handleClick('users')} style={options.users ? { backgroundColor: 'white' } : {}}>
                    <span className={styles.count} style={options.users ? { color: '#2d333a' } : {}}>
                      +{participantes.length}
                    </span>
                  </div>
                  {options.users && <UsersPopUp onClick={() => handleClick('users')} users={participantes}/>}
                </div>}
              </>
          </div>
          <button className={styles.inviteButton} onClick={() => handleClick('invite')} style={options.invite ? { backgroundColor: 'white', color: '#2d333a' } : {}}>Invite</button>
        </div>
        <div className={styles.optionsDiv}>
          <div className={styles.options} onClick={() => handleClick('config')} style={options.config ? { backgroundColor: 'white' } : {}}>
            <HiOutlineEllipsisHorizontal className={styles.icon} style={options.config ? { color: '#2d333a' } : {}}/>
          </div>
          {options.config && <ConfigProject projectId={projectId}/>}
        </div>
      </div>
      {options.invite && (
        <div ref={PopUpRef}>
          <InviteUserPopUp userId={userId} projectId={projectId} projectName={titleProject} username={username} users={participantes} onClick={() => handleClick('invite')} />
        </div>
      )}
      {options.invite && <Foco color={'rgba(0, 0, 0, 0.4)'} />}
    </>
  );
}
