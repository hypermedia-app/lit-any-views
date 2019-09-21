import { expect } from '@open-wc/testing'
import ViewTemplateSelectorBuilder from '../../src/lib/TemplateSelectorBuilder'

describe('ViewTemplateSelectorBuilder', () => {
  let builder: any

  beforeEach(() => {
    builder = new ViewTemplateSelectorBuilder({} as any)
  })

  describe('adding value matcher function', () => {
    it('creates a matcher', () => {
      // given
      const valueToMatch = 'test val'

      // when
      builder.valueMatches((v: string) => v === 'test val')

      // then
      const matcher = builder._selector._matchers[0]
      expect(
        matcher({
          value: valueToMatch,
        }),
      ).to.be.true
    })
  })

  describe('adding scope matcher function', () => {
    it('creates a matcher', () => {
      // given
      const valueToMatch = 'the scope'

      // when
      builder.scopeMatches((s: string) => s === 'the scope')

      // then
      const matcher = builder._selector._matchers[0]
      expect(
        matcher({
          scope: valueToMatch,
        }),
      ).to.be.true
    })
  })

  describe('adding scope matcher shorthand', () => {
    it('creates a matcher', () => {
      // given
      const valueToMatch = 'the scope'

      // when
      builder.scopeMatches('the scope')

      // then
      const matcher = builder._selector._matchers[0]
      expect(
        matcher({
          scope: valueToMatch,
        }),
      ).to.be.true
    })
  })
})
