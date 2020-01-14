import css from 'styled-jsx/css'
import fullLabel from '../../../../assets/images/full-label.png'
/*language=SCSS*/
export default css`
  .book-v1 {
    position: relative;
    
    .name {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      
      margin-top: 2px;
      text-align: center;
      font-size: 0.8em;
      
      background-color: rgba(0, 0, 0, 0.6);
      padding: 2px 0;
      text-shadow: 1px 2px 2px #000;
      color: #fff;

      @media screen and (min-width: 769px) {
        padding: 5px 0;
        font-size: 0.9em;
      }
    }
    
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
  }
`
