import axios from 'axios';

// Base configuration
axios.defaults.baseURL = 'http://localhost:5555';
axios.defaults.withCredentials = true;

// ============= AUTH ===============
export const checkSession = () => axios.get('/session');
export const login = (name, password) => axios.post('/login', { name, password });
export const register = (name, password) => axios.post('/users', { name, password });
export const logout = () => axios.post('/logout');

// ============= USERS ===============
export const getUsers = () => axios.get('/users');
export const getUserById = (id) => axios.get(`/users/${id}`);

// ============= RECIPES ===============
export const getRecipes = () => axios.get('/recipes');
export const getMyRecipes = () => axios.get('/my-recipes');
export const getRecipeById = (id) => axios.get(`/recipes/${id}`);
export const createRecipe = (name, category_id) => axios.post('/recipes', { name, category_id });
export const updateRecipe = (id, name, category_id) => axios.put(`/recipes/${id}`, { name, category_id });
export const deleteRecipe = (id) => axios.delete(`/recipes/${id}`);

// ============= CATEGORIES ===============
export const getCategories = () => axios.get('/categories');
export const getCategoryById = (id) => axios.get(`/categories/${id}`);
export const createCategory = (name) => axios.post('/categories', { name });
export const updateCategory = (id, name) => axios.put(`/categories/${id}`, { name });
export const deleteCategory = (id) => axios.delete(`/categories/${id}`);