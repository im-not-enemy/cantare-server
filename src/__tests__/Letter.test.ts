import Letter from '../Entity/Letter'

test('typeチェック',()=>{
    expect(new Letter('^').type()).toBe('Accidental')
    expect(new Letter('_').type()).toBe('Accidental')
    expect(new Letter('C').type()).toBe('Pitch')
    expect(new Letter(',').type()).toBe('Octave')
    expect(new Letter('\'').type()).toBe('Octave')
    expect(new Letter('2').type()).toBe('NoteLength')
    expect(new Letter('(').type()).toBe('Bracket')
    expect(new Letter('>').type()).toBe('BrokenRhythm')
    expect(new Letter('-').type()).toBe('Tie')
})