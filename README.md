getResults() - function fetches data from r/funny and creates the data structure as required in task number one

sortPosts() - using array method sort and params to get the result required in task 2

const getHighestUpsToCommentsRatio - create a local array to store the ratio and sort it. Returns highest ratio (index 0) - task 3

const getPostsFromYesterday - filters the array to leave the elements that matches timestamp from 24 hours back. Task 4

Every render function - task 5
You can only fetch data from reddit once (flag fetched)

LINE 3 - JEST does not support fetchAPI, so we require it from node-fetch (see package.json). Uncomment to run tests

LINE 173 - Uncomment the export to run tests.

Tested on google-chrome-stable.desktop on Manjaro KDE.

index.test.js - unit test of fetching data.

Other functions are pretty simple and uses built-in JS methods. This is why there are no other tests.

UI is only practical and functional.

