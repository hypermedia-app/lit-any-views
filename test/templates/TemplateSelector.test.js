import { expect } from '@open-wc/testing'
import ViewTemplateSelector from '../../lib/TemplateSelector'

describe('ViewTemplateSelector', () => {
    let selector

    beforeEach(() => {
        selector = new ViewTemplateSelector()
    })

    describe('shouldMatch', () => {
        it('returns false if value is null', () => {
            // given
            const criteria = { value: null }

            // when
            const shouldMatch = selector.shouldMatch(criteria)

            // then
            expect(shouldMatch).to.be.false
        })

        it('returns false if value is undefined', () => {
            // given
            const criteria = { }

            // when
            const shouldMatch = selector.shouldMatch(criteria)

            // then
            expect(shouldMatch).to.be.false
        })
    })

    describe('matches', () => {
        it('should not match when value is null', () => {
            // given
            const criteria = { value: null }

            // when
            const matches = selector.matches(criteria)

            // then
            expect(matches).to.be.false
        })

        it('should not match when value is undefined', () => {
            // given
            const criteria = { }

            // when
            const matches = selector.matches(criteria)

            // then
            expect(matches).to.be.false
        })
    })
})
