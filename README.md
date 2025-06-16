# Video Game Review Site

### Project Description
* This website utilizes a React-based frontend with a Python/Django backend. Users are able to sign in, view a list of games, and visit their pages to see a description of the game, reviews that were left, as well as leave a review on their own. Users can see/delete all of their own reviews from the 'Account' tab.
![Home page](https://github.com/ThomasChakif/video-game-review-site/blob/main/frontend/src/img/vgr-homepage.png)
![Game page](https://github.com/ThomasChakif/video-game-review-site/blob/main/frontend/src/img/vgr-home-games.png)
### Project Specifications
* User Accounts & Roles: Users are able to sign in and are authenticates using JWT Access and Refresh tokens. Once signed in, users are presented with a list of available games on the site. Upon visiting a game page, users can see a short description of the game, the game's cover and publisher, as well as an aggregated score of all reviews left. Users can also see a list of all made reviews, and can leave a review if they have not already left a review for that same game. Users are able to visit their 'Account' page and see and delete any past reviews they've made. Users can visit the 'Help' page to submit a help request/email through FormSubmit.

![Individual game page](https://github.com/ThomasChakif/video-game-review-site/blob/main/frontend/src/img/vgr-game-page.png)

### Installation and Running the Project

#### Frontend
The frontend for this project uses React.

You must have node.js running on your machine. Once you have cloned this project you can run `npm install` to install all of the packages for this project. Then running `npm run dev` will run the dev version of this code, which will run this project on localhost:5173 (or at the location specified in the console).

#### Server
The backend for this project uses Django, a Python framework. To run the server, make sure you have Python installed. cd into the server folder, and run    `python3 -m venv env` to set up the environment. Then run `source env/bin/activate` to activate the environment and run `pip install -r requirements.txt` for all other necessary installs. To get the server up and running, run `python manage.py runserver`.
