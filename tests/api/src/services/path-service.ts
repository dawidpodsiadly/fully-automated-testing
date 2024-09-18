const baseUrl = 'localhost:3000';

export class PathService {
  static readonly paths = {
    auth: baseUrl + '/auth',
    users: baseUrl + '/users',
  };
}
