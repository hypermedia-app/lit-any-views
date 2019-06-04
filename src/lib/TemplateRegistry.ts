import TemplateRegistry from '@lit-any/core/template-registry'
import { Criteria, RenderFunc } from './index'
import TemplateSelectorBuilder from './TemplateSelectorBuilder'

// eslint-disable-next-line max-len
export default class ViewTemplateRegistry extends TemplateRegistry<TemplateSelectorBuilder, Criteria, RenderFunc> {
    protected _createBuilder() {
        return new TemplateSelectorBuilder(this)
    }
}
