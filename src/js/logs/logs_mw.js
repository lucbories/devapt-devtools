
import devapt from 'devapt'
import common_mw from '../common_mw'
import LogsTable from './logs_table'


const Render = devapt.Render
const renderer = new Render('html_assets_1', 'html_assets_1', 'html_assets_1', undefined)
const logs_table = new LogsTable('logs_table', { render:renderer })


export default common_mw(renderer, logs_table, 'Devapt Devtools - Logs', 'Devtools', 'devtools')
