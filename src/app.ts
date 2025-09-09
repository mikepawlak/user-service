import express from 'express';
import type { Db } from 'mongodb';
import { ObjectId } from 'mongodb';
import { toUserDto, UserDoc, USERS_COLLECTION } from './models/user.js';


/**
 * Creates an Express app with a typed MongoDB collection and a route
 * that fetches a user by ObjectId, only if age > 21.
 *
 * @param db - MongoDB database instance.
 * @returns Express application.
 */
export function createApp(db: Db) {
  const app = express();
  const users = db.collection<UserDoc>(USERS_COLLECTION);

  /**
   * GET /users/:id
   * - 400 if `id` is not a valid ObjectId
   * - 404 if no user (or user with age <= 21)
   * - 200 with UserDto JSON if found
   */
  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId format' });
    }

    const user = await users.findOne({
      _id: new ObjectId(id),
      age: { $gt: 21 },
    });

    if (!user) return res.status(404).json({ error: 'Not found' });

    return res.json(toUserDto(user));
  });

  return app;
}
