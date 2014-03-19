winkstart.module('numbers', 'numbers_manager', {
        css: [
            'css/numbers_manager.css',
            _t('numbers_manager', 'numbers_popup_css')
        ],

        templates: {
            numbers_manager: 'tmpl/numbers_manager.html',
            cnam_dialog: 'tmpl/cnam_dialog.html',
            e911_dialog: 'tmpl/e911_dialog.html',
            add_number_dialog: 'tmpl/add_number_dialog.html',
            freeform_number_dialog: 'tmpl/freeform_number_dialog.html',
            add_number_search_results: 'tmpl/add_number_search_results.html',
            port_dialog: 'tmpl/port_dialog.html',
            fields: 'tmpl/fields.html'
        },

        subscribe: {
            'numbers_manager.activate' : 'activate',
            'numbers_manager.render_fields' : 'render_fields'
        },

        resources: {
            'numbers_manager.list': {
                url: '{api_url}/accounts/{account_id}/phone_numbers',
                contentType: 'application/json',
                verb: 'GET'
            },
            'numbers_manager.get_account': {
                url: '{api_url}/accounts/{account_id}',
                contentType: 'application/json',
                verb: 'GET'
            },
            'numbers_manager.create': {
                url: '{api_url}/accounts/{account_id}/phone_numbers/{phone_number}',
                contentType: 'application/json',
                verb: 'PUT'
            },
            'numbers_manager.get': {
                url: '{api_url}/accounts/{account_id}/phone_numbers/{phone_number}',
                contentType: 'application/json',
                verb: 'GET'
            },
            'numbers_manager.update': {
                url: '{api_url}/accounts/{account_id}/phone_numbers/{phone_number}',
                contentType: 'application/json',
                verb: 'POST'
            },
            'numbers_manager.activate': {
                url: '{api_url}/accounts/{account_id}/phone_numbers/{phone_number}/activate',
                contentType: 'application/json',
                verb: 'PUT'
            },
            'numbers_manager.search': {
                url: '{api_url}/phone_numbers?prefix={prefix}&quantity={quantity}',
                contentType: 'application/json',
                verb: 'GET'
            },
            'numbers_manager.delete': {
                url: '{api_url}/accounts/{account_id}/phone_numbers/{phone_number}',
                contentType: 'application/json',
                verb: 'DELETE'
            },
            'numbers_manager.port': {
                url: '{api_url}/accounts/{account_id}/phone_numbers/{phone_number}/port',
                contentType: 'application/json',
                verb: 'PUT'
            },
            'numbers_manager.create_doc': {
                url: '{api_url}/accounts/{account_id}/phone_numbers/{phone_number}/docs/{file_name}',
                contentType: 'application/x-base64',
                verb: 'PUT'
            }
        }
    },

    function(args) {
        var THIS = this;

        winkstart.registerResources(THIS.__whapp, THIS.config.resources);
    },

    {
        get_number: function(phone_number, success, error) {
            winkstart.request('numbers_manager.get', {
                    api_url: winkstart.apps['numbers'].api_url,
                    account_id: winkstart.apps['numbers'].account_id,
                    phone_number: encodeURIComponent(phone_number)
                },
                function(_data, status) {
                    if(typeof success === 'function') {
                        success(_data);
                    }
                },
                function(_data, status) {
                    if(typeof error === 'function') {
                        error(_data);
                    }
                }
            );
        },

        update_number: function(phone_number, data, success, error) {
            winkstart.request('numbers_manager.update', {
                    api_url: winkstart.apps['numbers'].api_url,
                    account_id: winkstart.apps['numbers'].account_id,
                    phone_number: encodeURIComponent(phone_number),
                    data: data
                },
                function(_data, status) {
                    if(typeof success === 'function') {
                        success(_data);
                    }
                },
                function(_data, status) {
                    if(typeof error === 'function') {
                        error(_data);
                    }
                }
            );
        },

        port_number: function(data, success, error) {
            var THIS = this;

            winkstart.request('numbers_manager.port', {
                    account_id: winkstart.apps['numbers'].account_id,
                    api_url: winkstart.apps['numbers'].api_url,
                    phone_number: encodeURIComponent(data.phone_number),
                    data: data.options || {}
                },
                function(_data, status) {
                    if(typeof success == 'function') {
                        success(_data, status);
                    }
                },
                function(_data, status) {
                    if(typeof error == 'function') {
                        error(_data, status);
                    }
                }
            );
        },

        create_number: function(phone_number, success, error) {
            var THIS = this;

            winkstart.request(false, 'numbers_manager.create', {
                    account_id: winkstart.apps['numbers'].account_id,
                    api_url: winkstart.apps['numbers'].api_url,
                    phone_number: encodeURIComponent(phone_number),
                    data: {}
                },
                function(_data, status) {
                    if(typeof success == 'function') {
                        success(_data, status);
                    }
                },
                function(_data, status) {
                    if(typeof error == 'function') {
                        error(_data, status);
                    }
                }
            );
        },

        activate_number: function(phone_number, success, error) {
            var THIS = this;

            winkstart.request(false, 'numbers_manager.activate', {
                    account_id: winkstart.apps['numbers'].account_id,
                    api_url: winkstart.apps['numbers'].api_url,
                    phone_number: encodeURIComponent(phone_number),
                    data: {}
                },
                function(_data, status) {
                    if(typeof success == 'function') {
                        success(_data, status);
                    }
                },
                function(_data, status) {
                    if(typeof error == 'function') {
                        error(_data, status);
                    }
                }
            );
        },

        delete_number: function(phone_number, success, error) {
            var THIS = this;

            winkstart.request('numbers_manager.delete', {
                    account_id: winkstart.apps['numbers'].account_id,
                    api_url: winkstart.apps['numbers'].api_url,
                    phone_number: encodeURIComponent(phone_number)
                },
                function(data, status) {
                    if(typeof success == 'function') {
                        success(data, status);
                    }
                },
                function(data, status) {
                    if(typeof error == 'function') {
                        error(data, status);
                    }
                }
            );
        },

        search_numbers: function(data, success, error) {
            var THIS = this;

            winkstart.request(true, 'numbers_manager.search', {
                    api_url: winkstart.apps['numbers'].api_url,
                    prefix: data.prefix,
                    quantity: data.quantity || 15
                },
                function(_data, status) {
                    if(typeof success == 'function') {
                        success(_data, status);
                    }
                },
                function(_data, status) {
                    if(typeof error == 'function') {
                        error(_data, status);
                    }
                }
            );
        },

        create_number_doc: function(data, success, error) {
            var THIS = this;

            winkstart.request('numbers_manager.create_doc', {
                    account_id: winkstart.apps['numbers'].account_id,
                    api_url: winkstart.apps['numbers'].api_url,
                    phone_number: encodeURIComponent(data.phone_number),
                    file_name: data.file_name,
                    data: data.file_data
                },
                function(_data, status) {
                    if(typeof success == 'function') {
                        success(_data, status);
                    }
                },
                function(_data, status) {
                    if(typeof error == 'function') {
                        error(_data, status);
                    }
                }
            );
        },

        submit_port: function(port_data, number_data, callback) {
            var THIS = this,
                uploads_done = 0,
                put_port_data = function() {
                    number_data.options.port = port_data.port;

                    //todo phone nbr/data/cb
                    THIS.update_number(number_data.phone_number, number_data.options, function(data) {
                        if(typeof callback == 'function') {
                            callback(data);
                        }
                    });
                },
                put_port_doc = function(index) {
                    /* Add files */
                    THIS.create_number_doc({
                            phone_number: number_data.phone_number,
                            file_name: port_data.loa[0].file_name,
                            file_data: port_data.loa[0].file_data
                        },
                        function(_data, status) {
                            THIS.create_number_doc({
                                    phone_number: number_data.phone_number,
                                    file_name: port_data.files[index].file_name,
                                    file_data: port_data.files[index].file_data
                                },
                                function(_data, status) {
                                    put_port_data();
                                }
                            );
                        }
                    );
                };

            if(port_data.port.main_number === number_data.phone_number) {
                put_port_doc(0);
            }
            else{
                put_port_data();
            }
        },

        add_freeform_numbers: function(numbers_data, callback) {
            var THIS = this,
                number_data;

            if(numbers_data.length > 0) {
                //var phone_number = numbers_data[0].phone_number.match(/^\+?1?([2-9]\d{9})$/),
                var phone_number = numbers_data[0].phone_number.match(/^\+(.*)$/),
                    error_function = function() {
                        winkstart.confirm(_t('numbers_manager', 'there_was_an_error') + numbers_data[0].phone_number +
                            _t('numbers_manager', 'would_you_like_to_retry'),
                            function() {
                                THIS.add_freeform_numbers(numbers_data, callback);
                            },
                            function() {
                                THIS.add_freeform_numbers(numbers_data.slice(1), callback);
                            }
                        );
                    };

                if(phone_number && phone_number[1]) {
                    THIS.create_number(phone_number[1],
                        function() {
                            THIS.activate_number(phone_number[1],
                                function(_data, status) {
                                    THIS.add_freeform_numbers(numbers_data.slice(1), callback);
                                },
                                function(_data, status) {
                                    error_function();
                                }
                            );
                        },
                        function() {
                            error_function();
                        }
                    );
                }
                else {
                    error_function();
                }
            }
            else {
                if(typeof callback === 'function') {
                    callback();
                }
            }
        },

        add_numbers: function(numbers_data, callback) {
            var THIS = this,
                number_data;

            if(numbers_data.length > 0) {
                var phone_number = numbers_data[0].phone_number.match(/^\+?1?([2-9]\d{9})$/),
                    error_function = function() {
                        winkstart.confirm(_t('numbers_manager', 'there_was_an_error') + numbers_data[0].phone_number +
                            _t('numbers_manager', 'would_you_like_to_retry'),
                            function() {
                                THIS.add_numbers(numbers_data, callback);
                            },
                            function() {
                                THIS.add_numbers(numbers_data.slice(1), callback);
                            }
                        );
                    };

                if(phone_number[1]) {
                    THIS.activate_number(phone_number[1],
                        function(_data, status) {
                            THIS.add_numbers(numbers_data.slice(1), callback);
                        },
                        function(_data, status) {
                            error_function();
                        }
                    );
                }
                else {
                    error_function();
                }
            }
            else {
                if(typeof callback === 'function') {
                    callback();
                }
            }
        },

        render_fields: function(parent, callback, callback_after_buying) {
            var THIS = this,
            fields_html = THIS.templates.fields.tmpl({
				_t: function(param){
					return window.translate['numbers_manager'][param];
				}
			});

            $(fields_html, parent).click(function() {
                THIS.render_add_number_dialog(function() {
                    if(typeof callback_after_buying === 'function') {
                        callback_after_buying();
                    }
                });
            });

            (parent)
                .empty()
                .append(fields_html);

            if(typeof callback == 'function') {
                callback();
            }

            /* Nice hack for amplify.publish */
            return false;
        },

        clean_phone_number_data: function(data) {
            /* Clean Caller-ID */
            if('cnam' in data && 'display_name' in data.cnam && data.cnam.display_name === '') {
                delete data.cnam.display_name;
            }

            if(data.cnam && $.isEmptyObject(data.cnam)) {
                delete data.cnam;
            }

            /* Clean e911 */
        },

        render_numbers_manager: function(parent) {
            var THIS = this,
                numbers_manager_html = THIS.templates.numbers_manager.tmpl();

            THIS.setup_table(numbers_manager_html);

            $('#select_all_numbers', numbers_manager_html).click(function() {
                $('.select_number', numbers_manager_html).prop('checked', $(this).is(':checked'));
            });

            $(numbers_manager_html).delegate('#buy_number', 'click', function() {
                THIS.render_add_number_dialog(function() {
                    THIS.list_numbers();
                });
            });

            $(numbers_manager_html).delegate('#add_number', 'click', function() {
                THIS.render_freeform_number_dialog(function() {
                    THIS.list_numbers();
                });
            });

            $(numbers_manager_html).delegate('.cid', 'click', function() {
                var $cnam_cell = $(this),
                    data_phone_number = $cnam_cell.parents('tr').first().attr('id'),
                    phone_number = data_phone_number.match(/^\+?1?([2-9]\d{9})$/);

                if(phone_number[1]) {
                    THIS.get_number(phone_number[1], function(_data) {
                        THIS.render_cnam_dialog(_data.data.cnam || {}, function(cnam_data) {
                            _data.data.cnam = $.extend({}, _data.data.cnam, cnam_data);

                            THIS.clean_phone_number_data(_data.data);

                            winkstart.confirm(_t('numbers_manager', 'your_onfile_credit_card_will_immediately_be_charged'),
                                function() {
                                    THIS.update_number(phone_number[1], _data.data, function(_data_update) {
                                            !($.isEmptyObject(_data.data.cnam)) ? $cnam_cell.removeClass('inactive').addClass('active') : $cnam_cell.removeClass('active').addClass('inactive');
                                        },
                                        function(_data_update) {
                                            winkstart.alert(_t('numbers_manager', 'failed_to_update_the_caller_id') + _data_update.message);
                                        }
                                    );
                                }
                            );
                        });
                    });
                }
            });

            $(numbers_manager_html).delegate('.cid_inbound', 'click', function() {
                var $cnam_cell = $(this),
                    data_phone_number = $cnam_cell.parents('tr').first().attr('id'),
                    phone_number = data_phone_number.match(/^\+?1?([2-9]\d{9})$/);

                if(phone_number[1]) {
                    THIS.get_number(phone_number[1], function(_data) {
                        if(typeof _data.data.cnam !== 'undefined' && _data.data.cnam.inbound_lookup) {
                            _data.data.cnam.inbound_lookup = false;
                            THIS.update_number(phone_number[1], _data.data, function(_data_update) {
                                    $cnam_cell.removeClass('active').addClass('inactive');
                                },
                                function(_data_update) {
                                    winkstart.alert(_t('numbers_manager', 'failed_to_update_the_caller_id') + _data_update.message);
                                }
                            );
                        }
                        else {
                            winkstart.confirm(_t('numbers_manager', 'if_you_turn_on_this_feature'),
                                function() {
                                    _data.data.cnam = $.extend(true,_data.data.cnam || {},{ inbound_lookup: true });
                                    THIS.update_number(phone_number[1], _data.data, function(_data_update) {
                                            $cnam_cell.removeClass('inactive').addClass('active');
                                        },
                                        function(_data_update) {
                                            winkstart.alert(_t('numbers_manager', 'failed_to_update_the_caller_id')+_data_update.message);
                                        }
                                    );
                                }
                            );
                        }
                    });
                }
            });

            $(numbers_manager_html).delegate('.e911', 'click', function() {
                var $e911_cell = $(this),
                    data_phone_number = $e911_cell.parents('tr').first().attr('id'),
                    phone_number = data_phone_number.match(/^\+?1?([2-9]\d{9})$/);

                if(phone_number[1]) {
                    THIS.get_number(phone_number[1], function(_data) {
                        THIS.render_e911_dialog(_data.data.dash_e911 || {}, function(e911_data) {
                            _data.data.dash_e911 = $.extend({}, _data.data.dash_e911, e911_data);

                            THIS.clean_phone_number_data(_data.data);

                            winkstart.confirm(_t('numbers_manager', 'your_onfile_credit_card_will_immediately_be_charged'),
                                function() {
                                    THIS.update_number(phone_number[1], _data.data, function(_data_update) {
                                            !($.isEmptyObject(_data.data.dash_e911)) ? $e911_cell.removeClass('inactive').addClass('active') : $e911_cell.removeClass('active').addClass('inactive');
                                        },
                                        function(_data_update) {
                                            winkstart.alert(_t('numbers_manager', 'failed_to_update_the_e911') + _data_update.message);
                                        }
                                    );
                                }
                            );
                        });
                    });
                }
            });

            $(numbers_manager_html).delegate('#delete_number', 'click', function() {
                var data_phone_number,
                    phone_number,
                    $selected_checkboxes = $('.select_number:checked', numbers_manager_html),
                    nb_numbers = $selected_checkboxes.size(),
                    refresh_list = function() {
                        nb_numbers--;
                        if(nb_numbers === 0) {
                            THIS.list_numbers();
                        }
                    };

                if(nb_numbers > 0) {
                    winkstart.confirm(_t('numbers_manager', 'are_you_sure_you_want') + nb_numbers + _t('numbers_manager', 'numbers_selected'), function() {
                            $selected_checkboxes.each(function() {
                                data_phone_number = $(this).parents('tr').attr('id'),
                                phone_number = data_phone_number.match(/^(.*)$/);

                                if(phone_number[1]) {
                                    THIS.delete_number(phone_number[1],
                                        function() {
                                            refresh_list();
                                        },
                                        function() {
                                            refresh_list();
                                        }
                                    );
                                }
                            });
                        },
                        function() {

                        }
                    );
                }
                else {
                    winkstart.alert(_t('numbers_manager', 'you_didnt_select_any_number'));
                }
            });

            $(numbers_manager_html).delegate('#port_numbers', 'click', function(ev) {
                ev.preventDefault();

                THIS.render_port_dialog(function(port_data, popup) {
                    var ports_done = 0;

                    winkstart.confirm(_t('numbers_manager', 'your_onfile_credit_card_will_immediately_be_charged'),
                        function() {
                            $.each(port_data.phone_numbers, function(i, val) {
                                var number_data = {
                                    phone_number: val
                                };

                                THIS.port_number(number_data, function(_number_data) {
                                    number_data.options = _number_data.data;

                                    if('id' in number_data.options) {
                                        delete number_data.options.id;
                                    }

                                    THIS.submit_port(port_data, number_data, function(_data) {
                                        if(++ports_done > port_data.phone_numbers.length - 1) {
                                            THIS.list_numbers();

                                            popup.dialog('close');
                                        }
                                    });
                                });
                            });
                        }
                    );
                });
            });

            THIS.list_numbers(function() {
                (parent || $('#ws-content'))
                    .empty()
                    .append(numbers_manager_html);
            });
        },

        render_cnam_dialog: function(cnam_data, callback) {
			cnam_data._t = function(param){
				return window.translate['numbers_manager'][param];
			};
            var THIS = this,
                popup_html = THIS.templates.cnam_dialog.tmpl(cnam_data || {
					_t: function(param){
						return window.translate['numbers_manager'][param];
					}
				}),
                popup;

            $('.submit_btn', popup_html).click(function(ev) {
                ev.preventDefault();

                var cnam_form_data = form2object('cnam');

                if(typeof callback === 'function') {
                    callback(cnam_form_data);
                }

                popup.dialog('close');
            });

            popup = winkstart.dialog(popup_html, {
                title: _t('numbers_manager', 'edit_cid')
            });
        },

        render_e911_dialog: function(e911_data, callback) {
			e911_data._t = function(param){
				return window.translate['numbers_manager'][param];
			};
            var THIS = this,
                popup_html = THIS.templates.e911_dialog.tmpl(e911_data || {}),
                popup;

            $('#postal_code', popup_html).blur(function() {
                $.getJSON('http://www.geonames.org/postalCodeLookupJSON?&country=US&callback=?', { postalcode: $(this).val() }, function(response) {
                    if (response && response.postalcodes.length && response.postalcodes[0].placeName) {
                        $('#locality', popup_html).val(response.postalcodes[0].placeName);
                        $('#region', popup_html).val(response.postalcodes[0].adminName1);
                    }
                });
            });

            $('.inline_field > input', popup_html).keydown(function() {
                $('.gmap_link_div', popup_html).hide();
            });

            if(e911_data.latitude && e911_data.longitude) {
                var href = 'http://maps.google.com/maps?q='+ e911_data.latitude + ',+' + e911_data.longitude + '+(Your+E911+Location)&iwloc=A&hl=en';
                $('#gmap_link', popup_html).attr('href', href);
                $('.gmap_link_div', popup_html).show();
            }

            $('.submit_btn', popup_html).click(function(ev) {
                ev.preventDefault();

                var e911_form_data = form2object('e911');

                if(typeof callback === 'function') {
                    callback(e911_form_data);
                }

                popup.dialog('close');
            });

            popup = winkstart.dialog(popup_html, {
                title: e911_data.phone_number ? _t('numbers_manager', 'edit_location_for') + e911_data.phone_number : _t('numbers_manager', 'edit_911_location'),
                width: '465px'
            });
        },

        render_freeform_number_dialog: function(callback) {
            var THIS = this,
                popup_html = THIS.templates.freeform_number_dialog.tmpl({
					_t: function(param){
						return window.translate['numbers_manager'][param];
					}
				}),
                popup;

            $('.add', popup_html).click(function(ev) {
                ev.preventDefault();

                var phone_numbers = $('#freeform_numbers', popup_html).val().replace(/\n/g,',');
                phone_numbers = phone_numbers.replace(/[\s-\(\)\.]/g, '').split(',');

                var numbers_data = [];

                if(phone_numbers.length > 0) {
                    var phone_number;
                    $.each(phone_numbers, function(k, v) {
                        //phone_number = v.match(/^\+?1?([2-9]\d{9})$/);
                        phone_number = v.match(/^\+(.*)$/);
                        if(phone_number && phone_number[1]) {
                            numbers_data.push({phone_number: v});
                        }
                    });

                    THIS.add_freeform_numbers(numbers_data, function() {
                        if(typeof callback === 'function') {
                            callback();
                        }

                        popup.dialog('close');
                    });
                }
                else {
                    winkstart.alert(_t('numbers_manager', 'you_didnt_enter_any_valid_phone_number'));
                }
            });

            popup = winkstart.dialog(popup_html, {
                title: _t('numbers_manager', 'add_your_phone_numbers_to_the_platform'),
                position: ['center', 20]
            });

            $('.add', popup).focus();
        },

		formatBuyNumberData: function(data) {
			var arrayNumbers = [];

			$.each(data.data, function(k, number) {
				if(number.number) {
					arrayNumbers.push(number.number);
				}
				else {
					arrayNumbers.push(number);
				}
			});

			return arrayNumbers;
		},

        render_add_number_dialog: function(callback) {
			var data = {
				_t: function(param){
					return window.translate['numbers_manager'][param];
				},
				version: winkstart.config.default_api_url.match(/(v2)$/) ? true : false
			};

            var THIS = this,
                numbers_data = [],
                popup_html = THIS.templates.add_number_dialog.tmpl(data),
                popup;


            $('.toggle_div', popup_html).hide();

            $('#search_numbers_button', popup_html).click(function(ev) {
                $('.toggle_div', popup_html).hide();

                var npa_data = {},
                    npa = $('#sdid_npa', popup_html).val(),
                    nxx = $('#sdid_nxx', popup_html).val();

                ev.preventDefault();

                npa_data.prefix = npa + nxx;

                THIS.search_numbers(npa_data, function(results_data) {
                	var formattedData = THIS.formatBuyNumberData(results_data),
                    	results_html = THIS.templates.add_number_search_results.tmpl({
							data: formattedData,
							_t: function(param){
								return window.translate['numbers_manager'][param];
							}
						});

                    $('#foundDIDList', popup_html)
                        .empty()
                        .append(results_html);

                    $('.toggle_div', popup_html).show();
                });
            });

            $('#add_numbers_button', popup_html).click(function(ev) {
                ev.preventDefault();

                winkstart.confirm(_t('numbers_manager', 'your_onfile_credit_card_will_immediately_be_charged'),
                    function() {

						$('#foundDIDList .checkbox_number:checked', popup_html).each(function() {
							numbers_data.push($(this).dataset());
						});

						THIS.add_numbers(numbers_data, function() {
							if(typeof callback === 'function') {
								callback();
							}

							popup.dialog('close');
						});
					});
			});

            $(popup_html).delegate('.checkbox_number', 'click', function() {
                var selected_numbers =  $('.checkbox_number:checked', popup_html).size(),
                    sum_price = 0;

                $.each($('.checkbox_number:checked', popup_html), function() {
                    sum_price += parseFloat($(this).dataset('price'));
                });

                sum_price = '$'+sum_price+'.00';

                $('.selected_numbers', popup_html).html(selected_numbers);
                $('.cost_numbers', popup_html).html(sum_price);
            });

            popup = winkstart.dialog(popup_html, {
                title: _t('numbers_manager', 'add_number_title'),
                width: '600px',
                position: ['center', 20]
            });
        },

        render_port_dialog: function(callback) {
            var THIS = this,
                port_form_data = {},
                popup_html = THIS.templates.port_dialog.tmpl({
					_t: function(param){
						return window.translate['numbers_manager'][param];
					},
                    company_name: winkstart.config.company_name || '2600hz',
                    support_email: (winkstart.config.port || {}).support_email || 'support@2600hz.com',
                    support_file_upload: (File && FileReader)
                }),
                popup,
                files,
                loa,
                phone_numbers,
                current_step = 1,
                max_steps = 4,
                $prev_step = $('.prev_step', popup_html),
                $next_step = $('.next_step', popup_html),
                $submit_btn = $('.submit_btn', popup_html);

            /* White label links, have to do it in JS because template doesn't eval variables in href :( */
            $('#loa_link', popup_html).attr('href', ((winkstart.config.port || {}).loa) || 'http://2600hz.com/porting/2600hz_loa.pdf');
            $('#resporg_link', popup_html).attr('href', ((winkstart.config.port || {}).resporg) || 'http://2600hz.com/porting/2600hz_resporg.pdf');
            $('#features_link', popup_html).attr('href', ((winkstart.config.port || {}).features) || 'http://www.2600hz.com/features');
            $('#terms_link', popup_html).attr('href', ((winkstart.config.port || {}).terms) || 'http://www.2600hz.com/terms');

            $('.step_div:not(.first)', popup_html).hide();
            $prev_step.hide();
            $submit_btn.hide();

            $('.other_carrier', popup_html).hide();

            $('.carrier_dropdown', popup_html).change(function() {
                if($(this).val() === 'Other') {
                    $('.other_carrier', popup_html).show();
                }
                else {
                    $('.other_carrier', popup_html).empty().hide();
                }
            });

            $('#postal_code', popup_html).blur(function() {
                $.getJSON('http://www.geonames.org/postalCodeLookupJSON?&country=US&callback=?', { postalcode: $(this).val() }, function(response) {
                    if (response && response.postalcodes.length && response.postalcodes[0].placeName) {
                        $('#locality', popup_html).val(response.postalcodes[0].placeName);
                        $('#region', popup_html).val(response.postalcodes[0].adminName1);
                    }
                });
            });

            $('.prev_step', popup_html).click(function() {
                $next_step.show();
                $submit_btn.hide();
                $('.step_div', popup_html).hide();
                $('.step_div:nth-child(' + --current_step + ')', popup_html).show();
                $('.wizard_nav .steps_text li, .wizard_nav .steps_image .round_circle').removeClass('current');
                $('#step_title_'+current_step +', .wizard_nav .steps_image .round_circle:nth-child('+ current_step +')', popup_html).addClass('current');

                current_step === 1 ? $('.prev_step', popup_html).hide() : true;
            });

            $('.next_step', popup_html).click(function() {
                $prev_step.show();
                $('.step_div', popup_html).hide();
                $('.step_div:nth-child(' + ++current_step + ')', popup_html).show();
                $('.wizard_nav .steps_text li, .wizard_nav .steps_image .round_circle').removeClass('current');
                $('#step_title_'+current_step +', .wizard_nav .steps_image .round_circle:nth-child('+ current_step +')', popup_html).addClass('current');
                if(current_step === max_steps) {
                    $next_step.hide();
                    $submit_btn.show();
                }
            });

            $('.loa', popup_html).change(function(ev) {
                var slice = [].slice,
                    raw_files = slice.call(ev.target.files, 0),
                    file_reader = new FileReader(),
                    file_name,
                    read_file = function(file) {
                        file_name = file.fileName || file.name || 'noname';
                        file_reader.readAsDataURL(file);
                    };

                loa = [];

                file_reader.onload = function(ev) {
                    loa.push({
                        file_name: file_name,
                        file_data: ev.target.result
                    });

                    if(raw_files.length > 1) {
                        raw_files = raw_files.slice(1);
                        read_file(raw_files[0]);
                    }
                };

                read_file(raw_files[0]);
            });

            $('.files', popup_html).change(function(ev) {
                var slice = [].slice,
                    raw_files = slice.call(ev.target.files, 0),
                    file_reader = new FileReader(),
                    file_name,
                    read_file = function(file) {
                        file_name = file.fileName || file.name || 'noname';
                        file_reader.readAsDataURL(file);
                    };

                files = [];

                file_reader.onload = function(ev) {
                    files.push({
                        file_name: file_name,
                        file_data: ev.target.result
                    });

                    if(raw_files.length > 1) {
                        raw_files = raw_files.slice(1);
                        read_file(raw_files[0]);
                    }
                    else {
                        $('.number_of_docs', popup_html).html(files.length);
                    }
                };

                read_file(raw_files[0]);
            });

            $('.submit_btn', popup_html).click(function(ev) {
                ev.preventDefault();
                port_form_data = form2object('port');

                var string_alert = '';

                if($('.carrier_dropdown', popup_html).val() === 'Other') {
                    port_form_data.port.service_provider = $('.other_carrier', popup_html).val();
                }

                if(!port_form_data.extra.agreed) {
                    string_alert += _t('numbers_manager', 'you_must_agree_to_the_terms');
                }

                $.each(port_form_data.extra.cb, function(k, v) {
                    if(v === false) {
                        string_alert += _t('numbers_manager', 'you_must_confirm_the_first_conditions');
                        return false;
                    }
                });

                port_form_data.phone_numbers = $('.numbers_text', popup_html).val().replace(/\n/g,',');
                port_form_data.phone_numbers = port_form_data.phone_numbers.replace(/[\s-\(\)\.]/g, '').split(',');

                port_form_data.port.main_number = port_form_data.port.main_number.replace(/[\s-\(\)\.]/g, '');

                var res = port_form_data.port.main_number.match(/^\+?1?([2-9]\d{9})$/);
                res ? port_form_data.port.main_number = '+1' + res[1] : string_alert += _t('numbers_manager', 'you_need_to_enter_main_number');

                var is_toll_free_main = THIS.check_toll_free(port_form_data.port.main_number);

                port_form_data.phone_numbers.push(port_form_data.port.main_number);

                phone_numbers = [];
                var error_toll_free = [];
                $.each(port_form_data.phone_numbers, function(i, val) {
                    var result = val.match(/^\+?1?([2-9]\d{9})$/);

                    if(result) {
                        if(THIS.check_toll_free(result[1]) === is_toll_free_main) {
                            phone_numbers.push('+1' + result[1]);
                        }
                        else {
                            error_toll_free.push(result[1]);
                        }
                    }
                    else {
                        if(val !== '') {
                            string_alert += val + _t('numbers_manager', 'this_phone_number_is_not_valid');
                        }
                    }
                });

                if(error_toll_free.length > 0) {
                    $.each(error_toll_free, function(k, v) {
                        string_alert += v + ', ';
                    });

                    if(is_toll_free_main) {
                        string_alert += _t('numbers_manager', 'these_numbers_are_not_toll_free_numbers');
                    }
                    else {
                        string_alert += _t('numbers_manager', 'these_numbers_are_toll_free_numbers');
                    }
                }

                port_form_data.phone_numbers = phone_numbers;

                files ? port_form_data.files = files : string_alert += _t('numbers_manager', 'you_need_to_upload_a_bill');
                loa ? port_form_data.loa = loa : string_alert += _t('numbers_manager', 'you_need_to_upload_a_letter_of_authorization');

                if(!port_form_data.port.email.match(/^([0-9A-Za-z_\-\+\.]+@[0-9A-Za-z_\-\.]+\.[0-9A-Za-z]+)?$/)) {
                    string_alert += _t('numbers_manager', 'the_email_address_you_entered');
                }

                if(string_alert === '') {
                    delete port_form_data.extra;

                    if(typeof callback === 'function') {
                        callback(port_form_data, popup);
                    }
                }
                else {
                    winkstart.alert(string_alert);
                }
            });

            popup = winkstart.dialog(popup_html, {
                title: _t('numbers_manager', 'port_a_number_title')
            });
        },

        check_toll_free: function(number) {
            var toll_free = false,
                toll_free_number = number.match(/^(\+?1)?(8(00|55|66|77|88)[2-9]\d{6})$/);

            if(toll_free_number && toll_free_number[0]) {
                toll_free = true;
            }

            return toll_free;
        },

        activate: function() {
            var THIS = this;

            THIS.render_numbers_manager();
        },

        list_numbers: function(callback) {
            winkstart.request('numbers_manager.list', {
                    account_id: winkstart.apps['numbers'].account_id,
                    api_url: winkstart.apps['numbers'].api_url
                },
                function(_data, status) {
                    winkstart.table.numbers_manager.fnClearTable();

                    var tab_data = [];
                    if('numbers' in _data.data) {
                    	$.each(_data.data.numbers, function(k, v) {
                        	var inbound = $.inArray('inbound_cnam', v.features) >= 0 ? true : false;
                        	var outbound = $.inArray('outbound_cnam', v.features) >= 0 ? true : false;
                        	v.e911 = $.inArray('dash_e911', v.features) >= 0 ? true : false;
                        	v.caller_id = { inbound: inbound, outbound: outbound };
                        	tab_data.push(['', k, v.caller_id, v.e911, v.state]);
                    	});
                    }

                    winkstart.table.numbers_manager.fnAddData(tab_data);

                    if(typeof callback === 'function') {
                        callback();
                    }
                }
            );
        },

        setup_table: function(parent) {
            var THIS = this,
                numbers_manager_html = parent,
                columns = [
                {
                    'sTitle': '<input type="checkbox" id="select_all_numbers"/>',
                    'fnRender': function(obj) {
                        return '<input type="checkbox" class="select_number"/>';
                    },
                    'bSortable': false
                },
                {
                    'sTitle': _t('numbers_manager', 'phone_number')
                },
                {
                    'sTitle': _t('numbers_manager', 'caller_id'),
                    'fnRender': function(obj) {
                        var link = '<a class="cid inactive">' + _t('numbers_manager', 'outbound') + '</a>' + ' / ' + '<a class="cid_inbound inactive">' + _t('numbers_manager', 'inbound') + '</a>'
                        if(typeof obj.aData[obj.iDataColumn] === 'object') {
                            var cid_outbound = 'cid ' + (obj.aData[obj.iDataColumn].outbound ? 'active' : 'inactive');
                            var cid_inbound = 'cid_inbound ' + (obj.aData[obj.iDataColumn].inbound ? 'active' : 'inactive');

                            link = '<a class="'+cid_outbound+'">' + _t('numbers_manager', 'outbound') + '</a>' + ' / ' + '<a class="'+cid_inbound+'">' + _t('numbers_manager', 'inbound') + '</a>'
                        }
                        return link;
                    },
                    'bSortable': false
                },
                {
                    'sTitle': _t('numbers_manager', 'E911'),
                    'fnRender': function(obj) {
                        var e911 = 'e911 ' + (obj.aData[obj.iDataColumn] ? 'active' : 'inactive');
                        return '<a class="'+ e911  +'">E911</a>';
                    },
                    'bSortable': false
                },
                {
                    'sTitle': _t('numbers_manager', 'state'),
                    'fnRender': function(obj) {
                        var state = obj.aData[obj.iDataColumn].replace('_',' ');
                        return state.charAt(0).toUpperCase() + state.substr(1);
                    }
                }
            ];

            winkstart.table.create('numbers_manager', $('#numbers_manager-grid', numbers_manager_html), columns, {}, {
                sDom: '<"action_number">frtlip',
                aaSorting: [[1, 'desc']],
                fnRowCallback: function(nRow, aaData, iDisplayIndex) {
                    $(nRow).attr('id', aaData[1]);
                    return nRow;
                }
            });

            $('div.action_number', numbers_manager_html).html('<button class="btn success" id="buy_number">' + _t('numbers_manager', 'buy_number') + '</button><button class="btn primary" id="port_numbers">' + _t('numbers_manager', 'port_a_number') + '</button><button class="btn danger" id="delete_number">' + _t('numbers_manager', 'delete_selected_numbers') + '</button>');

            /* Check if the flag is in the current account OR in the master account if masquerading */
            var account_id = winkstart.apps['numbers'].account_id;

            if('accounts' in winkstart.apps && winkstart.apps['accounts'].masquerade) {
                account_id = winkstart.apps['accounts'].masquerade[0];
            }

            winkstart.request('numbers_manager.get_account', {
                    account_id: account_id,
                    api_url: winkstart.apps['numbers'].api_url,
                },
                function(_data, status) {
                    if(_data.data && _data.data.wnm_allow_additions) {
                        $('div.action_number', numbers_manager_html).prepend('<button class="btn" id="add_number">' + _t('numbers_manager', 'add_number') + '</button>');
                    }
                }
            );

            $('#numbers_manager-grid_filter input[type=text]', numbers_manager_html).first().focus();

            $('.cancel-search', numbers_manager_html).click(function(){
                $('#numbers_manager-grid_filter input[type=text]', numbers_manager_html).val('');
                winkstart.table.numbers_manager.fnFilter('');
            });
        }
    }
);
