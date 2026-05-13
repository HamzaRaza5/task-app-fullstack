import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Constants } from 'src/utils/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create new User
  create(createUserDto: CreateUserDto) {
    let user: User = new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE; // signup me default Normal_User_Role assign kia he
    return this.userRepository.save(user);
  }

  findUserById(id : number){
    return this.userRepository.findOneOrFail({where : {id : id}})
  }

  // find all Users
  findAll() {
    return this.userRepository.find();
  }

  // Find User by Email
  findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  // Delete User by id
  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
