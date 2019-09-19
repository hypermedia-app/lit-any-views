import TemplateSelector from '@lit-any/core/template-registry/TemplateSelector'
import { Criteria } from './index'

export default class ViewTemplateSelector<T> extends TemplateSelector<Criteria> {
  // eslint-disable-next-line class-methods-use-this
  public shouldMatch(criteria: Criteria): boolean {
    return typeof criteria.value !== 'undefined' && criteria.value !== null
  }
}
