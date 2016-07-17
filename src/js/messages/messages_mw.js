
import devapt from 'devapt'
import common_mw from '../common_mw'
// import MessagesTable from './messages_table'


const Render = devapt.Render
const renderer = new Render('html_assets_1', 'html_assets_1', 'html_assets_1', undefined)
// const Container = renderer.rendering_manager.get_feature_class('Container')
// const messages_view = new Container('messages_view', { render:renderer })


export default common_mw(renderer, 'messages_view', 'Devapt Devtools - Messages', 'Devtools', 'devtools')
