import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.val);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.setValue(newValue)
    // console.log(newValue,'newValue')
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {props.name}
      </Typography>
      <Slider
      min={18} max={70}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
