import classes from './LoadingSpinner.module.css';

const LoadingSpinner = props => {
  return (
    <div className={classes.centered}>
      <div className={classes.LoadingSpinner}>
        <div className={classes.right}></div>
        <div className={classes.left}></div>
      </div>
    </div>
  );
};
export default LoadingSpinner;
