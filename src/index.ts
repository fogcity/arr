
type PerfectDegree = 1|4|5|8
type DefectiveDegree = 2|3|6|7
type Degree = 1|2|3|4|5|6|7|8
export const piano: string[] = ['A0','bB0','B0']


// How to get relevant information on the piano
export function isBlackKey(degree:string){
    return degree.length == 3
}
export function isWhiteKey(degree:string){
    return degree.length == 2
}
export function getMiddleC(){
    return 'C4'
}
export function getBigCharTwoGroup(){
 
}
export function getBigCharOneGroup(){

}
export function getBigCharGroup(){
    
}
export function getLittleCharGroup(){
    
}
export function getLittleCharOneGroup(){
    
}
export function getLittleCharTwoGroup(){
    
}
export function getLittleCharThreeGroup(){
    
}
export function getLittleCharFourGroup(){
  
}
// Related methods for calculating interval relations

export function getSemitone(root:string){
    return piano[piano.indexOf(root)+1]
} 

export function getWholeTone(root:string){
    return piano[piano.indexOf(root)+2]
} 

export function getIntervalRelations(root:string,target:string){
    const semitoneCount = Math.abs(piano.indexOf(target) - piano.indexOf(root))
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
// Related methods for scale calculation
export function getAeolianScale(root:string){

}

export function getMajorScale(root:string){
    return getIonianScale(root)
}
export function getMinorScale(root:string){
    return getAeolianScale(root)
}


// Related methods for chords calculation
export function getDominant7th(root:string){
    return []
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
    const [fourth,fifth,sixth,seventh] = getDominant7th(getPerfectInterval(first,8))
    return [first,second,third,fourth,fifth,sixth,seventh]
}