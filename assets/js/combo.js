(function($) {
	$.widget("ui.combobox", {
		options : {
			appendTo : 'body',
			scrollHeight : 180,
			optionReplaceFrom : null,
			optionReplaceTo : "<strong>$1</strong>"
		},
		_create : function() {
			var self = this, select = this.element.hide(), selected = select.children(":selected"), value = selected.val() ? selected.text() : "";
			var input = this.input = $("<input>").insertAfter(select).val(value).autocomplete({
				delay : 0,
				minLength : 0,
				appendTo : this.options.appendTo,
				scrollHeight : this.options.scrollHeight,
				source : function(request, response) {
					var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
					response(select.children("option").map(function() {
						var text = $(this).text();
						if(this.value && (!request.term || matcher.test(text) ))
							return {
								label : text.replace((self.options.optionReplaceFrom || new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(request.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi")), self.options.optionReplaceTo),
								value : text,
								option : this
							};
					}));
				},
				select : function(event, ui) {
					ui.item.option.selected = true;
					self._trigger("selected", event, {
						item : ui.item.option
					});
					if( typeof self.options.callbackChange == 'function') {
						self.options.callbackChange(event, ui);
					}
				},
				change : function(event, ui) {
					if(!ui.item) {
						var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex($(this).val()) + "$", "i"), valid = false;
						select.children("option").each(function() {
							if($(this).text().match(matcher)) {
								this.selected = valid = true;
								return false;
							}
						});
						if(!valid) {
							// remove invalid value, as it didn't match anything
							$(this).val("");
							select.val("");
							input.data("autocomplete").term = "";
							return false;
						}
					}
				}
			}).addClass("ui-widget ui-widget-content ui-corner-left");

			input.data("autocomplete")._renderItem = function(ul, item) {
				return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.label + "</a>").appendTo(ul);
			};
			//this.button = $("<button type='button'><span class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s'></span></button>").attr("title", "Show All Items").insertAfter(input)
			//				.button({
			//					icons: {
			//						primary: "ui-icon-triangle-1-s"
			//					},
			//					text: false
			//				})
			//.removeClass("ui-corner-all").addClass("ui-corner-right ui-button-icon ui-button ui-widget ui-state-default ui-button-icon-only")

			$('#autoCompl').click(function() {
				// close if already visible
				if(input.autocomplete("widget").is(":visible")) {
					input.autocomplete("close");
					return;
				}

				// pass empty string as value to search for, displaying all results
				input.autocomplete("search", "");
				input.focus();
				$('#login-certificate-list ul').css("width", "384");
				$('#login-certificate-list ul').css("overflow", "hidden");

			});
		},
		destroy : function() {
			this.input.remove();
			this.button.remove();
			this.element.show();
			$.Widget.prototype.destroy.call(this);
		}
	});
})(jQuery);
