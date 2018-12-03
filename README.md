# Welcome to localhost

[Live Demo](https://localhost4000.herokuapp.com/)

"localhost" is a single-page, full stack web application inspired by AirBnB. It utilizes React.js with Redux for the frontend, and Ruby on Rails with PostgreSQL for the backend. Users freely roam around the application; make bookings, leave reviews, and most importantly search for listings

# Features

## Session
![log-in modal](https://raw.githubusercontent.com/brkwok/localhost/master/app/assets/images/login-demo.png)

* Users can sign up, log in to application
* Users have access to demo account

## Search
![search autocomplete](https://github.com/brkwok/localhost/blob/master/app/assets/images/search-autocomplete.png?raw=true)
* Users can start searching for spots from root page
* Users can easily look up locations through Google Autocomplete API

## Listings
![search listings](https://github.com/brkwok/localhost/blob/master/app/assets/images/search-demo.png)
* Users can easily view all listings in selected locations
* Users can use filters adjust the search listings

## Bookings and Reviews
![booking page](https://raw.githubusercontent.com/brkwok/localhost/master/app/assets/images/booking-demo.png)
![booking manage](https://github.com/brkwok/localhost/blob/master/app/assets/images/booking-manage-demo.png)
* Users can make a booking through spot show page
* Users can manage their past and current bookings
* Users can leave reviews on the spots
* Users can cancel their current bookings

## User Profile
* Users can see all the reviews that they previously made

# Technology

## React.js
React.js is a JavaScript library for building user interfaces for the frontend. It manipulates virtual DOM to display data

## Redux
Redux helps manage the state of the application. When new data is retrieved, Redux updates its state and re-renders corresponding React Component

## Ruby on Rails
Ruby on Rails manages the backend of localhost. It is a framework used to query the database

## PostgreSQL
PostgreSQL stores all of localhost's relative data

# Future Implementations
* Utilize AWS for Users to create bookings, manage profile images
* Enhance filters for better U/I and U/X
* Create User's host/customer status
