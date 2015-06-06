( function () {

	/**
	 * @class mw.languageTool
	 * @singleton
	 */
	mw.languageTool = function VeUiMWLanguageTool( toolGroup, config ) {
			ve.ui.DialogTool.call( this, toolGroup, config );
		};
	OO.inheritClass( mw.languageTool, ve.ui.DialogTool );
	mw.languageTool.static.name = 'Language';
	mw.languageTool.static.group = 'meta';
	mw.languageTool.static.icon = 'picture';
	mw.languageTool.static.title = 'LanguageTool';
	/**
	 *Function to extract text from VisualEditor
	 */
	function extractText(){
		var nodes = [];
		var model = ve.init.target.getSurface().getModel();
		function getTextNodes( obj ) {
			var i;
 
			for ( i = 0; i < obj.children.length; i++ ) {
				if ( obj.children[i].type == 'text'){
					nodes.push(obj.children[i]);
				}
 
				if ( obj.children[i].children ) {
					getTextNodes( obj.children[i] );
				}
			}
		}
		getTextNodes(ve.init.target.getSurface().getModel().getDocument().getDocumentNode());
		return nodes;
	}
	function sendText(){
		var textNodes = extractText();
		for (var nodeI = 0; nodeI < textNodes.length; nodeI++) {
			var node = textNodes[nodeI];
			var nodeRange = node.getRange();
			var nodeText = model.getLinearFragment(nodeRange).getText();
			console.log(nodeText);
		}
	}
 

	//mw.languageTool.static.modelClasses = [ ve.dm.MWBlockImageNode, ve.dm.MWInlineImageNode ];
	//mw.languageTool.static.commandName = 'media';
	//mw.languageTool.static.autoAddToCatchall = false;
	//mw.languageTool.static.autoAddToGroup = false;
	ve.ui.toolFactory.register( mw.languageTool );
}() );
