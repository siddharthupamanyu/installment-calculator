import React from 'react';
import clsx from 'clsx';
import { Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    slider: {
        flexBasis: 200,
    },
}));

export default function SliderComponent(props) {
    const classes = useStyles();

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