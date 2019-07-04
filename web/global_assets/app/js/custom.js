/* ------------------------------------------------------------------------------
 *
 *  # Custom JS code
 *
 *  Place here all your custom js. Make sure it's loaded after app.js
 *
 * ---------------------------------------------------------------------------- */


var CustomScript = function () {
    // Wizard
    var _componentWizard = function () {
        if (!$().steps) {
            console.warn('Warning - steps.min.js is not loaded.');
            return;
        }
        $('.listProductImageForm').steps({
            headerTag: 'h6',
            bodyTag: 'fieldset',
            transitionEffect: 'fade',
            titleTemplate: '<span class="number">#index#</span> #title#',
            labels: {
                finish: 'Upload Product Image <i class="icon-upload ml-2" />'
            },
            onFinished: function (event, currentIndex) {
                $("#FileUploadForm").submit();
                event.preventDefault();
            }
        });
        $('.listBusinessImageForm').steps({
            headerTag: 'h6',
            bodyTag: 'fieldset',
            transitionEffect: 'fade',
            titleTemplate: '<span class="number">#index#</span> #title#',
            labels: {
                finish: 'Upload Business Logo <i class="icon-upload ml-2" />'
            },
            onFinished: function (event, currentIndex) {
                $("#UserFileUploadForm").submit();
                event.preventDefault();
            }
        });
        $('.listBusinessImageForm2').steps({
            headerTag: 'h6',
            bodyTag: 'fieldset',
            transitionEffect: 'fade',
            titleTemplate: '<span class="number">#index#</span> #title#',
            labels: {
                finish: 'Upload Business Logo <i class="icon-upload ml-2" />'
            },
            onFinished: function (event, currentIndex) {
                $("#UserFileUploadForm2").submit();
                event.preventDefault();
            }
        });

        //
        // Wizard with validation
        //

        // Stop function if validation is missing
        if (!$().validate) {
            console.warn('Warning - validate.min.js is not loaded.');
            return;
        }


        var form = $('.listUserProductForm').show();
        // Initialize wizard
        $('.listUserProductForm').steps({
            headerTag: 'h6',
            bodyTag: 'fieldset',
            titleTemplate: '<span class="number">#index#</span> #title#',
            labels: {
                previous: '<i class="icon-arrow-left13 mr-2" /> Previous',
                next: 'Next <i class="icon-arrow-right14 ml-2" />',
                finish: 'List Product <i class="icon-checkmark-circle ml-2" />'
            },
            transitionEffect: 'fade',
            autoFocus: true,
            onStepChanging: function (event, currentIndex, newIndex) {

                // Allways allow previous action even if the current form is not valid!
                if (currentIndex > newIndex) {
                    return true;
                }

                // Needed in some cases if the user went back (clean up)
                if (currentIndex < newIndex) {
                    // To remove error styles
                    form.find('.body:eq(' + newIndex + ') label.error').remove();
                    form.find('.body:eq(' + newIndex + ') .error').removeClass('error');
                }

                form.validate().settings.ignore = ':disabled,:hidden';
                return form.valid();
            },
//            onFinishing: function (event, currentIndex) {
//                form.validate().settings.ignore = ':disabled';
//                alert(form.valid());
//                return form.valid();
//            },
            onFinished: function (event, currentIndex) {
                listProduct();
            }
        });


        // Initialize validation
        $('.listUserProductForm').validate({
            ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
            errorClass: 'validation-invalid-label',
            highlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },
            unhighlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },

            // Different components require proper error label placement
            errorPlacement: function (error, element) {

                // Unstyled checkboxes, radios
                if (element.parents().hasClass('form-check')) {
                    error.appendTo(element.parents('.form-check').parent());
                }

                // Input with icons and Select2
                else if (element.parents().hasClass('form-group-feedback') || element.hasClass('select2-hidden-accessible')) {
                    error.appendTo(element.parent());
                }

                // Input group, styled file input
                else if (element.parent().is('.uniform-uploader, .uniform-select') || element.parents().hasClass('input-group')) {
                    error.appendTo(element.parent().parent());
                }

                // Other elements
                else {
                    error.insertAfter(element);
                }
            },
            rules: {
                email: {
                    email: true
                }
            }
        });



        var form2 = $('.listUserBusinessForm').show();
        // Initialize wizard
        $('.listUserBusinessForm').steps({
            headerTag: 'h6',
            bodyTag: 'fieldset',
            titleTemplate: '<span class="number">#index#</span> #title#',
            labels: {
                previous: '<i class="icon-arrow-left13 mr-2" /> Previous',
                next: 'Next <i class="icon-arrow-right14 ml-2" />',
                finish: 'List Business <i class="icon-checkmark-circle ml-2" />'
            },
            transitionEffect: 'fade',
            autoFocus: true,
            onStepChanging: function (event, currentIndex, newIndex) {

                // Allways allow previous action even if the current form is not valid!
                if (currentIndex > newIndex) {
                    return true;
                }

                // Needed in some cases if the user went back (clean up)
                if (currentIndex < newIndex) {

                    // To remove error styles
                    form2.find('.body:eq(' + newIndex + ') label.error').remove();
                    form2.find('.body:eq(' + newIndex + ') .error').removeClass('error');
                }

                form2.validate().settings.ignore = ':disabled,:hidden';
                return form2.valid();
            },
            onFinishing: function (event, currentIndex) {
                form2.validate().settings.ignore = ':disabled';
                return form2.valid();
            },
            onFinished: function (event, currentIndex) {
                listBusiness();
            }
        });


        // Initialize validation
        $('.listUserBusinessForm').validate({
            ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
            errorClass: 'validation-invalid-label',
            highlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },
            unhighlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },

            // Different components require proper error label placement
            errorPlacement: function (error, element) {

                // Unstyled checkboxes, radios
                if (element.parents().hasClass('form-check')) {
                    error.appendTo(element.parents('.form-check').parent());
                }

                // Input with icons and Select2
                else if (element.parents().hasClass('form-group-feedback') || element.hasClass('select2-hidden-accessible')) {
                    error.appendTo(element.parent());
                }

                // Input group, styled file input
                else if (element.parent().is('.uniform-uploader, .uniform-select') || element.parents().hasClass('input-group')) {
                    error.appendTo(element.parent().parent());
                }

                // Other elements
                else {
                    error.insertAfter(element);
                }
            },
            rules: {
                email: {
                    email: true
                }
            }
        });

        var form3 = $('.listUserBusinessForm2').show();
        // Initialize wizard
        $('.listUserBusinessForm2').steps({
            headerTag: 'h6',
            bodyTag: 'fieldset',
            titleTemplate: '<span class="number">#index#</span> #title#',
            labels: {
                previous: '<i class="icon-arrow-left13 mr-2" /> Previous',
                next: 'Next <i class="icon-arrow-right14 ml-2" />',
                finish: 'List Business <i class="icon-checkmark-circle ml-2" />'
            },
            transitionEffect: 'fade',
            autoFocus: true,
            onStepChanging: function (event, currentIndex, newIndex) {

                // Allways allow previous action even if the current form is not valid!
                if (currentIndex > newIndex) {
                    return true;
                }

                // Needed in some cases if the user went back (clean up)
                if (currentIndex < newIndex) {

                    // To remove error styles
                    form3.find('.body:eq(' + newIndex + ') label.error').remove();
                    form3.find('.body:eq(' + newIndex + ') .error').removeClass('error');
                }

                form3.validate().settings.ignore = ':disabled,:hidden';
                return form3.valid();
            },
            onFinishing: function (event, currentIndex) {
                form3.validate().settings.ignore = ':disabled';
                return form3.valid();
            },
            onFinished: function (event, currentIndex) {
                listBusiness2();
            }
        });


        // Initialize validation
        $('.listUserBusinessForm2').validate({
            ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
            errorClass: 'validation-invalid-label',
            highlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },
            unhighlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },

            // Different components require proper error label placement
            errorPlacement: function (error, element) {

                // Unstyled checkboxes, radios
                if (element.parents().hasClass('form-check')) {
                    error.appendTo(element.parents('.form-check').parent());
                }

                // Input with icons and Select2
                else if (element.parents().hasClass('form-group-feedback') || element.hasClass('select2-hidden-accessible')) {
                    error.appendTo(element.parent());
                }

                // Input group, styled file input
                else if (element.parent().is('.uniform-uploader, .uniform-select') || element.parents().hasClass('input-group')) {
                    error.appendTo(element.parent().parent());
                }

                // Other elements
                else {
                    error.insertAfter(element);
                }
            },
            rules: {
                email: {
                    email: true
                }
            }
        });



        var form3 = $('.SempleMemberAndBizRegForm').show();
        // Initialize wizard
        $('.SempleMemberAndBizRegForm').steps({
            headerTag: 'h6',
            bodyTag: 'fieldset',
            titleTemplate: '<span class="number">#index#</span> #title#',
            labels: {
                previous: '<i class="icon-arrow-left13 mr-2" /> Previous',
                next: 'Next <i class="icon-arrow-right14 ml-2" />',
                finish: 'Submit <i class="icon-checkmark-circle ml-2" />'
            },
            transitionEffect: 'fade',
            autoFocus: true,
            onStepChanging: function (event, currentIndex, newIndex) {

                // Allways allow previous action even if the current form is not valid!
                if (currentIndex > newIndex) {
                    return true;
                }

                // Needed in some cases if the user went back (clean up)
                if (currentIndex < newIndex) {

                    // To remove error styles
                    form3.find('.body:eq(' + newIndex + ') label.error').remove();
                    form3.find('.body:eq(' + newIndex + ') .error').removeClass('error');
                }

                form3.validate().settings.ignore = ':disabled,:hidden';
                return form3.valid();
            },
            onFinishing: function (event, currentIndex) {
                form2.validate().settings.ignore = ':disabled';
                return form3.valid();
            },
            onFinished: function (event, currentIndex) {
                RegisterSempleMemberAndBusiness();
            }
        });


        // Initialize validation
        $('.SempleMemberAndBizRegForm').validate({
            ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
            errorClass: 'validation-invalid-label',
            highlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },
            unhighlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },

            // Different components require proper error label placement
            errorPlacement: function (error, element) {

                // Unstyled checkboxes, radios
                if (element.parents().hasClass('form-check')) {
                    error.appendTo(element.parents('.form-check').parent());
                }

                // Input with icons and Select2
                else if (element.parents().hasClass('form-group-feedback') || element.hasClass('select2-hidden-accessible')) {
                    error.appendTo(element.parent());
                }

                // Input group, styled file input
                else if (element.parent().is('.uniform-uploader, .uniform-select') || element.parents().hasClass('input-group')) {
                    error.appendTo(element.parent().parent());
                }

                // Other elements
                else {
                    error.insertAfter(element);
                }
            },
            rules: {
                email: {
                    email: true
                }
            }
        });
    };

    // Uniform
    var _componentUniform = function () {
        if (!$().uniform) {
            console.warn('Warning - uniform.min.js is not loaded.');
            return;
        }

        // Default initialization
        $('.form-check-input-styled').uniform();

        $('.form-control-styled').uniform();

        // Update uniform when select between styled and unstyled
        $('.input-group-prepend input[type=radio]').on('change', function () {
            $.uniform.update('[name=addon-radio]');
        });

        // Initialize
        $('.form-input-styled').uniform({
            fileButtonClass: 'action btn bg-blue'
        });

        // Primary
        $('.form-check-input-styled-primary').uniform({
            wrapperClass: 'border-primary-600 text-primary-800'
        });

        // Danger
        $('.form-check-input-styled-danger').uniform({
            wrapperClass: 'border-danger-600 text-danger-800'
        });

        // Success
        $('.form-check-input-styled-success').uniform({
            wrapperClass: 'border-success-600 text-success-800'
        });

        // Warning
        $('.form-check-input-styled-warning').uniform({
            wrapperClass: 'border-warning-600 text-warning-800'
        });

        // Info
        $('.form-check-input-styled-info').uniform({
            wrapperClass: 'border-info-600 text-info-800'
        });

        // Custom color
        $('.form-check-input-styled-custom').uniform({
            wrapperClass: 'border-indigo-600 text-indigo-800'
        });
    };

    // Select2 select
    var _componentSelect2 = function () {
        if (!$().select2) {
            console.warn('Warning - select2.min.js is not loaded.');
            return;
        }


        //
        // Basic examples
        //
//        $select.on('change', function () {
//            $(this).trigger('blur');
//        });

        // Default initialization
        $('.select').select2({
            minimumResultsForSearch: Infinity
        });

        // Select with search
        $('.select-search').select2();

        // Fixed width. Single select
        $('.select-fixed-single').select2({
            minimumResultsForSearch: Infinity,
            width: 250
        });

        // Fixed width. Multiple selects
        $('.select-fixed-multiple').select2({
            minimumResultsForSearch: Infinity,
            width: 400
        });


        //
        // Advanced examples
        //

        // Minimum input length
        $('.select-minimum').select2({
            minimumInputLength: 2,
            minimumResultsForSearch: Infinity
        });

        // Allow clear selection
        $('.select-clear').select2({
            placeholder: 'Select Your Option',
            allowClear: true
        });

        // Tagging support
        $('.select-multiple-tags').select2({
            tags: true
        });

        // Maximum input length
        $('.select-multiple-maximum-length').select2({
            tags: true,
            maximumInputLength: 5
        });

        // Tokenization
        $('.select-multiple-tokenization').select2({
            tags: true,
            tokenSeparators: [',', ' ']
        });

        // Maximum selection
        $('.select-multiple-limited').select2({
            maximumSelectionLength: 3
        });

        // Maximum selections allowed
        $('.select-multiple-maximum').select2({
            maximumSelectionSize: 3
        });


        //
        // Drag and drop selected items
        //

        // Initialize with tags
        $('.select-multiple-drag').select2({
            containerCssClass: 'sortable-target'
        });

        // Add jQuery UI Sortable support
        $('.sortable-target .select2-selection__rendered').sortable({
            containment: '.sortable-target',
            items: '.select2-selection__choice:not(.select2-search--inline)'
        });


        //
        // Single select with icons
        //

        // Format icon
        function iconFormat(icon) {
            var originalOption = icon.element;
            if (!icon.id) {
                return icon.text;
            }
            var $icon = '<i class="icon-' + $(icon.element).data('icon') + '"></i>' + icon.text;

            return $icon;
        }

        // Initialize with options
        $('.select-icons').select2({
            templateResult: iconFormat,
            minimumResultsForSearch: Infinity,
            templateSelection: iconFormat,
            escapeMarkup: function (m) {
                return m;
            }
        });


        //
        // Customize matched results
        //

        // Setup matcher
        function matchStart(term, text) {
            if (text.toUpperCase().indexOf(term.toUpperCase()) == 0) {
                return true;
            }

            return false;
        }

        // Initialize
        $.fn.select2.amd.require(['select2/compat/matcher'], function (oldMatcher) {
            $('.select-matched-customize').select2({
                minimumResultsForSearch: Infinity,
                placeholder: 'Select a State',
                matcher: oldMatcher(matchStart)
            });
        });


        //
        // Loading arrays of data
        //

        // Data
        var array_data = [
            {id: 0, text: 'enhancement'},
            {id: 1, text: 'bug'},
            {id: 2, text: 'duplicate'},
            {id: 3, text: 'invalid'},
            {id: 4, text: 'wontfix'}
        ];

        // Loading array data
        $('.select-data-array').select2({
            placeholder: 'Click to load data',
            minimumResultsForSearch: Infinity,
            data: array_data
        });


        //
        // Loading remote data
        //

        // Format displayed data
        function formatRepo(repo) {
            if (repo.loading)
                return repo.text;

            var markup = '<div class="select2-result-repository clearfix">' +
                    '<div class="select2-result-repository__avatar"><img src="' + repo.owner.avatar_url + '" /></div>' +
                    '<div class="select2-result-repository__meta">' +
                    '<div class="select2-result-repository__title">' + repo.full_name + '</div>';

            if (repo.description) {
                markup += '<div class="select2-result-repository__description">' + repo.description + '</div>';
            }

            markup += '<div class="select2-result-repository__statistics">' +
                    '<div class="select2-result-repository__forks">' + repo.forks_count + ' Forks</div>' +
                    '<div class="select2-result-repository__stargazers">' + repo.stargazers_count + ' Stars</div>' +
                    '<div class="select2-result-repository__watchers">' + repo.watchers_count + ' Watchers</div>' +
                    '</div>' +
                    '</div></div>';

            return markup;
        }

        // Format selection
        function formatRepoSelection(repo) {
            return repo.full_name || repo.text;
        }

        // Initialize
        $('.select-remote-data').select2({
            ajax: {
                url: 'https://api.github.com/search/repositories',
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data, params) {

                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: data.items,
                        pagination: {
                            more: (params.page * 30) < data.total_count
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) {
                return markup;
            }, // let our custom formatter work
            minimumInputLength: 1,
            templateResult: formatRepo, // omitted for brevity, see the source of this page
            templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
        });


        //
        // Programmatic access (single)
        //

        // Set/get value
        $('.select-access-value').select2({
            minimumResultsForSearch: Infinity,
            placeholder: 'Select State...'
        });
        $('.access-get').on('click', function () {
            alert('Selected value is: ' + $('.select-access-value').val());
        });
        $('.access-set').on('click', function () {
            $('.select-access-value').val('CA').trigger('change');
        });


        // Open/close menu
        $('.select-access-open').select2({
            minimumResultsForSearch: Infinity,
            placeholder: 'Select State...'
        });
        $('.access-open').on('click', function () {
            $('.select-access-open').select2('open');
        });
        $('.access-close').on('click', function () {
            $('.select-access-open').select2('close');
        });


        // Enable/disable menu
        $('.select-access-enable').select2({
            minimumResultsForSearch: Infinity,
            placeholder: 'Select State...'
        });
        $('.access-disable').on('click', function () {
            $('.select-access-enable').prop('disabled', true);
        });
        $('.access-enable').on('click', function () {
            $('.select-access-enable').prop('disabled', false);
        });


        // Destroy/create menu
        function create_menu() {
            $('.select-access-create').select2({
                minimumResultsForSearch: Infinity,
                placeholder: 'Select State...'
            });
        }
        create_menu();
        $('.access-create').on('click', function () {
            return create_menu()
        });
        $('.access-destroy').on('click', function () {
            $('.select-access-create').select2('destroy');
        });


        //
        // Programmatic access (multiple)
        //

        // Reacting to external value changes
        $('.select-access-multiple-value').select2();
        $('.change-to-ca').on('click', function () {
            $('.select-access-multiple-value').val('CA').trigger('change');
        });
        $('.change-to-ak-co').on('click', function () {
            $('.select-access-multiple-value').val(['AK', 'CO']).trigger('change');
        });


        // Open/close menu
        $('.select-access-multiple-open').select2({
            minimumResultsForSearch: Infinity
        });
        $('.access-multiple-open').on('click', function () {
            $('.select-access-multiple-open').select2('open');
        });
        $('.access-multiple-close').on('click', function () {
            $('.select-access-multiple-open').select2('close');
        });


        // Enable/disable menu
        $('.select-access-multiple-enable').select2({
            minimumResultsForSearch: Infinity
        });
        $('.access-multiple-disable').on('click', function () {
            $('.select-access-multiple-enable').prop('disabled', true);
        });
        $('.access-multiple-enable').on('click', function () {
            $('.select-access-multiple-enable').prop('disabled', false);
        });


        // Destroy/create menu
        function create_menu_multiple() {
            $('.select-access-multiple-create').select2({
                minimumResultsForSearch: Infinity
            });
        }
        create_menu_multiple();
        $('.access-multiple-create').on('click', function () {
            return create_menu_multiple()
        });
        $('.access-multiple-destroy').on('click', function () {
            $('.select-access-multiple-create').select2('destroy');
        });


        // Clear selection
        $('.select-access-multiple-clear').select2({
            minimumResultsForSearch: Infinity
        });
        $('.access-multiple-clear').on('click', function () {
            $('.select-access-multiple-clear').val(null).trigger('change');
        });
    };

    var _componentDatatableResponsive = function () {
        if (!$().DataTable) {
            console.warn('Warning - datatables.min.js is not loaded.');
            return;
        }

        // Setting datatable defaults
        $.extend($.fn.dataTable.defaults, {
            autoWidth: false,
            responsive: true,
            columnDefs: [{
                    orderable: false,
                    width: 100,
                    targets: [5]
                }],
            dom: '<"datatable-header"fl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
            language: {
                search: '<span>Filter:</span> _INPUT_',
                searchPlaceholder: 'Type to filter...',
                lengthMenu: '<span>Show:</span> _MENU_',
                paginate: {'first': 'First', 'last': 'Last', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;'}
            }
        });


        // Basic responsive configuration
        $('.datatable-responsive').DataTable();


        // Column controlled child rows
        $('.datatable-responsive-column-controlled').DataTable({
            responsive: {
                details: {
                    type: 'column'
                }
            },
            columnDefs: [
                {
                    className: 'control',
                    orderable: false,
                    targets: 0
                },
                {
                    width: "100px",
                    targets: [6]
                },
                {
                    orderable: false,
                    targets: [6]
                }
            ],
            order: [1, 'asc']
        });


        // Control position
        $('.datatable-responsive-control-right').DataTable({
            responsive: {
                details: {
                    type: 'column',
                    target: -1
                }
            },
            columnDefs: [
                {
                    className: 'control',
                    orderable: false,
                    targets: -1
                },
                {
                    width: "100px",
                    targets: [5]
                },
                {
                    orderable: false,
                    targets: [5]
                }
            ]
        });

        // Initialize
        $('.table-customers').DataTable({
            autoWidth: false,
            columnDefs: [
                {
                    targets: 0,
                    width: 400
                },
                {
                    orderable: false,
                    width: 16,
                    targets: 6
                },
                {
                    className: 'control',
                    orderable: false,
                    targets: -1
                },
            ],
            order: [[0, 'asc']],
            dom: '<"datatable-header datatable-header-accent"fBl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
            language: {
                search: '<span>Search people:</span> _INPUT_',
                searchPlaceholder: 'Type to filter...',
                lengthMenu: '<span>Show:</span> _MENU_',
                paginate: {'first': 'First', 'last': 'Last', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;'}
            },
            lengthMenu: [25, 50, 75, 100],
            displayLength: 50,
            responsive: {
                details: {
                    type: 'column',
                    target: -1
                }
            },
            buttons: [
                {
                    extend: 'pdfHtml5',
                    text: 'Export list <i class="icon-file-pdf ml-2"></i>',
                    className: 'btn bg-blue',
                    orientation: 'landscape',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5],
                        stripHtml: true
                    },
                    customize: function (doc) {
                        doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                    }
                }
            ]
        });

        // Whole row as a control
        $('.datatable-responsive-row-control').DataTable({
            responsive: {
                details: {
                    type: 'column',
                    target: 'tr'
                }
            },
            columnDefs: [
                {
                    className: 'control',
                    orderable: false,
                    targets: 0
                },
                {
                    width: "100px",
                    targets: [6]
                },
                {
                    orderable: false,
                    targets: [6]
                }
            ],
            order: [1, 'asc']
        });
    };

    // Lightbox
    var _componentFancybox = function () {
        if (!$().fancybox) {
            console.warn('Warning - fancybox.min.js is not loaded.');
            return;
        }

        // Image lightbox
        $('[data-popup="lightbox"]').fancybox({
            padding: 3
        });
    };


    var _componentSummernote = function () {
        if (!$().summernote) {
            console.warn('Warning - summernote.min.js is not loaded.');
            return;
        }

        // Initialize
        $('.summernote').summernote();
    };

    // Daterange picker
    var _componentDaterange = function () {
        if (!$().daterangepicker) {
            console.warn('Warning - daterangepicker.js is not loaded.');
            return;
        }

        // Basic initialization
        $('.daterange-basic').daterangepicker({
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-light'
        });

        // Display week numbers
        $('.daterange-weeknumbers').daterangepicker({
            showWeekNumbers: true,
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-light'
        });

        // Button class options
        $('.daterange-buttons').daterangepicker({
            applyClass: 'btn-success',
            cancelClass: 'btn-danger'
        });

        // Display time picker
        $('.daterange-time').daterangepicker({
            timePicker: true,
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-light',
            locale: {
                format: 'MM/DD/YYYY h:mm a'
            }
        });

        // Show calendars on left
        $('.daterange-left').daterangepicker({
            opens: 'left',
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-light'
        });

        // Single picker
        $('.daterange-single').daterangepicker({
            singleDatePicker: true
        });

        // Display date dropdowns
        $('.daterange-datemenu').daterangepicker({
            showDropdowns: true,
            opens: 'left',
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-light'
        });

        // 10 minute increments
        $('.daterange-increments').daterangepicker({
            timePicker: true,
            opens: 'left',
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-light',
            timePickerIncrement: 10,
            locale: {
                format: 'MM/DD/YYYY h:mm a'
            }
        });

        // Localization
        $('.daterange-locale').daterangepicker({
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-light',
            opens: 'left',
            ranges: {
                'Сегодня': [moment(), moment()],
                'Вчера': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Последние 7 дней': [moment().subtract(6, 'days'), moment()],
                'Последние 30 дней': [moment().subtract(29, 'days'), moment()],
                'Этот месяц': [moment().startOf('month'), moment().endOf('month')],
                'Прошедший месяц': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            locale: {
                applyLabel: 'Вперед',
                cancelLabel: 'Отмена',
                startLabel: 'Начальная дата',
                endLabel: 'Конечная дата',
                customRangeLabel: 'Выбрать дату',
                daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                firstDay: 1
            }
        });


        //
        // Pre-defined ranges and callback
        //

        // Initialize with options
        $('.daterange-predefined').daterangepicker(
                {
                    startDate: moment().subtract(29, 'days'),
                    endDate: moment(),
                    minDate: '01/01/2014',
                    maxDate: '12/31/2019',
                    dateLimit: {days: 60},
                    ranges: {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    },
                    opens: 'left',
                    applyClass: 'btn-sm bg-slate',
                    cancelClass: 'btn-sm btn-light'
                },
                function (start, end) {
                    $('.daterange-predefined span').html(start.format('MMMM D, YYYY') + ' &nbsp; - &nbsp; ' + end.format('MMMM D, YYYY'));
                    $.jGrowl('Date range has been changed', {header: 'Update', theme: 'bg-primary', position: 'center', life: 1500});
                }
        );

        // Display date format
        $('.daterange-predefined span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' &nbsp; - &nbsp; ' + moment().format('MMMM D, YYYY'));


        //
        // Inside button
        //

        // Initialize with options
        $('.daterange-ranges').daterangepicker(
                {
                    startDate: moment().subtract(29, 'days'),
                    endDate: moment(),
                    minDate: '01/01/2012',
                    maxDate: '12/31/2019',
                    dateLimit: {days: 60},
                    ranges: {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    },
                    opens: 'left',
                    applyClass: 'btn-sm bg-slate-600',
                    cancelClass: 'btn-sm btn-light'
                },
                function (start, end) {
                    $('.daterange-ranges span').html(start.format('MMMM D, YYYY') + ' &nbsp; - &nbsp; ' + end.format('MMMM D, YYYY'));
                }
        );

        // Display date format
        $('.daterange-ranges span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' &nbsp; - &nbsp; ' + moment().format('MMMM D, YYYY'));
    };

    // Pickadate picker
    var _componentPickadate = function () {
        if (!$().pickadate) {
            console.warn('Warning - picker.js and/or picker.date.js is not loaded.');
            return;
        }

        // Basic options
        $('.pickadate').pickadate();

        // Change day names
        $('.pickadate-strings').pickadate({
            weekdaysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            showMonthsShort: true
        });

        // Button options
        $('.pickadate-buttons').pickadate({
            today: '',
            close: '',
            clear: 'Clear selection'
        });

        // Accessibility labels
        $('.pickadate-accessibility').pickadate({
            labelMonthNext: 'Go to the next month',
            labelMonthPrev: 'Go to the previous month',
            labelMonthSelect: 'Pick a month from the dropdown',
            labelYearSelect: 'Pick a year from the dropdown',
            selectMonths: true,
            selectYears: true
        });

        // Localization
        $('.pickadate-translated').pickadate({
            monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
            today: 'aujourd\'hui',
            clear: 'effacer',
            formatSubmit: 'yyyy/mm/dd'
        });

        // Format options
        $('.pickadate-format').pickadate({

            // Escape any “rule” characters with an exclamation mark (!).
            format: 'You selecte!d: dddd, dd mmm, yyyy',
            formatSubmit: 'yyyy/mm/dd',
            hiddenPrefix: 'prefix__',
            hiddenSuffix: '__suffix'
        });

        // Editable input
        var $input_date = $('.pickadate-editable').pickadate({
            editable: true,
            onClose: function () {
                $('.datepicker').focus();
            }
        });
        var picker_date = $input_date.pickadate('picker');
        $input_date.on('click', function (event) {
            if (picker_date.get('open')) {
                picker_date.close();
            } else {
                picker_date.open();
            }
            event.stopPropagation();
        });

        // Dropdown selectors
        $('.pickadate-selectors').pickadate({
            selectYears: true,
            selectMonths: true
        });

        // Year selector
        $('.pickadate-year').pickadate({
            selectYears: 4
        });

        // Set first weekday
        $('.pickadate-weekday').pickadate({
            firstDay: 1
        });

        // Date limits
        $('.pickadate-limits').pickadate({
            min: [2014, 3, 20],
            max: [2014, 7, 14]
        });

        // Disable certain dates
        $('.pickadate-disable').pickadate({
            disable: [
                [2015, 8, 3],
                [2015, 8, 12],
                [2015, 8, 20]
            ]
        });

        // Disable date range
        $('.pickadate-disable-range').pickadate({
            disable: [
                5,
                [2013, 10, 21, 'inverted'],
                {from: [2014, 3, 15], to: [2014, 3, 25]},
                [2014, 3, 20, 'inverted'],
                {from: [2014, 3, 17], to: [2014, 3, 18], inverted: true}
            ]
        });

        // Events
        $('.pickadate-events').pickadate({
            onStart: function () {
                console.log('Hello there :)')
            },
            onRender: function () {
                console.log('Whoa.. rendered anew')
            },
            onOpen: function () {
                console.log('Opened up')
            },
            onClose: function () {
                console.log('Closed now')
            },
            onStop: function () {
                console.log('See ya.')
            },
            onSet: function (context) {
                console.log('Just set stuff:', context)
            }
        });
    };

    var _componentBlockUi = function () {
        if (!$().block) {
            console.warn('Warning - blockui.min.js is not loaded.');
            return;
        }


        // Page elements
        // ------------------------------

        // Block card
        $('#block-card').on('click', function () {
            var block = $(this).closest('.card');
            $(block).block({
                message: '<i class="icon-spinner4 spinner"></i>',
                timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });
        });

        // Block sidebar
        $('#block-sidebar').on('click', function () {
            var block = $('.sidebar-main');
            $(block).block({
                message: '<i class="icon-spinner4 spinner"></i>',
                timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#1b2024',
                    opacity: 0.6,
                    cursor: 'wait'
                },
                centerY: 0,
                css: {
                    top: '180px',
                    border: 0,
                    color: '#fff',
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });
        });

        // Block page
        $('#block-page').on('click', function () {
            $.blockUI({
                message: '<i class="icon-spinner4 spinner"></i>',
                timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#1b2024',
                    opacity: 0.8,
                    zIndex: 1200,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    color: '#fff',
                    padding: 0,
                    zIndex: 1201,
                    backgroundColor: 'transparent'
                }
            });
        });


        // Overlays
        // ------------------------------

        // Basic overlay
        $('#basic-overlay').on('click', function () {
            var block = $(this).closest('.card');
            $(block).block({
                message: '<i class="icon-spinner4 spinner"></i>',
                timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });
        });

        // Custom overlay
        $('#overlay-custom').on('click', function () {
            var block = $(this).closest('.card');
            $(block).block({
                message: '<i class="icon-spinner4 spinner"></i>',
                timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#0E8F92',
                    opacity: 0.9,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    color: '#fff',
                    backgroundColor: 'transparent'
                }
            });
        });

        // Overlay with custom color
        $('#overlay-cover').on('click', function () {
            var block = $(this).closest('.card');
            $(block).block({
                message: '<i class="icon-spinner4 spinner"></i>',
                timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#3F9EC3',
                    opacity: 1,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    color: '#fff',
                    backgroundColor: 'transparent'
                }
            });
        });

        // Overlay without text
        $('#no-message').on('click', function () {
            var block = $(this).closest('.card');
            $(block).block({
                message: null,
                timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });
        });

        // No overlay
        $('#no-overlay').on('click', function () {
            var block = $(this).closest('.card');
            $(block).block({
                message: '<i class="icon-spinner4 spinner"></i>',
                showOverlay: false,
                timeout: 2000, //unblock after 2 seconds
                css: {
                    border: 0,
                    padding: 15,
                    backgroundColor: '#283133',
                    color: '#fff',
                    width: 46,
                    height: 46,
                    lineHeight: 1,
                    '-webkit-border-radius': '2px',
                    '-moz-border-radius': '2px',
                    opacity: 0.95
                }
            });
        });


        // Messages
        // ------------------------------

        // Default message
        $('#default-message').on('click', function () {
            var block = $(this).closest('.card');
            $(block).block({
                message: '<span class="font-weight-semibold">Please wait...</span>',
                timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });
        });

        // Spinner only
        $('#spinner-only').on('click', function () {
            var block = $(this).closest('.card');
            $(block).block({
                message: '<i class="icon-spinner4 spinner"></i>',
                timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });
        });

        // Custom message
        $('#custom-message').on('click', function () {
            var block = $(this).closest('.card');
            $(block).block({
                message: '<span class="font-weight-semibold"><i class="icon-spinner4 spinner mr-2"></i>&nbsp; Updating data</span>',
                timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: '10px 15px',
                    color: '#fff',
                    width: 'auto',
                    '-webkit-border-radius': 3,
                    '-moz-border-radius': 3,
                    backgroundColor: '#333'
                }
            });
        });

        // DOM message
        $('#dom-message').on('click', function () {
            var block = $(this).closest('.card');
            $(block).block({
                message: $(this).parent().parent().find('.blockui-message'),
                timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    width: 'auto',
                    '-webkit-border-radius': 2,
                    '-moz-border-radius': 2,
                    padding: 0,
                    border: 0,
                    backgroundColor: 'transparent'
                }
            });
        });

        // Multiple messages
        $('#multiple-messages').on('click', function () {
            var message = $(this).parent().parent().find('.blockui-message');
            var block = $(this).closest('.card');
            $(block).block({
                message: message,
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    width: 100,
                    '-webkit-border-radius': 2,
                    '-moz-border-radius': 2,
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                },
                onBlock: function () {
                    clearTimeout();
                }
            });

            window.setTimeout(function () {
                message.html('<i class="icon-spinner4 spinner mt-1"></i> <span class="font-weight-semibold d-block mt-2">Loading</span>')
            }, 0);

            window.setTimeout(function () {
                message.html('<i class="icon-spinner4 spinner mt-1"></i> <span class="font-weight-semibold d-block mt-2">Please wait</span>')
            }, 2000);

            window.setTimeout(function () {
                message.addClass('bg-danger').html('<i class="icon-warning mt-1"></i> <span class="font-weight-semibold d-block mt-2">Load error</span>')
            }, 4000);

            window.setTimeout(function () {
                $(block).unblock({
                    onUnblock: function () {
                        message.removeClass('bg-danger');
                    }
                });
            }, 6000);
        });

        // Custom message animation
        $('#custom-message-animation').on('click', function () {
            var block = $(this).closest('.card');
            $(block).block({
                message: $('.blockui-animation-container'),
                timeout: 3000, //unblock after 3 seconds
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    width: 36,
                    height: 36,
                    color: '#fff',
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });

            var animation = $(this).data("animation");
            $('.blockui-animation-container').addClass("animated " + animation).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).removeClass("animated " + animation);
            });
        });

        // Custom message position
        $('#custom-position').on('click', function () {
            var block = $(this).closest('.card');
            $(block).block({
                message: '<i class="icon-spinner4 spinner"></i>',
                timeout: 2000, //unblock after 2 seconds
                centerX: 0,
                centerY: 0,
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    width: 16,
                    top: '15px',
                    left: '',
                    right: '15px',
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });
        });


        // Unblock options
        // ------------------------------

        // Auto unblock
        $('#auto-unblock').on('click', function () {
            var block = $(this).closest('.card');
            $(block).block({
                message: '<i class="icon-spinner4 spinner"></i>',
                timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });
        });

        // Unblock on click
        $('#click-unblock').on('click', function () {
            var block = $(this).closest('.card');
            $(block).block({
                message: '<i class="icon-spinner4 spinner"></i>',
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    width: 16,
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });

            $('.blockOverlay').on('click', function () {
                $(block).unblock();
            });
        });


        // Callbacks
        // ------------------------------

        // Block callback
        $('#block-callback').on('click', function () {
            $.blockUI({
                message: '<i class="icon-spinner4 spinner"></i>',
                fadeIn: 800,
                timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#1b2024',
                    opacity: 0.8,
                    zIndex: 1200,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    color: '#fff',
                    zIndex: 1201,
                    padding: 0,
                    backgroundColor: 'transparent'
                },
                onBlock: function () {
                    alert('Page is now blocked. FadeIn completed.');
                }
            });
        });

