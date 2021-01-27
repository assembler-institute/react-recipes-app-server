# Assembler School MERN Server

Server App for the MERN Seed Recipes App.

## Apps

- [Client App](https://github.com/assembler-school/mern-seed-recipes-client)
- [Server App](https://github.com/assembler-school/mern-seed-recipes-server)

## Getting Started

### Install Dependencies

Run `npm i` or `yarn` in the terminal to install the dependencies.

Then, run `npm run start` or `yarn start` to start up the app.

The app will be run by default in the following url: `http://localhost:4000/`

### Environment Variables

Create an `.env` file in the root of the project with the following entries:

- `MONGO_DB_URL_PRODUCTION`: URL of the MongoDB database in `production`
- `MONGO_DB_URL_DEVELOPMENT`: URL of the MongoDB database in `development`
- `MONGO_DB_URL_TEST`: URL of the MongoDB database in `test`
- `JWT_SECRET`: the secret to sign the jwt secrets
- `BCRYPT_SALT_ROUNDS`: Used to sign the passwords: number between 10 and 12

### Seed the Database

In the `index.js` file of the `server` folder you can find the following methods
to seed the database.

```js
await dropCollections();
await seed();
```

### Testing

To run the tests follow these instructions:

#### Instal mongodb

Make sure that [mongodb](https://www.mongodb.com/) is installed in your
computer. Read the official docs to get started.

- [docs](https://www.mongodb.com/try/download/community)

#### Run the Tests

In your terminal, run the `npm run test` or `npm test` npm scripts.

To run the tests using the watch mode use: `npm run test:watch`.

## Author

[Dani Lucaci](https://github.com/danilucaci).

## License

Licensed under the [MIT License](./LICENSE).
