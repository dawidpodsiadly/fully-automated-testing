const baseUrl = 'localhost:3033';

export class PathService {
  static readonly paths = {
    auth: baseUrl + '/auth',
    user: baseUrl + '/users',
  };
}
