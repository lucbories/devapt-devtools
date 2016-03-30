
// import T from 'typr'
// import assert from 'assert'
// import devapt from 'devapt'



// const runtime = devapt.runtime

export default function get_menubar_menus()
{
	return [
		{ url:'/store/config/all/', label:'Config All' },
		{ label:'Config',
			items:[
				{ url:'/store/config/applications/', label:'Config Applications' },
				{ url:'/store/config/resources/', label:'Config Resources' },
				{ url:'/store/config/views/', label:'Config Views' },
				{ url:'/store/config/models/', label:'Config Models' },
				{ url:'/store/config/menubars/', label:'Config Menubars' },
				{ url:'/store/config/menus/', label:'Config Menus' },
				{ url:'/store/config/modules/', label:'Config Modules' },
				{ url:'/store/config/plugins/', label:'Config Plugins' },
				{ url:'/store/config/nodes/', label:'Config Nodes' },
				{ url:'/store/config/services/', label:'Config Services' }
			]
		},
		{ url:'/store/runtime/', label:'Runtime' },
		{ url:'/metrics/', label:'Metrics' }
	]
}

/*
function get_menubar_anchors_html(arg_app_url, arg_request)
{
	const menus = get_menubar_menus()
	let html = ''
	
	menus.forEach(
		function(value)
		{
			const url = runtime.context.get_url_with_credentials(arg_app_url + value.url)
			html += '<a href="/' + url + '">' + value.label + '</a>\n'
		}
	)
	
	return html
}
*/
/*
export default function get_menubar_anchors(arg_app_url, arg_request)
{
	const menus = get_menubar_menus()
	let urls = [];
	
	menus.forEach(
		function(value)
		{
			const url = runtime.context.get_url_with_credentials(arg_app_url + value.url, arg_request)
			const anchor =  '<a href="/' + url + '">' + value.label + '</a>\n'
			urls.push(anchor)
		}
	)
	
	return urls
}*/
