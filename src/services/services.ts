import { AuthenticationService } from 'services/authentication.service';
import { FormService } from 'services/form.service';
import { JWTService } from 'services/jwt.service';
import { LocalStorageService } from 'services/local-storage.service';

export const Services = [
  AuthenticationService,
  FormService,
  JWTService,
  LocalStorageService,
];
