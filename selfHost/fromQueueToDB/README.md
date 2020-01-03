
### Development
```bash
 pm2 start ecosystem.config.js --watch
 pm2 logs
 pm2 reload ecosystem.config.js --watch # when have change in ecosystem file
```

### Deploy:
```bash
 pm2 deploy production setup    # first time
 pm2 deploy production update
```
