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
 * @inheritdoc
 */
ve.ui.LanguageToolDialog.prototype.getSetupProcess = function ( data ) {
	// Provide default title and message
	data = $.extend( {
		title: 'LanguageTool Response',
		message: ve.msg( 'visualeditor-dialog-beta-welcome-content', $( '#ca-edit' ).text() )
	}, data );

	return ve.ui.LanguageToolDialog.super.prototype.getSetupProcess.call( this, data );
};

/* Registration */

ve.ui.windowFactory.register( ve.ui.LanguageToolDialog );
