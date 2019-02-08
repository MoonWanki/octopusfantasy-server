class Tile {

    // type : Number            1(WAN) | 2(PIN) | 3(SOU) | 4(WIND) | 5(DRAGON)
    // number : Number          1~9 for non-honour tiles / 東南西北 => 1,2,3,4 / 白發中 => 1,2,3
    // isHonour : Boolean
    // isDora : Boolean
    // isRedDora : Boolean
    // isUraDora : Boolean
    
    constructor(type, number, isHonour, isRedDora) {
        this.type = type
        this.number = number
        this.isHonour = isHonour || false
        this.isDora = false
        this.isRedDora = isRedDora || false
        this.isUraDora = false
    }

    setDora(isDora) {
        this.isDora = isDora
    }

    setUraDora(isUraDora) {
        this.isUraDora = isUraDora
    }
}

module.exports = Tile