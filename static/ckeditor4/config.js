/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
/** Define changes to default configuration here. For example:*/
	/** config.language = 'fr'; */
	/** config.uiColor = '#AADC6E'; */

	/** Set the most common block elements. */
	config.format_tags = 'p;h1;h2;h3;pre';

	/** Simplify the dialog windows. */
	config.removeDialogTabs = 'image:Link;image:advanced';

	/** 엔터시 <br> 태그 */
	config.enterMode = CKEDITOR.ENTER_BR;
	/** 쉬프트+엔터시 <p> 태그 */
    config.shiftEnterMode = CKEDITOR.ENTER_P;
    /** html tag filter disabled   */
    config.allowedContent = true;

    /** 현재 imageUpload 설정되어있지않음 */
    config.filebrowserImageUploadUrl= "/api/v1.0/common/editor/image/upload";
    config.image_previewText = " ";

    config.height = 300;

	/** 사용하고자 하는 toolbar 기능 setting // 스펠체크(Scayt) 삭제 */
    config.toolbar = [
    	//{ name: 'document', items: [ 'Source', '-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates' ] },
		{ name: 'document', items: [ 'Source', '-', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates' ] },
		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
		{ name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll' ] },
		//{ name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
		'/',
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
		{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
		{ name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
		'/',
		{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
		{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
		{ name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] }
	];

	config.removePlugins = 'resize,easyimage, cloudservices, exportpdf'; 

	/* Freemarker tag 예외처리 */
	config.protectedSource.push( /<@[\s\S]*?\/>/g );
	config.protectedSource.push( /<#[\s\S]*?>/g );
	config.protectedSource.push( /<\/#[\s\S]*?>/g );
	config.protectedSource.push( /\${[\s\S]*?}/g );

};
