import { Injectable } from '@angular/core';
import { AuthResponse } from './interfaces/auth-response';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly SESSION_KEY: string = 'session_type';
  private readonly TOKEN_KEY: string = 'access_token';
  private readonly REFRESH_TOKEN_KEY: string = 'refresh_token';
  private readonly EXPIRES_AT_KEY: string = 'expires_at';

  public setSession(response: AuthResponse, type: string, isRefresh: boolean): void {
    console.log('[storage] set session', response);
    const expiresAtInSec: number = Math.floor(Date.now() / 1000) + response.expires_in;

    localStorage.setItem(this.SESSION_KEY, type);
    localStorage.setItem(this.TOKEN_KEY, response.access_token);
    if (!isRefresh && response.refresh_token) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refresh_token);
    }
    localStorage.setItem(this.EXPIRES_AT_KEY, JSON.stringify(expiresAtInSec));
  }

  public isSessionNormal(): boolean {
    return localStorage.getItem(this.SESSION_KEY) === 'normal';
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  public getExpirationDate(): number {
    const dateStr = localStorage.getItem(this.EXPIRES_AT_KEY);

    return dateStr ? Number(dateStr) : 0;
  }

  public isAuthorisedSession(): boolean {
    const isAuthorisedSession = this.isSessionNormal();
    const accessToken = this.getToken();
    const isExpirationDateOk = Date.now() / 1000 < this.getExpirationDate();

    return !!(isAuthorisedSession && accessToken && isExpirationDateOk);
  }

  public isAccessTokenExpiredOnly(): boolean {
    const isAuthorisedSession = this.isSessionNormal();
    const hasRefreshToken = this.getRefreshToken() !== null;

    return hasRefreshToken && isAuthorisedSession;
  }

  public clearStorage(): void {
    localStorage.clear();
  }
}
