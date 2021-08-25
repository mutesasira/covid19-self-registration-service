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
		clientCategory: {
			rest: {
				method: "GET",
				path: "/clientCategory"
			},
			async handler(ctx) {
				return ctx.call('dhis2.get', { url: 'trackedEntityAttributes.json'});
			}
		},

		districtSubcounty: {
			rest: {
				method: "GET",
				path: "/districtSubcounty"
			},
			async handler(ctx) {
				return ctx.call('dhis2.get', { url: 'optionSets.json'});
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
