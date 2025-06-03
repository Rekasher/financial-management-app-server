import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpDto, @Res() res: Response) {
    const {access_token} = await this.authService.signUp(body.email, body.name, body.password);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return res.status(200).json({ message: "Successfully registered" });
  }

  @Post('sign-in')
  async signIn(
    @Body() body: SignInDto,
    @Res() res: Response
  ){
    const {access_token} = await this.authService.signIn(body.email, body.password);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return res.status(200).json({ message: "Successfully logged in" });
  }
}