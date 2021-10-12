import { useAppDispatch } from "../../app/hooks";
import { Nav } from "../../components";
import { mainAppSections } from "../../config";
import { goto } from "./navigationSlice";

const SiteNav: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <Nav ariaLabel="Main site pages">
      {mainAppSections.map(({ title, componentName }) => <button key={title} onClick={() => dispatch(goto({ componentName }))}>{title}</button>)}
    </Nav>
  )
}

export default SiteNav;