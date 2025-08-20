# 🚀 Node.js Base Template

A comprehensive Node.js template designed with best coding practices and project management recommendations. Feel free to customize it according to your project needs!

## 📁 Project Structure

### `src/` - Source Code Directory
This folder contains all the actual source code for the project, excluding tests (consider creating a separate `test/` folder).

Let's explore the `src/` folder structure:

#### **📁 config**
Contains all configurations and setup files for libraries and modules.
- **Example**: `server-config.js` - Sets up dotenv for cleaner environment variable usage
- **Example**: Logging library configurations for meaningful application logs

#### **📁 routes** 
Registers routes with their corresponding middleware and controllers.

#### **📁 middlewares**
Intercepts incoming requests for validation, authentication, and other preprocessing tasks.

#### **📁 controllers**
Acts as the final middleware layer before business logic execution.
- Receives incoming requests and data
- Passes data to the business layer
- Structures API responses and sends output

#### **📁 repositories**
Contains all database interaction logic.
- Raw SQL queries
- ORM queries
- Database-specific operations

#### **📁 services**
Houses business logic and interacts with repositories for database operations.

#### **📁 utils**
Contains helper methods, error classes, and utility functions.

## ⚙️ Project Setup

### Step 1: Download and Setup
1. Download this template from GitHub
2. Open it in your favorite text editor

### Step 2: Environment Configuration
Create a `.env` file in the root directory and add the following:


### Step 3: Go inside the folder path and execute the following command:

```
npm install 
```

 ```
PORT=<port number of your choice>
```

**Example:**
```
PORT=3000
```


### Step 3: Database Configuration
Inside the `src/config/` folder, create a file named `config.json` with the following content:

```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### Environment-Specific Configuration

#### **Development Environment**
Update the following fields in the `development` section:
- `username` - Your database username
- `password` - Your database password
- `dialect` - Your database type (mysql, postgres, sqlite, etc.)

#### **Test/Production Environment**
For test or production environments:
- Replace all database credentials accordingly
- **Important**: Replace the `host` value with your hosted database URL


### TO run the server follow the given comand
```
npm run dev
```



  