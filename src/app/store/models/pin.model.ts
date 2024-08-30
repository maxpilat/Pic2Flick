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
