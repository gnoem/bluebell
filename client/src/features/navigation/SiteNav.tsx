import { useAppDispatch } from "../../app/hooks";
import { Nav } from "../../components";
import { appSections } from "../../config";
import { goto } from "./navigationSlice";

const SiteNav: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <Nav ariaLabel="Main site pages">
      {appSections.map(({ title }) => <button key={title} onClick={() => dispatch(goto(title))}>{title}</button>)}
    </Nav>
  )
}

export default SiteNav;