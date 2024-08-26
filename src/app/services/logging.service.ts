import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  logAction(action: string) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Action: ${action}`);
  }
}
