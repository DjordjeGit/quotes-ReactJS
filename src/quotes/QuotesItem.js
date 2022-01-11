import classes from './QuotesItem.module.css';
import { NavLink } from 'react-router-dom';
const QuotesItem = props => {
  return (
    <div className={classes.quotesItem}>
      <div className={classes.author}>
        <p>Author:</p>
        <h1>{props.name}</h1>
      </div>
      <NavLink to={`/quotedetail/${props.id}`}>
        <p>Quotes Ditail</p>
      </NavLink>
    </div>
  );
};
export default QuotesItem;
