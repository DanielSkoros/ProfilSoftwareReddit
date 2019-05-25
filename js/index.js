//Using node-fetch to make JEST fetch data
//UNCOMMENT THIS IF YOU WANT TO RUN TESTS
//const fetch = require("node-fetch")


let fetched = false
const posts = [];
let fetchedPosts = {}
const selectors = {
    fetchBtn: document.querySelector('#fetch'),
    sortBtn: document.querySelectorAll('#sort'),
    ratioBtn: document.querySelector('#high'),
    yesterdayBtn: document.querySelector('#yesterday'),
    postsContainer: document.querySelector('.posts-container')
}


const getResults = async() => {
    try {
        //Fetch response from reddit
        const response = await fetch('https://www.reddit.com/r/funny.json')
        //Get JSON file
        const data = await response.json()
        //Create data structure for a single post
        data.data.children.forEach(item => {
            const post = {
                'title': item.data.title,
                'upvotes': item.data.ups,
                'score': item.data.score,
                'num_comments': item.data.num_comments,
                'created': new Date(item.data.created_utc * 1000)
            }
        //Populate posts array  
        posts.push(post)
        })
        //Create data structure
        fetchedPosts = {
            posts,
            'count': posts.length
        }
        
    }catch(err) {
        //Log errors
        console.log(err)
    } 
           
    return fetchedPosts
    
}    
const sortPosts = (posts, params) => {
    //Sort posts ascending by parameter given
    posts.sort((a,b) => (a[params] > b[params]) ? -1 : 1)
}

const getHighestUpsToCommentsRatio = (arr) => {
    //Create static variable for highest ups to comments ratio
    if (typeof getHighestUpsToCommentsRatio.highest == 'undefined'){
        getHighestUpsToCommentsRatio.highest = 0
    }
    //Sort the array by ratio
    getHighestUpsToCommentsRatio.highest = [...arr].sort((a,b) => {
        const prev = a.upvotes / a.num_comments
        const next = b.upvotes / b.num_comments
        return prev < next ? 1 : -1
    })
    //Return highest ratio
    return getHighestUpsToCommentsRatio.highest[0]
}

const getPostsFromYesterday = (arr) => {
    //Using UTC. because created_utc is UTC. Using timestamps
    const yesterdayTimestamp = new Date().getTime() - (24 * 3600 * 1000)
    //Filter the array and return posts from 24 hours
    const fromYesterday = arr.filter((el) => new Date(el.created).getTime() > yesterdayTimestamp)
    return fromYesterday
}

const clearContainer = () => {
    selectors.postsContainer.innerHTML = `
            <tr>
                <th>Title</th>
                <th>Upvotes</th>
                <th>Score</th>
                <th>Comments</th>
                <th>Created</th>
            </tr>
    `
}

const renderFetchData = () => {
    if (fetched === false){
        getResults().then(posts => {
            let markup = ``
            posts.posts.forEach(post => {
                markup += `
                        <tr>
                            <td>${post.title}</td>
                            <td>${post.upvotes}</td>
                            <td>${post.score}</td>
                            <td>${post.num_comments}</td>
                            <td>${post.created}</td>
                        </tr>
                `
            })
            selectors.postsContainer.insertAdjacentHTML('beforeend', markup)
        })
        fetched = true
    }
    
}

const renderFromYesterday = () => {
    clearContainer()
    let markup = ``
    const yesterday = getPostsFromYesterday(fetchedPosts.posts)
    yesterday.forEach(post => {
        markup += `
                    <tr>
                        <td>${post.title}</td>
                        <td>${post.upvotes}</td>
                        <td>${post.score}</td>
                        <td>${post.num_comments}</td>
                        <td>${post.created}</td>
                    </tr>
            `
        })
    selectors.postsContainer.insertAdjacentHTML('beforeend', markup)
}

const renderHighestRatio = () => {
    clearContainer()
    const post = getHighestUpsToCommentsRatio(fetchedPosts.posts)
    const markup = `
        <tr>
            <td>${post.title}</td>
            <td>${post.upvotes}</td>
            <td>${post.score}</td>
            <td>${post.num_comments}</td>
            <td>${post.created}</td>
        </tr>
    `
    selectors.postsContainer.insertAdjacentHTML('beforeend', markup)
}

const renderSorted = (e) => {
    clearContainer()
    sortPosts(fetchedPosts.posts, e.target.value)
    let markup = ``

    fetchedPosts.posts.forEach(post => {
        markup += `
                    <tr>
                        <td>${post.title}</td>
                        <td>${post.upvotes}</td>
                        <td>${post.score}</td>
                        <td>${post.num_comments}</td>
                        <td>${post.created}</td>
                    </tr>
            `
        })
    selectors.postsContainer.insertAdjacentHTML('beforeend', markup)    
}


if (selectors.sortBtn){
    selectors.sortBtn.forEach(btn => btn.addEventListener('click', renderSorted))
}

if(selectors.ratioBtn){
    selectors.ratioBtn.addEventListener('click', renderHighestRatio)
}
if(selectors.yesterdayBtn){
    selectors.yesterdayBtn.addEventListener('click', renderFromYesterday)
}
if(selectors.fetchBtn){
    selectors.fetchBtn.addEventListener('click', renderFetchData)
}


//UNCOMMENT THIS TO RUN TESTS
// module.exports = {
//     getResults,
//     sortPosts,
//     getHighestUpsToCommentsRatio,
//     getPostsFromYesterday
// }