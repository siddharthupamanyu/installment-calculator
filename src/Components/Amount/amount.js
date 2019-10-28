// import React from 'react';
// import clsx from 'clsx';
// import { TextField, Slider } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import InputAdornment from '@material-ui/core/InputAdornment';

// const useStyles = makeStyles(theme => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     margin: {
//         margin: theme.spacing(1),
//     },
//     textField: {
//         flexBasis: 200,
//     },
//     slider: {
//         flexBasis: 200,
//     },
//     width: {
//         width: 'fit-content',
//         paddingRight: '30px'
//     },
// }));

// export default function AmountComponent(props) {
//     const classes = useStyles();
//     //const [value, setValue] = React.useState(0);

//     const handleSliderChange = (event, newValue) => {
// //        setValue(newValue);
//         props.getAmount(newValue);
//     };

//     const handleInputChange = event => {
//         props.getAmount(event.target.value === '' ? '' : Number(event.target.value));
//     };
//     return (
//         <React.Fragment>
//             <div className={clsx(classes.width)}>
//                 <TextField
//                     id="filled-adornment-amount"
//                     type="number"
//                     className={clsx(classes.margin, classes.textField)}
//                     variant="filled"
//                     label="Amount"
//                     value={props.amount}
//                     onChange={handleInputChange}
//                     InputProps={{
//                         startAdornment: <InputAdornment position="start">₹</InputAdornment>,
//                     }}
//                 />
//                 <Slider
//                     className={clsx(classes.margin, classes.slider)}
//                     value={typeof props.amount === 'number' ? props.amount : 0}
//                     onChange={handleSliderChange}
//                     aria-labelledby="input-slider"
//                     min={500}
//                     max={5000}
//                 />
//             </div>
//         </React.Fragment>
//     );
// }