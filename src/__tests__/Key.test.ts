import Key from '../Entity/Key'

test('',()=>{
    expect(new Key('C').sharps).toEqual([])
    expect(new Key('C').flats).toEqual([])

    expect(new Key('G').sharps).toEqual(['F'])
    expect(new Key('G').flats).toEqual([])

    expect(new Key('B').sharps).toEqual(['C','D','F','G','A'])
    expect(new Key('B').flats).toEqual([])

    expect(new Key('Cm').sharps).toEqual([])
    expect(new Key('Cm').flats).toEqual(['E','A','B'])

    expect(new Key('Bbm').sharps).toEqual([])
    expect(new Key('Bbm').flats).toEqual(['B','D','E','G','A'])
})