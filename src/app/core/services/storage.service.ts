import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
//   providedIn: 'root',
//   factory: () => localStorage
// });

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get(key: string): string {
    if ( isPlatformBrowser(this.platformId) ) {
        return localStorage.getItem(key);
    }
  }

  set(key: string, value: string) {
    if ( isPlatformBrowser(this.platformId) ) {
        localStorage.setItem(key, value);
    }
  }

  remove(key: string) {
    if ( isPlatformBrowser(this.platformId) ) {
        localStorage.removeItem(key);
    }
  }

  clear() {
    if ( isPlatformBrowser(this.platformId) ) {
        localStorage.clear();
    }
  }

  check(key: string): boolean {
    if ( isPlatformBrowser(this.platformId) ) {
      const val = localStorage.getItem(key);
      return (val !== undefined && val !== null && val.length > 0);
    } else {
      return false;
    }
  }
}
