import Sound from '../Entity/Sound'

test('transpose()',()=>{
    expect(new Sound('C').transpose(0)).toBe('C')
    expect(new Sound('C').transpose(-1)).toBe('B,')
    expect(new Sound('C').transpose(2)).toBe('D')
    expect(new Sound('G').transpose(0)).toBe('G')
    expect(new Sound('G').transpose(-1)).toBe('_G')
    expect(new Sound('G').transpose(2)).toBe('A')
})

test('src',()=>{
    expect(new Sound('C').src).toBe('C')
    expect(new Sound('G').src).toBe('G')
})