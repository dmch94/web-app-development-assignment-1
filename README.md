# SpotRun

SpotRun is a web application for recording running locations and tracking runs associated with each location. Users can create an account, sign in, manage saved locations, record runs, and upload images for locations.

## Features

- User creation, login, and logout
- User session authentication using Hapi cookies
- Personal dashboard displaying a user's own running locations

- Create and delete running locations
- Store running location name and location (latitude and longitude)
- Add and delete runs associated with an existing running location
- Record a run's title, distance, and duration
- Upload an image for created run locations using Cloudinary

- REST API for users, locations, and runs
- Validation using Joi schema
- Database implementation and persistence via MongoDB, with option for JSON and memory store
- API documentation support through Swagger

- Deployed webapp on Render, with option for local hosting 

## Technologies used

- **Runtime:** Node.js 
- **Server:** Hapi.js
- **Views:** Handlebars, Vision
- **Database:** MongoDB 
- **Validation:** Joi
- **Image storage:** Cloudinary and Hapi Inert
- **API documentation:** Swagger
- **Testing:** Mocha
- **Code quality:** ESLint and Prettier

## Requirements

Before running the application, install:

- Node.js `>=20 <24`
- npm
- MongoDB (local instance or MongoDB Compass/Atlas connection)
- A Cloudinary account for image uploads

## Using the Web App

### 1. Clone the repository

```bash
git clone https://github.com/dmch94/web-app-development-assignment-1
cd assignment-1
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure .env file

Create a `.env` file. Use `.env_example` as a reference:

```env
cookie_name=spotrun
cookie_password=COOKIE_ENCRYPTION_KEY_HERE_MUST_BE_32_CHARCTERS_OR_MORE
DOTENV_CONFIG_QUIET=true
#db=mongodb://localhost:27017/spotrun
cloudinary_name=
cloudinary_key=
cloudinary_secret=
db = 
```

### 4. Start MongoDB

Make sure your MongoDB server is running and that the `db` connection string in `.env` points to it.

### 5. Start the application

For normal use:

```bash
npm start
```

For development with nodemon automatic restarts:

```bash
npm run dev
```

View the web app at:

Render deployed
https://spotrun.onrender.com/

Local Host
http://localhost:3000

## API Documentation

The API Swagger documentation is available at: (when deployed on Render)
https://spotrun.onrender.com/documentation

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | Retrieve all users |
| POST | `/api/users` | Create a user |
| DELETE | `/api/users` | Delete all users |
| GET | `/api/users/{id}` | Retrieve a user by ID |
| POST | `/api/locations` | Create a location |
| GET | `/api/locations` | Retrieve all locations |
| GET | `/api/locations/{id}` | Retrieve a location by ID |
| DELETE | `/api/locations/{id}` | Delete a location by ID |
| DELETE | `/api/locations` | Delete all locations |
| GET | `/api/runs` | Retrieve all runs |
| GET | `/api/runs/{id}` | Retrieve a run by ID |
| POST | `/api/locations/{id}/runs` | Create a run for a location |
| DELETE | `/api/runs/{id}` | Delete a run by ID |
| DELETE | `/api/runs` | Delete all runs |


## Input data structures 

### User

| Field | Type | Description |
|---|---|---|
| `firstName` | String | User's first name |
| `lastName` | String | User's last name |
| `email` | String | User's email address |
| `password` | String | User's password |

```json
{
  "firstName": "Joe",
  "lastName": "Bloggs",
  "email": "joe@example.com",
  "password": "joe-password"
}
```


### Location

| Field | Type | Description |
|---|---|---|
| `title` | String | Location name |
| `latitude` | Number | Latitude coordinate |
| `longitude` | Number | Longitude coordinate |
| `userid` | ID | ID of the associated user |
| `runs` | Array | Runs associated with this location |
| `img` | String | Uploaded image URL, if available |

```json
{
  "title": "Phoenix Park",
  "latitude": 53.355,
  "longitude": -6.329
}
```


### Run

| Field | Type | Description |
|---|---|---|
| `title` | String | Run name |
| `distance` | Number | Recorded distance |
| `duration` | Number | Recorded duration |
| `locationid` | ID | Associated location ID |


```json
{
  "title": "Morning Run",
  "distance": 5,
  "duration": 30
}
```


## Available scripts

| Command | Description |
|---|---|
| `npm start` | Start the application |
| `npm run dev` | Start with Nodemon |
| `npm test` | Run all Mocha tests |
| `npm run testmodels` | Run model tests |
| `npm run testapi` | Run API tests |

## Database configuration

The database is selected in `src/server.js` through:

```js
db.init("mongo");
```

Other storage options are available:

- `mongo` — MongoDB stores
- `json` — JSON file stores
- Any other value — in-memory stores

The application uses MongoDB by default. 




