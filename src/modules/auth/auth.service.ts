import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { id: user.id, email: user.email, name: user.name };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(email: string, name: string, password: string) {
    const userEmail = await this.userService.findUserByEmail(email);
    if (userEmail) {
      throw new ConflictException('User already exists');
    }
    const userName = await this.userService.findUserByName(name);
    if (userName) {
      throw new ConflictException('User already exists');
    }

    if (password.length < 6) {
      throw new BadRequestException('Password must contain at least 6 characters ');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.createUser(email, name, hashedPassword)

    const payload = { id: user.id, email: user.email, name: user.name };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

}
