import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const themes = {
  winter: 'winter',
  dracula: 'dracula'
};
const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
};
const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || themes.winter;
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage()
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      //after login user property will be occupied
      console.log('login action ', action);
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logoutUser: state => {
      //after logout user property will be null
      //navlinks checkout and orders will not shown
      state.user = null; //used in header-navlink
      localStorage.removeItem('user');
      toast.success('logged out successfully');
    },
    toggleTheme: state => {
      const { dracula, winter } = themes;
      state.theme = state.theme === dracula ? winter : dracula;
      //here we just set theme
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme);
    }
  }
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;

//if the logout user is null then  header will show the signin else  logout
/*for theme 
1. we initially set the value from either from localstorage or programaticallt 
2.toggling we programattincaly cahnge the value in the dom */
