# FreshList

[Go to App](https://solo-fresh-list.herokuapp.com/home)

FreshList was created to remedy the issue of wasted and expired groceries. With it you can store your various food items which are sorted chronologically by their expiration date. It also pulls from the Edamom recipe API to offer suggestions on what to cook with your ingredients, and allows you to search for any recipe that you desire. The app was created during my time at Prime Digital Academy as part of my solo project in which we were tasked with using a web app to solve a problem. I hope you enjoy using it!

## Built With

I built this app using JavaScript, MongoDB, Express.js, AngularJS, Node.js, Passport, Angular Material, and the Edamom Recipe API.

## Getting Started

Fork and clone this repo to your local machine. Make sure to have MongoDB configured and installed. Install required dependencies using Node.js.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- MongoDB
- Angular(-)
    - Animate
    - Aria
    - Material
    - Material-Icons
    - Messages
    - Route
- bcrypt
- body-parser
- ExpressJS
- ExpressJS Session
- Material-Design-Icons
- Mongoose
- Passport
- Passport-local
- Path


### Installing

Once all dependencies are install, use `npm start` to start the server, which will run on port 5000 by default.

## Screen Shot

![Pantry View](/server/public/images/screen1.png)
![Recipes View](/images/public/images/screen2.png)

### Completed Features

- [x] User accounts
- [x] Pantry view for grocery items
- [x] Input fields to add grocery items
- [x] Edit/Delete grocery items
- [x] Button to generate 5 recipe suggestions based on selected grocery item
- [x] Instant search for pantry list and saved recipes
- [x] Ability to favorite/unfavorite recipes in any view
- [x] Saved recipe view for viewing favorited recipes
- [x] Discover view to search for any recipe within Edamom API
- [x] 'About this app' section
- [x] Fully mobile responsive
- [x] Included ingredients, health info (when available) and diet info (when available) within recipe suggestion and recipe cards

### Next Steps

- [x] Ability to select multiple ingredients before generating recipe suggestion
- [x] Account linking so that friends/spouses/significant others can view combined pantry and recipe options
- [x] How-To and Support sections
- [x] Better PC support

## Authors

* Cam Schnackel


## Acknowledgments

* Special thanks to Stack Overflow
* Shoutout to Prime Academy students and staff for help
* Thank you Edamom for your excellent recipe API
