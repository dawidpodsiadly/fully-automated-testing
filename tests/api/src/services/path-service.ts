const baseUrl = 'http://35.241.214.139/api';

export class PathService {
  static readonly paths = {
    auth: baseUrl + '/auth',
    users: baseUrl + '/users',
  };
}
