import { Injectable } from '@angular/core';
import { LocalStorageService } from 'services/local-storage.service';

@Injectable()
export class JWTService {
  localStorageKey = 'token';

  constructor(private localStorageService: LocalStorageService) {}

  setToken(token: string): void {
    const { localStorageKey, localStorageService } = this;

    if (token) {
      localStorageService.set(localStorageKey, token);
    }
  }

  getToken(): string | null {
    const { localStorageKey, localStorageService } = this;
    return localStorageService.get(localStorageKey);
  }
}
