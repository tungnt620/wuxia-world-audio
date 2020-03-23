### Development
```bash
 pm2 start ecosystem.config.js --watch
 pm2 logs
 pm2 reload ecosystem.config.js --watch # when have change in ecosystem file
```

* Note
- Add redis key `convert_audio_config`

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
