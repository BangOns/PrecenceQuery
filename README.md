# Precence with Next JS and React query

This website aims to carry out Web-based student attendance to make it easier for lecturers or teachers to check student attendance

## Features

- Auth(Login ,Logout ,Register)
- Role at Student and Admin
- CRUD
- Check attendance in tabular form

## Tech Stack

- Next Js
- React-Query
- Axios
- json-server

## Open Source

first take the code from github

```bash
 git clone https://github.com/BangOns/PrecenceQuery.git
```

Installation depedencies

```bash
npm i
```

Install json server if you don't have it on your device yet

```bash
npm install -g json-server
```

or documentation https://github.com/typicode/json-server

## Databese local

Create your Database local with db.json outside the app folder ,
the contents of the database :

```bash
{
  "users": [
    {
      "id": "b7b5a1d1-c2f7-4360-8362-5e28f26420dd",
      "nama": "JhonDoe",
      "semester": "2",
      "password": "12345",
      "date": "Senin",
      "role": "user"
    },
    {
      "id": "b7b5a1d1-c2f7-4360-8362-5e28f26420dd",
      "nama": "AdminJhonDoe",
      "semester": "0",
      "password": "12345",
      "date": "Senin",
      "role": "admin"
    }
  ],
  "displayuser": []
}
```

## Demo

to run this web you need 2 terminals

#### Terminal 1

Running to get database local

```bash
json-server -w db.json -p 5000
```

#### Terminal 2

Running Website

```bash
npm run dev
```

## Feedback

If you have any feedback, please reach out to my Email [Syahroni](syahr9950@gmail.com)

## Authors

[@Syahroni](https://github.com/BangOns)
