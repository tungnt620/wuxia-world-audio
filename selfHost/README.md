### Envs
- Almost we use pm2 for dev and live, we keep secret env in file `ecosystem.config.js` and ignored it from git


### Overral
- Current we use better-sqlite3, I think their method is sync so it will slow in case cpu not enough strength, maybe have
try with async sqlite package
