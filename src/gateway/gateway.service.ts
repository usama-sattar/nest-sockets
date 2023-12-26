import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser, LoginUser, SignupUser } from 'src/interface/user.interface';
import { UpdateSocketIdDto } from 'src/dto/updateSocketId.dto';
import { UserService } from 'src/user/user.service';
import { EmployeeService } from 'src/employee/employee.service';
import { CreateEmployeeDto } from 'src/dto/createEmployee.dto';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,
  ) {}

  async updateSocket(updateSocketIdDto: UpdateSocketIdDto): Promise<LoginUser> {
    const { userId, socketId } = updateSocketIdDto;
    const updatedUser = await this.userService.updateSocket({
      userId,
      socketId,
    });

    return updatedUser;
  }

  async getUserBySocketId(socketId: string): Promise<any> {
    return await this.userService.getUserBySocketId(socketId);
  }

  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<any> {
    return await this.employeeService.createEmployee(createEmployeeDto);
  }
}
