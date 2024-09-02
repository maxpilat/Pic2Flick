import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Logger {
  logAction(action: string) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Action: ${action}`);
  }
}
