# streck6 [![KarlssonLucas](https://circleci.com/gh/KarlssonLucas/streck6.svg?style=shield)](https://github.com/KarlssonLucas/streck6)
Digital management for committee inventory.

## Features
* Individual accounts 
* Make payments to the bank
* Change user password
* Admin managing users page
* Payment and buy history
* Buy items directly from page
* Hash and salts password with bcrypt

## Technicals 
This webapp is written with a pg express backend and react frontend using materials UI components. 
To store data I'm using a psql database that is managed by the pg express API. The page saves the 
loggedIn information in a session so that you don't have to log in until the session is old. The 
webpage we personally use is hosted at heroku with the psql addon. 

## For the future
* Managing users page
* Structure the API and structure the frontend.
* Safer way of storing sessions

## Installation

If you want to host this webapp yourself you can follow the steps below:

- Fork master of this repo
- Change the databased/inserts.sql to fit your specific committe (names, roles, inventory etc)
- Create an account on heroku
- Create a new webapp with the heroku postgres addon, connect it to YOUR forked repo 
- Go to webapp -> settings -> reveal config vars: Here you have to add the config variables:
	- API_KEY (Generate a key online) 
	- COOKIE_SECRET (Generate online)
	- DATABASE_URL (Copy the database URI from the heroku postgres addon that you've added)
- Lastly download postgres and do the following in the terminal:
	- *in streck6 folder*
	- cd databased
	- psql [YOUR POSTGRES URI FROM BEFORE]
	- \i run.sql
	- CTRL + D
	- Done

After this just deploy the repo and you're good to go

Heres how it looks :)

---
![login](https://user-images.githubusercontent.com/38735934/139346592-559ea7a3-d354-410d-be6c-52cb5eb463e8.PNG)
![buy](https://user-images.githubusercontent.com/38735934/139346596-9c69d767-a5b0-43ba-9585-a27b0b6eb744.PNG)
![buy1](https://user-images.githubusercontent.com/38735934/139346597-9abf9585-10d9-40e8-8d7a-877f518dd8f9.PNG)
![menu](https://user-images.githubusercontent.com/38735934/139346594-18dfcc7b-585e-4cad-af90-0da701f1e195.PNG)
![toplista](https://user-images.githubusercontent.com/38735934/139346595-12cf91c7-eee7-47e1-b412-a64b6e48e11c.PNG)
![history](https://user-images.githubusercontent.com/38735934/139346598-bf3e31a9-5bf2-4cbc-823d-43bedbd1825b.PNG)
