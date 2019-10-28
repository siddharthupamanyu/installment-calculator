import React from 'react';
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
import Slider from './Components/ux/Slider'

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
  }
}));

function App() {

  const classes = useStyles();
  const [interestRate, setInterest] = React.useState(0);
  const [numofPayments, setNumber] = React.useState(0);
  const [monthlyInstallment, setInstallment] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [months, setMonth] = React.useState(0);
  const [isValid, setValidity] = React.useState(true);
  const [state, setState] = React.useState({
    left: false,
  });
  const [index, setIndex] = React.useState(localStorage.length);
  const debounceOnChange = React.useCallback(debounce(getData, 400), []);

  let data;
  let i = index;

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

  const getAmount = value => {
    setAmount(value);
    if (checkValidMonthAndAmount(value, months)) {
      debounceOnChange(value, months);
    }
    checkValid('amount', value);
  }

  const getMonths = value => {
    setMonth(value);
    checkValid('month', value);
    if (checkValidMonthAndAmount(amount, value)) {
      debounceOnChange(amount, value);
    }
  }

  const checkValidMonthAndAmount = (amount, months) => {
    if ((amount >= 500 && amount <= 5000) && (months >= 6 && months <= 24)) {
      return true;
    }
    return false;
  }
  async function getData(principle, duration) {
    data = await fetch(`https://ftl-frontend-test.herokuapp.com/interest?amount=${principle}&numMonths=${duration}`);
    data.json()
      .then(data => {
        localStorage.setItem(`${i}`, JSON.stringify({ amount: principle, months: duration }));
        setInterest(data.interestRate);
        setInstallment(data.monthlyPayment.amount);
        setNumber(data.numPayments);
        i++;
        setIndex(i);
      });
  };

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ [side]: open });
  };

  const handleHistoryClicked = event => {
    const { amount, months } = JSON.parse(localStorage.getItem(event.currentTarget.getAttribute('value')));
    setValidity(true);
    setAmount(amount);
    setMonth(months);
    getData(amount, months);
  }

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
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default App;
