import axios from 'axios'

export const state = () => {
  return {
    invalidStock: false,
    selectedStock: null,
    fetchingStock: false,
    cache: {}
  }
}

export const mutations = {
  addStockToCache(state, { symbol, data }) {
    state.cache[symbol] = data
  },
  toggleFetchingStock(state) {
    state.fetchingStock = !state.fetchingStock
  },
  selectStock(state, symbol) {
    state.selectedStock = symbol
  },
  setInvalidStock(state, tf) {
    state.invalidStock = tf
  }
}

export const actions = {
  fetchFromApi({ commit, state }, payload) {
    commit('setInvalidStock', false)
    commit('toggleFetchingStock')
    return new Promise((resolve, reject) => {
      const symbol = payload.symbol.toUpperCase()
      setTimeout(() => {
        if (!(symbol in state.cache)) {
          const endpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&amp;symbol=${symbol}&amp;apikey=${process.env.alphaVantage.key}`
          axios
            .get(endpoint)
            .then((res) => {
              const series = res.data['Time Series (Daily)']
              const stockData = Object.keys(series).map((date) => {
                const data = series[date]

                return {
                  date,
                  open: data['1. open'],
                  high: data['2. high'],
                  low: data['3. low'],
                  close: data['4. close'],
                  volume: data['5. volume']
                }
              })

              commit('addStockToCache', {
                symbol,
                data: stockData
              })

              commit('selectStock', symbol)
            })
            .catch((error) => {
              commit('setInvalidStock', true)
              reject(error)
            })
        } else {
          commit('selectStock', symbol)
        }

        commit('toggleFetchingStock')
        resolve()
      }, 1000)
    })
  }
}

export const getters = {
  getIsFetchingStock(state) {
    return state.fetchingStock
  },
  getInvalidStock(state) {
    return state.invalidStock
  },
  getSelectedStock(state) {
    return state.selectedStock
  },
  getSelectedStockItems(state) {
    return state.cache[state.selectedStock]
  },
  getStockSymbolCache(state) {
    return state.cache
  }
}
