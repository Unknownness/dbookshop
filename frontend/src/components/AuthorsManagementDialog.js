import React, { useState, useEffect, useCallback } from 'react';
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
import BookIcon from '@mui/icons-material/Book';
import CloseIcon from '@mui/icons-material/Close';
import { getBookById, deleteAuthorForBook } from '../services/api';
import AuthorForm from './AuthorForm';
import BooksForAuthorDialog from './BooksForAuthorDialog';

const AuthorsManagementDialog = ({ bookId, onClose }) => {
  const [authors, setAuthors] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [openAuthorForm, setOpenAuthorForm] = useState(false);
  const [openBooksDialog, setOpenBooksDialog] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const fetchAuthors = useCallback(() => {
    getBookById(bookId)
      .then((response) => {
        const book = response.data;
        setAuthors(book.authors || []);
      })
      .catch((error) =>
        console.error('Error fetching book to get authors: ', error)
      );
  }, [bookId]);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const handleEdit = (author) => {
    setEditingAuthor(author);
    setOpenAuthorForm(true);
  };

  const handleDelete = (authorId) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      deleteAuthorForBook(bookId, authorId)
        .then(() => {
          setAuthors((prevAuthors) =>
            prevAuthors.filter((a) => a.id !== authorId)
          );
        })
        .catch((error) =>
          console.error('Error deleting author: ', error)
        );
    }
  };

  const handleAdd = () => {
    setEditingAuthor(null);
    setOpenAuthorForm(true);
  };

  const handleFormClose = () => {
    setOpenAuthorForm(false);
    fetchAuthors();
  };

  const handleShowBooks = (author) => {
    setSelectedAuthor(author);
    setOpenBooksDialog(true);
  };

  const handleCloseBooksDialog = () => {
    setOpenBooksDialog(false);
    setSelectedAuthor(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedAuthors = authors.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Authors management for book {bookId}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
          <Button variant="contained" color="info" onClick={handleAdd}>
            Add new author
          </Button>
        </Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Author name</TableCell>
                <TableCell align="center">Show Books</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAuthors.map((author) => (
                <TableRow key={author.id}>
                  <TableCell>{author.name}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleShowBooks(author)}
                    >
                      <BookIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(author)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(author.id)}
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
            count={authors.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Close
        </Button>
      </DialogActions>
      {openAuthorForm && (
        <AuthorForm
          bookId={bookId}
          author={editingAuthor}
          onClose={handleFormClose}
        />
      )}
      {openBooksDialog && selectedAuthor && (
        <BooksForAuthorDialog
          author={selectedAuthor}
          onClose={handleCloseBooksDialog}
        />
      )}
    </Dialog>
  );
};

export default AuthorsManagementDialog;
