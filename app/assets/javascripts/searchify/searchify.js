(function ($) {
    $.fn.searchify = function () {
        return this.each(function () {
            var $this = $(this);
            $this.autocomplete({
                source: $this.data('search-url'),
                delay: $this.data('delay') || 500,
                autoFocus: $this.data('autofocus') || false,
                appendTo: 'body',
                select: function (event, ui) {
                    var select_url = $this.data("select-url");
                    if (select_url) {
                        for (element in ui.item)
                            select_url = select_url.replace('\(' + element + '\)', ui.item[element]);
                        if (window.Turbolinks) {
                            Turbolinks.visit(select_url);
                        } else {
                            window.location.href = select_url;
                        }
                    } else {
                        $this.prev().val(ui.item.id);
                        $this.data('value', ui.item.id);
                        $this.blur();
                        $this.focus();
                    }
                }
            });

            $this.change(function (event, ui) {
                if ($this.prev().val() == '' || $this.prev().val() != $this.data('value')) {
                    $this.val('');
                    $this.prev().val('');
                }
            });

            $this.focus(function (event, ui) {
                $this.data('value', '');
            });
        });
    };
})(jQuery);
