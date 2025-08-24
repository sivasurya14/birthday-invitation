import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

interface CountdownTimerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeChip: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      bgcolor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      px: 2,
      py: 1.5,
      minWidth: 80,
      boxShadow: 1
    }}
  >
    <Typography
      variant="h3"
      sx={{
        fontSize: { xs: '1.5rem', md: '2rem' },
        fontWeight: 600,
        color: 'black',
        lineHeight: 1
      }}
    >
      {String(value).padStart(2, '0')}
    </Typography>
    <Typography
      variant="caption"
      sx={{
        textTransform: 'uppercase',
        opacity: 0.8,
        color: 'black',
        fontSize: '0.75rem'
      }}
    >
      {label}
    </Typography>
  </Box>
);

const CountdownTimer: React.FC<CountdownTimerProps> = ({ days, hours, minutes, seconds }) => {
  return (
    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
      <TimeChip label="Days" value={days} />
      <TimeChip label="Hours" value={hours} />
      <TimeChip label="Mins" value={minutes} />
      <TimeChip label="Secs" value={seconds} />
    </Stack>
  );
};

export default CountdownTimer;