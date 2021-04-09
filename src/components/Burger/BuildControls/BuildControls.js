import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls =[
    { label:'Salad', type:'salad'},
    { label:'Bacon', type:'bacon'},
    { label:'Cheese', type:'cheese'},
    { label:'Meat', type:'meat'},
];

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p> Total Price : {props.totalPrice.toFixed(2)}</p>
        {controls.map(buildControl => (
            <BuildControl 
                key={buildControl.label} 
                Label={buildControl.label}
                added={() => props.ingredientsAdd(buildControl.type)}
                remove={() => props.ingredientsRemove(buildControl.type)}
                disabled={props.disabled[buildControl.type]}
            />
        ))}
        <button className={classes.OrderButton} disabled={props.purchasable} onClick={props.purchasing}>ORDER NOW</button>
    </div>
);

export default BuildControls;
