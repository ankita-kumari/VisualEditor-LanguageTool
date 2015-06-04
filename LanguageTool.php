<?php
/**
 * LanguageTool extension - the thing that needs you.
 *
 * For more info see http://mediawiki.org/wiki/Extension:LanguageTool
 *
 * @file
 * @ingroup Extensions
 * @author Your Name, 2015
 */

$wgExtensionCredits['other'][] = array(
	'path' => __FILE__,
	'name' => 'LanguageTool',
	'author' => array(
		'Ankita',
	),
	'version'  => '0.0.0',
	'url' => 'https://www.mediawiki.org/wiki/Extension:LanguageTool',
	'descriptionmsg' => 'languagetool-desc',
	'license-name' => 'MIT',
);

/* Setup */

// Register files
$wgAutoloadClasses['LanguageToolHooks'] = __DIR__ . '/LanguageTool.hooks.php';
$wgAutoloadClasses['SpecialHelloWorld'] = __DIR__ . '/specials/SpecialHelloWorld.php';
$wgMessagesDirs['LanguageTool'] = __DIR__ . '/i18n';
$wgExtensionMessagesFiles['LanguageToolAlias'] = __DIR__ . '/LanguageTool.i18n.alias.php';

// Register hooks
#$wgHooks['NameOfHook'][] = 'LanguageToolHooks::onNameOfHook';

// Register special pages
$wgSpecialPages['HelloWorld'] = 'SpecialHelloWorld';

// Register modules
$wgResourceModules['ext.languageTool.foo'] = array(
	'scripts' => array(
		'modules/ext.languageTool.js',
		'modules/ext.languageTool.foo.js',
	),
	'styles' => array(
		'modules/ext.languageTool.foo.css',
	),
	'messages' => array(
	),
	'dependencies' => array(
	),

	'localBasePath' => __DIR__,
	'remoteExtPath' => 'examples/LanguageTool',
);


/* Configuration */

// Enable Foo
#$wgLanguageToolEnableFoo = true;
