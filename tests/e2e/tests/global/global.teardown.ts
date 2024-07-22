import { cleanupService } from "../../services/cleanup.service";


export default async () => {
  await cleanupService.performFullCleanup();
};
