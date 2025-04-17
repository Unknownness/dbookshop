import React, { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material';
import { Autocomplete } from '@mui/material';
import {
  createAuthorForBook,
  updateAuthorForBook,
  getAuthorsByName,
} from '../services/api';

const AuthorForm = ({ bookId, author, onClose }) => {
  const [name, setName] = useState(author && author.name ? author.name : '');
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (author && author.name) {
      setName(author.name);
      setInputValue(author.name);
    } else {
      setName('');
      setInputValue('');
    }
  }, [author]);

  useEffect(() => {
    if (!inputValue) {
      setOptions([]);
      return undefined;
    }

    let active = true;
    setLoading(true);

    getAuthorsByName(bookId, inputValue)
      .then((response) => {
        if (active) {
          setOptions(response.data || []);
        }
      })
      .catch((error) => {
        console.error('Error fetching author suggestions:', error);
        if (active) {
          setOptions([]);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [inputValue, bookId]);

  const handleSubmit = () => {
    const authorData = { name };
    if (
      author &&
      author.id !== undefined &&
      author.id !== null &&
      !isNaN(Number(author.id))
    ) {
      updateAuthorForBook(bookId, author.id, { id: author.id, ...authorData })
        .then(() => onClose())
        .catch((error) => console.error('Error updating author: ', error));
    } else {
      createAuthorForBook(bookId, authorData)
        .then(() => onClose())
        .catch((error) => console.error('Error creating author: ', error));
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {author &&
        author.id !== undefined &&
        author.id !== null &&
        !isNaN(Number(author.id))
          ? 'Edit Author'
          : 'Add new author'}
      </DialogTitle>
      <DialogContent>
        <Autocomplete
          freeSolo
          options={options.map((option) => option.name)}
          value={name}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onChange={(event, newValue) => {
            const finalValue =
              typeof newValue === 'string' ? newValue : newValue || '';
            setName(finalValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Author Name"
              variant="outlined"
              fullWidth
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              helperText="Start typing to see existing authors..."
            />
          )}
          sx={{ mt: 2 }}
        />
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

export default AuthorForm;

