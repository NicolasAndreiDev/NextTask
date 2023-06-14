import Image from "next/image";

export default function UserInfo() {
    return(
        <Image src={'/Logo.png'} alt={"user_picture"} height={40} width={40}/>
    )
}