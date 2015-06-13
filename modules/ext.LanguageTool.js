/**
 * Adds dialog for selecting citation tempalte.
 * Written by: [[User:ערן]] and [[User:Ravid ziv]]
 */
(function () {
 
/************* Configuration section *******************************************/
 
        var DialogTitle = 'Select citation template';
        //Configurate the most common citation templates and their parameters here
        var CitationTemplates = {
        'Cite Web ': { template: {
                        target: {
                                href: 'Template:cite web',
                                wt: 'cite web'
                        },
                        params: {
                                'first': {wt: ''},
                                'last': {wt: ''},
                                'title': {wt: ''},
                                'url': {wt: ''},
                                'publisher': {wt: ''},
                                'accessdate': {wt: ''}
                        }
                }
        },
        'Cite news': { template: {
                        target: {
                                href: 'Template:cite news',
                                wt: 'cite news'
                        },
                        params: {
                                'first': {wt: ''},
                                'last': {wt: ''},
                                'title': {wt: ''},
                                'url': {wt: ''},
                                'accessdate': {wt: ''},
                                'newspaper': {wt: ''}
                        }
                }
        },
        'Cite book': { template: {
                        target: {
                                href: 'Template:cite book',
                                wt: 'cite book'
                        },
                        params: {
                                'first': {wt: ''},
                                'last': {wt: ''},
                                'date': {wt: ''},
                                'publisher': {wt: ''},
                                'location': {wt: ''},
                                'isbn': {wt: ''},
                                'page': {wt: ''},
                                'url': {wt: ''}
                        }
                }
        },
        'Cite journal ': { template: {
                                target: {
                                        href: 'Template:cite journal',
                                        wt: 'cite journal'
                                },
                                params: {
                                        'first': {wt: ''},
                                        'last': {wt: ''},
                                        'coauthors': {wt: ''},
                                        'journal': {wt: ''},
                                        'date': {wt: ''},
                                        'volume': {wt: ''},
                                        'series': {wt: ''},
                                        'issue': {wt: ''},
                                        'page': {wt: ''},
                                        'doi': {wt: ''},
                                        'pmid': {wt: ''},
                                        'url': {wt: ''},
                                        'accessdate': {wt: ''}
                                }
                        }
                }
        }
 
/*************************** end of configuration section *********************/
mw.languageToolDialog = function VeUiMWCiteDialog( surface, config ) {
        // Configuration initialization
        config = ve.extendObject( { 'size': 'medium' }, config );
        // Parent constructor
        ve.ui.MWReferenceDialog.call( this, surface, config );
 
        this.followTransactions  = false;
 
};
 
/* Inheritance */
 
OO.inheritClass( mw.languageToolDialog, ve.ui.MWReferenceDialog );
 
/* Static Properties */
 
mw.languageToolDialog.static.name = 'Cite';
 
mw.languageToolDialog.static.title = DialogTitle;
 
 
mw.languageToolDialog.prototype.initialize = function ( ) {
        ve.ui.MWReferenceDialog.prototype.initialize.call(this);
        // hide reference panel
        this.editPanel.$element.hide()
        this.$foot.hide();
 
        this.templatesPanel = new OO.ui.PanelLayout( {
                '$': this.$, 'scrollable': true, 'padded': true
        } );
 
        this.panels.addItems( [ this.templatesPanel ] );
 
        var buttons = [];
        for (var buttonName in CitationTemplates) {
                var button = new OO.ui.ButtonWidget( {
                        '$': this.$,
                        'label': buttonName,
                } );
                button.connect( this, { 'click': [ 'citeWeb', CitationTemplates[buttonName] ] } );
                buttons.push(button.$element);
        }
        this.templatesPanel.$element.append(buttons).show();
 
}
 
mw.languageToolDialog.prototype.useReference = function ( ref ) {
 
        this.followTransactions  = false;
        ve.ui.MWReferenceDialog.prototype.useReference.call(this, ref);
}
 
mw.languageToolDialog.prototype.citeWeb = function( emptyTemplate ){
        this.referenceSurface.getSurface().getModel().getFragment().collapseRangeToEnd().insertContent([{'type': 'mwTransclusionInline','attributes': {'mw':
        {
                parts: [ emptyTemplate ]
        }}}]);
        this.followTransactions  = true;
        this.referenceSurface.getSurface().execute('dialog', 'open', 'transclusion', null);
        var self = this;
        this.referenceSurface.getSurface().getDialogs().getWindow('transclusion').on(
                'close',function (data){
                        if (data.action=='cancel')
                        {
                                self.close({ 'action': 'cancel' });
                        }
                });
}
 
mw.languageToolDialog.prototype.onDocumentTransact = function () {
        if (!this.followTransactions) return;
        var data = this.referenceSurface.getSurface().getModel().getDocument().getFullData();
        for (var j=0;j<data.length;j++)
        {
                var node = data[j];
                if (node.type ==="mwTransclusionInline" && node.hasOwnProperty('attributes') )
                {
                        var params = node.attributes.mw.parts[0].template.params;
                        this.close( { 'action': 'insert' } );
                }
        } 
};
 
/* Registration */
 
ve.ui.dialogFactory.register( mw.languageToolDialog );
 
 
function LanguageTool( toolGroup, config ) {
        OO.ui.Tool.call( this, toolGroup, config );
 
}
OO.inheritClass( LanguageTool, OO.ui.Tool );
 
LanguageTool.static.name = 'LanguageTool';
LanguageTool.static.title = 'Cite'
 
LanguageTool.prototype.onSelect = function () {
        this.toolbar.getSurface().execute('dialog', 'open', 'Cite', null);
};
 
LanguageTool.prototype.onUpdateState = function () {
        this.setActive( false );
};
 
ve.ui.toolFactory.register( LanguageTool );
 
})();