const pool = require("../boot/database/db_connect");
const {
  queryError,
  success,
  missingParameters,
  unauthorized
} = require("../constants/statusCodes");

const getMessages = async (req, res) => {
  try {
    // Joining with users to mimic 'populate("user")'
    // Selecting user fields to match the populated structure if possible, or just returning flattened.
    // For simplicity, let's return a joined structure or just the message with user_email.
    // If the frontend expects exactly nested user object, I should format it.
    // Original Mongoose populate replaces user ID with user document.

    // Let's do a JOIN
    const query = `
      SELECT m.*, u.username, u.email as u_email 
      FROM messages m
      LEFT JOIN users u ON m.user_email = u.email
      ORDER BY m.created_at DESC
    `;

    pool.query(query, (err, rows) => {
      if (err) {
        console.log("Error getting messages", err);
        return res.status(500).json({ error: err.message });
      }

      // Reconstruct schema if needed to match frontend expectation of populated user
      // Assuming frontend handles flat or we reconstruct:
      const messages = rows.rows.map(row => ({
        _id: row.id, // mapping id to _id for possible frontend compatibility
        id: row.id,
        name: row.name,
        created_at: row.created_at,
        updated_at: row.updated_at,
        user: {
          email: row.u_email,
          username: row.username
          // _id is missing for user, hope frontend doesn't need it or keys off email
        }
      }));

      return res.status(200).json(messages);
    });

  } catch (error) {
    console.log("Error getting messages", error);
    return res.status(500).json({ error: error.message });
  }
};

const getMessagesByUser = async (req, res) => {
  try {
    // req.user from auth middleware contains { email: ... }
    const email = req.user.email;

    pool.query(
      `SELECT * FROM messages WHERE user_email = $1`,
      [email],
      (err, rows) => {
        if (err) {
          console.log("error getting messages for user", err.message);
          return res.status(queryError).json({ error: "Error while getting messages" });
        }
        return res.status(success).json(rows.rows);
      }
    );
  } catch (error) {
    console.log("error getting messages for user", error.message);
    return res.status(queryError).json({ error: "Error while getting messages" });
  }
};

const getMessageById = async (req, res) => {
  const { messageId } = req.params;
  const id = parseInt(messageId);

  if (isNaN(id)) {
    return res.status(missingParameters).json({ error: "Invalid ID" });
  }

  try {
    pool.query(`SELECT * FROM messages WHERE id = $1`, [id], (err, rows) => {
      if (err) {
        console.log("error getting message", err.message);
        return res.status(queryError).json({ error: "Error while getting message" });
      }
      if (rows.rows.length === 0) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.status(success).json(rows.rows[0]);
    });
  } catch (error) {
    console.log("error getting message", error.message);
    return res.status(queryError).json({ error: "Error while getting message" });
  }
};

const addMessage = async (req, res) => {
  // Original expected req.body.message
  const { message } = req.body;

  if (!message || !message.name) {
    return res.status(missingParameters).json({ message: "missing parameters" });
  }

  const userEmail = req.user.email; // From token

  try {
    pool.query(
      `INSERT INTO messages (name, user_email) VALUES ($1, $2) RETURNING *`,
      [message.name, userEmail],
      (err, rows) => {
        if (err) {
          console.log("error adding message", err);
          return res.status(queryError).json({ error: "Error while adding message" });
        }
        return res.status(success).json(rows.rows[0]);
      }
    );
  } catch (error) {
    console.log("error adding message", error);
    return res.status(queryError).json({ error: "Error while adding message" });
  }
};

const editMessage = async (req, res) => {
  const { messageId } = req.params;
  const { name } = req.body;
  const id = parseInt(messageId);

  if (!messageId || isNaN(id) || !name) {
    return res.status(missingParameters).json({ message: "missing parameters" });
  }

  try {
    pool.query(
      `UPDATE messages SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [name, id],
      (err, rows) => {
        if (err) {
          console.log("error editing message", err.message);
          return res.status(queryError).json({ error: "Error while editing message" });
        }
        return res.status(success).json(rows.rows[0]);
      }
    );
  } catch (error) {
    console.log("error editing message", error.message);
    return res.status(queryError).json({ error: "Error while editing message" });
  }
};

module.exports = {
  getMessages,
  addMessage,
  editMessage,
  getMessageById,
  getMessagesByUser,
};
