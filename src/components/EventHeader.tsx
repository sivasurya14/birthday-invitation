import React from 'react';
import { Box, Typography, Stack, Card, CardContent, Button, Link } from '@mui/material';
import {
  CelebrationOutlined,
  CalendarMonthOutlined,
  LocationOnOutlined,
  CardGiftcardOutlined
} from '@mui/icons-material';
import CountdownTimer from './CountdownTimer';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface EventHeaderProps {
  honoree: string;
  tagline: string;
  day: string;
  date: string;
  time: string;
  venueName: string;
  address: string;
  mapLink: string;
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  onAddToCalendar: () => void;
}

const EventHeader: React.FC<EventHeaderProps> = ({
  honoree,
  tagline,
  day,
  date,
  time,
  venueName,
  address,
  mapLink,
  countdown,
  onAddToCalendar
}) => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fef3c7 100%)',
        py: { xs: 8, md: 10 },
        px: 2
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Card
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <CelebrationOutlined color="primary" />
              <Typography variant="body2" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                You're invited
              </Typography>
            </Stack>
            
            <Typography variant="h1" gutterBottom>
              {honoree}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {tagline}
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mb: 4 }}
            >
              <Card sx={{ flex: 1 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CalendarMonthOutlined color="primary" />
                  <Box>
                    <Typography variant="body1" fontWeight="medium" >
                      {day}, {date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {time}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ flex: 1 }}>
                <CardContent>
                  <Link
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      textDecoration: 'none',
                      color: 'inherit',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    <LocationOnOutlined color="primary" />
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {venueName}
                      </Typography>
                     <Box display="flex" alignItems="center" gap={1} mt={0.5}>
  <Typography variant="body2" color="text.secondary">
    {address}
  </Typography>
  <Button
    variant="outlined"
    size="small"
    href={`https://maps.google.com?q=${encodeURIComponent(address)}`}
    target="_blank"
    rel="noopener noreferrer"
    sx={{ textTransform: 'none', borderRadius: 2 }}
  >
    Open in Maps
  </Button>
</Box>

                    </Box>
                  </Link>
                </CardContent>
              </Card>

              {/* <Card sx={{ flex: 1 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CardGiftcardOutlined color="primary" />
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      Dress Code: Pastel Party ✨
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bring your smiles!
                    </Typography>
                  </Box>
                </CardContent>
              </Card> */}
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretch', sm: 'center' }}
              spacing={3}
              sx={{
                background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
                borderRadius: 2,
                p: 3
              }}
            >
              <CountdownTimer {...countdown} />
              
              <Button
                variant="contained"
                size="large"
                onClick={onAddToCalendar}
                sx={{
                  bgcolor: 'text.primary',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'text.secondary'
                  },
                  minWidth: 160
                }}
              >
                Add to Calendar
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default EventHeader;