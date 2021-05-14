interface Response {
  errno: number;
  message: string;
}

type SignInRequest = ({ phone: string } | { email: string }) & { password: string };

type SignInResponse = { data?: { token: string; id: number } } & Response;

type RegisterRequest = { name: string; password: string } & ({ phone: string } | { email: string });

interface HistoryRequest {
  page: number;
  limit: number;
}

type HistoryResponse<T> = { data: T[] } & Response;

interface HistorySetRequest {
  user_id: number;
  play_id: number;
  ep: number;
  play_time: number;
  video_time: number;
}

type HomeCarouselResponse<T> = { data: T[] } & Response;

type TitleSearchResponse<T> = { data: T[] } & Response;

interface PlaySearchRequest {
  keyword: string;
  page: number;
}

export declare namespace Service {
  export interface UserService {
    signIn(data: SignInRequest): Promise<SignInResponse>;
    register(data: RegisterRequest): Promise<Response>;
    authPhone(phone: string): Promise<Response>;
    authEmail(email: string): Promise<Response>;
  }

  export interface HistoryService {
    getHistoryRecords<T>(data: HistoryRequest): Promise<HistoryResponse<T>>;
    setHistoryRecords(data: HistorySetRequest): Promise<Response>;
  }

  export interface HomeService {
    getCarousel<T>(): Promise<HomeCarouselResponse<T>>;
  }

  export interface PlayService {
    searchTitle<T>(keyword: string): Promise<TitleSearchResponse<T>>;
    serachPlay<T>(data: PlaySearchRequest): Promise<TitleSearchResponse<T>>;
  }
}
