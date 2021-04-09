import React from 'react';
import classes from './BuildControl.css';

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.Label}</div>
        <button
            className={classes.LessButton}
            onClick={props.added}
        >
            Add
        </button>
        <button
            className={classes.MoreButton}
            onClick={props.remove}
            disabled = {props.disabled}
        >
            Remove
        </button>
    </div>
);

export default BuildControl