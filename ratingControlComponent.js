var doc = require('doc-js'),
    crel = require('crel'),
    Rating = require('rating-control'),
    defaultCss = require('defaultcss');

new defaultCss('.item > span { display: inline-block;  width: 20px; height: 20px; }');

module.exports = function(fastn, component, type, settings, children){
    var ratingControlModel = new fastn.Model({value:0});
    
    component.extend('_generic', settings, children);
    component.setProperty('ratingControl');
    component.setProperty('value');
    component.value(0);

    var ratingTemplate = crel('div', {class: 'item'} );
    
    if ( ! settings.itemTemplate ) {
        settings.itemTemplate = ratingTemplate;
    }

    var ratingControl = new Rating(settings);

    component.ratingControl = ratingControl;

    component.render = function(){
        component.element = ratingControl.element;
        
        doc(ratingControl.element).addClass('rating-control-component');
        doc(ratingControl.content).addClass('content');

        component.getContainerElement = function() {
            return ratingControl.content;
        };

        component.emit('render');

        return component;
    };
    
    function handleValue(){
        var val = ratingControl.value();

        if(isNaN(val)) {
            return;
        }

        component.value(val);
    }

    ratingControl.on('value', handleValue);
    
    component.value.on('change', function(val){
        ratingControl.value(val);
    });

    return component;
};

module.exports.expectedComponents = ['_generic'];