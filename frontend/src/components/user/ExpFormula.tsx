import React from "react"

function ExpFormula() {
    let DEFAULTS = {
        level: 1,
        xp: 0,
        cap: 30,
        deltaNext: 50,
    }
    // set level with given xp
    let set = function (xp: number, deltaNext: number) {
        return (1 + Math.sqrt(1 + (8 * xp) / deltaNext)) / 2
    }
    // get exp to the given level with given current_level and xp
    let getXPtoLevel = function (level: number, deltaNext: number) {
        return ((Math.pow(level, 2) - level) * deltaNext) / 2
    }
    let parseByXP = function (xp: number | undefined, cap: number | undefined, deltaNext: number | undefined) {
        xp = xp === undefined ? DEFAULTS.xp : xp
        cap = cap === undefined ? DEFAULTS.cap : cap
        deltaNext = deltaNext === undefined ? DEFAULTS.deltaNext : deltaNext
        let l = set(xp, deltaNext)
        l = l > cap ? cap : l
        let level = Math.floor(l),
            forNext = getXPtoLevel(level + 1, deltaNext)
        forNext = l === cap ? Infinity : forNext
        let toNext = l === cap ? Infinity : forNext - xp
        let forLast = getXPtoLevel(level, deltaNext)
        return {
            level: level,
            levelFrac: l,
            xp: xp,
            per: (xp - forLast) / (forNext - forLast),
            forNext: forNext,
            toNext: toNext,
            forLast: forLast,
        }
    }
    return {
        parseByLevel: function (l: number | undefined, cap: number | undefined, deltaNext: number | undefined) {
            l = l === undefined ? DEFAULTS.level : l
            deltaNext = deltaNext === undefined ? DEFAULTS.deltaNext : deltaNext
            let xp = getXPtoLevel(l, deltaNext)
            console.log(xp)
            return parseByXP(xp, cap, deltaNext)
        },
        parseByXP: parseByXP,
    }
}

export default ExpFormula
