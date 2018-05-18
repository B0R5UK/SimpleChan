$(document).ready(function() {

            $('#addnewcommentbutton').popover({
            //znika po kliknieciu
            trigger: 'click',
            html: true,  // must have if HTML is contained in popover

            // get conent
            content: function() {
                return $(this).parent().find('#addnewcomment').html();
            },
            container: 'body'
            });

    
});
        