### Introduction
1. This project we use sqlite3, graphql, express
2. We have v1 written in Wordpress so we have a script for migrate data from v1 to v2
3. We use pm2 for deploy and run in production

### Migrate database from v1 to v2
1. Migrate data
```bash
cd _migrations && node initDbToSqlite.js
```
2. Keep current upload file like ```https://confession.vn/wp-content/uploads/2018/01/neuconfessions.jpg``` 
   May we still keep this folder and have custom nginx rule
   Current upload file just work on 1 server, it not store on dedicate static server 

### Development
```bash
 pm2 start ecosystem.config.js --watch
 pm2 logs
 pm2 reload ecosystem.config.js --watch # when have change in ecosystem file
```
- Rules:
  - Write code simple as possible. Simple code easy for maintenance
### Deploy:
```bash
 pm2 deploy production setup    # first time
 pm2 deploy production update
```

### TODO:
1. Add column author to table confession ( may it is username) and make index for it
2. Add table users like confession
3. Escape special character when create confession


### Active WebStorm
- Guide http://www.corehackers.tk/
