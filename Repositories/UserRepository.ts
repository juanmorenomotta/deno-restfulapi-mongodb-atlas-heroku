import db  from "../Database/mongoDb.ts";
import { IUser, IUserSchema } from '../Models/User.ts';

const userCollection = db.getCollection<IUserSchema>("users");

class UserRepository {

    constructor(){}

    async findAll() {
        const users = await userCollection.find({ username: { $ne: null } });
        return users;
    }

    async findByName( username: string ) {
        const user = await userCollection.find({ username: username  });
        return user;
    }

    async insert(user: IUser) {
      const insertId = await userCollection.insertOne( user );
      return insertId;
    }   
    
    async update( username:string, user: IUser) {

      const updateOne = await userCollection.updateOne(
        { username: username },
        { $set: user }
      );

      return updateOne; 
    }

    async delete( username: string) {
      const deleteOne = await userCollection.deleteOne({ username: username });
      return deleteOne;
    }
}

export default UserRepository;