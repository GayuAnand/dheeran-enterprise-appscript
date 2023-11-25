import { Injectable } from '@angular/core';

import { IUser } from '../interfaces';

@Injectable()
export class AuthService {
  user!: IUser;
}
