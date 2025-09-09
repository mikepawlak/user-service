# user-service
a user service project for Centivo 

## How to Run This Project

These instructions will help you get this project up and running locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or higher recommended)  
- [Docker](https://www.docker.com/) & Docker Compose (for running MongoDB locally)  
- Git (for cloning the repository)

---

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/mikepawlak/user-service.git
   cd user-service
    ```
2. **Install dependencies**

   ```bash
   cd user-service && npm i
   
3. **Spin up the project**

   ```bash
   npm run start:db && npm run start:api
    ```

## Usage
This project's mongoDB container includes a seed script that seeds the database with two users. A 30yo John Doe and a 19yo Jane Doe. You can manually hit the server with the following commands.

### Positive Case
```bash
curl http://localhost:3000/users/aaaaaaaaaaaaaaaaaaaaaaaa //John Doe
```


Expected output:
```json
{
    "_id":"aaaaaaaaaaaaaaaaaaaaaaaa",
    "name":"John Doe",
    "email":"johndoe@email.com",
    "age":30
}
```
### Negative case
```bash
curl http://localhost:3000/users/cccccccccccccccccccccccc //Jane Doe
```

Expected output:
```json
{
    "error":"Not found"
}
```
__NOTE:__ *in a real world project this would be something I want to clarify with the product owner, this could be a different server response and the "right fit" depends on the context this is being developed in. For the sake of the exercise I will be following the spec to the letter.*

## Test this project
This project contains end-to-end tests using Jest and Supertest. You can run the test suite with the following command

```bash
npm run test
```

Expected output:
```bash
> jest

PASS  tests/users.e2e.test.ts
GET /users/:id (age > 21 only)
    ✓ returns 200 + user when user is over 21 (30 ms)
    ✓ returns 404 when user exists but is under 22 (filtered out) (6 ms)
    ✓ returns 404 when not found (7 ms)
    ✓ returns 400 for invalid ObjectId (4 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        1.471 s, estimated 2 s
Ran all test suites.
```


__SOME NOTES__ 
- I used typescript and a `User` model in this project. I would recommend this practice for any CRUD node app. 

- This project ignores a lot of standard practices I would advocate for in a proper application. I have a full example of how I like to build software in [my portfolio](https://github.com/mikepawlak/portfolio-site#readme).