function slider(selector) {
    let slider = $(selector);
    let imgs = slider.children();

    slider
        .addClass('slider')
        .append('<a href="#" class="slider__arrow slider__arrow__left"></a>')
        .append('<div class="slider__slides"></div>')
        .append('<div class="slider__dots"></div>')
        .append('<a href="#" class="slider__arrow slider__arrow__right"></a>');

    let slides = slider.children('.slider__slides');
    let dots = slider.children('slider__dots');

    imgs
        .preprendTo(slides);
}



slider('#slider');