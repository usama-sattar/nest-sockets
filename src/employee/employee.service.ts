import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEmployee, createEmployee } from 'src/interface/employee.interface';
import { CreateEmployeeDto } from 'src/dto/createEmployee.dto';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee') private employeeModel: Model<IEmployee>,
  ) {}

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<createEmployee> {
    console.log('createEmployeeDto ', createEmployeeDto);
    const { email, username } = createEmployeeDto;
    const foundUser = await this.employeeModel.findOne({ email: email });
    if (foundUser) {
      return {
        success: false,
        message: 'Employee already exists.',
      };
    }
    const newEmployee = await new this.employeeModel(CreateEmployeeDto).save();
    return {
      success: true,
      message: 'User has been created successfully',
      employee: newEmployee,
    };
  }
}
