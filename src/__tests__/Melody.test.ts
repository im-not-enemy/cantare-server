import Melody from '../Entity/Melody'
import Key from '../Entity/Key'

const C = new Key('C')
const F = new Key('F')
const Cm = new Key('Cm')
const G = new Key('G')

test('toString()',()=>{
    expect(new Melody('CEGA|GEDC||',C).toString()).toBe('CEGA|GEDC||')
    expect(new Melody('CEG2|GEDC||',C).toString()).toBe('CEG2|GEDC||')
    expect(new Melody('^CE^GA|GEDC||',C).toString()).toBe('^CE^GA|GEDC||')
    expect(new Melody('C\'G ^F2G|E=F/E/DC3||',C).toString()).toBe('C\'G ^F2G|E=F/E/DC3||')
    expect(new Melody('C\'2D\' C\'B/A/G/F/|E2CG3|^FGA/B/C\'3||',C).toString()).toBe('C\'2D\' C\'B/A/G/F/|E2CG3|^FGA/B/C\'3||')
})

test('transpose()',()=>{
    expect(new Melody('CEGA|GEDC||',C).transpose(G).toString()).toBe('GBde|dBAG||')
    expect(new Melody('CEG2|GEDC||',C).transpose(G).toString()).toBe('GBd2|dBAG||')
    expect(new Melody('^CE^GA|GEDC||',C).transpose(G).toString()).toBe('^GB^de|dBAG||')
    expect(new Melody('C/D/E/F/ G/F/E/D/|C/B,/A,/G,/ A,/B,/C||',C).transpose(G).toString()).toBe('G/A/B/c/ d/c/B/A/|G/F/E/D/ E/F/G||')
    expect(new Melody('C/D/E/F/ G/F/E/D/|C/B,/A,/G,/ A,/B,/C||',C).transpose(F).toString()).toBe('F/G/A/B/ c/B/A/G/|F/E/D/C/ D/E/F||')
})