//        // Unblock callback
//        $('#unblock-callback').on('click', function () {
//            $.blockUI({
//                message: '<i class="icon-spinner4 spinner"></i>',
//                timeout: 2000, //unblock after 2 seconds
//                overlayCSS: {
//                    backgroundColor: '#1b2024',
//                    opacity: 0.8,
//                    zIndex: 1200,
//                    cursor: 'wait'
//                },
//                css: {
//                    border: 0,
//                    color: '#fff',
//                    padding: 0,
//                    zIndex: 1201,
//                    backgroundColor: 'transparent'
//                },
//                onUnblock: function () {
//                    alert('Page is now unblocked. FadeOut completed.');
//                }
//            });
//        });

        // Overlay callback
        $('#overlay-callback').on('click', function () {
            $.blockUI({
                message: '<i class="icon-spinner4 spinner"></i>',
                overlayCSS: {
                    backgroundColor: '#1b2024',
                    opacity: 0.8,
                    zIndex: 1200,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    color: '#fff',
                    padding: 0,
                    zIndex: 1201,
                    backgroundColor: 'transparent'
                },
                onOverlayClick: $.unblockUI
            });
        });


        // Other options
        // ------------------------------

        // Growl notification
        $('#growl').on('click', function () {
            $.blockUI({
                message: $('.blockui-growl'),
                fadeIn: 700,
                fadeOut: 700,
                timeout: 3000000, //unblock after 3 seconds
                showOverlay: false,
                centerY: false,
                css: {
                    width: '250px',
                    backgroundColor: 'transparent',
                    top: '20px',
                    left: 'auto',
                    right: '20px',
                    border: 0,
                    opacity: .95,
                    zIndex: 1200,
                }
            });
        });
    };

