# Home Library Service

## Steps to get started:
1. Download or clone the repository (dev branch)
2. Install dependencies with `npm i`
3. Create `.env` file _(./.env)_ and copy data from `.env.example`

### Running with Docker

1. Install and run [Docker](https://docs.docker.com/engine/install/)  
2. Execute command `docker-compose up --build` or commands `docker-compose build` and `docker-compose up` sequentially.

_Note: Restarting Nest when code changes take about 1 minute (Windows 10, CPU Intel i7-8700, 32GB RAM)."_

### Running without Docker
_If you haven't encountered any issues with Docker, you can skip this step_

1. Install [Postgres](https://www.postgresql.org/download/)
2. Create a database with name `rs-node-2024q1-nest` (use PostgreSQL 16).
3. Apply migrations `npm run migration:update`
4. Start the server `npm start`


---
## Checks for Docker
- The images take up 486MB (application 247MB, PostgreSQL 239MB) [(screenshot)](http://dl4.joxi.net/drive/2024/03/16/0002/2748/133820/20/1f36955d57.jpg) `docker image ls`
- Application image on [hub.docker](https://hub.docker.com/layers/alexanderpriteev/nodejs2024q1-service/latest/images/sha256-a95a4a2a0bb7b1c71f0a893240e10fdc48010dcb83177e036b3229ff4a5bade1?context=repo) 
- You can initiate the scanning `npm run scan` _(if your image name is nodejs2024q1-service-app)_ or `npm run scan:name -- YOUR_IMAGE_NAME` [(scan log screenshot)](http://dl3.joxi.net/drive/2024/03/16/0002/2748/133820/20/e2392b49b7.jpg)  
*During the scan, please follow the provided link and authenticate on the Snyk website _(sometimes the resource may be unavailable [(screenshot)](http://dl4.joxi.net/drive/2024/03/16/0002/2748/133820/20/db24eaf0c8.jpg), in which case the link will redirect you to the current status of the resource. Please retry when the resource becomes available again)."
---

## Testing:

Run the tests required for the current task [(REST Service)](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md):
```
npm run test:service
```

Run all tests:
```
npm run test
```

---

## Documentation:
You can view the documentation in **Swagger** at route `/api/docs`. 
```
 http://localhost:{PORT}/api/docs or http://127.0.0.1:{PORT}/api/docs
```
_By default, it's `http://localhost:4000/api/docs` or `http://127.0.0.1:4000/api/docs`_  

---

## Format:
```
npm run lint
```