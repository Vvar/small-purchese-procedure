;(function(window)
{
    var CertificateSelector = Backbone.View.extend(
    {
        template:
            '<form id="login-ecp" method="post">' +
                '<select name="certificate" id="certificate">' +
                '<% _.forEach(certificates, function(certificate) { %>' +
                    '<option value="<%= certificate.Thumbprint %>"><%= certificate.getInfo(0) %></option>' +
                '<% }); %>' +
                '</select>' +
                '<button type="submit" class="btn">login</button>' +
            '</form>',

        events: {
            "submit form#login-ecp":   "submit"
        },

        initialize: function ()
        {
            try {
                this.capicom = new Capicom();
                var certificates = this.capicom.getCertificates();
                this.options.certificates = certificates;
            } catch ($e) {
                this.error($e)
            }
        },

        error: function(e)
        {
            alert(e)
        },

        render: function (element)
        {
            this.setElement(element);
            if (this.options.certificates) {
                var template = _.template(this.template, this.options);
                this.$el.html(template);
            }


            return this;
        },

        submit: function(e)
        {
            e.preventDefault();
            var sign = this.capicom.sign(this.options.data, this.$('#certificate').val(), new Date());
            return false;
        }
    });

    // expose
    window.CertificateSelector = CertificateSelector;
}(this));
