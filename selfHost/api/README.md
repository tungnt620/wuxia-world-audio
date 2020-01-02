### Introduction
1. This project we use sqlite3, graphql, express
2. We have v1 written in Wordpress so we have a script for migrate data from v1 to v2
3. We use pm2 for deploy and run in production

### Database
- Migrate:
    - Install: ```yarn global add db-migrate```, ``` yarn global add db-migrate-sqlite3```
    - Create db: ```db-migrate db:create myAudio```

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
