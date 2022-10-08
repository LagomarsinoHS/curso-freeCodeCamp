import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup() {
    return `I am Signing Un`;
  }
  login() {
    return `I am Signing In`;
  }
}
