# Express Mongoose Sejuta Cita

## Diagram Flow

```bash
user - rest api - database mongodb
```

## How To Run
- copy .env.example to .env
- edit db host, database, secret and refresh token secret in .env, example:
```bash
PORT=8000

DB_HOST=mongo
DB_PORT=27017
DB_DATABASE=learn_mongo
SECRET=rahasia2021
REFRESH_TOKEN_SECRET=lele2021
```
- docker-compose up -d and now you can access in http://localhost:8000

## seed Admin and dummy user
- docker exec -it (container api node id) sh
- npx md-seed run

## Credential Admin and Dummy user
```bash
Admin
username: admin
password: 1q2w3e

User
username: dummy
password: 1q2w3e
```

## Postman for documentation
you can import collection postman in folder postman


