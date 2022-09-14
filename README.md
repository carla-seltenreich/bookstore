# Bookstore

## Clonar repositório

```
git clone git@github.com:carla-seltenreich/bookstore.git
```

## Env
Copie o arquivo .env.example

```sh
cp .env.example .env
```

## Node modules

```
npm install
```
## Executar servidor

```
npm run serve
```

## Run app on server
```
pm2 start npm --name "livraria" -- run serve-prod
```
