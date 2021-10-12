interface INavProps {
  ariaLabel: string;
}

const Nav: React.FC<INavProps> = ({ ariaLabel, children }): JSX.Element => {
  return (
    <nav aria-label={ariaLabel}>
      {children}
    </nav>
  )
}

export default Nav;