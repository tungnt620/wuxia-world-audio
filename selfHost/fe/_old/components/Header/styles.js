import css from 'styled-jsx/css'

/*language=SCSS*/
export default css`
  .site-header {
    text-align: center;
    margin-top: 50px;
    
    .title-container {

      .site-title {
        font-family: 'Satisfy', 'Open Sans', 'sans-serif';
        font-size: 1.75em;
        line-height: 1.321;
      }

      .tagline {
        margin: 0;
        font-size: 0.75rem;
      }

      @media (min-width: 62.5em) {
        .site-title {
          font-size: 3.1875em;
          line-height: 1.176;
        }

        .tagline {
          margin: 1em 0 0 0;
        }
      }

      @media (min-width: 50em) {
        .site-title {
          font-size: 2.3125em;
          line-height: 1.297;
        }
      }
    }
  }
  
  
`
