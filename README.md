# Getting Started

Pull Capstone-Project from [here](https://github.com/Braden-Develops/Capstone-Project) and follow readme instructions to connect to the API

Run `npm ci` to install all dependencies

Run `npm start` in the capstone-ui project folder to view website

# Building

Run `docker compose up` while in the root directory for this project (~/capstone-ui)
Run `docker compose down` to stop the container
Perform the same action in the (~/capstone-project) directory to launch the API

# Context
## AuthContext
User context is available throughout the app:
```
import AuthContext from 'your path here';
import { useContext } from 'react';

// inside of component function

// object destructuring...pull out what you need
const {
    isLoggedIn, // boolean
    userData, // object, currently { id, name, email, }
    isLoading, // boolean, for progress bar during fetch requests
    onLogout, // function
    onLogin // function
} = useContext(AuthContext);
```
### Unauthorized page
Showing the unauthorized page on all user based pages:
```
// import isLoggedIn as shown above using AuthContext
if (!isLoggedIn) {
    return <Unauthorized />
  }
```
Try navigating to /user_home while not logged in to test.

# Theme
Still working on the theme a bit...nothing is set in stone. If it gets too complicated I am cool with ditching it. However, the dark mode toggle works so far!