import { ObjectId } from 'mongodb';

/**
 * MongoDB document shape stored in the `users` collection.
 * `_id` is an ObjectId in the database.
 */
export interface UserDoc {
  _id: ObjectId;
  name: string;
  email: string;
  age: number;
}

/**
 * API wire format returned to clients.
 * `_id` is a hex string for convenience in JSON.
 */
export interface UserDto {
  _id: string;
  name: string;
  email: string;
  age: number;
}

/**
 * Convert a MongoDB user document into the API DTO.
 * @param doc - User document from MongoDB.
 * @returns UserDto with string `_id`.
 */
export function toUserDto(doc: UserDoc): UserDto {
  return {
    _id: doc._id.toHexString(),
    name: doc.name,
    email: doc.email,
    age: doc.age,
  };
}

/** Name of the MongoDB collection that stores users. */
export const USERS_COLLECTION = 'users' as const;
