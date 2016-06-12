
import T from 'typr'
import assert from 'assert'

import Devapt from 'devapt'

const RenderingPlugin = Devapt.RenderingPlugin


// HTTP METRICS COMPONENTS
import MetricsHttpDetails from './metrics/metrics_http_details'
import MetricsHttpDashboard from './metrics/metrics_http_dashboard'
import MetricsHttpTree from './metrics/metrics_http_tree'



const plugin_name = 'Devttools' 
const context = 'devtools/devtools_rendering_plugin'



/**
 * Rendering plugin class.
 * @author Luc BORIES
 * @license Apache-2.0
 */
export default class DevtoolsRenderingPlugin extends RenderingPlugin
{
	/**
	 * Create a DevtoolsRenderingPlugin instance.
	 * 
	 * @param {PluginsManager} arg_manager - plugins manager.
	 * 
	 * @returns {nothing}
	 */
	constructor(arg_manager)
	{
		super(arg_manager, plugin_name, '1.0.0')
	}
	
	
    
	/**
     * Get a feature class.
     * @param {string} arg_class_name - feature class name.
     * @returns {object} feature class.
     */
	get_feature_class(arg_class_name)
	{
		assert( T.isString(arg_class_name), context + ':get_class:bad class string')
		
		return DevtoolsRenderingPlugin.get_class(arg_class_name)
	}
	
	
	
	/**
	 * Create a resource instance.
	 * 
	 * @param {string} arg_class_name - class name.
	 * @param {string} arg_name - instance name.
	 * @param {object} arg_settings - settings object.
	 * @param {object} arg_state - state object.
	 * 
	 * @returns {Component} - component base class instance.
	 */
	create(arg_class_name, arg_name, arg_settings, arg_state)
	{
		assert( T.isString(arg_class_name), context + ':create:bad class string')
		
		switch(arg_class_name)
		{
			case 'MetricsHttpDetails':   return new MetricsHttpDetails(arg_name, arg_settings, arg_state)
			case 'MetricsHttpDashboard': return new MetricsHttpDashboard(arg_name, arg_settings, arg_state)
			case 'MetricsHttpTree':      return new MetricsHttpTree(arg_name, arg_settings, arg_state)
		}
		
		assert(false, context + ':create:bad class name')
		return undefined
	}
	
	
	
	/**
     * Get a feature class.
	 * @static
	 * 
     * @param {string} arg_class_name - feature class name.
	 * 
     * @returns {object} feature class.
	 */
	static get_class(arg_class_name)
	{
		assert( T.isString(arg_class_name), context + ':get_class:bad class string')
		
		switch(arg_class_name)
		{
			case 'MetricsHttpDetails':   return MetricsHttpDetails
			case 'MetricsHttpDashboard': return MetricsHttpDashboard
			case 'MetricsHttpTree':      return MetricsHttpDetails
		}
		
		assert(false, context + ':get_class:bad class name')
		return undefined
	}
	
	
	
	/**
	 * Plugin has class ?
	 * 
	 * @param {string} arg_class_name - class name.
	 * 
	 * @returns {boolean}
	 */
	has(arg_class_name)
	{
		switch(arg_class_name)
		{
			case 'MetricsHttpDetails':
			case 'MetricsHttpDashboard':
			case 'MetricsHttpTree':
				return true
		}
		
		return false
	}
}