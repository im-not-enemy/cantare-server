import Key from '../Entity/Key'

test('signatures',()=>{
    expect(new Key('C').signatures).toEqual([])
    expect(new Key('C').signatures).toEqual([])
    expect(new Key('G').signatures).toEqual(['F'])
    expect(new Key('B').signatures).toEqual(['C','D','F','G','A'])
    expect(new Key('Cm').signatures).toEqual(['E','A','B'])
    expect(new Key('Bbm').signatures).toEqual(['B','D','E','G','A'])
})

test('signatureType',()=>{
    expect(new Key('C').signatureType).toBe('')
    expect(new Key('C').signatureType).toBe('')
    expect(new Key('G').signatureType).toBe('sharp')
    expect(new Key('B').signatureType).toBe('sharp')
    expect(new Key('F').signatureType).toBe('flat')
    expect(new Key('Cm').signatureType).toBe('flat')
    expect(new Key('Bbm').signatureType).toBe('flat')
})

test('type',()=>{
    expect(new Key('C').type).toBe('major')
    expect(new Key('Cm').type).toBe('minor')
    expect(new Key('B').type).toBe('major')
    expect(new Key('Bbm').type).toBe('minor')
})

test('tonic',()=>{
    expect(new Key('C').tonic).toBe('C')
    expect(new Key('Cm').tonic).toBe('C')
    expect(new Key('B').tonic).toBe('B')
    expect(new Key('Bbm').tonic).toBe('Bb')
})