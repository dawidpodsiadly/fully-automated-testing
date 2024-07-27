const baseUrl = 'localhost:3113';

export class PathService {
  static readonly paths = {
    auth: baseUrl + '/auth',
    users: baseUrl + '/users',
  };
}
