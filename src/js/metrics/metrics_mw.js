
import devapt from 'devapt'
import common_mw from '../common_mw'


// HTTP METRICS COMPONENTS
import MetricsTable from './metrics_http_details'
import MetricsHttpTable from './metrics_http_dashboard'
import MetricsTree from './metrics_http_tree'


// BUS METRICS COMPONENTS


// STANDARD COMPONENTS
const Container = devapt.Container
const Render = devapt.Render
const renderer = new Render('html_assets_1', 'html_assets_1', 'html_assets_1', undefined)
const Tabs = renderer.rendering_manager.get_feature_class('Tabs')
const Table = renderer.rendering_manager.get_feature_class('Table')
const Button = renderer.rendering_manager.get_feature_class('Button')
const InputField = renderer.rendering_manager.get_feature_class('InputField')



// GET UI METRICS CONFIG
const json = require('../../resources/devtools/ui_metrics.json')



// BUILD HTTP METRICS UI
const metrics_http_dashboard = new MetricsHttpTable('metrics_http_dashboard', { render:renderer })
const metrics_http_tree = new MetricsTree('metrics_http_tree', { render:renderer })
const metrics_http_details_table = new MetricsTable('metrics_http_details_table', { render:renderer })

const metrics_http_details_max_cfg = json.views.metrics_http_details_max.settings
const metrics_http_details_max = new InputField('metrics_http_details_max', metrics_http_details_max_cfg)

const metrics_http_details_clear_cfg = json.views.metrics_http_details_clear.settings
const metrics_http_details_clear = new Button('metrics_http_details_clear', metrics_http_details_clear_cfg)

const metrics_http_details_toolsbar = new Container('metrics_http_details_toolsbar', {label:'metrics_http_details_toolsbar'})
metrics_http_details_toolsbar.add_child(metrics_http_details_clear)
metrics_http_details_toolsbar.add_child(metrics_http_details_max)

const metrics_http_details = new Container('metrics_http_details', {label:'metrics_http_details'})
metrics_http_details.add_child(metrics_http_details_toolsbar)
metrics_http_details.add_child(metrics_http_details_table)



// BUILD HOST/NODEJS/BUS METRICS UI
const metrics_host_dashboard_settings = json.views.metrics_host_dashboard.settings
const metrics_host_dashboard = new Table('metrics_host_dashboard', metrics_host_dashboard_settings)

const metrics_nodejs_dashboard_settings = json.views.metrics_nodejs_dashboard.settings
const metrics_nodejs_dashboard = new Table('metrics_nodejs_dashboard', metrics_nodejs_dashboard_settings)

const metrics_bus_dashboard_settings = json.views.metrics_bus_dashboard.settings
const metrics_bus_dashboard = new Table('metrics_bus_dashboard', metrics_bus_dashboard_settings)



// BUILD METRICS MAIN UI
const metrics_tabs_settings = json.views.metrics_tabs.settings
const metrics_tabs = new Tabs('metrics_tabs', metrics_tabs_settings)
metrics_tabs.add_child(metrics_http_details)
metrics_tabs.add_child(metrics_http_dashboard)
metrics_tabs.add_child(metrics_http_tree)
metrics_tabs.add_child(metrics_host_dashboard)
metrics_tabs.add_child(metrics_nodejs_dashboard)
metrics_tabs.add_child(metrics_bus_dashboard)



// METRICS MIDDLEWARE
export default common_mw(renderer, metrics_tabs, 'Devapt Devtools - Metrics', 'Devtools', 'devtools')
