import { Page } from '@playwright/test';
import { baseUrl } from '../config';

const pathParams = {
    id: ':id',
  };

export const navigationPaths = {
    USER_TABLE: '',
    USER_CREATE: '/create',
    USER_EDIT: `/edit/${pathParams.id}`
};
export type NavigationPath = keyof typeof navigationPaths;

function computeNavigationPaths(): Record<NavigationPath, NavigationPath>{
    const result: Record<string, string> = {};
    Object.keys(navigationPaths).forEach(key => (result[key] = key));
    return result as Record<NavigationPath, NavigationPath>;
}

export const NavigationPaths: Record<NavigationPath, NavigationPath> = computeNavigationPaths();

class NavigationService {
    async navigateTo(page: Page, path: NavigationPath, id?: string) {
        await page.goto(baseUrl + await this.resolvePath(path, id));
    }

    async resolvePath(path: NavigationPath, id?: string): Promise<string> {
        const resolvedPath = navigationPaths[path];
        return id ? resolvedPath.replace(pathParams['id'], id) : resolvedPath;
      }
  }
  
  export const navigationService = new NavigationService();