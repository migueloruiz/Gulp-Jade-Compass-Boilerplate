
/* global self fetch caches */

// const version = 1
// const GENERAL_CACHE = `static-cache-v${version}`
// const NEWS_CACHE = `news-cache`
// const IMAGES_CACHE = `images-cache`

// const REQUIRED_FILES = [
//   // ...
//   // ...
//   // ...
// ]

self.addEventListener('install', function (event) {
  console.log('Intalling')
})

self.addEventListener('activate', function (event) {
  console.log('Activate')
})

self.addEventListener('fetch', function (event) {
  console.log('Fetch', event)
})
