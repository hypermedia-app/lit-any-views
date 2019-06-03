import { TemplateResult } from 'lit-html'
import createRegistry from './factory'

export default {
    default: createRegistry(),
    byName: createRegistry,
}

export interface Criteria {
    scope: string;
    value?: unknown | null;
}

export type RenderFunc = (
    value: unknown,
    next: (value: unknown, scope: string) => TemplateResult,
    scope: string,
    params: { [key: string]: unknown }
) => TemplateResult
