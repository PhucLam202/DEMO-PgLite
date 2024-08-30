import { PGlite } from '@electric-sql/pglite'

// Initialize the database connection
const db = new PGlite({ dataDir: 'D:/Weminal/data' })

// Function to create a new user in the database
// Parameters: name, email, age
// Returns: The newly created user object
async function createUser(name, email, age) {
  try {
    // Execute the SQL query to insert a new user into the UserTest table
    const result = await db.query(
      'INSERT INTO UserTest (name, email, age) VALUES ($1, $2, $3) RETURNING *',
      [name, email, age]
    );
    // Return the newly created user object
    return result.rows[0];
  } catch (error) {
    // Log the error if there's an issue creating the user
    console.error('Error creating user:', error);
  }
}

// Function to retrieve a user by their ID from the database
// Parameters: id
// Returns: The user object with the specified ID
async function getUserById(id) {
  try {
    // Execute the SQL query to select a user from the UserTest table by their ID
    const result = await db.query('SELECT * FROM UserTest WHERE id = $1', [id]);
    // Return the user object if found
    return result.rows[0];
  } catch (error) {
    // Log the error if there's an issue fetching the user by ID
    console.error('Error fetching user by ID:', error);
  }
}

// Function to update an existing user in the database
// Parameters: id, name, email, age
// Returns: The updated user object
async function updateUser(id, name, email, age) {
  try {
    // Execute the SQL query to update a user in the UserTest table
    const result = await db.query(
      'UPDATE UserTest SET name = $2, email = $3, age = $4 WHERE id = $1 RETURNING *',
      [id, name, email, age]
    );
    // Return the updated user object
    return result.rows[0];
  } catch (error) {
    // Log the error if there's an issue updating the user
    console.error('Error updating user:', error);
  }
}

// Function to fetch all users from the database
// Returns: An array of all user objects
async function fileAllUsers(){
  try {
    // Execute the SQL query to select all users from the UserTest table
    const result = await db.query('SELECT * FROM UserTest')
    // Return the array of all user objects
    return result.rows
  }catch (error){
    // Log the error if there's an issue fetching all users
    console.error('Error fetching all users:', error);
  }
}

// Function to delete a user from the database
// Parameters: id
// Returns: The deleted user object
async function deleteUser(id) {
  try {
    // Execute the SQL query to delete a user from the UserTest table
    const result = await db.query('DELETE FROM UserTest WHERE id = $1 RETURNING *', [id]);
    // Return the deleted user object
    return result.rows[0];
  } catch (error) {
    // Log the error if there's an issue deleting the user
    console.error('Error deleting user:', error);
  }
}

// Function to initialize the database schema
async function initializeDatabase() {
  try {
    // Execute the SQL query to create the UserTest table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS UserTest (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        age INTEGER
      );
    `);
  } catch (error) {
    // Log the error if there's an issue initializing the database
    console.error('Error initializing database:', error);
  }
}

// Function to list all tables in the database
// Returns: An array of table names
async function listTables(){
  try{
    // Execute the SQL query to select all table names from the public schema
    const result = await db.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`);
    // Return the array of table names
    return result.rows;
  }catch(error){
    // Log the error if there's an issue listing tables
    console.error('Error listing tables:', error);
  }
}

// Example usage of the database functions
(async () => {
  try {
    // Initialize the database schema
    await initializeDatabase();
    // Create a new user
    const newUser = await createUser('John Doe', 'john@example.com', 30);

    // Fetch the newly created user by their ID
    const user = await getUserById(newUser.id);

    // Update the user's information
    const updatedUser = await updateUser(newUser.id, 'John Smith', 'johnsmith@example.com', 31);

    // List all tables in the database
    const tables = await listTables();
    console.log('Tables in the database:', tables);

    // Fetch all users from the database
    const allUsers = await fileAllUsers();
    console.log("allUsers", allUsers)
  } catch (error) {
    // Log the error if there's an issue in the main execution
    console.error('Error in main execution:', error);
  }
})();