# Home Library Service

## Steps to get started:
1. Download or clone the repository (dev branch)
2. Install dependencies with `npm i`
3. Create `.env` file _(./.env)_ and copy data from `.docker.env` or `.env.example`

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

Run all tests:
```
npm run test:auth
```
Run `refresh` tests :
```
npm run test:refresh
```

---
## Logging:
  
### .env variables
- `LOGGER_LEVEL` - log level selection
- `LOGGER_SIZE` - selection of file size for general logs
- `LOGGER_SIZE_ERROR` - selection of file size for error logs (level fatal and error)
- `LOGGER_MAX_FILES` - number of log files (specified for general logs and error logs, but used separately)

_for LOGGER_SIZE, LOGGER_SIZE_ERROR, LOGGER_MAX_FILES, refer to [winston-daily-rotate-file](https://www.npmjs.com/package/winston-daily-rotate-file#options) specification._


### Levels
The levels correspond to: `fatal: 0`, `error: 1`, `warn: 2`, `log: 3` _(`log` is equivalent to `info` and any value can be used)_, `debug: 4`, `verbose: 5`

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