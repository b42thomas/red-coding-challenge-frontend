# red-coding-challenge-frontend
Frontend for the RED Technologies coding challenge.

To run this application locally, create a `.env` file and add the two following keys with their resecptive values
 ```
 REACT_APP_API_URL=enter url here
 REACT_APP_API_KEY=enter api key here
 ```

### DELIVERABLES:

  - [x] Create a view of order entities in-memory on the page
  - [x] Implement a feature where users can create new order entities
  - [x] Implement simple dropdown filters to limit the order view to certain customers and order types
  - [x] Implement a simple textbox search to lookup an order by id
  - [ ] Implement a delete feature by which a user can remove one to many orders at once


### MANDATORY FEATURES:

  - [ ] Fully functional web page/application which behaves as described above
  - [x] Usage of a component library (Material UI recommended)
  - [ ] Reasonably responsive behavior for different screen widths

### ABOVE AVERAGE FEATURES:
  - [ ] Implement frontend testing using a framework of your choice
    - - Would have used cypress or playwright [I have implmented playwright tests for my resume website here](https://github.com/b42thomas/billy-thomas-dev/blob/main/tests/test.ts)
  - [x] Implement a command to build/run the application with a console command (npm run /npm build ?)
  - [ ] Implement Redux (or other state management) and use it to create a ‘save draft’ feature for order creation. Ok if drafts don’t survive page refreshes.

### EXCEPTIONAL FEATURES:
  - [ ] All the above-average deliverables
  - [x] [Host the app in a publicly available location](https://red-coding-challenge-frontend.vercel.app/orders) 
    - note: this is using the provided API, I did not have time to get the backend in a hosted state
  - [x] Implement containerization and/or pipelines to automate the app deployment
    - used vercel to deploy react app from github, any push to main will deploy the app automatically
  - [ ] Design a custom view/theme for the app including animations or other user-friendly features
