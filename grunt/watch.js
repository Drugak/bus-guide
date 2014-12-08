module.exports = {
    options: {
        spawn:false,
        livereload:true
    },
    scripts: {
        files: [
            "src/scripts/*.js"
        ],
        tasks: [
            'jshint',
            'uglify'
        ]
    },
    styles : {
        files: [
            "src/styles/*.less"
        ],
        tasks: [
            'less:dev'
        ]
    }
};