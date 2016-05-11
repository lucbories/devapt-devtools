
import devapt from 'devapt'
import common_mw from '../common_mw'
import MessagesTable from './messages_table'


const Render = devapt.Render
const renderer = new Render('html_assets_1', 'html_assets_1', 'html_assets_1', undefined)
const messages_table = new MessagesTable('messages_table', { render:renderer })


export default common_mw(renderer, messages_table, 'Devapt Devtools - Messages', 'Devtools', 'devtools')
