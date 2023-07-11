import { FiStar } from "react-icons/fi";
import AllProjects from "../AllProjects";

const IconFav = <FiStar />

export default function FavProjects() {
    return(
        <AllProjects title={"Favorite projects"} icon={IconFav}/>
    )
}