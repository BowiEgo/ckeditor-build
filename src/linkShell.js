import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import LinkUI from '@ckeditor/ckeditor5-link/src/linkui';
import Template from '@ckeditor/ckeditor5-ui/src/template';
import mix from '@ckeditor/ckeditor5-utils/src/mix';

export default class LinkShell extends Plugin {
  constructor(editor) {
    super(editor)
    editor.config.define('LinkShell')
  }

  init() {
    const editor = this.editor
    const config = editor.config.get( 'link' ) || {}
    const linkUI = editor.plugins.get(LinkUI)
    const previewButtonView = linkUI.actionsView.previewButtonView

    previewButtonView.template.tag = 'div'

		previewButtonView.bind( 'href' ).to( linkUI, 'href', href => href )
    
    previewButtonView.on('execute', () => {
      if (config.click) {
        config.click( linkUI.actionsView.href )
      }
    })
  }
}

mix( LinkShell )
