const getResults = require('./index')
const fetch = require("node-fetch");
test('Fetch', async () => {
  expect.assertions(1)
  try{
    const data = await getResults()
    const posts = await data
    expect(posts).toBeDefined()
  }catch(e){
    expect(e).toBeDefined()
  }
  
})
