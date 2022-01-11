import QuotesItem from './QuotesItem';
import classes from './QuotesList.module.css';
import LoadingSpinner from '../ui/LoadingSpinner';
const QuotesList = props => {
  const elements = props.data.map(el => {
    return (
      <li key={el.id}>
        <QuotesItem name={el.name} id={el.id} />
      </li>
    );
  });

  return <ul className={classes.QuoteList}>{elements}</ul>;
};
export default QuotesList;
