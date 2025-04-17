import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://backend-pzu1.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllBooks = () => apiClient.get('/books/all');
export const getBookById = (id) => apiClient.get(`/books/${id}`);
export const createBook = (bookData) => apiClient.post('/books', bookData);
export const updateBook = (id, bookData) => apiClient.put(`/books/${id}`, bookData);
export const deleteBook = (id) => apiClient.delete(`/books/${id}`);

export const getReviewsByBook = (bookId) => apiClient.get(`/books/${bookId}/reviews`);
export const createReview = (bookId, reviewData) => apiClient.post(`/books/${bookId}/reviews`, reviewData);
export const updateReview = (bookId, reviewId, reviewData) => apiClient.put(`/books/${bookId}/reviews/${reviewId}`, reviewData);
export const deleteReview = (bookId, reviewId) => apiClient.delete(`/books/${bookId}/reviews/${reviewId}`);

export const createAuthorForBook = (bookId, authorData) => apiClient.post(`/books/${bookId}/authors`, authorData);
export const updateAuthorForBook = (bookId, authorId, authorData) => apiClient.put(`/books/${bookId}/authors/${authorId}`, authorData);
export const deleteAuthorForBook = (bookId, authorId) =>apiClient.delete(`/books/${bookId}/authors/${authorId}`);
export const getAuthorsByName = (bookId, name) => apiClient.get(`/books/${bookId}/authors/name/${encodeURIComponent(name)}`);

export default apiClient;
