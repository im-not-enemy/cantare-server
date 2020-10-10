import Sound from '../Entity/Sound'

test('transpose()',()=>{
    expect(new Sound('C').transpose(0).toString()).toBe('C')
    expect(new Sound('C').transpose(-1).toString()).toBe('B,')
    expect(new Sound('C').transpose(2).toString()).toBe('D')
    expect(new Sound('C').transpose(7).toString()).toBe('G')

    expect(new Sound('^C').transpose(7).toString("sharp")).toBe('^G')
    expect(new Sound('^C').transpose(7).toString("flat")).toBe('_A')

    expect(new Sound('B,').transpose(7).toString("flat")).toBe('_G')
    expect(new Sound('B,').transpose(7).toString("sharp")).toBe('^F')
    expect(new Sound('B,').transpose(7).toString()).toBe('_G')

    expect(new Sound('G').transpose(0).toString()).toBe('G')
    expect(new Sound('G').transpose(-1).toString("flat")).toBe('_G')
    expect(new Sound('G').transpose(2).toString()).toBe('A')

    expect(new Sound('^C').transpose(7).toString()).toBe('_A')
    expect(new Sound('^C').transpose(7).toString('sharp')).toBe('^G')
    expect(new Sound('^C').transpose(7).toString('flat')).toBe('_A')
})