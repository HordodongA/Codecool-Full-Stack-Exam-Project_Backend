# Landlord - maintenance assistant webapplication - Backend
Simple API for Landlord maintenance assistant webapplication. The API based on REST software architecture style. It accepts JSON-encoded request bodies and returns JSON-encoded responses. It handles user management with OpenId standards, and uses NoSQL database to store user's data.  
The project is built for serving the "Landlord - maintenance assistant webapplication - Frontend" application. 

**Major technologies used for building this project:** NodeJS, Express JS, TypeScrypt, Mongoose (MongoDB noSQL database), Jest with Supertest, Swagger. For registration and login it uses OpenId standards and Google account. See full dependencies in package.json file. Project uses stateless session management with JSON web tokens.


## Table of Contents
- [About](#about)
- [Getting Started](#getting-started)
- [Available scripts](#available-scripts)
- [Usage](#usage)
- [Links and resources](#links-and-resources)
- [License](#license)


## About
This application has come to life as a full-stack software developer school's exam project. It aims to help in the maintenance of various properties, such as flats, houses, premises, vehicles, and so on, by helping to collect information and todo lists in one place. In the first milestone, two modules were built: Activities and Machines. Planned future milestones will contain further modules, such as cleaning, inspections, inventory, administration and billing, animal and plant maintenance.


## Getting started
### Third party authentication, database and environmental variables
#### Register app on Google Developer Console
For the OpenId signup and login processes application needs to be registered on Google Developer Console. The received credentials has to be saved into environmental variable(s) as seen below. [See tutorial.](https://breadbutter.io/how-to-set-up-google-openid-connect/)
- Scopes needed:  _.../auth/userinfo.email,  .../auth/userinfo.profile,  openid_  
- It's important that Google Dev Console credentials, backend's environmental variables and frontend's config.ts file all contains the same values.
#### Set up a MoongoDB database
It can be locally, using MongoDB Compass desktop application, or can be online via MongoDB Atlas. Set connection string as environmental variable (see below).  
- [Compass tutorial](https://www.mongodb.com/docs/compass/current/databases/)  
- [MongoDB Atlas tutorial](https://www.mongodb.com/basics/mongodb-atlas-tutorial)  
#### Set environmental variables
Before use the application, required to set the following environmental variables.  
If app runs locally put all into a .env file in the root directory.  
(If app runs in a Docker container please check next section as well.)  

| Key             | Value                                                                                                            |
| :---            | :---                                                                                                             |
| PORT            | Defines the port that the application listens.                                                                   |
| SERVER_ADDRESS  | Just a note, application not using it. Don't delete field and value, it ruins the validation.                    |
| CLIENT_ID       | A Google credential that given as a part of the Dev Console registration process.                                |
| CLIENT_SECRET   | A Google credential that given as a part of the Dev Console registration process.                                |
| REDIRECT_URI    | A Google credential that need to be set as a part of the registration process.                                    |
| JWT_SECRET_KEY  | Required for the signing process of json web tokens. Could be any string, but suggested to be a 256 bit string.  |
| MONGO_DB_URL    | MongoDB database connection string.                                                                              |

### At this point you have two ways to continue: Running app in a Docker container or installing it:
### Use Docker image file
The backend application will running here: http://localhost:3003/  
It's important that Google Dev Console credentials, backend's environmental variables and frontend's src/config.ts file all contains the same values.  
#### Method #1: Using .env file
Use this command to download and run Docker image file mapped to the port 3003. The .env file is necessary at the workdir. See previous section.  
```
$  docker run -d -p 3003:3003  --env-file .env hordodonga/landlord-backend:1.0
```
#### Method #2: Set environmental variables in command below
Use this command to download and run Docker image file mapped to the port 3003.  
```
$  docker run -d -p 3003:3003 \
-e "PORT=3003" \
-e "SERVER_ADDRESS=http://localhost:3003" \
-e "CLIENT_ID=<google_app_id>" \
-e "CLIENT_SECRET=<google_app_secret>" \
-e "REDIRECT_URI=http://localhost:5173/callback" \
-e "JWT_SECRET_KEY=<jwt_secret_key>" \
-e "MONGO_DB_URL=<mongodb_url>" \
 hordodonga/landlord-backend:1.0
```

### Install app
**The project's backend part is runnable by cloning the repository and follow this steps.**
#### Clone repository
```
$ git clone https://github.com/HordodongA/Codecool-Full-Stack-Exam-Project_Backend.git
```
#### Install Node JS and Node Package Manager on your computer necessary
#### Install project's dependencies (root directory)
Install with [npm.](https://www.npmjs.com/)
```
$ npm install
```
It will install all dependencies collected in package.json file.  


**If you walked along all above steps, the application is ready to use. See scripts below.**


## Available Scripts
**In the project directory, you can run:**
### `npm run dev`
Starts te application in developer mode.
### `npm run build`
Builds the app for production to the `dist` folder.
### `npm run start`
Starts te builded application. (The npm run build command has to be executed before.)
### `npm test`
Runs all of the defined tests with Jest and Supertest. The results will seen on the console.


## Usage
A few minutes after server application is started either by `npm start` or `npm run dev`, the console prints the following messages:  
```
⚡️ Landlord Server is running at http://localhost:3003  
📀 Landlord Database is connected  
```
It means that the server is ready to use.  
In case of errors, the server uses the console to indicate them, and also send appropriate responses to the client side.  
#### OpenAPI 3.0 (Swagger) documentation
There is an api documentation in the root of the repository and it is served too by the server at _"/api/docs"_ endpoint.  
If it needs to be updated or corrected, there is need to save the new version in json and yaml formats and with the same name and place.


## Links and resources
* [Wireframe (Figma)](https://www.figma.com/file/TWU5SGmZQ5tDEllSZ4iMpx/HdA_Exam-Project_Wireframe_1.1?node-id=0%3A1&t=JJKIYxl5MBnpcDVP-1)  
* [GitHub repository backend](https://github.com/HordodongA/Codecool-Full-Stack-Exam-Project_Backend)  
* [GitHub repository frontend](https://github.com/HordodongA/Codecool-Full-Stack-Exam-Project_Frontend)  
* OpenAPI 3.0 documentation displayed by Swagger UI can be found at servers _"/api/docs"_ endpoint and in root directory of repository.
* The [Figma wireframe](https://www.figma.com/file/TWU5SGmZQ5tDEllSZ4iMpx/HdA_Exam-Project_Wireframe_1.2.1?type=design&node-id=0%3A1&t=1XVm9Be3pQidybrb-1) in the root of the repository contains the basic design of the application and was made alongside the user stories.  


## License
This project is licensed under the [MIT License.](https://choosealicense.com/licenses/mit/)  

LANDLORD webapplication - Backend part  
Codecool Fullstack API developer exam project 2023  
Author: Gabor Neubauer