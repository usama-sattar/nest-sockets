import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginUserDto } from 'src/dto/login.dto';
import { CreateUserDto } from 'src/dto/register.dto';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newUser,
      });
    } catch (err) {
      console.log('err ', err);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }
  @Post('/login')
  async loginUser(@Res() response, @Body() loginUserDto: LoginUserDto) {
    try {
      const loginUserResponse = await this.userService.login(loginUserDto);
      console.log('loginUserResponse ', loginUserResponse);
      return response.status(HttpStatus.CREATED).json(loginUserResponse);
    } catch (err) {
      console.log('err ', err);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: 'Error: Internal Server Error!',
        error: 'Bad Request',
      });
    }
  }
}
