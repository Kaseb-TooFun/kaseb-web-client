import { statisticsInstance } from 'src/api/instance';

export const getWebsiteTotalCounts = (websiteId: string) =>
	statisticsInstance.get(`/api/report/total/website/${websiteId}`);

export const getActionTotalCounts = (websiteId: string, actionId: string) =>
	statisticsInstance.get(`/api/report/total/website/${websiteId}/action/${actionId}`);

export const getWebsiteDaysCounts = (websiteId: string) =>
	statisticsInstance.get(`/api/report/days/website/${websiteId}`);

export const getActionDaysCounts = (websiteId: string, actionId: string) =>
	statisticsInstance.get(`/api/report/days/website/${websiteId}/action/${actionId}`);
