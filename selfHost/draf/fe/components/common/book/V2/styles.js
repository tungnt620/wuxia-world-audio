import css from 'styled-jsx/css'
import fullLabel from '../../../../assets/images/full-label.png'
/*language=SCSS*/
export default css`
  .book-v2 {
    position: relative;
    
    .full-label {
      position: absolute;
      width: 34px;
      height: 50px;
      display: block;
      margin: 0 0 0 -5px;
      z-index: 1;
      background: url('${fullLabel}') no-repeat;
      top: 0;
      background-size: 80% 80%;
    }
    
    .card-content {
      padding: 3px 2px;
      text-align: center;
      font-size: 0.8em;
      font-family: 'Roboto Condensed',Tahoma,sans-serif;
      
      @media screen and (min-width: 769px) {
        font-size: 1em;
      }
      
      .name {
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
      }
    }
    
    .card-footer {
      display: flex;
      justify-content: center;
      border-top: 0;
      padding: 0 0 5px 0;
         
      button {
        font-size: 0.9em; 
        
        @media screen and (min-width: 769px) {
          font-size: 1em;
        }
      }
      
    }
  }
`
