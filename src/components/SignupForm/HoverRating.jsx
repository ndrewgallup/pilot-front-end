import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Star from '@mui/icons-material/Star';

const labels = {
  1: 'Beginner',
  2: 'Novice',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Pro',
};

export default function HoverRating({handleChange}) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

useEffect(()=>{
  handleChange({target: {name: 'skillLevel', value}})
}, [value])

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
    <Rating
      name="skillLevel"
      value={value}
      precision={1}
      size='large'
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      onChangeActive={(event, newHover) => {
        setHover(newHover);
      }}
      emptyIcon={<Star style={{ color: 'white'}} fontSize="inherit" />}
    />
      {value !== null && (
        <Box style={{ color: 'white'}} sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}