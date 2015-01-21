module.exports = {
    watch: {
        files: ['src/scripts/**/*.js' , 'src/styles/**.less'],
        tasks: [
            'less::dev',
            'uglify',
            'cssmin'
        ],
        options: {
            spawn: false
        }
    }
}

