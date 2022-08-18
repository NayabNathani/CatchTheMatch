// import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('2000-01-01'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.setDate(date)
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
        fullWidth
        inputVariant='outlined'
          margin="normal"
          id="date-picker-dialog"
          label="Date of Birth"
          format="MM/dd/yyyy"
          value={selectedDate}
          variant='inline'
        //   variant="outlined"
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          minDate={new Date("1950-01-01")}
          maxDate={new Date("2002-12-31")}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}