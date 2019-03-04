const mongoose = require('mongoose')

const MahjongRecordSchema = new mongoose.Schema({
    'startTime': Date,
    'endTime': Date,
    'mode': Number, // 1(동풍전) | 2(반장전) | ...
    'players': [{
        'id': String,
        'score': Number, // 최종 점수.
        'rank': Number, // 최종 순위.
        'rateChanged': Number, // 레이트 등락.
    }],
    // 11~19(만수패), 21~29(통수패), 31~39(삭수패), 41~44(동·남·서·북), 51~53(백·발·중)
    'rotations': [{
        'round': Number, // 1(동1국) | 2(동2국) | ... | 7(남3국) | 8(남4국) | 9(서1국) | ...
        'counter': Number, // 본장. ex) (동1국일 경우) 0(동1국), 1(동1국 1본장), ...
        'riichi': Number, // 리치봉 개수.
        'dora': [Number], // 도라(기본 1개, 깡 발생 시 추가). ex) [31, 19] (1삭·9만이 도라. 발생 순서에 따름.)
        'uraDora': [Number], // 뒷도라(기본 0개, 리치한 자가 화료할 경우 도라와 개수 동일). ex) [44, 26] (북·6통이 각각 1삭·9만의 뒷도라)
        'aborted': Number, // 0(화료) | 100(유국) | 201(구종구패) | 202(사풍연타) | 203(사가리치) | 204(사개깡) | 205(삼가화)
        'result': {
            'tsumo': Boolean, // (화료 시 유효) true(쯔모 화료) | false(론 화료)
            'winner': Number, // (화료 시 유효) 화료자. 0(동가) | 1(남가) | 2(서가) | 3(북가)
            'loser': Number, // (론 화료 시 유효) 방총자. 0(동가) | 1(남가) | 2(서가) | 3(북가)
            'hand': {
                'closed': [Number], // (화료 시 유효) 울지 않은 모든 패들. ex) [11, 12, 13, 35, 35, 46, 46] (1만·2만·3만·5삭·5삭·발·발. 오름차순.)
                'opened': [[Number]], // (화료 시 유효) 울어서 만든 몸통들. ex) [[41, 41, 41], [27, 28, 29]] (동·동·동 코오쯔와 7통·8통·9통 슌쯔. 발생 순서에 따름.)
                'winWith': Number, // (화료 시 유효) 오름패. ex) 35 (5삭)
            },
            'yakus': [String], // (화료 시 유효) 만족시킨 역 명칭 리스트. 도라 개수 포함. ex) ["혼일색", "더블 동", "도라3"] (판수 내림차순, 도라 개수는 맨 뒤)
            'han': Number, // (화료 시 유효) 판수. 13 이상일 경우 13으로 고정. 더블 역만일 경우 26 고정.
            'fu': Number, // (화료 시 유효) 부수.
            'score': Number, // (화료 시 유효) 획득 점수. (판수·부수로 계산된 기본 점수 + 본장 보너스 점수)
            
        },
        'players': [{
            'scoreChanged': Number, // 이전 점수 대비 등락
            'score': Number, // 등락 적용 후 점수
        }],
    }],
})

MahjongRecordSchema.statics.getAllRecords = function() {
    return this.find({})
}

MahjongRecordSchema.statics.getRecordById = function(id) {
    return this.findOne({ '_id': id })
}

MahjongRecordSchema.statics.getRecordsByPlayerId = function(id) {
    return this.find({ 'players.id': id })
}

MahjongRecordSchema.statics.addRecord = function(record) {
    return new this(record).save()
}

module.exports = mongoose.model('mahjong-record', MahjongRecordSchema);