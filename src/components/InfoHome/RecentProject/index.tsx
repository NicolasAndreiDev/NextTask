import { BiTimeFive } from "react-icons/bi";
import AllProjects from "../AllProjects";

const Icon = <BiTimeFive />

export default function RecentProject() {
    return(
        <AllProjects title={"Recently Viewed"} icon={Icon} />
    )
}