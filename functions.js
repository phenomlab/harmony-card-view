function cardView() {
    $(document).ready(function() {
        var href = "/path/to/card.css";
        // Check if the screen width is 1200px or more
        if ($(window).width() >= 1200) {
            // Check if the dropdown already exists
            if ($('#enableCardView').length === 0) {
                var cardView = $('<div class="threads-wrapper"><i class="fa fa-fw fa-bars left"></i><form class="form"><div class="form-check form-switch sticky-tools-bar"> \
              <input class="form-check-input" id="enableCardView" type="checkbox" data-field="enableCardView"> \
              <label class=" d-none d-md-inline fw-semibold" for="enableCardView"><i class="fa fa-fw fa-columns-3 right"></i></label> \
          </div></form></div>');
                $('.topic-list-header [component="category/controls"]').append(cardView);
                // Check if there's a stored state for the checkbox and update it
                var storedState = localStorage.getItem('enableCardViewState');
                if (storedState === 'true') {
                    $('#enableCardView').prop('checked', true);
                }
            }
            // Append or remove the css file when the checkbox changes state
            $('#enableCardView').on('change', function() {
                var isChecked = $(this).is(':checked');
                var theTooltip = isChecked ? "List View" : "Card View"; // Update tooltip message
                if (isChecked) {
                    console.log('Card view is active.');
                    $('<link rel="stylesheet" type="text/css" href="' + href + '">').appendTo("head");
                } else {
                    console.log('Card view is inactive.');
                    var cssLink = $('link[href="' + href + '"]');
                    if (cssLink.length) {
                        cssLink.remove();
                    }
                }

                // Update the tooltip title
                $(this).attr('data-original-title', theTooltip).tooltip('dispose').tooltip({
                    placement: 'bottom',
                    title: theTooltip,
                    trigger: 'hover'
                });
                // Store the checkbox state in localStorage
                localStorage.setItem('enableCardViewState', isChecked);
            });

            // Check for changes in the checkbox state when the page loads
            $('#enableCardView').trigger('change');
        }
    });
}



$(window).on('action:ajaxify.end', function(data) {
    $(document).ready(function() {
        cardView();
    });
});
$(window).on('action:posts.edited', function(data) {
    $(document).ready(function() {
        cardView();
    });
});
$(window).on('action:posts.loaded', function(data) {
    $(document).ready(function() {
        cardView();
    });
});
