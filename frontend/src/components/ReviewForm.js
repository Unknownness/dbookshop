import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { createReview, updateReview } from '../services/api';

const ReviewForm = ({ bookId, review, onClose }) => {
  const [message, setMessage] = useState(review ? review.message : '');

  useEffect(() => {
    if (review) {
      setMessage(review.message);
    } else {
      setMessage('');
    }
  }, [review]);

  const handleSubmit = () => {
    const reviewData = { message };

    if (review && review.id != null) {
      updateReview(bookId, review.id, reviewData)
        .then(() => onClose())
        .catch((error) =>
          console.error('Error updating review: ', error)
        );
    } else {
      createReview(bookId, reviewData)
        .then(() => onClose())
        .catch((error) =>
          console.error('Error creating review: ', error)
        );
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{review ? 'Edit Review' : 'Add new review'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Review Message"
          type="text"
          fullWidth
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          rows={3}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="info">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewForm;
