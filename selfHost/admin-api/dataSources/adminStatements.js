const adminStatements = {
  'get_value_from_key': 'select * from key_value where key=$key',
  'save_key_value': 'replace into key_value(key, value) values($key, $value)',
  'get_book_by_id': 'select * from book where id=$id',
  'get_book': 'select * from book where source=$source and source_id=$source_id',
  'get_books': `
select *, (select count(*) from book_chapter where book_id=book.id) as total_chapter,
(
    select count(*) from chapter where id in ( select chapter_id from book_chapter where book_id=book.id)  and audio is not null
) as num_audio
 from book
 order by id asc limit $limit offset $offset
`,
  'get_total_book': `select count(*) from book`,
  'insert_book': 'insert into book (name, slug, source, source_id, created_at, updated_at) values($name, $slug, $source, $source_id, $created_at, $updated_at)',
  'insert_author': 'insert into author (name, slug, created_at, updated_at) values($name, $slug, $created_at, $updated_at)',
  'get_author_by_name': 'select * from author where name=$name',
  'insert_cat': 'insert into cat (name, slug, created_at, updated_at) values($name, $slug, $created_at, $updated_at)',
  'get_cat_by_name': 'select * from cat where name=$name',
  'insert_if_not_exist_book_author': 'insert OR IGNORE into book_author (book_id, author_id) values ($book_id, $author_id)',
  'insert_if_not_exist_book_chapter': 'insert OR IGNORE into book_chapter (book_id, chapter_id) values ($book_id, $chapter_id)',
  'insert_if_not_exist_book_cat': 'insert OR IGNORE into book_cat (book_id, cat_id) values ($book_id, $cat_id)',
  'get_chapter': 'select * from chapter where order_no=$order_no and id in ( select chapter_id from book_chapter where book_id=$book_id)',
  'get_chapter_by_id': 'select * from chapter where id=$id',
  'get_chapters_by_ids': 'select * from chapter where id in ($ids)',
  'get_chapters': `select * from chapter where id in (select chapter_id from book_chapter where book_id=$bookID) order by id desc limit $limit offset $offset`,
  'get_total_chapter': `select count(*) from chapter where id in (select chapter_id from book_chapter where book_id=$bookID)`,
  'insert_chapter': 'insert into chapter (order_no, name, slug, text, created_at, updated_at) values ($order_no, $name, $slug, $text, $created_at, $updated_at)',
  'delete_book_chapter_relationship': 'delete from book_chapter where book_id=$book_id and chapter_id=$chapter_id',
  'delete_chapter_by_id': 'delete from chapter where id=$id',
}

module.exports = adminStatements
