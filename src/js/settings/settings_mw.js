// NPM IMPORTS
import assert from 'assert'
import T from 'typr'
import devapt from 'devapt'

// DEVTOOLS IMPORTS
import common_mw from '../common_mw'



// STANDARD COMPONENTS
const config = devapt.runtime.get_registry().root
const RenderingBuilder = devapt.RenderingBuilder
const renderer = new RenderingBuilder(devapt.runtime)
const Tabs = renderer.rendering_manager.get_feature_class('Tabs')



// SETTINGS COMPONENTS VIEWS
// const apps_settings = config.toMap().toJS()
const apps_settings = config.get('applications').toMap().toJS()
const modules_settings = config.get('modules').toMap().toJS()
const plugins_settings = config.get('plugins').toMap().toJS()
const resources_settings = config.get('resources').toMap().toJS()
const security_settings = config.get('security').toMap().toJS()
const nodes_settings = config.get('nodes').toMap().toJS()
const services_settings = config.get('services').toMap().toJS()
const loggers_settings = config.get('loggers').toMap().toJS()
const traces_settings = config.get('traces').toMap().toJS()

const apps_settings_cfg = { state:{tree:apps_settings, label:'Applications settings'} }
const apps_settings_tree = renderer.rendering_manager.create('Tree', 'apps_settings_tree', apps_settings_cfg)
assert( T.isObject(apps_settings_tree) && apps_settings_tree.is_component, 'settings_mw:bad applications Tree component object')
renderer.rendering_manager.add_instance(apps_settings_tree)

const modules_settings_cfg = { state:{tree:modules_settings, label:'Modules settings'} }
const modules_settings_tree = renderer.rendering_manager.create('Tree', 'modules_settings_tree', modules_settings_cfg)
assert( T.isObject(modules_settings_tree) && modules_settings_tree.is_component, 'settings_mw:bad modules Tree component object')
renderer.rendering_manager.add_instance(modules_settings_tree)

const plugins_settings_cfg = { state:{tree:plugins_settings, label:'Plugins settings'} }
const plugins_settings_tree = renderer.rendering_manager.create('Tree', 'plugins_settings_tree', plugins_settings_cfg)
assert( T.isObject(plugins_settings_tree) && plugins_settings_tree.is_component, 'settings_mw:bad plugins Tree component object')
renderer.rendering_manager.add_instance(plugins_settings_tree)

const resources_settings_cfg = { state:{tree:resources_settings, label:'Resources settings'} }
const resources_settings_tree = renderer.rendering_manager.create('Tree', 'resources_settings_tree', resources_settings_cfg)
assert( T.isObject(resources_settings_tree) && resources_settings_tree.is_component, 'settings_mw:bad resources Tree component object')
renderer.rendering_manager.add_instance(resources_settings_tree)

const security_settings_cfg = { state:{tree:security_settings, label:'Security settings'} }
const security_settings_tree = renderer.rendering_manager.create('Tree', 'security_settings_tree', security_settings_cfg)
assert( T.isObject(security_settings_tree) && security_settings_tree.is_component, 'settings_mw:bad security Tree component object')
renderer.rendering_manager.add_instance(security_settings_tree)

const nodes_settings_cfg = { state:{tree:nodes_settings, label:'Nodes settings'} }
const nodes_settings_tree = renderer.rendering_manager.create('Tree', 'nodes_settings_tree', nodes_settings_cfg)
assert( T.isObject(nodes_settings_tree) && nodes_settings_tree.is_component, 'settings_mw:bad nodes Tree component object')
renderer.rendering_manager.add_instance(nodes_settings_tree)

const services_settings_cfg = { state:{tree:services_settings, label:'Services settings'} }
const services_settings_tree = renderer.rendering_manager.create('Tree', 'services_settings_tree', services_settings_cfg)
assert( T.isObject(services_settings_tree) && services_settings_tree.is_component, 'settings_mw:bad services Tree component object')
renderer.rendering_manager.add_instance(services_settings_tree)

const loggers_settings_cfg = { state:{tree:loggers_settings, label:'Loggers settings'} }
const loggers_settings_tree = renderer.rendering_manager.create('Tree', 'loggers_settings_tree', loggers_settings_cfg)
assert( T.isObject(loggers_settings_tree) && loggers_settings_tree.is_component, 'settings_mw:bad loggers Tree component object')
renderer.rendering_manager.add_instance(loggers_settings_tree)

const traces_settings_cfg = { state:{tree:traces_settings, label:'Traces settings'} }
const traces_settings_tree = renderer.rendering_manager.create('Tree', 'traces_settings_tree', traces_settings_cfg)
assert( T.isObject(traces_settings_tree) && traces_settings_tree.is_component, 'settings_mw:bad traces Tree component object')
renderer.rendering_manager.add_instance(traces_settings_tree)



// BUILD SETTINGS MAIN VIEW
const settings_tabs_cfg = devapt.runtime.get_registry().get_view('settings_tabs')
const settings_tabs = new Tabs('settings_tabs', settings_tabs_cfg)


// SERVICE VIEW CONFIG
export const service_cfg = {
	view:settings_tabs,
	title:'Devapt Devtools - Settings',
	label:'Devtools',
	url:'devtools'
}


// SERVICE MIDDLEWARE
export default common_mw(renderer, settings_tabs, 'default_menubar', 'Devapt Devtools - Settings')
