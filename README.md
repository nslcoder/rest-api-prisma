# Basic REST API in Prisma with Postgres, Node.js and Express 

It's a simple CRUD API built using Prisma with Postgres, Node.js and Express. It follows the REST architecture.

## What I Learned:

- How to use Prisma
- How to create schema and define models
- How to create, read, update and delete users and posts

## Endpoints:

HTTP Method | URL | Description
--- | --- | ---
POST | `/users` | Create a user
GET | `/users` | Get all the users
POST | `/posts` | Create a post
GET | `/posts` | Get all the posts
PUT | `/users/:id` | Update a user by its id
PUT | `/posts/:id` | Update a post by its id
DELETE | `/posts/:id` | Delete a post by its id
DELETE | `/users/:id` | Delete a user by its id

## How to Install and Run:

1. Clone the repo:
	
		git clone https://github.com/nslcoder/rest-api-prisma
	
2. Go inside the local copy:
	
		cd rest-api-prisma
	
3. Install the dependencies:
	
		npm install
	
4. Create a `.env` file and set the `DATABASE_URL` environment variable using  your Postgres username &  password and new database name:
	
		DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
	
5. Create a Postgres database:
	
		npx prisma migrate dev
	
6. Start the server:
	
		node index.js
	
## License
This project uses [the MIT License](https://github.com/nslcoder/basic-crud-api/blob/main/LICENSE.md).	