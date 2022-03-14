// import loadPostsHtml from './module/posts.js';
$('#sl_opt').change(() => {
    $('#content').empty();
    switch ($('#sl_opt').val()) {
        case 'posts':
            $('#modal_aguardar').show();
            loadPosts();
            break;
        case 'comments':
            $('#modal_aguardar').show();
            loadComments();
            break;
        case 'photos':
            $('#modal_aguardar').show();
            loadPhotos();
            break;
        default:
            $('#content').empty();
            break;
    }

});
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
function loadPosts() {
    const post = sendRequestPosts();
    post.then((data) => {
        $('#modal_aguardar').hide();
        listPosts(data, $('#content'));
    })
}
function loadComments() {
    const comments = sendRequestComments();
    comments.then((data) => {
        $('#modal_aguardar').hide();
        listComments(data, $('#content'));
    })

}
function loadPhotos() {
    const photos = sendRequestPhotos();
    photos.then((data) => {
        $('#modal_aguardar').hide();
        listPhotos(data, $('#content'), 0);
    })
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
function listPhotos(listPhotos, idContent, positionInitial) {
    //for(let photoAtual of listPhotos){
    let contA = positionInitial;
    let contB = contA;
    for (let i = 0; i < 10; i++) {
        const divRow = document.createElement('div');
        $(divRow).attr('class', 'row');
        contB = contA;
        for (let z = contA; z < contB + 4; z++) {
            $(` 
                <div class="col">
                    <img src="${listPhotos[z].url}" class="img-thumbnail rounded" >
                </div>
            `).appendTo(divRow);
            contA = z + 1;
        }
        console.log(contA + '  ' + contB);
        $(divRow).appendTo(idContent);
    }
    return contA;
}