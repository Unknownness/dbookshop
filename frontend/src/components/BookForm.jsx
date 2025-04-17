import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
} from '@mui/material';
import { createBook, updateBook } from '../services/api';

const BookForm = ({ book, onClose }) => {
  const [title, setTitle] = useState(book ? book.title : '');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
    } else {
      setTitle('');
    }
  }, [book]);

  const handleSubmit = () => {
    const bookData = { title };
    if (book && book.id != null) {
      updateBook(book.id, bookData)
        .then(() => onClose())
        .catch((error) => console.error('Error updating book: ', error));
    } else {
      createBook(bookData)
        .then(() => onClose())
        .catch((error) => console.error('Error creating book: ', error));
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{book ? 'Edit Book' : 'Add new book'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookForm;
