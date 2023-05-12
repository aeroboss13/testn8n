import { IDisplayOptions } from 'n8n-workflow';
import { ILeadsProperties } from '../../interfaces';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['pipelines'],
		operation: ['delete'],
	},
};

export const description: ILeadsProperties = [
	{
		displayName: 'Pipeline',
		name: 'id',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getPipelines',
		},
		required: true,
		displayOptions,
	},
];
