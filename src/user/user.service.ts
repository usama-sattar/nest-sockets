import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser, LoginUser, SignupUser } from 'src/interface/user.interface';
import { CreateUserDto } from 'src/dto/register.dto';
import { LoginUserDto } from 'src/dto/login.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UpdateSocketIdDto } from 'src/dto/updateSocketId.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}
  async createUser(createUserDto: CreateUserDto): Promise<SignupUser> {
    console.log('createUserDto ', createUserDto);
    const { email, password } = createUserDto;
    const foundUser = await this.userModel.findOne({ email: email });
    if (foundUser) {
      return {
        success: false,
        message: 'User already exists.',
      };
    }
    console.log('password ', password);
    const encryptedPassword = await bcrypt.hashSync(password, 12);
    //saving user to DB
    console.log('encryptedPassword', encryptedPassword);
    createUserDto.password = encryptedPassword;
    const newUser = await new this.userModel(createUserDto).save();
    return {
      success: true,
      message: 'User has been created successfully',
      user: newUser,
    };
  }
  async login(loginUserDto: LoginUserDto): Promise<LoginUser> {
    console.log('loginUserDto ', loginUserDto);
    const { email, password } = loginUserDto;
    const foundUser = await this.userModel.findOne({ email: email });
    console.log('foundUser ', foundUser);
    if (!foundUser) {
      return {
        success: false,
        message: "User doesn't exists",
      };
    } else {
      const { _id } = foundUser;
      console.log(
        'bycrypt ',
        await bcrypt.compare(password, foundUser.password),
      );
      console.log(' _id ', _id);
      if (await bcrypt.compare(password, foundUser.password)) {
        const accessToken = jwt.sign({ _id }, 'wwe', {
          expiresIn: '1.5h',
        });
        const refreshToken = jwt.sign({ _id }, 'wwe', {
          expiresIn: '30d',
        });
        return {
          success: true,
          message: 'User logged in successfully.',
          accessToken,
          refreshToken,
          user: foundUser,
        };
      } else {
        return {
          success: true,
          message: "Email and password doesn't match.",
        };
      }
    }
  }

  async updateSocket(updateSocketIdDto: UpdateSocketIdDto): Promise<LoginUser> {
    const { userId, socketId } = updateSocketIdDto;
    const updateUser = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { socketId: socketId },
      { new: true },
    );

    return {
      success: true,
      message: 'Socket id has been updated successfully',
      user: updateUser,
    };
  }

  async getUserBySocketId(socketId: string): Promise<any> {
    return await this.userModel.findOne({ socketId: socketId });
  }
}
