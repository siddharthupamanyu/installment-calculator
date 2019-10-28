import React from 'react';
import clsx from 'clsx';
import { TextField, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        flexBasis: 200,
    },
    slider: {
        flexBasis: 200,
    },
    width: {
        width: 'fit-content'
    },
}));

export default function DurationComponent(props) {
    const classes = useStyles();
    //const [value, setValue] = React.useState(0);

    const handleSliderChange = (event, newValue) => {
        //setValue(newValue);
        props.getMonths(newValue);
    };

    const handleInputChange = event => {
        //setValue(event.target.value === '' ? '' : Number(event.target.value));
        props.getMonths(event.target.value === '' ? '' : Number(event.target.value));
    };
    return (
        <React.Fragment>
            <div className={clsx(classes.width)}>
                <TextField
                    id="filled-adornment-duration"
                    type="number"
                    className={clsx(classes.margin, classes.textField)}
                    variant="filled"
                    label="Months"
                    value={props.month}
                    onChange={handleInputChange}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">M</InputAdornment>,
                    }}
                />
                <Slider
                    className={clsx(classes.margin, classes.slider)}
                    value={typeof props.month === 'number' ? props.month : 0}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    min={6}
                    max={24}
                />
            </div>
        </React.Fragment>
    );
}