import { FiStar } from "react-icons/fi";
import AllProjects from "../AllProjects";
import { useContext } from "react";
import { UserContext } from "@/providers/UserProvider";
import { useQuery } from "@apollo/client";
import { GET_FAV_PROJECTS } from "@/graphql/projects/GetFavProjects";

export default function FavProjects() {
    const { user } = useContext(UserContext);
    const projectsFavIds = user?.favProjects?.map((favProject) => favProject.projectId);
    const favProjects = user?.projects?.filter((project) => projectsFavIds?.includes(project.id));
    const IconFav = <FiStar />

    return (
        <>
            {favProjects && favProjects.length > 0 && <AllProjects projectsList={favProjects} title={"Favorite projects"} icon={IconFav} />}
        </>
    )
}