<template>
  <v-form ref="form" @submit.prevent="processSearch()">
    <v-text-field
      v-model="stockSearch"
      class="stockSearch"
      placeholder="Enter a stock symbol (ie. MSFT)"
      prepend-inner-icon="mdi-magnify"
      :loading="isFetching"
      :rules="[rules.required, rules.stockSymbol]"
      clearable
      :rounded="rounded"
      :filled="filled"
      :dense="dense"
    />
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'StockSearch',
  props: {
    dense: {
      type: Boolean,
      default: false
    },
    filled: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      stockSearch: null,
      loadedSymbols: [],
      rules: {
        required: (val) => !!val || 'This field is required',
        // alphavantage seems to only have stocks with 1-5 alpha chars
        stockSymbol: (val) => {
          const pattern = /^[a-zA-Z]{1,5}$/
          return (
            pattern.test(val) ||
            'Stock symbols must contain only A-Z and have a length between 1 and 5 inclusive.'
          )
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      symbols: 'stocks/getStockSymbolCache',
      isFetching: 'stocks/getIsFetchingStock',
      selectedStockItems: 'stocks/getSelectedStock'
    }),
    hasSymbols() {
      return Object.keys(this.symbols).length > 0
    }
  },
  methods: {
    ...mapActions({
      search: 'stocks/fetchFromApi'
    }),
    processSearch() {
      if (this.$refs.form.validate()) {
        this.search({ symbol: this.stockSearch })
      }
    }
  }
}
</script>

<style>
.stockSearch input {
  text-transform: uppercase;
}
</style>
