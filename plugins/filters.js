import Vue from 'vue'

const currency = (val) => {
  const currencyValue = Number(val).toLocaleString('en-us', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  })

  return `$${currencyValue}`
}

Vue.filter('currency', currency)
