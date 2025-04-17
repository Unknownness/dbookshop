import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  TablePagination,
  Button,
  DialogActions,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { getReviewsByBook, deleteReview } from '../services/api';
import ReviewForm from './ReviewForm';

const ReviewsManagementDialog = ({ bookId, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingReview, setEditingReview] = useState(null);
  const [openReviewForm, setOpenReviewForm] = useState(false);

  const fetchReviews = () => {
    getReviewsByBook(bookId)
      .then((response) => setReviews(response.data))
      .catch((error) =>
        console.error('Error fetching reviews: ', error)
      );
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const handleEdit = (review) => {
    setEditingReview(review);
    setOpenReviewForm(true);
  };

  const handleDelete = (reviewId) => {
    if (
      window.confirm('Are you sure you want to delete this review?')
    ) {
      deleteReview(bookId, reviewId)
        .then(() =>
          setReviews((prevReviews) =>
            prevReviews.filter((r) => r.id !== reviewId)
          )
        )
        .catch((error) =>
          console.error('Error deleting review: ', error)
        );
    }
  };

  const handleAdd = () => {
    setEditingReview(null);
    setOpenReviewForm(true);
  };

  const handleFormClose = () => {
    setOpenReviewForm(false);
    fetchReviews();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedReviews = reviews.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Reviews management for book {bookId}
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
      <DialogContent>
        <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            color="info"
            onClick={handleAdd}
          >
            Add new review
          </Button>
        </Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Review message</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.message}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(review)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(review.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={reviews.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 15]}
          />
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Close
        </Button>
      </DialogActions>
      {openReviewForm && (
        <ReviewForm
          bookId={bookId}
          review={editingReview}
          onClose={handleFormClose}
        />
      )}
    </Dialog>
  );
};

export default ReviewsManagementDialog;
