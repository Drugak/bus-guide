module.exports = {

    options: {
        limit:3
    },

    devFirst: [
        'clean',
        'jshint'
    ],

    devSecond: [
        'less::dev',
        'uglify'
    ],

    prodFirst: [
        'clean',
        'jshint'
    ],

    prodSecond: [
        "less::prod",
        "uglify"
    ],

    imgFirst: [
        "imagemin"
    ]
};