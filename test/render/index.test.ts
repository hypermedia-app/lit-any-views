import { expect } from '@open-wc/testing'
import { html, render as litRender, TemplateResult } from 'lit-html'
import sinon from 'sinon'
import render from '../../src/lib/render'

describe('render view', () => {
  let registry: any

  beforeEach(() => {
    registry = {
      getTemplate: sinon.stub(),
    }
  })

  it('should create TemplateResult for found template', () => {
    // given
    registry.getTemplate.returns({
      render: (object: any) =>
        html`
          <span>${object.value}</span>
        `,
    })
    const container = document.createElement('div')
    const value = {
      value: 'test',
    }

    // when
    litRender(render(registry, { value }, false), container)

    // then
    const span = container.querySelector('span')
    expect(span!.textContent).to.equal('test')
  })

  it('should create TemplateResult for template not found', () => {
    // given
    registry.getTemplate.returns(null)
    const value = {
      value: 'test',
    }

    // when
    const result = render(registry, { value }, false)

    // then
    expect(result).to.be.instanceOf(TemplateResult)
  })

  it('should pass down scope parameter', () => {
    // given
    registry.getTemplate.returns({
      render: (object: unknown, _: Function, scope: string) =>
        html`
          <span>${scope}</span>
        `,
    })
    const container = document.createElement('div')
    const value = {
      value: 'test',
    }

    // when
    litRender(render(registry, { value, scope: 'some scope' }, false), container)

    // then
    expect(container.textContent!.trim()).to.equal('some scope')
  })
})
