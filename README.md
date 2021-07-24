# microservice-test

# Production server
Both mock and auth APIs are already in production. They were containerized via Docker and are running in an Ubuntu instance in AWS EC2.

Access the auth API via http://54.232.242.81:3001/. 

Access the mock API via http://54.232.242.81:3002/. 

API Docs are located in http://54.232.242.81:3001/api-docs and http://54.232.242.81:3002/api-docs.

# Local Server

## Option #1: Docker compose
### Run via docker compose:
``` 
docker-compose up
```
Environment variables  ``` MONGODB_URI```,``` TEST_MONGODB_URI```, ``` AUTH_PORT``` ,``` MOCK_PORT```, ``` SECRET```, ``` MAIL_USER```,``` MAIL_PASS``` in an .env file located at root is needed for this step.

## Option #2: Run via npm

### To run auth API: 
``` 
cd auth
npm install
npm run dev
```
Environment variables  ``` MONGODB_URI```, ``` AUTH_PORT``` , ``` SECRET```, ``` MAIL_USER```,``` MAIL_PASS``` in an .env file located at root is needed for this step.


### To run mock API:
``` 
cd mock
npm install
npm run dev
```
Environment variables  ``` MONGODB_URI``` , ``` TEST_MONGODB_URI``` , ``` MOCK_PORT``` , ``` SECRET``` in an .env file located at root is needed for this step.

## After running
Access the auth API via ```http://localhost:3001/```

Access the mock API via ```http://localhost:3002/```

# How to use the APIs:
1) Register your user using the mock API endpoint:  ```/api/users/register```
2) After registering, get your token using the auth API endpoint: ```/api/auth```. The token will be sent to the users e-mail and has an expiration time of 60 minutes.
3) After obtaining your token, you can use the following mock API endpoints:

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```GET``` ```/api/greaplaces/```

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```GET``` ```/api/greaplaces/{id}```

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```POST``` ```/api/greaplaces/```

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```PUT``` ```/api/greaplaces/{id}```

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```DELETE``` ```/api/greaplaces/{id}```
  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For more reference check the API docs located on ```/api-docs``` in both mock and auth APIs.

# Next steps to make the project better:
1) Use more 2FA authentications, such as SMS, Google Authenticator, etc.
2) Check if error handling could be better.
3) Do more unit tests.
4) Refactor to remove duplicate files that are used in both microservices (eg. users model)
5) Refactor the Swagger docs to document it better and use schemas




