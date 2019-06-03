import { expect } from '@open-wc/testing'
import ViewTemplates from '../../lib/index'

describe('ViewTemplates', () => {
    describe('when builder is created', () => {
        let builder

        beforeEach(() => {
            builder = ViewTemplates.default.when
        })

        it('should create builder for matching values', () => {
            expect(builder.valueMatches).to.be.ok
        })

        it('should create builder for matching scope', () => {
            expect(builder.scopeMatches).to.be.ok
        })
    })
})
