
export default function get_menubar_menus()
{
	const json = require('../resources/devtools/ui_menubars.json')
	return json.menubars.default.menus
}
