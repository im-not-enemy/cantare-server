import Sound from '../Entity/Sound'

test('transpose()',()=>{
    expect(new Sound('C').transpose(0).toString()).toBe('C')
    expect(new Sound('C').transpose(-1).toString()).toBe('B,')
    expect(new Sound('C').transpose(2).toString()).toBe('D')
    expect(new Sound('C').transpose(7).toString()).toBe('G')

    expect(new Sound('^C').transpose(7).toString()).toBe('^G')
    expect(new Sound('B,').transpose(7).toString()).toBe('_G')
    expect(new Sound('B,').transpose(7,'sharp').toString()).toBe('^F')
    expect(new Sound('B,').transpose(7,'flat').toString()).toBe('_G')

    expect(new Sound('G').transpose(0).toString()).toBe('G')
    expect(new Sound('G').transpose(-1).toString()).toBe('_G')
    expect(new Sound('G').transpose(2).toString()).toBe('A')
})

test('src',()=>{
    expect(new Sound('C').src).toBe('C')
    expect(new Sound('G').src).toBe('G')
})