import { TemplateResult } from 'lit-html'
import createRegistry from './factory'
import ViewTemplateRegistry from './TemplateRegistry'

export default {
    default: createRegistry() as ViewTemplateRegistry,
    byName: createRegistry,
}

export interface Criteria {
    scope: string;
    value?: unknown | null;
}

export type RenderFunc = (
    value: unknown,
    next: (value: unknown, scope?: string) => TemplateResult,
    scope: string,
    params: { [key: string]: unknown }
) => TemplateResult
