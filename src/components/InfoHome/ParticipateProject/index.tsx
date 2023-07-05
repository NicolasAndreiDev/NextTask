import AllProjects from "../AllProjects";
import { FiUsers } from 'react-icons/fi';

const Icon = <FiUsers />

export default function ParticipateProjects() {
    return(
        <AllProjects title={"Participate Projects"} icon={Icon} />
    )
}