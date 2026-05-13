import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('task')
@ApiSecurity('JWT-auth')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':userId')
  create(
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
    @Param('userId') userId: number,
  ) {
    return this.taskService.create(createTaskDto, Number(userId));
  }

  @Get('/findAllNotCompleted/:userId')
  findAllTaskByUserIdNotCompleted(@Param('userId') userId: number) {
    return this.taskService.findAllTaskByUserNotCompleted(Number(userId));
  }

  @Get('/findAllCompleted/:userId')
  findAllTaskByUserIdCompleted(@Param('userId') userId: number) {
    return this.taskService.findAllTaskByUserCompleted(Number(userId));
  }

  @Patch(':id')
  update(@Param('id') id: number) {
    return this.taskService.update(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(Number(id));
  }
}
