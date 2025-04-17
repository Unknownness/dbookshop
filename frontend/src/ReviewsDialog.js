import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  DialogActions,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ReviewsDialog = ({ reviews, onClose }) => {
  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Reviews
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
          size="large">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {reviews.length > 0 ? (
          <List>
            {reviews.map((review, index) => (
              <ListItem key={index} divider>
                <ListItemText primary={review.message} />
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No reviews available.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewsDialog;