// FAB
    var _componentFab = function () {
        if (!$().stick_in_parent) {
            console.warn('Warning - sticky.min.js is not loaded.');
            return;
        }

        // Add bottom spacing if reached bottom,
        // to avoid footer overlapping
        // -------------------------

        $(window).on('scroll', function () {
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 40) {
                $('.fab-menu-bottom-left, .fab-menu-bottom-right').addClass('reached-bottom');
            } else {
                $('.fab-menu-bottom-left, .fab-menu-bottom-right').removeClass('reached-bottom');
            }
        });

        // Initialize sticky button
        $('#fab-menu-affixed-demo-left, #fab-menu-affixed-demo-right').stick_in_parent({
            offset_top: 20
        });
    };

    var _componentMultiselect = function () {
        if (!$().multiselect) {
            console.warn('Warning - bootstrap-multiselect.js is not loaded.');
            return;
        }

        // SweetAlert with Multiselect
        $('#sweet_multiselect').on('click', function () {
            swal({
                title: 'Select countries',
                input: 'select',
                inputOptions: {
                    'DE': 'Germany',
                    'UA': 'Ukraine',
                    'HR': 'Croatia',
                    'NL': 'Netherlands'
                },
                inputClass: 'form-control select-multiselect',
                showCancelButton: true,
                inputValidator: function (value) {
                    return !$('.swal2-select.select-multiselect').val().length && 'You need to select something!'
                },
                inputAttributes: {
                    'multiple': 'multiple'
                },
                onOpen: function () {

                    // Initialize Multiselect when dialog is opened
                    $('.swal2-select.select-multiselect').multiselect();

                    // Initialize Uniform for custom checkboxes
                    $('.swal2-popup input[type=checkbox]').uniform();
                }
            }).then(function (result) {

                // Display selected values
                swal({
                    type: 'success',
                    html: 'You selected: ' + JSON.stringify($('.swal2-select.select-multiselect').val())
                });

                // Show another modal if Cancel button is clicked
                if (result.dismiss === 'cancel') {
                    swal({
                        title: 'Cancelled',
                        text: 'You are safe now :)',
                        type: 'error'
                    });
                }
            });
        });
    };

    return {
        init: function () {
            _componentSummernote();
            _componentWizard();
            _componentUniform();
            _componentSelect2();
            _componentDatatableResponsive();
            _componentFancybox();
            _componentDaterange();
            _componentPickadate();
            _componentBlockUi();
            _componentMultiselect();
            _componentFab();
        }
    }
}();
document.addEventListener('DOMContentLoaded', function () {
    CustomScript.init();
});
