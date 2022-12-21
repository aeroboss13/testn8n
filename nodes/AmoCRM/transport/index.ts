import { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions } from 'n8n-core';

import { GenericValue, IDataObject, IHttpRequestMethods, IHttpRequestOptions } from 'n8n-workflow';

export async function apiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject | GenericValue | GenericValue[] = {},
	query: IDataObject = {},
) {
	const credentials = await this.getCredentials('amocrmOAuth2Api');

	const options: IHttpRequestOptions = {
		method,
		body,
		qs: query,
		url: `https://${credentials.subdomain}.amocrm.ru/api/v4/${endpoint}`,
		headers: {
			'content-type': 'application/json; charset=utf-8',
		},
	};

	return this.helpers.httpRequestWithAuthentication.call(this, 'amocrmOAuth2Api', options);
}

export async function apiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD',
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
) {
	const returnData: any[] = [];

	let responseData;
	query.page = 1;
	query.limit = 250;

	do {
		responseData = await apiRequest.call(this, method, endpoint, body, query);
		query.page++;
		returnData.push(responseData);
	} while (responseData._links?.next?.href?.length);

	return returnData;
}