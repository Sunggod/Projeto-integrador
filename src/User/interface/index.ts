import { UserDto } from "../dto";
import { User } from "../model";

export interface IUserService{
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    createUser(userDto: UserDto): Promise<User>;
    updateUser(userId: User["id"], updatedData: Partial<User>): Promise<void>;
    deleteUser(id: User["id"]): Promise<void>;
}