import { test, expect, Page } from '@playwright/test';

export const basicUrl = 'http://localhost:3001'

const pathParams = {
    id: ':id',
  };

export const navigationPaths = {
    USER_TABLE: basicUrl,
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
        await page.goto(basicUrl + await this.resolvePath(path, id));
    }

    async resolvePath(path: NavigationPath, id?: string): Promise<string> {
        const resolvedPath = navigationPaths[path];
        return id ? resolvedPath.replace(pathParams['id'], id) : resolvedPath;
      }
  }
  
  export const navigationService = new NavigationService();