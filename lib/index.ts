
type PerfectDegree = 1|4|5|8
type DefectiveDegree = 2|3|6|7
type Degree = 1|2|3|4|5|6|7|8
const b12keys = ['C1','bD1','D1','bE1','E1','F1','bG1','G1','bA1','A1','bB1','B1']

export const blackKeys = ['bD','bE','bG','bA','bB']

export const whiteKeys = ['C','D','E','F','G','A','B']

export const piano: string[] = ['A0','bB0','B0',
...b12keys,
...b12keys.map(v=>v.slice(0, -1) + '2'),
...b12keys.map(v=>v.slice(0, -1) + '3'),
...b12keys.map(v=>v.slice(0, -1) + '4'),
...b12keys.map(v=>v.slice(0, -1) + '5'),
...b12keys.map(v=>v.slice(0, -1) + '6'),
...b12keys.map(v=>v.slice(0, -1) + '7'),
'C8'
]

// How to get relevant information on the piano
export function isBlackKey(key:string){
    return key.includes("#") || key.includes("b") 
}

export function isWhiteKey(key:string){
    return !isBlackKey(key)
}

export function isIncreasedKey(key:string){
    return key.includes("#")
}

export function isDecreasedKey(key:string){
    return key.includes("b")
}

export function getDecreasedKey(key:string){
    return isBlackKey(key)?isDecreasedKey(key)?key:increaseSignToDecreaseSign(key):key
}

export function getIncreasedSign(key:string){
    return isBlackKey(key)?isIncreasedKey(key)?key:decreaseSignToIncreaseSign(key):key
}

export function increaseSignToDecreaseSign (key:string) {
    return key.replace('#','b').replace(key[1],whiteKeys[whiteKeys.indexOf(key[1])+1])
}

export function decreaseSignToIncreaseSign (key:string) {
    return key.replace('b','#').replace(key[1],whiteKeys[whiteKeys.indexOf(key[1])-1])
}
// Related methods for calculating interval relations

export function getSemitone(key:string){
    return piano[piano.indexOf(getDecreasedKey(key))+1]
} 

export function getWholeTone(key:string){
    return piano[piano.indexOf(getDecreasedKey(key))+2]
} 

export function getIntervalRelations(root:string,target:string){
    const semitoneCount = Math.abs(piano.indexOf(getDecreasedKey(target)) - piano.indexOf(getDecreasedKey(root)))
    switch (semitoneCount) {
        case 0:return 'Perfect 1'
        case 1:return 'Minor 2'
        case 2:return 'Major 2'
        case 3:return 'Minor 3'
        case 4:return 'Major 3'
        case 5:return 'Perfect 4'
        case 6:return 'Augmented 4'
        case 7:return 'Perfect 5'
        case 8:return 'Minor 6'
        case 9:return 'Major 6'
        case 10:return 'Minor 7'
        case 11:return 'Major 7'
        case 12:return 'Perfect 8'
        default: return;
    }
}
export function getDiminishedInterval(root:string,degree:Exclude<Degree,1>,double?:boolean){
    
    switch (degree) {
        case 2:return piano[piano.indexOf(root)+1-(double&&double?1:0)]
        case 3:return piano[piano.indexOf(root)+3-(double&&double?1:0)]
        case 4:return piano[piano.indexOf(root)+4-(double&&double?1:0)]
        case 5:return piano[piano.indexOf(root)+6-(double&&double?1:0)]
        case 6:return piano[piano.indexOf(root)+8-(double&&double?1:0)]
        case 7:return piano[piano.indexOf(root)+10-(double&&double?1:0)]    
        case 8:return piano[piano.indexOf(root)+11-(double&&double?1:0)]  
    }
}
export function getMinorInterval(root:string,degree:DefectiveDegree){
    switch (degree) {
        case 2:return piano[piano.indexOf(root)+1]
        case 3:return piano[piano.indexOf(root)+3]
        case 6:return piano[piano.indexOf(root)+8]
        case 7:return piano[piano.indexOf(root)+10]    
    }
}
export function getPerfectInterval(root:string,degree:PerfectDegree){
    switch (degree) {
        case 1:return root
        case 4:return piano[piano.indexOf(root)+5]
        case 5:return piano[piano.indexOf(root)+7]
        case 8:return piano[piano.indexOf(root)+12]
    }
}

export function getMajorInterval(root:string,degree:DefectiveDegree){
    switch (degree) {
        case 2:return piano[piano.indexOf(root)+2]
        case 3:return piano[piano.indexOf(root)+4]
        case 6:return piano[piano.indexOf(root)+9]
        case 7:return piano[piano.indexOf(root)+11]
    }
}

export function getAugmentedInterval(root:string,degree:Degree,double?:boolean){
    switch (degree) {
        case 1:return piano[piano.indexOf(root)+1+(double&&double?1:0)]
        case 2:return piano[piano.indexOf(root)+3+(double&&double?1:0)]
        case 3:return piano[piano.indexOf(root)+5+(double&&double?1:0)]
        case 4:return piano[piano.indexOf(root)+6+(double&&double?1:0)]
        case 5:return piano[piano.indexOf(root)+8+(double&&double?1:0)]
        case 6:return piano[piano.indexOf(root)+10+(double&&double?1:0)]
        case 7:return piano[piano.indexOf(root)+12+(double&&double?1:0)]
        case 8:return piano[piano.indexOf(root)+13+(double&&double?1:0)]
    }
}

// Related methods for scale calculation
export function getIonianScale(root:string){
    return 

}
export function getAeolianScale(root:string){

}

export function getMajorScale(root:string){
    return getIonianScale(root)
}
export function getMinorScale(root:string){
    return getAeolianScale(root)
}

// Related methods for chords calculation
export function getLargeSmall7Chords(root:string){
    return []
}

export function getDominant7Chords(root:string){
    return getLargeSmall7Chords(root)
}

/**
 * get a list of overtones of the tone level
 * @param toneLevel based on string like 'A2' ,'dB6'
 * @returns an overtoneSeries
 */
export function getOvertoneSeries(toneLevel:string){
    const first = getPerfectInterval(toneLevel,8)
    const second = getPerfectInterval(first,5)
    const third = getPerfectInterval(second,4)
    const [fourth,fifth,sixth,seventh] = getDominant7Chords(getPerfectInterval(first,8))
    return [first,second,third,fourth,fifth,sixth,seventh]
}