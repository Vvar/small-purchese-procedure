/**
 * Collection view
 * @type {*}
 */
Collection = Backbone.View.extend(
{
    template: '',

    events: {
        "click .add":      "add",
        "click .remove":   "remove"
    },

    count: 0,

    /**
     * Sets up elemetn and template
     * @param elm
     */
    initialize: function(elm)
    {
        this.setElement(elm);
        this.render();
        this.template = this.$('span[data-template]').data('template');
        this.count = this.$('fieldset').length;
    },

    render: function()
    {
        if (this.$el.hasClass('allow-add')) {
            this.$el.append('<button type="button" class="add">Add</button>');
        }
        this.$('fieldset').append('<button type="button" class="remove">x</button>');
    },

    /**
     * appends new element to the fieldset
     * @param e
     */
    add: function(e)
    {
        var currentCount = this.$('fieldset').length;
        this.count++;
        template = this.template.replace(/__index__/g, this.count);
        this.$el.append(template);
    },

    /**
     * Removes selected element
     * @param e
     */
    remove: function(e) {
        $(e.currentTarget).parent().remove();
    }
})
var now = new Date,
    curYear = now.getYear(),
    curMonth = now.getMonth(),
    holidays = {};

function reload_month(factor) {
    curMonth += factor;
    
    if (curMonth < 0) {
        curMonth = 11;
        curYear--;
    }
    if (curMonth > 11) {
        curMonth = 0;
        curYear++;
    }
    
    $("#calendar").calendarWidget({month: curMonth, year: curYear});
}

function calendar_show()
{
    var now = new Date;
    
    curYear  = now.getFullYear(),
    curMonth = now.getMonth(),
    
    $("#calendar").calendarWidget({
        month: curMonth,
        year:  curYear						  
    });
    $("#calendar_window").dialog({'width': 600, 'modal': true});
}