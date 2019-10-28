import React from 'react';
import clsx from 'clsx';
import { Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

//CSS for Slider
const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    slider: {
        flexBasis: 200,
    },
}));

///Summary
///Slider component which implements the Material UI Slider
export default function SliderComponent(props) {

    const classes = useStyles();

    //Event handler to handle the sliding event of the slider
    //Passes the value of the slider to the parent event handler
    const handleSliderChange = (event, newValue) => {
        props.getValue(newValue);
    };

    return (
        <React.Fragment>
            <div className={clsx(classes.width)}>
                <Slider
                    className={clsx(classes.margin, classes.slider)}
                    value={typeof props.value === 'number' ? props.value : 0}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    min={props.min}
                    max={props.max}
                />
            </div>
        </React.Fragment>
    );
}

//using prop-types to have type checking of props and maintain the correct props
SliderComponent.propTypes = {
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    getValue: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired
}