const postContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');


let limit =3;
let page =1;
//fetching posts
async function getPosts(){
    const res  = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data =await res.json();
    return data;
}

//show posts
async function showPosts(){
    const posts =await getPosts();
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;
        postContainer.appendChild(postEl);

    });

}
//Loader activate
function showLoader(){
    loading.classList.add('loaderActive');
    setTimeout(()=>{
        loading.classList.remove('loaderActive');
    },100)
}
//Searching Functionality
filter.addEventListener('input',filterPosts);
function filterPosts(e){
    const term = e.target.value;
    const posts = document.querySelectorAll('.post');
    posts.forEach(post =>{
        const title = post.querySelector('.post-title').innerText;
        const body = post.querySelector('.post-body').innerText;
        if(title.indexOf(term) >-1 || body.indexOf(term) >-1){
            post.style.display = 'flex';
        }else{
            post.style.display = 'none';
        }
    })
}
showPosts()
//Infinity Scroll
window.addEventListener('scroll',()=>{
    const {scrollTop , clientHeight,scrollHeight} = document.documentElement;
    if(scrollTop + clientHeight >= scrollHeight -20){
        page++;
        showLoader()
        showPosts();
    }
})
