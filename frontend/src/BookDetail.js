import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, List, ListItem, TextField, Button, 
  Chip, Dialog, DialogActions, DialogContent, DialogTitle 
} from '@mui/material';
import api from '../api/api';

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [newAuthor, setNewAuthor] = useState('');
  const [newReview, setNewReview] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    api.get(`/books/${id}`)
      .then(response => {
        setBook(response.data);
        setEditTitle(response.data.title);
      });
  }, [id]);

  const handleAddAuthor = () => {
    api.post(`/books/${id}/authors`, { name: newAuthor })
      .then(response => {
        setBook({...book, authors: [...book.authors, response.data]});
        setNewAuthor('');
      });
  };

  const handleAddReview = () => {
    api.post(`/books/${id}/reviews`, { message: newReview })
      .then(response => {
        setBook({...book, reviews: [...book.reviews, response.data]});
        setNewReview('');
      });
  };

  const handleUpdateBook = () => {
    api.put(`/books/${id}`, { title: editTitle })
      .then(response => {
        setBook(response.data);
        setOpenEdit(false);
      });
  };

  if (!book) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 3 }}>{book.title}</Typography>
      
      <Button variant="outlined" onClick={() => setOpenEdit(true)}>Edit Title</Button>
      
      <Typography variant="h5" sx={{ mt: 3 }}>Authors</Typography>
      <List sx={{ display: 'flex', gap: 1 }}>
        {book.authors?.map(author => (
          <Chip key={author.id} label={author.name} />
        ))}
      </List>
      
      <TextField
        label="New Author"
        value={newAuthor}
        onChange={(e) => setNewAuthor(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button variant="contained" onClick={handleAddAuthor} sx={{ ml: 2 }}>
        Add Author
      </Button>

      <Typography variant="h5" sx={{ mt: 4 }}>Reviews</Typography>
      <List>
        {book.reviews?.map(review => (
          <ListItem key={review.id}>{review.message}</ListItem>
        ))}
      </List>
      
      <TextField
        label="New Review"
        multiline
        fullWidth
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button variant="contained" onClick={handleAddReview} sx={{ mt: 2 }}>
        Add review
      </Button>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Book Title</DialogTitle>
        <DialogContent>
          <TextField
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleUpdateBook}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}