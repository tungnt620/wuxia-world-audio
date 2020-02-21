Deploy:

- Step 1:
    - copy file ecosystem.config.js to every project (it contain param for pm2 run)
- Step 2:
    - Create database
    - For db-migrate-sqlite3 maybe install locally if install global not success
- Steps 3:
    - pm2 deploy production setup (only for first project)
    - pm2 deploy production update

Add https:
 - Follow guide at https://www.digitalocean.com/community/tutorials/how-to-set-up-let-s-encrypt-with-nginx-server-blocks-on-ubuntu-16-04
