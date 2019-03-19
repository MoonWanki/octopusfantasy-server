// 김대리

/*
    opened :
    {
        {
            type: string,
            nakuby: int,
            meld: array<Tile>
        }, 
        {
            type: string,
            nakuby: int,
            meld: array<Tile>
        }, 
    }
    
*/

module.exports = (rotation, player, mensen) => {
    const { tsumoTile, agariTiles } = player.hand

    let candidate = new Array()

    for(var agari of agariTiles) {
        const { tile } = agari
        if(JSON.stringify(tile) == JSON.stringify(tsumoTile)) {
            candidate.push(getYakus(rotation, player, agari, mensen))
        }
    }


    return yakus
}

const getYakus = (rotation, player, agari, mensen) => {
    let yakus = new Array()
    const { wind } = rotation
    const { melds, head, wait } = agari
    const { didRiichi, didDoubleRiichi, wind: playerWind } = player
    const { opened } = player.hand
    
    let body = melds.slice()
    opened.forEach(object => { body.push(object.meld) })


    // 울어도 되는 역
        // 안깎이는 역
    // 대대화
    if(toitoi(body)) {
        yakus.push({
            yaku: "toitoi",
            han: 2
        })
    }
    // 삼안각
    if(toitoi(body) && opened.length == 0) {
        yakus.push({
            yaku: "sanankou",
            han: 2
        })
    }
    // 탕야오
    if(tanyao(body, head)) {
        yakus.push({
            yaku: "tanyao",
            han: 2
        })
    }    
    // 소삼원
    if(smallTriplet(body, head)) {
        yakus.push({
            yaku: "shousangen",
            han: 2
        })
    }
    // 대삼원
    if(bigTriplet(body, head)) {
        yakus.push({
            yaku: "daisangen",
            han: 13
        })
    }
    // 삼깡즈
    if(sankantsu(opened)) {
        yakus.push({
            yaku: "sankantsu",
            han: 2
        })
    }
    // 삼색동코
    if(colourTriplet(body)) {
        yakus.push({
            yaku: "sanshoukuDouko",
            han: 2
        })
    }
    // 혼노두
    if(honroto(body, head)) {
        yakus.push({
            yaku: "honroto",
            han: 2
        })
    }
    // 역패
    const yakuCnt = yakuhai(body, wind, playerWind)
    if(yakuCnt) {
        yakus.push({
            yaku: "yakuhai",
            han: yakuCnt
        })
    }
    // 영상개화
    // 해저로월
    // 하저로어
    // 창깡
    // 유국만관
    // 인화
    if(opened.length == 0) { // 멘젠 유지
        // 리치 더블리치
        if(didRiichi) {
            yakus.push({
                yaku: "riichi",
                han: 1
            })
        }
        if(didDoubleRiichi) {
            yakus.push({
                yaku: "doubleRiichi",
                han: 2
            })
        }
        // 멘젠쯔모
        if(mensen) {
            yakus.push({
                yaku: "mensenTsumo",
                han: 1
            })
        }
        //이페코 량페코
        const { yaku, peikoCnt} = peiko(meld)
        if(peikoCnt == 1) {
            yakus.push({
                yaku: yaku,
                han: 1
            })
        }
        if(peikoCnt == 2) {
            yakus.push({
                yaku: yaku,
                han: 3
            })
        }
        //핑후
        if(pinghu(meld, head) && wait == "ryan") {
            yakus.push({
                yaku: "pinghu",
                han: 1
            })
        }
        //치또
        if(sevenHead(meld)) {
            yakus.push({
                yaku: "chitoitsu",
                han: 2
            })
        }
    }
    return yakus
}

const toitoi = melds => {
    for(var arr of melds) {
        if((arr[0].type != arr[1].type || arr[1].type != arr[2].type) && (arr[0].number != arr[1].number || arr[1].number != arr[2].number)) {
            return false
        }
    }
    return true
}

const tanyao = (body, head) => {
    body.push(head)
    body.forEach(meld => {
        meld.forEach(tile => {
            if(tile.type > 3 || (tile.number < 2) || tile.number > 8)
                return false
        })
    })
    return true
}

const smallTriplet = (body, head) => {
    let cnt = 0
    body.forEach(arr => {
        if(arr[0].type == 5)
            cnt++
    })
    if(cnt == 2 && head[0].type == 5)
        return true
    return false
}

const bigTriplet = body => {
    let cnt = 0
    body.forEach(arr => {
        if(arr[0].type == 5)
            cnt++
    })
    if(cnt == 3)
        return true
    return false
}

const colourTriplet = body => {
    let man = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let sou = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let pin = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    body.forEach(arr => {
        if((arr[0].type == arr[1].type || arr[1].type == arr[2].type) && (arr[0].number == arr[1].number || arr[1].number == arr[2].number)) {
            if(arr[0].type == 1)
                man[arr[0].number]++
            if(arr[0].type == 2)
                sou[arr[0].number]++
            if(arr[0].type == 3)
                pin[arr[0].number]++
        }
    })
    for(let i = 1; i <= 9; i++) {
        if(man[i] == sou[i] && sou[i] == pin[i])
            return true
    }
    return false
}

const sankantsu = opened => {
    let cnt = 0
    opened.forEach(object => {
        if(object.type == "Daiminkan"
        || object.type == "Souminkan"
        || object.type == "Ankan") {
            cnt++
        }
    })
    if(cnt == 3)
        return true
    return false
}

const honroto = (body, head) => {
    body.forEach(arr => {
        if((arr[0].type == arr[1].type || arr[1].type == arr[2].type) && (arr[0].number == arr[1].number || arr[1].number == arr[2].number)) {
            if(arr[0].ishonour == false)
                return false
        }
    })
    if(head[0].ishonour == false)
        return false
    return true
}

const yakuhai = (body, wind, playerWind) => { // 1 : 東 | 2 : 南 | 3 : 西 | 4 : 北
    let cnt = 0
    body.forEach(arr => {
        if((arr[0].type == arr[1].type || arr[1].type == arr[2].type) && (arr[0].number == arr[1].number || arr[1].number == arr[2].number)) {
            if(arr[0].type == 5) {
                cnt++
                continue
            }
            if(arr[0].type == 4) {
                if(arr[0].number == wind) { cnt++ }
                if(arr[0].number == playerWind) { cnt++ }
            }
        }
    })
    return cnt
}

const pinghu = (meld, head) => {
    let flag = true
    //head checking
    if(head[0])
        flag = false
    let shuntsuCnt = 0
    meld.forEach(arr => {
        if(arr[0].number == arr[1].number+1 || arr[1].number == arr[2].number + 1)
            shuntsuCnt++
    })
    if(shuntsuCnt < 3)
        flag = false
    return flag
} 

const sevenHead = (meld) => {
    if(meld.length == 7)
        return true
    return false
}

const peiko = (meld) => {
    const sorted = meld.sort((a, b) => {
        if(JSON.stringify(a) <= JSON.stringify(b))
            return 1
        else
            return 0
    })
    let cnt = 0
    for(let i = 0; i < sorted.length-1;) {
        if(JSON.stringify(sorted[i]) == JSON.stringify(sorted[i+1])) {
            console.log(sorted[i])
            cnt++
            i+=2
        }
        else
            i++
    }
    let yaku = ""
    if(cnt == 1)
        yaku = "ipeiko"
    else if(cnt == 2)
        yaku = "ryanpeiko"
    return {
        yaku: yaku,
        cnt: cnt
    }
}