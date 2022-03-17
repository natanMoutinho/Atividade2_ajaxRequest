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
                    //imgListener();
                    // console.log(typeof listImg);
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
                        <div class="d-flex ">   
                            <img class="avatarImg ml-1" src="./public/img/generic_avatar.jpg" alt="">
                            <h5 class="titleComent card-title">${commentsAtual.name}</h5>
                        </div>
                    </div>
                    <p class="card-text"> ${commentsAtual.body}</p>
                    <div >
                        <img class="emailIcon"src="./public/img/email_icon.png" alt="">
                        <a class="emailStyle"href="${commentsAtual.email}"> ${commentsAtual.email}</a>
                        <img class="likeDeslikeIcons" src="./public/img/like_icon.png" alt="">
                        <text>0</text>
                        <img class="likeDeslikeIcons" src="./public/img/dislike_icon.png" alt="">
                        <text>0</text>
                    </div>

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
                <a data-bs-toggle="modal" data-bs-target="#modalImg${photo.id}">
                    <div class="card shadow-sm btnImgModal">
                        <img src="${photo.thumbnailUrl}">
                            <!--
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalImg${photo.id}">
                            Launch static backdrop modal
                            </button>
                            <img id="imgReal" src="${photo.url}" hidden>
                            <p id="imgTitle"class="modal-title" hidden>${photo.title}</p> 
                            
                            --!>
                    </div>
                </a>
                <!-- Modal -->
                <div id="modalImg${photo.id}" class="modal fade  opacity-100" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                    aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div id="modalContent" class="modal-content">
                            <div id="modalImgHeader"  class="modal-header">
                                <p class="modal-title">${photo.title}</p> 
                                <button onclick="(this)=>{this.hide();} "type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div  id="modalImgBody"  class="modal-body">
                                <div class="card shadow-sm btnImgModal">
                                    <img id="imgReal" src="${photo.url}">  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).appendTo('#' + idDivList);
        console.log(photo);
    }
}

// function imgListener() {
//     let imgs = document.getElementsByClassName('btnImgModal');
//     //let imgs = $('.btnImgModal');
//     for (let i = 0; i < imgs.length; i++) {
//         imgs[i].addEventListener('click', function () {
//             const childImg = this.querySelector('#imgReal').getAttribute('src');
//             const childTitle = $(this).children('#imgTitle')[0]['innerText'];
//             showModalImg(childTitle,childImg);
//             //$('#modalImg').show();
//             $('#modalImg').show();
//             //console.log(childImg.getAttribute('src'));
//             // if(this.children[0].getAttribute('id') == "imgReal")
//             //     console.log(this);
//         });
//     }
// }
// function showModalImg(imgTitle,imgUrl){
//     let modalContent = $('#modalContent');
//     console.log(modalContent);
//     //let imgHeader = modal.querySelector('#modalImgHeader');
//     let imgHeader = $(modalContent).children('#modalImgHeader');
//     let imgBody = $(modalContent).children('#modalImgBody');
//     //console.log(imgHeader);
//     //console.log(imgBody);
//     // let imgBody = modal.querySelector('#modalImgBody');
//     //$('#modalImgHeader').remove('<img>');
//     imgHeader.empty();
//     imgBody.empty();
//     $(`
//         <p class="modal-title">${imgTitle}</p> 
//         <button type="button" class="btn-close" data-bs-dismiss="#modalImg" aria-label="Close"></button>
//     `).appendTo(imgHeader);
//     $(`
//         <div class="card shadow-sm btnImgModal">
//             <img id="imgReal" src="${imgUrl}">  
//         </div>
//     `).appendTo(imgBody);
//     $(modalContent).focus();
//     //$(modal).show();
//     // $(modal).modal({
//     //     show: true
//     // })
// }
