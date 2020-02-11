/*
Explain for ```content='book'``` in create book_search
It mean we can use other columns of book in table book_search ( not only  name) - it mapping base on content_rowid
https://www.sqlite.org/fts5.html#external_content_and_contentless_tables
*/

CREATE VIRTUAL TABLE book_search USING fts5(name, tokenize = 'unicode61 remove_diacritics 2', content='book', content_rowid='id');

CREATE TRIGGER book_ai AFTER INSERT ON book BEGIN
  INSERT INTO book_search(rowid, name) VALUES (new.id, new.name);
END;
CREATE TRIGGER book_ad AFTER DELETE ON book BEGIN
  INSERT INTO book_search(book_search, rowid, name) VALUES('delete', old.id, old.name);
END;
CREATE TRIGGER book_au AFTER UPDATE ON book BEGIN
  INSERT INTO book_search(book_search, rowid, name) VALUES('delete', old.id, old.name);
  INSERT INTO book_search(rowid, name) VALUES (new.id, new.name);
END;
