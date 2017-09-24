import { html } from 'lit-html';
import '../../src/elements/ags-view';
import { ViewTemplates } from '../../src/template-registry';

describe('ags-view', () => {
    let agsView;
    let getTemplate;

    beforeEach(() => {
        agsView = document.querySelector('ags-view');
        getTemplate = sinon.stub(ViewTemplates, 'getTemplate');
    });

    afterEach(() => {
        getTemplate.restore();
    });

    it('should render nothing when object is undefined', () => {
        agsView._render();

        expect(agsView.shadowRoot).to.be.null;
    });

    it('should raise event when value changes', (done) => {
        // then
        testHandler(agsView, 'ags-render', () => {
            done();
        });

        // when
        agsView.value = {};
    });

    it('should render found template', () => {
        // given
        getTemplate.returns({
            render: (_, object) => html`<span>${object.value}</span>`,
        });

        agsView.value = {
            '@id': 'test',
            value: 'test',
        };

        // when
        agsView._render();

        // then
        const span = agsView.shadowRoot.querySelector('span');
        expect(span.textContent).to.equal('test');
    });

    describe('rendering nested templates', () => {
        it('should use render parameter', () => {
            // given
            getTemplate.returns({
                render: (render, object) => html`<p class$="${object.clazz}">${render(object.child)}</p>`,
            });
            getTemplate.onCall(3).returns({
                render: (render, object) => html`<span>${object.value}</span>`,
            });

            // when
            agsView.value = {
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
            };
            agsView._render();

            // then
            const span = agsView.shadowRoot.querySelector('p.l1 p.l2 p.l3 span');
            expect(span.textContent).to.equal("I'm deep");
        });

        it('should select template for selected value', () => {
            // given
            getTemplate.returns({
                render: (render, v) => {
                    if (v.child) {
                        return html`${render(v.child)}`;
                    }

                    return html``;
                },
            });

            // when
            agsView.value = {
                child: 10,
            };
            agsView._render();

            // then
            expect(getTemplate.firstCall.calledWith({ child: 10 })).to.be.true;
            expect(getTemplate.secondCall.calledWith(10)).to.be.true;
        });

        it('should allow changing scope', (done) => {
            // given
            getTemplate.returns({
                render: (render, v) => {
                    if (v.child) {
                        if (v.scope) {
                            return html`${render(v.child, v.scope)}`;
                        }
                        return html`${render(v.child)}`;
                    }

                    return html``;
                },
            });

            testHandler(agsView, 'ags-render', () => {
                // then
                expect(getTemplate.firstCall.args[1]).to.be.null;
                expect(getTemplate.secondCall.args[1]).to.equal('nested');
                expect(getTemplate.thirdCall.args[1]).to.equal('nested');
                done();
            });

            // when
            agsView.value = {
                scope: 'nested',
                child: {
                    child: {},
                },
            };
        });
    });

    describe('when template is not found', () => {
        it('should render fallback template', () => {

        });
    });
});