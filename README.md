# CodeClause-quiz-web

- This is a site on which you can create quiz and share the id with anyone so that they can attempt that quiz

- ## Installation guide given below.

- first check whether node and npm exists using this command node -v and npm -v if not then install node and install npm using command npm i npm -g.
- Install mongodb if not installed and run mongodb if required.

- ### For backend: 

  1. Then go inside backend folder using cmd/terminal then use command npm i to install required packages.

  2. Then create a .env file inside backend folder.

  3. Then create these variables inside the file
    - PORT=4000
    - DB_URL=mongodb://localhost:27017/quizDb
    - JWT_SECRET=anystring

  4. Then run npm start inside api directory in cmd/terminal. 
  
 
- ### For frontend: 

  1. Direct inside frontend folder in cmd/terminal then run npm i.

  2. Then run npm start 
  
  3. After compilation output looks like this
  
  ![screen56](https://user-images.githubusercontent.com/60874409/198887810-a8125c17-4f78-4886-bae8-e30df793964e.jpg)
  
  
