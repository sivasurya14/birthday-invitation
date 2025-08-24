import React, { useState, useEffect } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface PhotoCarouselProps {
  images: Array<{
    url: string;
    alt: string;
  }>;
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = images.length;

  const next = () => setCurrentIndex((i) => (i + 1) % total);
  const prev = () => setCurrentIndex((i) => (i - 1 + total) % total);

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: 3,
        height: { xs: 650, md: 620 }
      }}
    >
      <Box
        component="img"
        src={images[currentIndex]?.url}
        alt={images[currentIndex]?.alt}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
      
      <IconButton
        onClick={prev}
        sx={{
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.9)'
          }
        }}
      >
        <ChevronLeft />
      </IconButton>
      
      <IconButton
        onClick={next}
        sx={{
          position: 'absolute',
          right: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.9)'
          }
        }}
      >
        <ChevronRight />
      </IconButton>
      
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default PhotoCarousel;