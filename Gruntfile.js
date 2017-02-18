module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
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
    grunt.loadNpmTasks('grunt-mustache-render');

    // Define the configuration for all the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dev: {
                src: ["dev/*"]
            },
            build: {
                src: ["dist", ".tmp", "tmp", "dest", ".tmp"]
            },

            trash: {
                src: [".tmp"]
            }
        },

        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            dist: {
                files: {
                    src: [
                        'dev/**/*.{js,css}'
                    ]
                }
            }
        },

        less: {
            dev: {
                files: {
                    "dev/css/main.css" : "src/css/**.less"
                }
            }
        },

        useminPrepare: {
            src: ['dev/includes/head.html'],
            options: {
                dest: 'dev', // destino arquivos concatenados -> unificados
                root: 'src'
            }
        },

        usemin: {
            html: 'dev/**/*.html',
            options: {
                assetsDirs: ['dev']
            }
        },

        includes: {
            dev: {
                options: {
                    debug: false
                },
                files: [{
                    cwd: 'dev/',
                    src: ['**/*.html'],
                    dest: 'dev' // it must override
                }]
            }
        },

        copy: {
            dev: {
                files: [
                    {
                        cwd: 'src/',
                        src: ['*.html', 'includes/*.html', 'resources/img/*'],
                        dest: 'dev',
                        expand: true
                    }
                ]
            },
            package: {
                files: [
                    {
                        cwd: 'dev/',
                        expand: true,
                        src: ['*.html', 'js/**', 'css/**'],
                        dest: 'dist'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['**/*.html'],
                    dest: 'dist'
                }]
            }
        },

        // STRIP CONSOLE.log
        strip: {
            main: {
                src: 'dist/js/**/*.js',
                options: {
                    inline: true
                }
            }
        },

        watch: {
            scripts: {
                files: ['src/**/*.*'],
                tasks: ['dev'],
                options: {
                    debounceDelay: 1000
                    //spawn: false
                }
            }
        }
    });

    grunt.registerTask('test', 'qunit');

    grunt.registerTask('dev', [
        'clean:dev',
        'clean:build',
        'copy:dev',
        'includes:dev',
        'less:dev',
        'useminPrepare',
        'concat:generated',
        'uglify:generated',
        // 'rev',
        'usemin',
        'clean:trash'
    ]);

    grunt.registerTask('package', [
        'dev',
        'copy:package',
        'htmlmin:dist',
        'strip:main',
        'clean:dev'
    ]);
};