import css from 'styled-jsx/css'

/*language=SCSS*/
export default css`
  .book-detail-chapters {
    .chapter {
      &.selected {
        background-color: #7a7a7a;
      }
    }

    .modal {
      z-index: 10001;

      .modal-content {
        @media screen and (min-width: 769px) {
          max-width: calc(100vw - 120px);
        }
        
        .box {
          white-space: pre-line;
        }
      }
    }
  }
`
