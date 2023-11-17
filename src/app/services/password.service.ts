import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Número de rondas de sal para la encriptación
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
