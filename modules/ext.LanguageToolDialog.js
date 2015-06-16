/*!
 * VisualEditor user interface LanguageToolDialog class.
 *
 * @copyright 2011-2015 VisualEditor Team and others; see AUTHORS.txt
 * @license The MIT License (MIT); see LICENSE.txt
 */

/**
 * Dialog for welcoming new users to VisualEditor.
 *
 * @class
 * @extends OO.ui.MessageDialog
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
ve.ui.LanguageToolDialog = function VeUiLanguageToolDialog( config ) {
	// Parent constructor
	ve.ui.LanguageToolDialog.super.call( this, config );
};

/* Inheritance */

OO.inheritClass( ve.ui.LanguageToolDialog, OO.ui.MessageDialog );

/* Static Properties */

ve.ui.LanguageToolDialog.static.name = 'languageTool';

ve.ui.LanguageToolDialog.static.size = 'medium';

ve.ui.LanguageToolDialog.static.verbose = true;

ve.ui.LanguageToolDialog.static.icon = 'help';

ve.ui.LanguageToolDialog.static.actions = [
	{
		label: OO.ui.deferMsg( 'visualeditor-dialog-beta-welcome-action-continue' ),
		flags: [ 'progressive', 'primary' ]
	}
];

/**
 * Extract text from all text nodes
 *
 * @method
 * @return {boolean} Action was executed
 */
ve.ui.LanguageToolDialog.prototype.extract = function () {
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

/**
 * Send text to LanguageTool server
 *
 * @method
 * @return {boolean} Action was executed
 */
ve.ui.LanguageToolDialog.prototype.send = function () {
		var textNodes = this.extract();
		var model = ve.init.target.getSurface().getModel();
		var text = "";
		for (var nodeI = 0; nodeI < textNodes.length; nodeI++) {
			var node = textNodes[nodeI];
			var nodeRange = node.getRange();
			var nodeText = model.getLinearFragment(nodeRange).getText();
			text += nodeText;
			//console.log(nodeText);
		}
		console.log(text);
		var lang = mw.config.get( 'wgPageContentLanguage' );
		//console.log(lang);
		var params = "language=" + lang + "&text=" + text;
		//console.log(params);
		
		/*$.ajax('https://tools.wmflabs.org/languageproofing', {data: {language: lang,  text: text}}, success : function(d) {
                    xml = d;
                }).done(function(d){console.log(window.d=d)});*/
		console.log('sending query');
		var xml = $.ajax({
      		type: 'POST',
      		url: "https://tools.wmflabs.org/languageproofing",
      		global: false,
      		async: false,
      		data: {language: lang,  text: text},
      		dataType: "xml",
      		success : function(d) {
                    return d;
            }
    	}).responseText;
    	console.log('response is here : ');
    	console.log(xml);
		return xml;
	}

/**
 * @inheritdoc
 */
ve.ui.LanguageToolDialog.prototype.getSetupProcess = function ( data ) {
	// Provide default title and message
	data = $.extend( {
		title: 'LanguageTool Response',
		message: this.send()
	}, data );

	return ve.ui.LanguageToolDialog.super.prototype.getSetupProcess.call( this, data );
};

/* Registration */

ve.ui.windowFactory.register( ve.ui.LanguageToolDialog );
