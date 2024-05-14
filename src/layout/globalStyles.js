import { css } from '@emotion/react';
const globalStyles = ({ theme, font }) => css`
  @import url('https://fonts.googleapis.com/css2?family=${font}:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap');

  * {
    font-family: ${font} !important;
  }

  main {
    transition:
      background-color 0.2s,
      color 0.2s,
      opacity 0.2s;
    background-color: ${theme === 'dark' ? 'black' : 'white'};
    color: ${theme === 'dark' ? 'white' : 'black'};
    min-height: 100vh;
  }

  .theme-switcher {
    transition:
      background-color 0.2s,
      color 0.2s,
      opacity 0.2s,
      box-shadow 0.2s;
    opacity: 0.8;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    margin: 1rem;
    padding: 0.5rem;
    border-radius: 50%;
    background-color: ${theme === 'dark'
      ? 'rgba(0, 0, 0, 0.9)'
      : 'rgba(255, 255, 255, 0.9)'};
    color: ${theme === 'dark' ? 'white' : 'black'};
    opacity: 1;
  }

  .theme-switcher:hover {
    box-shadow: 0 0 10px
      ${theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}; /* Black theme hover shadow */
  }

  .button {
    cursor: pointer;
    user-select: none;
  }

  .button:hover {
    background-color: ${theme === 'dark'
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(0, 0, 0, 0.2)'};
  }

  .button.active {
    background-color: ${theme === 'dark'
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(0, 0, 0, 0.2)'};
  }

  .custom-border {
    border-width: 1px;
    border-style: solid;
    border-color: ${theme === 'dark'
      ? 'rgba(255, 255, 255, 0.5)'
      : 'rgba(0, 0, 0, 0.5)'};
  }

  ${['top', 'left', 'right', 'bottom'].map((border_class) => {
    return `
      .custom-border-${border_class}{
        border-${border_class}: 1px solid ${
          theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
        }
      }
      `;
  })}

  .disabled {
    background-color: #ccc; /* Gray background color */
    background-color: ${theme === 'dark' ? '#444' : '#ccc'};
    color: ${theme === 'dark' ? '#888' : '#666'}; /* Darker gray text color */
    cursor: not-allowed; /* Change the cursor to "not allowed" style */
    opacity: 0.6; /* Reduce the opacity to visually indicate it's disabled */
    pointer-events: none;
  }

  .link {
    color: ${theme === 'dark' ? 'white' : 'black'};
  }
`;

export default globalStyles;
