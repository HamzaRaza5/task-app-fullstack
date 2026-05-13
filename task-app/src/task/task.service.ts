import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

// ADD TASK BASED ON USER ID
// FIND ALL TASK BASED ON USER ID (NOT COMPLETED)
// FIND ALL COMPLETED TASK BASED ON USER ID (COMPLETED)
// MARK TASK AS COMPLETED BASED ON TASK ID
// DELETE TASK BASED ON TASK ID

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private userService: UserService,
  ) {}

  // ADD TASK BASED ON USER ID
  async create(createTaskDto: CreateTaskDto, userId: number) {
    let task: Task = new Task();
    task.title = createTaskDto.title;
    task.date = new Date().toLocaleString();
    task.completed = false;
    task.user = await this.userService.findUserById(userId);

    return this.taskRepository.save(task);
  }

  // FIND ALL TASK BASED ON USER ID (NOT COMPLETED)
  findAllTaskByUserNotCompleted(userId: number) {
    return this.taskRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }

  // FIND ALL COMPLETED TASK BASED ON USER ID (COMPLETED)
  findAllTaskByUserCompleted(userId: number) {
    return this.taskRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }

  // MARK TASK AS COMPLETED BASED ON TASK ID
  update(taskId: number) {
    return this.taskRepository.update(taskId, { completed: true });
  }

  // DELETE TASK BASED ON TASK ID
  remove(taskId: number) {
    return this.taskRepository.delete(taskId);
  }
}
