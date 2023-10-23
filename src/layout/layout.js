import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './layout.css';
import ThemeSwitcher from '../components/themeSwitcher';
import globalStyles from './globalStyles';
import { Global } from '@emotion/react';
import pageData from '../personalization/site.json';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const theme = useSelector((state) => state.theme.value);
  return (
    <>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="description" content={pageData['siteDescription:']} />
          <title>{pageData['siteName']}</title>
        </head>
        <body>
          <Global
            styles={globalStyles({ theme: theme, font: pageData.googleFont })}
          />
          <main>
            <div
              className="container d-flex flex-column align-items-center pt-5"
              style={{ minHeight: '100vh' }}
            >
              {children}
              <div className="w-100 p-3 flex-grow-1 d-flex align-items-end justify-content-center opacity-75">
                <small>{pageData['footerText']}</small>
              </div>
              <ThemeSwitcher theme={theme} />
            </div>
          </main>
        </body>
      </html>
    </>
  );
};

export default Layout;
