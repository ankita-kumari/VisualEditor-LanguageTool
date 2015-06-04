( function () {

	/**
	 * @class mw.languageTool
	 * @singleton
	 */
	mw.languageTool = function VeUiMWLanguageTool( toolGroup, config ) {
			ve.ui.DialogTool.call( this, toolGroup, config );
		};
	OO.inheritClass( ve.ui.MWLanguageTool, ve.ui.DialogTool );
	ve.ui.MWLanguageTool.static.name = 'Language';
	ve.ui.MWLanguageTool.static.group = 'object';
	ve.ui.MWLanguageTool.static.icon = 'picture';
	ve.ui.MWLanguageTool.static.title = 'LanguageTool';
	//ve.ui.MWLanguageTool.static.modelClasses = [ ve.dm.MWBlockImageNode, ve.dm.MWInlineImageNode ];
	//ve.ui.MWLanguageTool.static.commandName = 'media';
	//ve.ui.MWLanguageTool.static.autoAddToCatchall = false;
	//ve.ui.MWLanguageTool.static.autoAddToGroup = false;
	ve.ui.toolFactory.register( ve.ui.MWLanguageTool );
}() );
