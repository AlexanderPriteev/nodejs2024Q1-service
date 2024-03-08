# Home Library Service

#### Steps to get started:
1. Download or clone the repository (dev branch)
2. Install dependencies with `npm i`
3. Create `.env` file _(./.env)_ and set the value to `PORT=4000` _(or any other port you need)_
4. Start the server `npm start`

---

#### Testing:

Run the tests required for the current task [(REST Service)](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md):
```
npm run test:service
```

Run all tests:
```
npm run test
```

---

#### Documentation:
You can view the documentation in **Swagger** at route `/api/docs`. 
```
 http://localhost:{PORT}/api/docs or http://127.0.0.1:{PORT}/api/docs
```
_By default, it's `http://localhost:4000/api/docs` or `http://127.0.0.1:4000/api/docs`_  

---

### Format:
```
npm run lint
```