import React from 'react'

function convertCurrency(amount: number) {
    return "฿" + amount.toFixed(2)
}

export default convertCurrency