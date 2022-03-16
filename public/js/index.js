// import loadPostsHtml from './module/posts.js';
$(document).ready(() => {
    let listImg = {};
    let boolPhotos = false;
    $('#sl_opt').change(() => {
        $('#content').empty();
        switch ($('#sl_opt').val()) {
            case 'posts':
                $('#modal_aguardar').show();
                boolPhotos = false;
                const post = sendRequestPosts();
                post.then((data) => {
                    $('#modal_aguardar').hide();
                    listPosts(data, $('#content'));
                })
                break;
            case 'comments':
                $('#modal_aguardar').show();
                boolPhotos = false;
                const comments = sendRequestComments();
                comments.then((data) => {
                    $('#modal_aguardar').hide();
                    listComments(data, $('#content'));
                })
                break;
            case 'photos':
                $('#modal_aguardar').show();
                boolPhotos = true;
                const photos = sendRequestPhotos();
                photos.then((data) => {
                    $('#modal_aguardar').hide();
                    listImg = data;
                    listPhotos(listImg.splice(0, 100), $('#content'));
                    console.log(typeof listImg);
                })
                break;
            default:
                $('#content').empty();
                break;
        }
    });
    window.addEventListener('scroll', () => {
        if ((window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) && boolPhotos === true)
            listPhotos(listImg.splice(0, 100), $('#content'));
    })
})

// REQUEST TO PLACEHOLDER
function sendRequestPosts() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return $.getJSON(url);
}
function sendRequestComments() {
    const url = 'https://jsonplaceholder.typicode.com/comments';
    return $.getJSON(url);
}
function sendRequestPhotos() {
    const url = 'https://jsonplaceholder.typicode.com/photos';
    return $.getJSON(url);
}
// ============================================================
function listPosts(listPost, idContent) {
    for (let postAtual of listPost) {
        $(`
            <div class="card mb-2" style="width: 100%">
                <div class="card-body">
                    <h5 class="card-title">${postAtual.title}</h5>
                    <p class="card-text"> ${postAtual.body}</p>
                </div>
            </div>
        `).appendTo(idContent);
    }
}
function listComments(listComments, idContent) {
    for (let commentsAtual of listComments) {
        $(`
            <div class="card mb-2" style="width: 100%">
                <div class="card-body">
                    <div class="col">   
                        <img src="./public/img/generic_avatar.jpg" alt="">
                        <h5 class="card-title">${commentsAtual.title}</h5>
                    </div>
                    <p class="card-text"> ${commentsAtual.body}</p>

                </div>
            </div>
        `).appendTo(idContent);
    }
}
function listPhotos(listPhotos, idContent) {
    let idDivList = "divListPhoto"
    $(`
        <div  id="${idDivList}" class="row row-cols-1 row-cols-sm-2 row-cols-md-3  row-cols-md-4 g-4">
    `).appendTo(idContent);
    for (let photo of listPhotos) {
        $(`
            <div class="col">
               <div class="card shadow-sm">
                        <img src="${photo.thumbnailUrl}">
                </div>
            </div>
        `).appendTo('#' + idDivList);
    }
}