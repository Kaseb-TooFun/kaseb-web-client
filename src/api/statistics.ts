import { statisticsInstance } from 'src/api/instance';

export const getWebsiteTotalCounts = (websiteId: string) =>
	statisticsInstance.get(`/api/report/total/website/${websiteId}`);

export const getActionTotalCounts = (websiteId: string, actionId: string) =>
	statisticsInstance.get(`/api/report/total/website/${websiteId}/action/${actionId}`);
