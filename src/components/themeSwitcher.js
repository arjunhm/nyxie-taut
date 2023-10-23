import React from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';

function ThemeSwitcher({ theme }) {
  const dispatch = useDispatch();

  function switchTheme() {
    dispatch(toggleTheme());
  }

  return (
    <div className="theme-switcher" onClick={switchTheme}>
      {theme === 'dark' ? <BsSun size={25} /> : <BsMoon size={25} />}
    </div>
  );
}

export default ThemeSwitcher;
