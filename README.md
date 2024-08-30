# Project Setup and Execution Guide

## System Requirements

- Node.js (latest version)
- npm (comes with Node.js)

## Installation

1. **Clone the project from GitHub:**

   ```sh
   git clone <URL of the project>
   cd <project directory name>
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

## Directory Structure

- `index.js`: The main file containing your source code.
- `package.json`: npm configuration file containing information about dependencies.

## Database Configuration

This project uses `PGlite` to manage the database. Data will be stored in the directory `D:/Weminal/data`.

## Running the Project

1. **Initialize the database and run the examples:**

   ```sh
   node index.js
   ```

   The `index.js` file will perform the following operations:
   - Initialize the database and create the `UserTest` table if it does not exist.
   - Add a new user.
   - Retrieve user information by ID.
   - Update user information.
   - List all tables in the database.
   - Retrieve all users from the `UserTest` table.

## Source Code

Below is the source code of the `index.js` file:
