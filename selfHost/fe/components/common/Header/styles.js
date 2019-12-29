import css from 'styled-jsx/css'

/*language=SCSS*/
export default css`
  .header {
    max-width: 1200px;
    margin: 0 auto;
    
    .navbar-brand {
      font-size: 30px;
      font-weight: 600;
    }
    
    .navbar-menu {
      justify-content: flex-end;
      
      .navbar-start {
        margin-right: 0;
      }
    }
  }
`
