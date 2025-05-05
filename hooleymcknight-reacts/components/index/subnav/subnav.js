import SubnavItem from './subnavItem'

const Subnavbar = (props) => {

  return (
    <nav className={props.className}>
      <ul id="subnav-menu" role="menubar">
        <SubnavItem link="#portfolio" name="Portfolio" />
        <SubnavItem link="#resume" name="Résumé" />
        <SubnavItem link="#reviews" name="Reviews" />
        <SubnavItem link="#blog" name="Blog" />
        <SubnavItem link="/jackbox-wheel" name="Jackbox Wheel" />
      </ul>
    </nav>
  )
}

export default Subnavbar
