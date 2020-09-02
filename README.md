# Web Server


## how to start the app for development

```javascript
nodemon ./src/server.js -e js,hbs
```

```bash
ssh-keygen -t rsa -b 4096 -C "email.com"
```

- `t` algorithm
- `b` bits
- `C` comment


## prints out if the agent is running

```bash
eval "$(ssh-agent -s)"
```

## add the key to active use with the agent

```bash
ssh-add -K ~/.ssh/id_rsa
```