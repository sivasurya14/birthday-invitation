import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
  Stack
} from '@mui/material';

interface RSVPFormProps {
  eventTitle: string;
  contactEmail: string;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ eventTitle, contactEmail }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    attending: 'Yes'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string) => (event: any) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(`RSVP for ${eventTitle}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nAttending: ${form.attending}`
    );
    window.open(`mailto:${contactEmail}?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          RSVP
        </Typography>
        
        <Stack component="form" onSubmit={handleSubmit} spacing={2}>
          <TextField
            label="Your Name"
            value={form.name}
            onChange={handleChange('name')}
            required
            fullWidth
          />
          
          <TextField
            label="Phone (optional)"
            value={form.phone}
            onChange={handleChange('phone')}
            fullWidth
          />
          
          <FormControl fullWidth>
            <InputLabel>Will you attend?</InputLabel>
            <Select
              value={form.attending}
              onChange={handleChange('attending')}
              label="Will you attend?"
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Maybe">Maybe</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            Send RSVP
          </Button>
          
          {submitted && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Thanks! Your email client should open — just hit send.
            </Alert>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RSVPForm;