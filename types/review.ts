export interface GoogleReview {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string;
  text: string;
  avatar?: string;
}
