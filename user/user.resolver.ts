import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput, LoginInput } from 'src/graphql';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation('createUser')
  signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.signUp(createUserInput);
  }
  
  @Mutation('login')
  login(@Args('loginInput') loginUser: LoginInput) {
    return this.authService.login(loginUser);
  }

  // 유저를 만들고 user정보를 호출해볼 쿼리
  @Query('user')
  me() {
    return '';
  }
}