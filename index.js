import { PGlite } from '@electric-sql/pglite'

const db = new PGlite({ dataDir: 'D:/Weminal/data' })


// Create
async function createUser(name, email, age) {
  try {
    const result = await db.query(
      'INSERT INTO UserTest (name, email, age) VALUES ($1, $2, $3) RETURNING *',
      [name, email, age]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

// Read
async function getUserById(id) {
  try {
    const result = await db.query('SELECT * FROM UserTest WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching user by ID:', error);
  }
}

// Update
async function updateUser(id, name, email, age) {
  try {
    const result = await db.query(
      'UPDATE UserTest SET name = $2, email = $3, age = $4 WHERE id = $1 RETURNING *',
      [id, name, email, age]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

async function fileAllUsers(){
  try {
    const result = await db.query('SELECT * FROM UserTest')
    return result.rows
  }catch (error){
    console.error('Error fetching all users:', error);
  }
}

// Delete
async function deleteUser(id) {
  try {
    const result = await db.query('DELETE FROM UserTest WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

// Example usage
async function initializeDatabase() {
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS UserTest (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        age INTEGER
      );
    `);
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}
async function listTables(){
  try{
    const result = await db.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);
    return result.rows;
  }catch(error){
    console.error('Error listing tables:', error);
  }

}
(async () => {
  try {
    await initializeDatabase();
    const newUser = await createUser('John Doe', 'john@example.com', 30);

    const user = await getUserById(newUser.id);

    const updatedUser = await updateUser(newUser.id, 'John Smith', 'johnsmith@example.com', 31);

    //const deletedUser = await deleteUser(newUser.id);
    const tables = await listTables();
    console.log('Tables in the database:', tables);

    const allUsers = await fileAllUsers();
    console.log("allUsers", allUsers)
  } catch (error) {
    console.error('Error in main execution:', error);
  }
})();