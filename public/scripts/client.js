$(document).ready(function() {
    // Detect if user is near the bottom of the page
    var didScroll = false;
    var page = 1;
    $(window).scroll(function() {
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            didScroll = false;
            
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                loadMorePosts(page);
                page++;
            }
        }
    }, 250);

    $('#createPost').submit(function(e) {
        e.preventDefault();
        var title = $('input[name="title"').val();
        var blurb = $('textarea#blurb').val();
        var author = $('input[name="author"').val();
        var thumbnail = $('input[name="thumbnail"').val();
        var details = $('input[name="details"').val();

        createPost(title, blurb, author, thumbnail, details);
    })
});

function loadMorePosts(page) {
    $.ajax({
        type: "GET",
        url: "/entries/" + page,
        data: {},
        dataType: 'JSON',
        success: function(data) {
            if (data.length == 0) {
                $('.done-row').css("display", "initial");
            }

            for (var i=0; i < data.length; i++) {
                $('.post-row').append(createPanel(data[i]));
            }
            
            
        },

        error: function(e) {
            $('.post-row').append('<h3>An error has occured!</h3>');
        }
    });
};

function createPost(pTitle, pBlurb, pAuthor, pThumbnail, pDetails) {
    $.ajax({
        type: "POST",
        url: "/entries",
        data: {title: pTitle, blurb: pBlurb, author: pAuthor, thumbnail: pThumbnail, details: pDetails},
        dataType: "JSON",
        success: function(data) {
            $("#myModal").modal('hide');
            $('.post-row').prepend(createPanel(data));
        },

        error: function(e) {
            console.log(e);
            $("#myModal").modal('hide');
            $('.site-wrap').prepend('<div class="alert alert-warning alert-dismissible" role="alert">' +
                                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                    '<strong>Warning! </strong>' + e.responseJSON.message +
                                    '</div>');
        }   
    })
}

function createPanel(data) {
    var panel = '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 panel-wrap">' +
                    '<div class="panel panel-default">' +
                        '<div class="panel-body">' +
                            '<img class="img-responsive" src=' + data.thumbnail_url + '>'+
                        '</div>' +
                        '<div class="panel-footer">' +
                            '<p>' + data.title + '</p>' +
                            '<p>' + data.author + '</p>' +
                            '<p>' + data.blurb + '</p>' +
                            '<a href='+ data.details_url +'>Read More</a>' +
                        '</div>' +
                    '</div>' +
                '</div>';

    return panel;
}