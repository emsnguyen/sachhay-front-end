import { AuthService } from '../_service/auth.service';
import { TokenStorageService } from '../_service/token-storage.service';
export function appInitializer(authenticationService: AuthService, tokenStorageService:TokenStorageService) {
  return () => new Promise(resolve => {
      // attempt to refresh token on app start up to auto authenticate
      authenticationService.refreshToken()
          .subscribe(
            res => {
              // tokenStorageService.saveToken(res.data);
              console.log(res.message)
            },
            error =>{console.log("token refresh failed")}
          );
  });
}
