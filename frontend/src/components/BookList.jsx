import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  IconButton,
  TablePagination,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReviewsIcon from '@mui/icons-material/RateReview';
import BookForm from './BookForm';
import ReviewsManagementDialog from './ReviewsManagementDialog';
import AuthorsManagementDialog from './AuthorsManagementDialog';
import { getAllBooks, deleteBook } from '../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [editingBook, setEditingBook] = useState(null);
  const [openBookForm, setOpenBookForm] = useState(false);
  
  const [openReviewsDialog, setOpenReviewsDialog] = useState(false);
  const [selectedBookForReviews, setSelectedBookForReviews] = useState(null);
  
  const [openAuthorsDialog, setOpenAuthorsDialog] = useState(false);
  const [selectedBookForAuthors, setSelectedBookForAuthors] = useState(null);

  const fetchBooks = () => {
    getAllBooks()
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('Error fetching books: ', error));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEdit = (book) => {
    setEditingBook(book);
    setOpenBookForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(id)
        .then(() => {
          setBooks((prevBooks) => prevBooks.filter((b) => b.id !== id));
        })
        .catch((error) => console.error('Error deleting book: ', error));
    }
  };

  const handleAdd = () => {
    setEditingBook(null);
    setOpenBookForm(true);
  };

  const handleBookFormClose = () => {
    setOpenBookForm(false);
    fetchBooks();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleManageReviews = (book) => {
    setSelectedBookForReviews(book);
    setOpenReviewsDialog(true);
  };

  const handleCloseReviewsDialog = () => {
    setOpenReviewsDialog(false);
    setSelectedBookForReviews(null);
    fetchBooks();
  };

  const handleManageAuthors = (book) => {
    setSelectedBookForAuthors(book);
    setOpenAuthorsDialog(true);
  };

  const handleCloseAuthorsDialog = () => {
    setOpenAuthorsDialog(false);
    setSelectedBookForAuthors(null);
    fetchBooks();
  };

  const paginatedBooks = books.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
        <Button variant="contained" color="info" onClick={handleAdd}>
          Add new book
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {}
              <TableCell>Title</TableCell>
              <TableCell>Authors</TableCell>
              <TableCell>Reviews</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>
                  {book.authors && book.authors.length > 0
                    ? book.authors.map((author) => author.name).join(', ')
                    : 'No Authors'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    startIcon={<ReviewsIcon />}
                    onClick={() => handleManageReviews(book)}
                  >
                    Manage Reviews
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => handleManageAuthors(book)}
                    sx={{ marginRight: 1 }}
                  >
                    Manage Authors
                  </Button>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(book)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(book.id)}
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
          count={books.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15]}
        />
      </TableContainer>
      {openBookForm && (
        <BookForm book={editingBook} onClose={handleBookFormClose} />
      )}
      {openReviewsDialog && selectedBookForReviews && (
        <ReviewsManagementDialog
          bookId={selectedBookForReviews.id}
          onClose={handleCloseReviewsDialog}
        />
      )}
      {openAuthorsDialog && selectedBookForAuthors && (
        <AuthorsManagementDialog
          bookId={selectedBookForAuthors.id}
          onClose={handleCloseAuthorsDialog}
        />
      )}
    </Paper>
  );
};

export default BookList;
