const perm = require('math-permutation')

exports.Convert = input => {
    let tiles = new Array()
    for(let i = 0; i < 34; i++) { tiles.push(0) }
    input.forEach(tile => {
        if(tile.type < 4)
            tiles[(tile.type - 1)*9 + (tile.number - 1)] += 1
        else if(tile.type == 4)
            tiles[26 + tile.number] += 1
        else if(tile.type == 5)
            tiles[30 + tile.number] += 1
    })
    return tiles
}

exports.Sorting = input => {
    const sorted = tiles.sort(function(a, b) {
        if(a.type == b.type) {
            if(a.number >= b.number)
                return 1
            else
                return -1
        }
        return a.type > b.type
    })
    return sorted
}

exports.FindPairs = input => {
    let pairs = new Array()
    for(let i = 0; i < input.length; i++) {
        if(x > 26 && input[i] != 2)
            continue
        
        if(input[i] >= 2) {
            pairs.push(i)
        }
    }
    return pairs
}

exports.ValidCheck = function(input, first, last) {
    // man : first = 0 | last = 8
    // pin : first = 9 | last = 17
    // sou : first = 18 | last = 26
    let hand = new Array()
    for(let i = first; i <= last; i++) {
        if(input[i] > 0) {
            for(let j = 0; j < input[i]; j++) {
                hand.push(i)
            }
        }
    }
    if(!hand)
        return []
    let AllCombination = perm.amn(hand, 3)
    let ValidComb = []
    AllCombination.forEach(comb => {
        if(FindBody(comb)) {
            ValidComb.push(comb)
        }
    })
    if(!ValidComb)
        return []
    const ExpectedCombNumber = parseInt(hand.length / 3)
    
    // simple case
    if(ExpectedCombNumber == ValidComb.length)
        return ValidComb
    else
        return []
}

FindBody = set => {
    if(isChi(set))
        return true
    if(isPon(set))
        return true
    return false
}

isChi = function(set) {
    if(set.length != 3)
        return false
    return set[0] == set[1] - 1 == set[2] - 2
}

isPon = function(set) {
    if(set.length != 3)
        return false
    return set[0] == set[1] == set[2]
}