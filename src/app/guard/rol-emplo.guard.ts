import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {inject} from '@angular/core'
export const rolEmploGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!(authService.showRole()==='EMPLO' || authService.showRole()==='ADMIN'  ))
  {
    router.navigate(['login'])
    return false
  }
  return true;
};
