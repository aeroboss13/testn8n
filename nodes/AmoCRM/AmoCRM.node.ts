import { IExecuteFunctions } from 'n8n-core';
import { INodeType, INodeTypeDescription } from 'n8n-workflow';

import { router } from './resources/router';
import * as account from './resources/account';
import * as leads from './resources/leads';
import * as contacts from './resources/contacts';
import * as companies from './resources/companies';
import * as unsorted from './resources/unsorted';
import * as pipelines from './resources/pipelines';
import * as statuses from './resources/statuses';

import * as loadOptions from './methods';

export class AmoCRM implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'AmoCRM',
		name: 'amoCrm',
		icon: 'file:amocrm_logo.png',
		group: ['transform'],
		version: 1,
		description: 'Consume AmoCRM API',
		defaults: {
			name: 'AmoCRM',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'amocrmOAuth2Api',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Leads',
						value: 'leads',
					},
					{
						name: 'Contacts',
						value: 'contacts',
					},
					{
						name: 'Companies',
						value: 'companies',
					},
					{
						name: 'Unsorted',
						value: 'unsorted',
					},
					{
						name: 'Pipelines',
						value: 'pipelines',
					},
					{
						name: 'Statuses',
						value: 'statuses',
					},
				],
				default: 'account',
				noDataExpression: true,
				required: true,
				description: 'Select resource',
			},
			...account.descriptions,
			...leads.descriptions,
			...unsorted.descriptions,
			...contacts.descriptions,
			...companies.descriptions,
			...pipelines.descriptions,
			...statuses.descriptions,
		],
	};

	methods = { loadOptions };

	async execute(this: IExecuteFunctions) {
		return router.call(this);
	}
}
