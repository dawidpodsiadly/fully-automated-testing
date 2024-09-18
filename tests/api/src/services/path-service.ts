const baseUrl = 'localhost:3050';

export class PathService {
  static readonly paths = {
    auth: baseUrl + '/auth',
    users: baseUrl + '/users',
  };
}
