class Tile {
    
    constructor(type, number, isHonour, isRedDora) {
        this.type = type
        this.number = number
        this.isHonour = isHonour
        this.isRedDora = isRedDora

        this.isDora = false
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