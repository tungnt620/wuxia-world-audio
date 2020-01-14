const myAudioStatements = {
  // =============== BookV1 =======================
  'get_book_by_slug': 'select * from book where slug=$slug',
  'get_book_by_cat_id': `select * from book where id in (
          select book_id from book_cat where cat_id=$catID order by book_id desc limit $limit offset $offset
        )`,
  'get_book_by_cat_slug': `select * from book where id in (
          select book_id 
          from book_cat 
          where cat_id in ( select id from cat where slug=$catSlug)
          order by book_id desc limit $limit offset $offset
        )`,
  'search_book': `
          select b.id, bs.name, b.slug, b.img, b.created_at, b.updated_at from 
          (
            SELECT rowid, highlight(book_search, 0, '<b>', '</b>') name 
            FROM book_search WHERE book_search MATCH $matchExpressions ORDER BY rank limit $limit OFFSET $offset
          ) bs
          inner join book b on bs.rowid = b.id
        `,

  // =============== Cats =====================
  'get_cat_by_slug': `select * from cat where slug=$slug`,
  'get_cats': `select * from cat order by id limit $limit offset $offset`,
}

module.exports = {
  myAudioStatements
}
