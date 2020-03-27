const statements = {
  // =============== BookV1 =======================
  get_book_by_id_and_slug: "select * from book where id=$id and slug=$slug",
  get_books: `select * from book order by id desc limit $limit offset $offset`,
  get_books_by_cat_id_and_cat_slug: `
            select * from book where is_public=1 and id in (
                select book_id from book_cat 
                where cat_id in ( select id from cat where id=$catID and slug=$catSlug )
                order by book_id desc 
                limit $limit offset $offset
        )`,
  get_relative_books_by_book_id: `
                SELECT * 
                FROM book
                where is_public=1
                LIMIT $limit 
                OFFSET ABS(RANDOM()) % MAX((SELECT COUNT(*) FROM book), 1)
    `,
  get_books_by_cat_id: `
            select * from book where is_pubic=1 and id in (
                select book_id from book_cat 
                where cat_id=$catID
                order by book_id desc 
                limit $limit offset $offset
            )`,
  get_books_by_author_id: `
            select * from book where is_public=1 and id in (
                select book_id from book_author 
                where author_id=$authorID
                order by book_id desc 
                limit $limit offset $offset
            )`,
  search_book: `
          select b.id, bs.name, b.slug, b.img, b.created_at, b.updated_at from 
          (
            SELECT rowid, highlight(book_search, 0, '<b>', '</b>') name 
            FROM book_search WHERE book_search MATCH $matchExpressions ORDER BY rank limit $limit OFFSET $offset
          ) bs
          inner join book b on bs.rowid = b.id
          where b.is_public=1
        `,
  get_total_book_by_cat_id: `
                select count(*) from book_cat 
                where cat_id=$catID
  `,
  get_total_book_by_author_id: `
                select count(*) from book_author
                where author_id=$authorID
  `,
  // =============== Cats =====================
  get_cat_by_id_and_slug: `select * from cat where id=$id and slug=$slug`,
  get_cats: `select * from cat order by id limit $limit offset $offset`,
  get_cats_by_book_id: `
               select * from cat where id in (
                    select cat_id from book_cat 
                    where book_id=$bookID
               )
  `,

  // =============== Authors ====================
  get_author_by_id_and_slug: `select * from author where id=$id and slug=$slug`,
  get_authors: `select * from author order by id limit $limit offset $offset`,
  get_author_by_book_id: `
                select * from author where id in (
                    select author_id from book_author 
                    where book_id=$bookID
                )`,

  // ============== Chapters ===================
  get_chapters_by_book_id: `
                select * from chapter where id in (
                    select chapter_id from book_chapter 
                    where book_id=$bookID
                    limit $limit offset $offset
                )
                order by order_no asc
  `,
  get_chapter_by_book_id_and_order_no: `
                select * from chapter where id in (
                    select chapter_id from book_chapter 
                    where book_id=$bookID
                ) and order_no = $orderNo
                order by order_no asc
  `,
  get_total_chapter_by_book_id: `
                select count(*) from book_chapter 
                where book_id=$bookID
  `
};

module.exports = {
  statements
};
