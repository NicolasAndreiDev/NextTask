import { MdClose } from 'react-icons/md';
import styles from './UsersPopUp.module.scss';
import { useState } from 'react';
import UserInfo from '../UserInfoProject';
import { FaUser } from 'react-icons/fa';

type UserProps = [{
    id: string,
    username: string,
    email: string,
    bannerColor: string,
    perfilColor: string
}]

export default function UsersPopUp({ onClick, users }: { onClick: () => void, users: UserProps }) {
    const [info, setInfo] = useState<{
      userInfo: boolean,
      activeUser: string | null,
    }>({
      userInfo: false,
      activeUser: null,
    });
    const [value, setValue] = useState("");
    const [filterUsers, setFilteredUsers] = useState<UserProps>(users);
  
    function handleClick(user: string) {
      setInfo((prev) => ({ ...prev, userInfo: !prev.userInfo, activeUser: user }));
    }
  
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const newValue = event.target.value;
      setValue(newValue);
  
      const filterUsers = users.filter((user) =>
        user.username.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredUsers(filterUsers as UserProps);
    }
  
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <h2 className={styles.title}>Project participants</h2>
          <MdClose className={styles.icon} onClick={onClick} />
        </div>
        <input className={styles.input} placeholder={"Search members"} value={value} onChange={handleChange} />
        <span className={styles.members}>Members</span>
        <div className={styles.allUsers}>
          {filterUsers.map((user) => (
            <div key={user.id} className={styles.oUsuario}>
              <div className={styles.user} onClick={() => handleClick(user.id)} style={{ backgroundColor: user.perfilColor }}>
                <FaUser className={styles.icon} />
              </div>
              {info.userInfo && info.activeUser === user.id && <UserInfo bannerColor={user.bannerColor} email={user.email} perfilColor={user.perfilColor} username={user.username} />}
            </div>
          ))}
        </div>
      </div>
    );
  }
  