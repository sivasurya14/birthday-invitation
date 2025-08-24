import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import EventHeader from './components/EventHeader';
import PhotoCarousel from './components/PhotoCarousel';
import EventDetails from './components/EventDetails';
import RSVPForm from './components/RSVPForm';
import { useFormattedDate } from './hooks/useFormattedDate';
import { useCountdown } from './hooks/useCountdown';
import { downloadICS } from './utils/calendar';


import photo1 from './assets/IMG-20250824-WA0020.jpg';
import photo2 from './assets/IMG-20250824-WA0032.jpg';
import photo3 from './assets/IMG-20250824-WA0040.jpg';
import photo4 from './assets/IMG-20250824-WA0050.jpg';
import photo5 from './assets/IMG-20250824-WA0065.jpg';
import photo6 from './assets/IMG-20250824-WA0089.jpg';
import photo7 from './assets/IMG-20250824-WA0221.jpg';


// Event configuration
const EVENT = {
  honoree: "Magizh's 1st Birthday",
  tagline: "Cake • Food • Good Vibes",
  dateISO: "2025-08-27T10:00:00+05:30",
  venueName: "Magizh's Home",
  address: "Muthampalayam,Villupuram",
  mapLink: "https://maps.app.goo.gl/nGoQwVDukrLY9Tgg8",
  contactPhone: "9080751263"
};

// Photo carousel images
const PHOTOS = [
  { url: photo1, alt: 'Description for photo 1' },
  { url: photo2, alt: 'Description for photo 2' },
  { url: photo3, alt: 'Description for photo 3' },
  { url: photo4, alt: 'Description for photo 4' },
  { url: photo5, alt: 'Description for photo 5' },
  { url: photo6, alt: 'Description for photo 6' },
  { url: photo7, alt: 'Description for photo 7' }
];



const BirthdayInvite: React.FC = () => {
  const { day, date, time } = useFormattedDate(EVENT.dateISO);
  const countdown = useCountdown(EVENT.dateISO);

  const handleAddToCalendar = () => {
    downloadICS({
      title: EVENT.honoree,
      description: EVENT.tagline,
      startISO: EVENT.dateISO,
      location: `${EVENT.venueName}, ${EVENT.address}`,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Hero Section */}
        <EventHeader
          honoree={EVENT.honoree}
          tagline={EVENT.tagline}
          day={day}
          date={date}
          time={time}
          venueName={EVENT.venueName}
          address={EVENT.address}
          mapLink={EVENT.mapLink}
          countdown={countdown}
          onAddToCalendar={handleAddToCalendar}
        />

        {/* Photo Carousel Section */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <PhotoCarousel images={PHOTOS} />
        </Container>

        {/* Details and RSVP Section */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            alignItems="stretch"
          >
            <Box sx={{ flex: 3 }}>
              <EventDetails
                contactPhone={EVENT.contactPhone}
              />
            </Box>
            {/* <Box sx={{ flex: 2 }}>
              <RSVPForm
                eventTitle={EVENT.honoree}
                contactEmail={EVENT.contactEmail}
              />
            </Box> */}
          </Stack>
        </Container>

        {/* Footer */}
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Tiny Trunks Invitations ❤️
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default BirthdayInvite;