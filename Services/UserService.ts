import UserRepository from "../repositories/UserRepository.ts";
import { IUser } from  '../Models/User.ts';

class UserService {

    constructor(){}

    readonly userRepository = new UserRepository();

    getUsers = async () => {
        return await this.userRepository.findAll();
    }

    getUser = async ( username: string ) => {
      return await this.userRepository.findByName( username );
    }

    postUser = async (user: IUser) => {
      return await this.userRepository.insert(user);
    }

    updateUser = async ( username: string, user: IUser) => {
      return await this.userRepository.update( username, user );
    }

    deleteUser = async (username: string) => {
      return await this.userRepository.delete( username );
    }
}

export default UserService;