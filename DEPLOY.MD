# Deployment Notes


## create ssh key for source control

```bash
ssh-keygen -t rsa -b 4096 -C "email.com"
```

- `t` algorithm
- `b` bits
- `C` comment

## prints out if the ssh-agent is running

```bash
eval "$(ssh-agent -s)"
```

## add the key to active use with the agent

```bash
ssh-add -K ~/.ssh/id_rsa
```

## test if github will authenticate with your ssh key

```bash
ssh -T git@github.com
```

## push your ssh key to heroku account

```bash
heroku keys:add
```

## create heroku app

```bash
heroku create mcneill-weather-app
```

## push code to heroku

```bash
git push heroku master
```