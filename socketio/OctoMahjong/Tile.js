class Tile {
    
    constructor(type, number, isRedDora) {
        this.type = type
        this.number = number
        this.isRedDora = isRedDora || false
        this.isHonour = type == 4 || type == 5 || number == 1 || number == 9

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