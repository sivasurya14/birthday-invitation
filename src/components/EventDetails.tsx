import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  AccessTimeOutlined,
  AutoAwesomeOutlined,
  PhoneOutlined,
  EmailOutlined
} from '@mui/icons-material';

interface EventDetailsProps {
  contactPhone: string;
  contactEmail: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({ contactPhone, contactEmail }) => {
  const details = [
    {
      icon: <AccessTimeOutlined />,
      text: 'Please arrive before time✨'
    },
    {
      icon: <AutoAwesomeOutlined />,
      text: 'Cake cutting at 06:00 PM'
    },
    {
      icon: <PhoneOutlined />,
      text: `Contact: ${contactPhone}`
    }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h2" gutterBottom>
          Event Details
        </Typography>
        
        <List>
          {details.map((detail, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemIcon sx={{ color: 'primary.main' }}>
                {detail.icon}
              </ListItemIcon>
              <ListItemText
                primary={detail.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: 'text.secondary'
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default EventDetails;