
- Migrate:
    - Install: `yarn global add db-migrate`, ` yarn global add db-migrate-sqlite3`
    - Create db: `db-migrate db:create myAudio`
    - Create a migration: `db-migrate create add-full-text-search`
    - Apply a migration: `db-migrate up -c 1` up latest 1 migration
    - Rollback a migration: `db-migrate down -c 1` down latest 1 migration
