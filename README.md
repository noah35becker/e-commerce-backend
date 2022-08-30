# e-Commerce Backend
[![License: GNU AGPLv3](https://img.shields.io/badge/License-GNU%20AGPLv3-informational.svg)](https://choosealicense.com/licenses/agpl-3.0)

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)
    

## Repo
[https://github.com/noah35becker/e-commerce-backend](https://github.com/noah35becker/e-commerce-backend)


## Description
This project utilizes SQL to construct backend API routes for a database of products and their associated categories <i>(maximum 1 per product)</i> and tags <i>(however many per product)</i>.


## Video walkthrough
[LINK GOES HERE](LINK GOES HERE)


<i><b>
## Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Credits](#credits)
- [License](#license)

- [Contributing](#contributing)
- [Questions](#questions)
</i></b>


## Installation
The following instructions are for installing this application locally on your computer.
1. You must have [Node.js](https://nodejs.org/) and [MySQL](https://www.mysql.com/) installed in order to use this application. You must also have your MySQL username and password handy.
2. Navigate to this project's [GitHub repo](https://github.com/noah35becker/employee-tracker), click the green "Code" button, and click "Download ZIP" to download the program folder.
3. Unzip the program folder. Rename the unzipped folder if you want, and move it wherever you'd like on your drive.
4. Inside the program folder, create a `.env` file. Insert the following code into the file (and then save and close it):
```
DB_NAME = 'ecommerce_db'
DB_USER = 'your-mysql-username-goes-here'
DB_PW = 'your-mysql-password-goes-here'
```
5. Open the terminal, `cd` to the program folder, and run the command `npm install`.
6. Run the command `mysql -u username -p` (with your MySQL username in place of `username`). Enter your MySQL password when prompted. Once you've logged in to the MySQL shell, run the command `source db/schema.sql;` to initialize the database. (You can repeat this step in the future if you ever want to reset the database.)
7. Run the command `quit;` to exit the MySQL shell. You're all set!


## Usage
If you haven't already, open the terminal and `cd` to the program folder you downloaded during [installation](#installation). Then run the command `npm start` to initialize the server on local port 3001. You can now make API requests at the following routes:
- `http://localhost:3001/api/categories`
    - GET (all categories)
    - POST: Body must be a JSON object with the property `category_name` (string)
    - PUT: Body must be a JSON object with the property `category_name` (string)
- `http://localhost:3001/api/categories/ID-GOES-HERE`
    - GET (one category)
    - PUT: Body must be a JSON object with the property `category_name` (string)
    - DELETE
- `http://localhost:3001/api/products`
    - GET (all products)
    - POST: Body must be a JSON object with the following properties:   
        - `product_name` (string)
        - `price` (decimal #)
        - <i>`stock` (integer) (*optional, defaults to `10` if omitted)
        - `category_id` (integer) (*optional, defaults to `null` if omitted)
        - `tagIds` (array of integers) (*optional, defaults to `[]` if omitted)</i>
- `http://localhost:3001/api/products/ID-GOES-HERE`
    - GET (one product)
    - PUT: Body must be a JSON object with any of the following properties:   
        - `product_name` (string)
        - `price` (decimal #)
        - `stock` (integer)
        - `category_id` (integer)
        - `tagIds` (array of integers)
    - DELETE
- `http://localhost:3001/api/tags`
    - GET (all tags)
    - POST: Body must be a JSON object with the property `tag_name` (string)
- `http://localhost:3001/api/tags/ID-GOES-HERE`
    - GET (one tag)
    - PUT: Body must be a JSON object with the property `tag_name` (string)
    - DELETE


## Testing
This application includes mock seed data that you can use to prepopulate the database and test program functionality. To instantiate the mock data, `cd` to the program folder you downloaded during [installation](#installation), and run the command `npm run seed`.


## Credits

### Creator
- Noah Becker ([GitHub](https://github.com/noah35becker))


### Third-party assets
- [Node.js](https://nodejs.org/)
- [MySQL2](https://www.npmjs.com/package/mysql2) (Node package)
- [Sequelize](https://www.npmjs.com/package/sequelize) (Node package)
- [Express](https://www.npmjs.com/package/express) (Node package)
- [Dotenv](https://www.npmjs.com/package/dotenv) (Node package)
- [Starter code](https://github.com/coding-boot-camp/fantastic-umbrella) (since modified)




## License

[![License: GNU AGPLv3](https://img.shields.io/badge/License-GNU%20AGPLv3-informational.svg)](https://choosealicense.com/licenses/agpl-3.0)

Learn more about this license [here](https://choosealicense.com/licenses/agpl-3.0).






## Contributing
Feel free to fork this project's [repo](https://github.com/noah35becker/e-commerce-backend), contribute code, and submit pull requests [here](https://github.com/noah35becker/e-commerce-backend/pulls)!

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

Contributors to this project must follow all guidelines set forth by the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).




## Questions
My GitHub username is [noah35becker](https://github.com/noah35becker).

If you have any questions, I'd be glad to hear from you—contact me at [noahbeckercoding@gmail.com](mailto:noahbeckercoding@gmail.com).
