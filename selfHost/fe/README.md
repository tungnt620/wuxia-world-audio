# Confession v2


## Libs
### Relative import
- Use ```babel-plugin-root-import```

### Import css of ant mobile design
- Use plugin ```babel-plugin-import``` and config in .bablerc file  

### Use proposal feature nullish Coalescing for JavaScript
- Add babel plugin ```@babel/plugin-proposal-nullish-coalescing-operator```  ```.balbelrc``` file

### Use proposal feature optional chaining for JavaScript
- Add babel plugin ```@babel/plugin-proposal-optional-chaining```  ```.balbelrc``` file

### Ant design modularity import
- Use plugin ```babel-plugin-import``` and config in ```.babelrc``` file

## Run
- Start in local dev
```bash
node server.js
```


## Deploy
- Install pm2:
```bash
yarn global add pm2
pm2 completion install
```
### Run as node app use PM2
- Deploy
```bash
pm2 deploy production update
```

- Start pm2 at reboot
```bash
pm2 startup
```

- Save this app to auto start when reboot
```bash
pm2 save
```
- Other
```bash
# stop the process (kill the process but keep it in the process list)
pm2 stop bid-game-fe

# start the process
pm2 start bid-game-fe

# both stop and start
pm2 restart bid-game-fe
```
- View logs:
  - Access your logs in realtime
```bash
pm2 logs bid-game-fe
```
  - Consult your logs history files in the ```~/.pm2/logs``` folder.
