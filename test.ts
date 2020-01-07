import LooseMap from './index'

let set: LooseMap<any, number>

describe('Loose Sets', () => {
  beforeEach(() => set = new LooseMap)
  it('Should have literal values', () => {
    set.set(['hello'], 123)

    set.has(['hello']).should.be.true()
    set.get(['hello'])!.should.eql(123)
  })

  it('Should not have duplicate literal values', () => {
    set
      .set({ hello: 'world' }, 123)
      .set({ hello: 'world' }, 321)

    set.should.have.size(1)
    set.get({ hello: 'world' })!.should.eql(321)
  })

  it('Should require the obj value to stay the same, even if reference is same', () => {
    const data = [12]
    set.set(data, 0)
    data.push(123)

    set.has(data).should.be.false()
  })
})
