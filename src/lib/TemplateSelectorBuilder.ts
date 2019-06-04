import TemplateSelectorBuilder from '@lit-any/core/template-registry/TemplateSelectorBuilder'
import ViewTemplateSelector from './TemplateSelector'
import { Criteria, RenderFunc } from './index'
import TemplateRegistry from './TemplateRegistry'

// eslint-disable-next-line max-len
export default class ViewTemplateSelectorBuilder extends TemplateSelectorBuilder<Criteria, RenderFunc> {
    // eslint-disable-next-line no-useless-constructor
    public constructor(r: TemplateRegistry) {
        super(r)
    }

    public valueMatches<T>(valueMatcher: (value: T) => boolean) {
        this._selector.push(constraint => valueMatcher(constraint.value as T))

        return this
    }

    public scopeMatches(scopeMatcher: string | ((s: string) => boolean)): this {
        if (typeof scopeMatcher === 'string') {
            return this.scopeMatches(s => s === scopeMatcher)
        }

        this._selector.push(constraint => scopeMatcher(constraint.scope))

        return this
    }

    // eslint-disable-next-line class-methods-use-this
    protected _createSelector() {
        return new ViewTemplateSelector()
    }
}
