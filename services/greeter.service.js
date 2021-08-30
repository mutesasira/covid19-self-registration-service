"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */


module.exports = {
	name: "greeter",

	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: ['dhis2'],

	/**
	 * Actions
	 */

	actions: {

		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */

		validateNin:{
			rest:{
				method: 'GET',
				path: '/validateNin'
			},
			async handler(ctx) {
				const {
					value
				} = ctx.params;
				const response = await ctx.call('dhis2.get', { url: 'trackedEntityInstances', program: 'yDuAzyqYABS', ouMode: 'ALL', fields:'*', filter: `Ewi7FUfcHAD:eq:${value}` });
				return response['trackedEntityInstances'].length>0?false:true;
				
			}
		},

		checkId: {
			rest: {
				method: 'GET',
				path: '/checkId'
			},

			async handler(ctx) {
				const {
					identifier,
					value
				} = ctx.params;

				return ctx.call('dhis2.get', { url: 'trackedEntityInstances', program: 'yDuAzyqYABS', ouMode: 'ALL', filter: `${identifier}:eq:${value}` });
			}

		},

		post: {
			rest: {
				method: "POST",
				path: "/insert"
			},
			async handler(ctx) {
				try {
					const response = await ctx.call('dhis2.post', { url: 'trackedEntityInstances', ...ctx.params });
					return response;
				} catch (error) {
					console.log()
				}
			}
		},
	
		pdf: {
			rest: {
				method: "GET",
				path: "/insert"
			},
			async handler(ctx) {
				try {
					const response = await ctx.call('dhis2.post', { url: 'trackedEntityInstances', ...ctx.params });
					console.log(response)
					return response;
				} catch (error) {
					console.log()
				}
			}
		},

		options: {
			rest: {
				method: "GET",
				path: "/options"
			},
			async handler(ctx) {
				return ctx.call('dhis2.get', { url: `optionSets/${ctx.params.optionSet}.json`, fields: 'options[name,code]' });
			}
		},


		hello: {
			rest: {
				method: "GET",
				path: "/hello"
			},
			async handler(ctx) {
				return ctx.call('dhis2.get', { url: 'organisationUnits.json', level: '3' });
			}
		},
		districts: {
			rest: {
				method: "GET",
				path: "/districts"
			},
			async handler(ctx) {
				return ctx.call('dhis2.get', { url: 'organisationUnits.json', level: '3', paging: false, fields: 'id,name' });
			}
		},
		facilities: {
			rest: {
				method: "GET",
				path: "/facilities"
			},
			async handler(ctx) {
				const { organisationUnits } = await ctx.call('dhis2.get', { url: `organisationUnits/${ctx.params.district}.json`, includeDescendants: true, fields: 'id,name,level' });
				return organisationUnits.filter((ou) => ou.level === 5)
			}
		}
	},
	vacfacilities:{
		rest:{
			method: 'GET',
			path: '/vacfacilities'
		},
		async handler(ctx) {
			
			const {vacfacility} = await ctx.call('dhis2.get', { url: `dataSets/nTlQefWKMmb.json`, fields: 'organisationUnits[id,name,parent[id,name,parent[id,name]]' });
			return vacfacilities.filter((ou) => ou.level === 5)
			
			
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
