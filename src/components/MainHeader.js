import { NavLink } from 'react-router-dom';
import classes from './MainHeader.module.css';
const MainHeader = props => {
  return (
    <div>
      <div className={classes.MainHeader}>
        <NavLink exact to="/allquotes" activeClassName={classes.active}>
          Quotes
        </NavLink>
        <NavLink to="/addquotes" activeClassName={classes.active}>
          Add new quote
        </NavLink>
      </div>
    </div>
  );
};
export default MainHeader;
