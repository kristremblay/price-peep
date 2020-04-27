# price-peep

> Demo Nuxt application using VueJS with Vuetify, Vuex, and a bunch of other goodies to interact with the Alphavantage API.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Logging in

The user credentials are:

E: `user@example.com` | <br>
P: `test123`

# Notes for the User

Both the login process and stock symbol queries will take at least a full second. This is intentional to show the loading bars. Without an artificial limitation, it's basically instant.

When a stock symbol is queried successfully, the results are cached such that a subsequent query for that symbol is retrieved from memory instead of an API request. This works great for a single session, but in a perfect world it do a date comparison of current date and the most recent data point.

Logging out does not clear the stock cache.

If you somehow burn the API key, you can get another one from https://alphavantage.co/support/#api-key . You are limited to 5 queries per minute, up to 500 per day. This application stores the key in `nuxt.config.js` under:

```js
{
  // ...
  env: {
    alphaVantage: {
      key: '##########'
    }
  }
  // ...
}
```

# FAQ

## How long did this take?

Approximately 15 hours went into developing this project. If I had to split up how the time was distributed, it would probably be something to the effect of:

- 10% planning
- 60% in research
- 30% actual implementation

## Wow, that's a lot of time in research. Why did so much time go to that?

Life and work are busy, so I tried to find a good middleground of learning cool new stuff and using things I was already familiar with. In this case, Nuxt was something I had planned to get into for a long time in order to build PWA's, and I hadn't previously used Vuetify extensively.

## Did you finish what you set out to do?

I believe I did, for the most part. I have ideas on how I would make it better, including:

- persisting the Vuex store in localstorage (vue-persist)
- add current stock symbol to the route
- implementing a time filter such that we don't have 100 data points in the chart and can focus on a period
- improve accessibility via aria tags
- add debouncing to the stock api fetch\*

Given more time, I could have implemented a basic "registration" system tracking different users' stock searches (again, using vue-persist).

_I would go as far as to say we shouldn't query the Alphavantage API directly from the front end, but rather create a local API endpoint and use it as a proxy. This way we can control things such as rate limiting, caching,etc server-side and don't have to worry about someone using our API key. Results could be cached in Redis or Elasticsearch to reduce API calls._

## Lessons Learned

Keep it simple.

## What's to come

I found this project to be an interesting exercise and would still like to see some ideas come to fruition. If time allows, I will be adding a feature to present the user with a list of stocks they had viewed during their session so that they may navigate without having to search again.

<br/>

---

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
