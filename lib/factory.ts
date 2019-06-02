import ViewTemplateRegistry from './TemplateRegistry'

const viewTemplates: Map<string, ViewTemplateRegistry> = new Map()

export default function createRegistry(name: string = ''): ViewTemplateRegistry {
    let registry = viewTemplates.get(name)

    if (!registry) {
        registry = new ViewTemplateRegistry(name)
        viewTemplates.set(name, registry)
    }

    return registry
}
