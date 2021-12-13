## What's Your Question

This is an application where you can ask your classmates the darkest questions and get the funniest answers.

### Technologies

- NodeJS
- ExpressJS
- PostgreSQL
- nodemon
- pg
- dotenv
- cors
- prettier
- eslint
- husky

### Running locally

1. Clone this repo

```sh
git clone https://github.com/Deltinha/what-s-your-question
```

2. Install dependencies

```sh
npm install
```

3. Navigate to the repository folder and run the following commands to create a database

```ssh
sudo -u postgres createdb -T template0 whats_your_question

sudo -u postgres psql whats_your_question < 'db.sql'
```

3. Create a new file called `.env` in the root folder using `.env-example` as template. Feed the newly created file with the info of your database.
4. To run in development mode

```sh
npm run dev
```

### Documentation

**POST** `/questions`

You can send a question by using this endpoint. The body contents should be a JSON object following the example below.

```json
{
	"question": "Why do you spell dark with a 'k' and not a 'c'?",
	"student": "Delta",
	"class": "T3",
	"tags": "grammar, english"
}
```

You will get in response the id of the created question.

```json
{
	"id": 1221
}
```

**POST** `/questions/:id`

You can answer a question by using this endpoint. The authorization header must be a **bearer token**.

```json
{
	"answer": "Because you can't see in the dark" 
}
```

**GET** `/questions/:id`

You can get  specific question by using this endpoint. The response can have two formats.

Unanswered question.

```json
{
	"question": "What’s an algorithm?",
	"student": "Delta",
	"class": "T3",
	"tags": "coding, tech"
	"answered": false,
	"submitAt": "2021-12-12 12:21"
}
```

Answered question.

```json
{	
	"question": "Why do you spell dark with a 'k' and not a 'c'?",
	"student": "Deltinha",
	"class": "T3",
	"tags": "grammar, english"
	"answered": true,
	"submitAt": "2021-01-01 10:01"
	"answeredAt": "2021-01-01 10:10"
	"answeredBy": "Star",
	"answer": "Because you can't see in the dark" 
}
```

**GET** `/questions`

You can get all the unanswered questions by using this endpoint.

```json
[
    {
	"question": "What’s an algorithm?",
	"student": "Delta",
	"class": "T3",
	"tags": "coding, tech"
	"answered": false,
	"submitAt": "2021-12-12 12:21"
	}
    ...
]
```

**POST** `/users`

You can get register a user by using this endpoint.

```jso
{
	"name": "Wye",
	"class": "T3" 
}
```

You will get in response a token which should be used to register new questions.

```json
{
	"token": "a404c6bd-cda3-4ddc-9569-e2361f8f8a72"
}
```
