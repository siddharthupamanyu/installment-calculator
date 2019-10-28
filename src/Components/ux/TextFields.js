import React from 'react';
import clsx from 'clsx';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        flexBasis: 200,
    },
}));

export default function TextFieldComponent(props) {
    const classes = useStyles();

    const handleInputChange = event => {
        props.getValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const adornmentEnum = {"amount":'$', "month":'M', "interest":'ℛ', "monthly_payment":'$', "payments": " "};
    Object.freeze(adornmentEnum);
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
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{adornmentEnum[props.type]}</InputAdornment>,
                    }}
                />
            </div>
        </React.Fragment>
    );
}