import { Controller, Post, Body, HttpStatus, HttpCode, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegisterDto } from './dto';

interface SuccessResponse {
  status: 'success';
  token: string;
}

interface ErrorResponse {
  statusCode: number;
  message: string
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() userData: RegisterDto,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const { email, password, name } = userData;

      const alreadyExists = await this.userService.getOne({ email });

      if (alreadyExists) {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'User already exists'
        }, HttpStatus.CONFLICT);
      }

      const hashedPassword = this.userService.hashPassword(password);
      const user = await this.userService.create({ email, customer: name, pass: hashedPassword });

      const payload = {
        id: user.id,
        email,
        customer: user.customer,
        createdAt: user.createdAt
      }
      const token = this.userService.generateToken(payload);

      return { status: 'success', token };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error creating user'
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() loginData: LoginDto,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const { email, password } = loginData;

      const user = await this.userService.getOne({ email });

      if (!user) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'User not found'
        }, HttpStatus.NOT_FOUND);
      }

      if (user.pass !== this.userService.hashPassword(password)) {
        throw new HttpException({
          status: HttpStatus.UNAUTHORIZED,
          error: 'Invalid password'
        }, HttpStatus.UNAUTHORIZED);
      }

      const payload = {
        id: user.id,
        email,
        customer: user.customer,
        createdAt: user.createdAt
      }
      const token = this.userService.generateToken(payload);

      return { status: 'success', token };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error logging in'
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }
}