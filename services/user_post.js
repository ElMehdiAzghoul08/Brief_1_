const axios = require('axios')
const user = 'https://jsonplaceholder.typicode.com/users'
const posts = 'https://jsonplaceholder.typicode.com/posts'

module.exports = {
    getUser : ()=>{
        return axios.get(user)
    },
    getUserId : (userId)=>{
        return axios.get(user+'/'+userId)
                .then(response=>response)
                .catch(err=>err)
    },

    getPosts : ()=>{
        return axios.get(posts)
    }
}