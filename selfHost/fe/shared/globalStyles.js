import css from 'styled-jsx/css'

/*language=SCSS*/
export default css.global`
  @font-face {
    font-family: 'Satisfy', 'Open Sans', 'sans-serif';
    font-display: optional;
    src: url(https://fonts.googleapis.com/css?family=Open+Sans%3A400%2C700%7CSatisfy&#038;subset=latin%2Clatin-ext&#038;ver=4.9.7);
  }
  
  a {
    color: #333333;
    text-decoration: none;
    -webkit-transition: color 0.1s ease-in-out, background 0.1s ease-in-out;
    transition: color 0.1s ease-in-out, background 0.1s ease-in-out;
  }

  a:link, a:visited {
    color: #333333;
  }

  body {
    overflow-anchor: none;
  }

  .main-content {
    max-width: 800px;
    float: left;
    margin: 0 0 50px 0;
    
    .cat-name {
      margin: auto auto 10px;
      width: 96%;
    }
  }

  .right-sidebar {
    max-width: 400px;
    float: left;
    padding: 0 0 0 50px;
  }

  .new-version {
    margin: 30px 5px;
    text-align: center;
    
    .google-form {
      width: 100%;
    }
  }

  @media only screen and (max-width: 1000px) {
    .main-content {
      max-width: 100%;
    }

    .right-sidebar {
      max-width: 100%;
      float: left;
      padding: 0 0 50px 3%;
    }
  }


`
