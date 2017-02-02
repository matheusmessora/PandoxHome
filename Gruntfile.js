module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-cdn');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-strip');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Define the configuration for all the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: ["dev"]
            },

            trash: {
                src: ["dev"]
            }
        },

        useminPrepare: {
            src: ['dev/includes/head.html'],
            options: {
                dest: 'dev'
            }
        },

        usemin: {
            html: 'dev/includes/head.html',
            options: {
                assetsDirs: ['dev']
            }
        },

        copy: {
            dev: {
                files: [
                    {
                        cwd: 'src/',
                        expand: true,
                        src: ['**/*.*'],
                        dest: 'dev'
                    }
                ]
            }
        },

        includes: {
            dev: {
                options: {
                    debug: true,
                    flatten: true
                },
                files: [{
                    src: ['dev/index.html'],
                    dest: 'dev/index.html', // it must override
                    flatten: true
                }]
            }
        },

        watch: {
            scripts: {
                files: ['src/**/*.html', 'src/**/*.js', 'src/**/*.css'],
                tasks: [
                    'clean:build',
                    'copy:dev',
                    //'useminPrepare',
                    //'usemin',
                    'includes:dev'
                ],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('compile', [
	    'clean:build',
	    'copy:dev',
	    //'useminPrepare',
	    //'usemin',
	    'includes:dev'
    ])	


    grunt.registerTask('dev', [
        'watch'
    ]);
}