class Tile {
    
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