module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        swig: {
            default_options: {
                options: {
                    templatePath: 'views/',
                    data: {
                        title: 'Swig Express Samples By MengkZhaoyun'
                    }
                },
                expand: true,
                cwd: 'views/',
                dest: '../tmp/',
                src: ['*.tpl'],
                ext: '.html'
            }
        }
    })

    // 加载包含 "swig" 任务的插件。
    grunt.loadNpmTasks('grunt-swig-templates');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['swig']);

};