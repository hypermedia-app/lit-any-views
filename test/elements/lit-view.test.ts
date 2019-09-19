import { expect, fixture } from '@open-wc/testing'
import { html } from 'lit-html'
import '../../lib/lit-view'
import sinon from 'sinon'
import ViewTemplates from '../../lib'
import LitView from '../../src/lib/lit-view'

describe('lit-view', () => {
  let litView: LitView
  let getTemplate: any

  ViewTemplates.byName = () => ({ getTemplate } as any)

  describe('with attributes', () => {
    beforeEach(async () => {
      getTemplate = sinon.stub()
      litView = await fixture(
        '<lit-view ignore-missing template-scope="some scope" template-registry="my registry"></lit-view>',
      )
    })

    it('sets scope', () => {
      expect(litView.templateScope).to.equal('some scope')
    })

    it('sets ignoreMissing', () => {
      expect(litView.ignoreMissing).to.be.true
    })

    it('sets templateRegistry', () => {
      expect(litView.templateRegistry).to.equal('my registry')
    })
  })

  describe('rendering template', () => {
    beforeEach(() => {
      getTemplate = sinon.stub()
    })

    beforeEach(async () => {
      litView = await fixture('<lit-view></lit-view>')
    })

    it('should render nothing when object is undefined', () => {
      expect(litView.shadowRoot!.querySelectorAll('*').length).to.equal(0)
    })

    it('should render found template', async () => {
      // given
      getTemplate.returns({
        render: (object: any) =>
          html`
            <span>${object.value}</span>
          `,
      })

      litView.value = {
        '@id': 'test',
        value: 'test',
      }

      // when
      await litView.updateComplete

      // then
      expect(litView).shadowDom.to.equalSnapshot()
    })

    it('should select template for given value', async () => {
      // given
      litView.value = 'a string'

      // when
      await litView.updateComplete

      // then
      expect(
        getTemplate.calledWith({
          value: 'a string',
          scope: '',
        }),
      ).to.be.true
    })

    it('should render pass scope to template', async () => {
      // given
      getTemplate.returns({
        render: (_1: never, _2: never, scope: string) =>
          html`
            <span>${scope}</span>
          `,
      })

      litView.value = {}
      litView.templateScope = 'scope test'

      // when
      await litView.updateComplete

      // then
      expect(litView).shadowDom.to.equalSnapshot()
    })
  })

  describe('rendering nested templates', () => {
    beforeEach(() => {
      getTemplate = sinon.stub()
    })

    beforeEach(async () => {
      litView = await fixture('<lit-view></lit-view>')
    })

    it('should use render parameter', async () => {
      // given
      getTemplate.returns({
        render: (object: any, render: Function) => {
          if (object.child) {
            return html`
              <p class="${object.clazz}">${render(object.child)}</p>
            `
          }

          return html`
            <span>${object.value}</span>
          `
        },
      })
      litView.value = {
        clazz: 'l1',
        child: {
          clazz: 'l2',
          child: {
            clazz: 'l3',
            child: {
              value: "I'm deep",
            },
          },
        },
      }

      // when
      await litView.updateComplete

      // then
      expect(litView).shadowDom.to.equalSnapshot()
    })

    it('should select template for selected value', async () => {
      // given
      getTemplate.returns({
        render: (v: any, render: Function) => {
          if (v.child) {
            return html`
              ${render(v.child)}
            `
          }

          return html``
        },
      })
      litView.value = {
        child: 10,
      }

      // when
      await litView.updateComplete

      // then
      expect(litView).shadowDom.to.equalSnapshot()
    })

    it('should allow changing scope', async () => {
      // given
      getTemplate.returns({
        render: (v: any, render: Function, scope: string) => {
          if (v.child) {
            if (v.scope) {
              return html`
                ${render(v.child, v.scope)}
              `
            }
            return html`
              ${render(v.child)}
            `
          }

          return html`
            ${scope}
          `
        },
      })

      litView.value = {
        scope: 'nested',
        child: {
          child: {},
        },
      }

      // when
      await litView.updateComplete

      // then
      expect(litView).shadowDom.to.equalSnapshot()
    })

    it('should provide an empty params object fallback', async () => {
      // given
      getTemplate.returns({
        render: (object: any, render: Function, scope: string, params: any) => {
          if (object.child) {
            return html`
              <p>${render(object.child)}</p>
            `
          }

          return html`
            <span>${JSON.stringify(params)}</span>
          `
        },
      })
      litView.value = {
        child: {},
      }

      // when
      await litView.updateComplete

      // then
      expect(litView).shadowDom.to.equalSnapshot()
    })
  })

  describe('when template is not found', () => {
    beforeEach(() => {
      getTemplate = sinon.stub()
    })

    beforeEach(async () => {
      litView = await fixture('<lit-view></lit-view>')
    })

    xit('should render fallback template', () => {})
  })

  describe('when value is set before inserting to DOM', () => {
    let manualView: LitView

    beforeEach(() => {
      getTemplate = sinon.stub()
      manualView = document.createElement('lit-view') as LitView
      manualView.value = {
        inserted: 'manually',
      }
    })

    it('should render correctly', async () => {
      // given
      getTemplate.returns({
        render: (object: any) =>
          html`
            <span>${object.inserted}</span>
          `,
      })

      // when
      document.body.appendChild(manualView)
      await litView.updateComplete

      // then
      expect(litView).shadowDom.to.equalSnapshot()
    })
  })

  describe('when passing params values', () => {
    beforeEach(() => {
      getTemplate = sinon.stub()
    })

    beforeEach(async () => {
      litView = await fixture('<lit-view></lit-view>')
    })

    it('makes it accessible to child render when used together with scope', async () => {
      // given
      getTemplate.returns({
        render: (object: any, render: Function, scope: string, params: any) => {
          if (params.sameToUpper) {
            return html`
              '${scope}' ${object.text.toUpperCase()}
            `
          }

          return html`
            ${object.text} ${render(object, 'bar', { sameToUpper: true })}
          `
        },
      })
      litView.value = { text: 'a' }
      litView.templateScope = 'foo'

      // when
      await litView.updateComplete

      // then
      expect(litView).shadowDom.to.equalSnapshot()
    })

    it('makes it accessible to child render when used without scope', async () => {
      // given
      getTemplate.returns({
        render: (object: any, render: Function, scope: string, params: any) => {
          if (params.sameToUpper) {
            return html`
              '${scope}' ${object.text.toUpperCase()}
            `
          }

          return html`
            ${object.text} ${render(object, { sameToUpper: true })}
          `
        },
      })
      litView.value = { text: 'a' }
      litView.templateScope = 'foo'

      // when
      await litView.updateComplete

      // then
      expect(litView).shadowDom.to.equalSnapshot()
    })
  })
})
