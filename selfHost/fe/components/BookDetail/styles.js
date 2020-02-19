import css from 'styled-jsx/css'

/*language=SCSS*/
export default css`
  .book-detail {
    @media (max-width: 769px) {
      padding: 0 10px;
    }

    .book-highlight {
      .audio-player {
        margin-bottom: 20px;
      }

      .list-audio {
        background-color: #633d24;
        margin-bottom: 20px;
        border-radius: 5px;

        li {
          padding: 7px;
          cursor: pointer;

          :not(:first-child) {
            border-top: 1px solid #8e5733;
          }
        }
      }
    }

    .relative-books {
      margin-top: 20px;
    }
  }
`
