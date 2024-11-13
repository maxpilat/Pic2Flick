import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

export type Pin = {
  id: string;
  alt_description: string;
  asset_type: string;
  blur_hash: string;
  color: string;
  created_at: string;
  likes: number;
  liked_by_user: boolean;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
  };
  width: number;
  height: number;
};

@Injectable({
  providedIn: 'root',
})
export class PinService {
  constructor(private http: HttpClient) {}

  getPins(page: number, perPage = 20) {
    return this.http.get<Pin[]>(`${environment.unsplashApiUrl}/photos/?page=${page}&per_page=${perPage}`);
  }
}
