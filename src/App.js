import React from 'react';
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from './Components/ux/TextFields';
import Slider from './Components/ux/Slider';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListSubheader from '@material-ui/core/ListSubheader';

//APP CSS
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex'
  },
  margin: {
    margin: theme.spacing(1),
  },
  list: {
    width: 250,
  },
  width: {
    width: 'fit-content',
    paddingRight: '30px'
  },
  listPadding: {
    paddingLeft: '40px'
  },
  header: {
    fontWeight: 'bold',
    marginBottom: '10px'
  }
}));

function App() {

  const classes = useStyles();

  // Declaration of all the state variables to be used in the application
  const [interestRate, setInterest] = React.useState(0);
  const [numofPayments, setNumber] = React.useState(0);
  const [monthlyInstallment, setInstallment] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [months, setMonth] = React.useState(0);
  const [isValid, setValidity] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    left: false,
  });
  const [index, setIndex] = React.useState(localStorage.length);
  const debounceOnChange = React.useCallback(debounce(getData, 400), []);

  // variable declarions
  // variable which will have the response of the API call
  let data;

  // it stores the value of the index so that the indexing can be done properly 
  // when saving data in local storage.
  let i = index;

  // Debounce function
  // It stops the event to fire the API call again and again
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }

  // Function which sets the amount
  const getAmount = value => {
    setAmount(value);
    if (checkValidMonthAndAmount(value, months)) {
      debounceOnChange(value, months);
    }
    checkValid('amount', value);
  }

  // It sets the duration of installment
  const getMonths = value => {
    setMonth(value);
    checkValid('month', value);
    if (checkValidMonthAndAmount(amount, value)) {
      debounceOnChange(amount, value);
    }
  }

  // It checks if the combination of amount and duration is within range to make API call
  const checkValidMonthAndAmount = (amount, months) => {
    if ((amount >= 500 && amount <= 5000) && (months >= 6 && months <= 24)) {
      return true;
    }
    return false;
  }

  // Asynchronous function to make the api call
  // It takes amount and duration as the query string
  // If the call is successful it also sets the data into local storage
  // It also starts the progress bar
  async function getData(principle, duration) {
    setLoading(true);
    data = await fetch(`https://ftl-frontend-test.herokuapp.com/interest?amount=${principle}&numMonths=${duration}`);
    data.json()
      .then(data => {
        localStorage.setItem(`${i}`, JSON.stringify({ amount: principle, months: duration }));
        setInterest(data.interestRate);
        setInstallment(data.monthlyPayment.amount);
        setNumber(data.numPayments);
        i++;
        setIndex(i);
      })
      .finally(() => setLoading(false));
  };

  // Toggles the side history drawer
  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ [side]: open });
  };

  // It handles the item clicked in the history and populates the fields with its data
  const handleHistoryClicked = event => {
    const { amount, months } = JSON.parse(localStorage.getItem(event.currentTarget.getAttribute('value')));
    setValidity(true);
    setAmount(amount);
    setMonth(months);
    getData(amount, months);
  }

  // Checks if the entered amount and duration are valid and shows the range if not valid
  const checkValid = (type, value) => {
    switch (type) {
      case "amount":
        value >= 500 && value <= 5000 ? setValidity(true) : setValidity(false);
        break;
      case "month":
        value >= 6 && value <= 24 ? setValidity(true) : setValidity(false);
        break;
      default:
    }
  }

  const sideList = side => (
    <div
      className={classes.list}
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListSubheader component="div" id="header">
          <ListItem>
            <ListItemText
              className={classes.listPadding}
              primary="Amount" />
            <ListItemText primary="Duration" />
            <Divider />
            <Divider />
          </ListItem>
        </ListSubheader>
        {(Object.keys(localStorage).sort((a, b) => b - a)).map((key, index) => {
          const { amount, months } = JSON.parse(localStorage.getItem(key));
          return (<div key={index}>
            <ListItem button
              value={key}
              onClick={handleHistoryClicked}>
              <ListItemText primary={key} />
              <ListItemText primary={amount} />
              <ListItemText primary={months} />
            </ListItem>
            <Divider />
          </div>
          )
        })}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <Grid container
        spacing={3}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}>
        <Paper className={clsx(classes.paper, classes.header)}>
          Installment Calculator
        </Paper>
        <Button onClick={toggleDrawer('left', true)}>Open History</Button>
        <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
          {sideList('left')}
        </Drawer>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <div className={classes.width}>
              <TextField
                getValue={getAmount}
                value={amount}
                type='amount'
                disabled={false}
                label={"Amount"}
                isValid={isValid}
              />
              <Slider
                getValue={getAmount}
                value={amount}
                max={5000}
                min={500}
              />
            </div>
            <div>
              <TextField
                getValue={getMonths}
                value={months}
                type='month'
                disabled={false}
                label='Months'
                isValid={isValid}
              />
              <Slider
                getValue={getMonths}
                value={months}
                max={24}
                min={6}
              />
            </div>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <TextField
              type="interest"
              label="Interest Rate"
              value={interestRate}
              disabled={true}
            />
            <TextField
              type="monthly_payment"
              label="Monthly Payment"
              value={monthlyInstallment}
              disabled={true}
            />
            <TextField
              type="payments"
              label="Number of Payments"
              value={numofPayments}
              disabled={true}
            />
          </Paper>
          {isLoading ? <LinearProgress color="secondary" /> : ""}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default App;
