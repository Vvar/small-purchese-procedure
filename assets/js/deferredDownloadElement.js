MteForm = MteForm || {};

MteForm.deferredDownloadElement = function () {
    var self = this;
    this.selector = null,
        this.xhr = null,
        this.key = null,
        this.timeout = null,
        this.timeoutElm = null,
        this.error = false,
        this.checkInterval = null,
        this.runInterval = null,
        this.templateTimeoutError = 'Истекло время ожидания',
        this.templateProgress = '<div class="progress"></div>';

    this.init = function (selector, options) {
        self.selector = selector;
        self.setOptions(options);
        $(selector).unbind('click').bind('click', self.generate);
    };

    this.setOptions = function (options) {

        self.timeout = 60;
        self.checkInterval = 5;
        self.runInterval = 30;

        if (options) {
            self.timeout = options.timeout == undefined ? self.timeout : options.timeout;
            self.checkInterval = options.checkInterval == undefined ? self.checkInterval : options.checkInterval;
            self.runInterval = options.runInterval == undefined ? self.runInterval : options.runInterval;
            self.data = options.data == undefined ? self.data : options.data;
        }
    };
    this.generate = function () {

        self.dialog = bootbox.dialog({
            message: MteCommon.ajaxLoader()
        });
        self.dialog.on('hidden.bs.modal', self.close);

        var url = $(self.selector).data('url');
        if (!url) {
            self.dialog.find('.bootbox-body').html('Запрос не может быть выполнен: отсутствует URL');
            return false;
        }

        self.error = false;
        clearTimeout(self.timeoutElm);
        self.timeoutElm = setTimeout(function () {
            self.dialog.find('.bootbox-body').html(self.templateTimeoutError);
            self.error = true;
            return false;
        }, self.timeout * 1000);



        var data = [];
        if (self.data != undefined) {
            data = $.isFunction(eval(self.data)) ? eval(self.data)(self) : self.data;
        }
        var run = function () {
            self.xhr = $.ajax({
                url: url,
                data: data,
                type: 'POST',
                success: function (response) {
                    if (response.success == true) {
                        self.key = response.key;
                        if (!self.key) {
                            clearTimeout(self.timeoutElm);
                            self.dialog.find('.bootbox-body').html('Файл не найден');
                            return false;
                        }
                        self.check();
                    } else if (response.message) {
                        clearTimeout(self.timeoutElm);
                        self.dialog.find('.bootbox-body').html(response.message);
                        return false;
                    } else {
                        self.dialog.find('.bootbox-body').html('Произошла непредвиденная ошибка');
                        return false;
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    if (xhr.status === 403) {
                        self.error = true;
                        self.dialog.find('.bootbox-body').html('Недостаточно прав');
                    }
                    if (!self.error && self.dialog.is(":visible")) {
                        // если окно открыто и не истек таймаут перезапускаем задачу
                        setTimeout(run, self.runInterval * 1000);
                    } else {
                        clearTimeout(self.timeoutElm);
                    }
                }
            });
            return true;
        };
        run();
        return false;

    };

    this.check = function () {
        var url = $(self.selector).data('checkurl') + self.key;

        self.xhr = $.ajax({
            url: url,
            success: function (response) {
                if (response.progress !== false && response.progress !== undefined) {
                    if (!$('.ajaxLoader', self.dialog).find('.progress').length) {
                        $('.ajaxLoader', self.dialog).append(self.templateProgress);
                    }
                    $('.ajaxLoader', self.dialog).find('.progress ').progressbar({
                        value: response.progress
                    });
                }
                if (response.success == true && response.progress == 100) {
                    clearTimeout(self.timeoutElm);
                    self.download(response);
                    return true;
                } else if (response.message) {
                    clearTimeout(self.timeoutElm);
                    self.dialog.find('.bootbox-body').html(response.message);
                    return false;
                }
                if (!self.error && self.dialog.is(":visible")) {
                    // если окно открыто и не истек таймаут продолжаем проверять
                    setTimeout(self.check, self.checkInterval * 1000);
                }
                return true;
            },
            error: function (response) {
                if (response.status == '404') {
                    clearTimeout(self.timeoutElm);
                    self.dialog.find('.bootbox-body').html('Файл не найден');
                    return false;
                } else {
                    self.dialog.find('.bootbox-body').html('Произошла непредвиденная ошибка');
                    return false;
                }
            }
        });
        return true;
    };

    this.download = function (response) {
        var url = $(self.selector).data('downloadurl') + self.key;
        self.dialog.find('.bootbox-body').html('<a id="downloadLink" href="' + url + '"> Скачать </a>');
        $('#downloadLink', $(self.dialog)).bind('click', self.close);
    };

    this.close = function () {
        if (self.xhr) {
            self.xhr.abort();
        }
        self.dialog.modal('hide');
    }
};