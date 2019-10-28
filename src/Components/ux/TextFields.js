import React from 'react';
import clsx from 'clsx';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';

//TextField CSS
const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        flexBasis: 200,
    },
}));

///Summary
///TextField component which implements the Material UI Textfield
export default function TextFieldComponent(props) {
    const classes = useStyles();

    //event handler to handle change in value of textbox by user
    //it passes the value to event handler present in the parent
    const handleInputChange = event => {
        props.getValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    //Enum to handle the Symbols for each type of TextField
    const adornmentEnum = { "amount": '$', "month": 'M', "interest": 'ℛ', "monthly_payment": '$', "payments": " " };
    //Used Freeze function to prevent enum from modifying
    Object.freeze(adornmentEnum);

    //Enum to show validation for the different textfields
    const errorEnum = { "amount": 'Range: 500-5000', "month": 'Range: 6-24' };
    Object.freeze(errorEnum);

    return (
        <React.Fragment>
            <div className={clsx(classes.width)}>
                <TextField
                    id={`filled-adornment-${props.type}`}
                    type="number"
                    className={clsx(classes.margin, classes.textField)}
                    variant="filled"
                    label={props.label}
                    value={props.value}
                    onChange={handleInputChange}
                    disabled={props.disabled}
                    helperText={props.isValid ? <span/> : errorEnum[props.type]}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{adornmentEnum[props.type]}</InputAdornment>,
                    }}
                />
            </div>
        </React.Fragment>
    );
}

//using prop-types to have type checking of props and maintain the correct props
TextFieldComponent.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
    isValid: PropTypes.bool,
    getValue: PropTypes.func,
    type: PropTypes.string.isRequired
}