import Song from '../Entity/Song'


test('sample01',()=>{
    const song = new Song("T:Sample01\nM:4/4\nL:1/4\nK:C\nCEGA|GEDC||")
    expect(song.toString()).toBe("T:Sample01\nM:4/4\nL:1/4\nK:C\nCEGA|GEDC||")
    expect(song.title).toBe("Sample01")
    expect(song.meter).toBe("4/4")
    expect(song.unitNoteLength).toBe("1/4")
    expect(song.key).toBe("C")
    expect(song.melody).toBe("CEGA|GEDC||")
})
test('sample19',()=>{
    const song = new Song("T:Sample19\nM:6/8\nL:1/8\nK:C\nC'2D' C'B/A/G/F/|E2CG3|^FGA/B/C'3||")
    expect(song.toString()).toBe("T:Sample19\nM:6/8\nL:1/8\nK:C\nC'2D' C'B/A/G/F/|E2CG3|^FGA/B/C'3||")
    expect(song.title).toBe("Sample19")
    expect(song.meter).toBe("6/8")
    expect(song.unitNoteLength).toBe("1/8")
    expect(song.key).toBe("C")
    expect(song.melody).toBe("C'2D' C'B/A/G/F/|E2CG3|^FGA/B/C'3||")
})