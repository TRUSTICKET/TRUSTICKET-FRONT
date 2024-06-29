import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  constructor(private zone: NgZone) {}

  public getServerSentEvent(url: string): EventSource {
    return new EventSource(url);
  }
}