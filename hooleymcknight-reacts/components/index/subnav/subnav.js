import SubnavItem from './subnavItem'

const Subnavbar = (props) => {

  return (
    <nav className={props.className}>
      <ul id="subnav-menu" role="menubar">
        <SubnavItem link="#summary" name="Summary" />
        <SubnavItem link="#portfolio" name="Portfolio" />
        <SubnavItem link="#resume" name="Résumé" />
        <SubnavItem link="#blog" name="Blog" />
        <SubnavItem link="#videos" name="Videos" />
        <SubnavItem link="#photos" name="Photos" />
      </ul>
    </nav>
  )
}

export default Subnavbar
