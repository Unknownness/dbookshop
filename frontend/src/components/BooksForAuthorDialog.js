import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  Button,
  IconButton,
  Slide,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BooksForAuthorDialog = ({ author, onClose }) => {
  const books = author.books || [];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedBooks = books.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="md"
      TransitionComponent={Transition}
    >
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          p: 2,
        }}
      >
        <DialogTitle sx={{ m: 0, p: 1 }}>
          <Typography variant="h6" component="div">
            Books for author: {author.name}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'inherit',
            }}
            size="large"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      </Box>
      <DialogContent dividers>
        {books.length > 0 ? (
          <TableContainer component={Paper} elevation={3} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle1">Book Title</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedBooks.map((book) => (
                  <TableRow key={book.id} hover>
                    <TableCell>{book.title}</TableCell>
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
        ) : (
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            No books found for this author.
          </Typography>
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

export default BooksForAuthorDialog;
