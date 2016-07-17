
import devapt from 'devapt'
import common_mw from '../common_mw'
// import LogsTable from './logs_table'


const Render = devapt.Render
const renderer = new Render('html_assets_1', 'html_assets_1', 'html_assets_1', undefined)
// const Container = renderer.rendering_manager.get_feature_class('Container')
// const logs_view = new Container('logs_view', { render:renderer })

// console.log(logs_view, 'logs_view')

export default common_mw(renderer, 'logs_view', 'Devapt Devtools - Logs', 'Devtools', 'devtools')
