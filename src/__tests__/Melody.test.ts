import Melody from '../Entity/Melody'

test('toArray()',()=>{
    expect(new Melody('CEGA|GEDC||').toArray()).toEqual(['C','E','G','A','|','G','E','D','C','|','|'])
    expect(new Melody('CEG2|GEDC||').toArray()).toEqual(['C','E','G','2','|','G','E','D','C','|','|'])
    expect(new Melody('^CE^GA|GEDC||').toArray()).toEqual(['^C','E','^G','A','|','G','E','D','C','|','|'])
    expect(new Melody('C\'G ^F2G|E=F/E/DC3||').toArray()).toEqual(['C\'','G',' ','^F','2','G','|','E','=F','/','E','/','D','C','3','|','|'])
    expect(new Melody('C\'2D\' C\'B/A/G/F/|E2CG3|^FGA/B/C\'3||').toArray()).toEqual(['C\'','2','D\'',' ','C\'','B','/','A','/','G','/','F','/','|','E','2','C','G','3','|','^F','G','A','/','B','/','C\'','3','|','|'])
})