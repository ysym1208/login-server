import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserInput } from './dto/create-user.input';
import { encryptPassword } from '../auth/util/bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(createUserInput: CreateUserInput) {
    const isExist = await this.userRepository.findByEmail(createUserInput.email);
    if (isExist) {
      throw new HttpException('등록된 유저입니다', HttpStatus.BAD_REQUEST);
    }
    const encryptedPasswordUser = await encryptPassword(createUserInput);
    return this.userRepository.create(encryptedPasswordUser);
  }
}

