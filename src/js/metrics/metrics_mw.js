
import devapt from 'devapt'
import common_mw from '../common_mw'
import MetricsTable from './metrics_table'
import MetricsHttpTable from './metrics_http_table'
import MetricsTree from './metrics_tree'


const Render = devapt.Render
const renderer = new Render('html_assets_1', 'html_assets_1', 'html_assets_1', undefined)
const Tabs = renderer.rendering_manager.get_feature_class('Tabs')

const metrics_table = new MetricsTable('metrics_table', { render:renderer })
const metrics_http_table = new MetricsHttpTable('metrics_http_table', { render:renderer })
const metrics_tree = new MetricsTree('metrics_tree', { render:renderer })

const tabs_cfg = [
	{
		label:'Live details',
		content_view:'metrics_table'
	},
	{
		label:'Topology',
		content_html:'<strong>Topological view</strong>'
	},
	{
		label:'Tree',
		content_view:'metrics_tree'
	},
	{
		label:'Http table',
		content_view:'metrics_http_table'
	},
	{
		label:'Per Server',
		content_html:'<strong>Server 1</strong>'
	}
]
const metrics_tabs = new Tabs('metrics_tabs', { render:renderer, state:{items:tabs_cfg, label:'Metrics Tabs'} })
metrics_tabs.add_child(metrics_table)
metrics_tabs.add_child(metrics_http_table)
metrics_tabs.add_child(metrics_tree)

export default common_mw(renderer, metrics_tabs, 'Devapt Devtools - Metrics', 'Devtools', 'devtools')
