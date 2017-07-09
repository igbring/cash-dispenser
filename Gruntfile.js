/**
 * Created by Yann on 09/07/2017.
 */

module.exports = function(grunt) {

    "use strict";

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        clean: ["dist/"],

        copy: {
            main: {
                expand: true,
                cwd: "src/",
                src: [ "**" ],
                dest: "dist/"
            }
        },

        uglify: {
            options: {
                banner: "/*! <%=pkg.name %> | <%= pkg.version %> | <%= grunt.template.today('yyyy-mm-dd') %> */\n"
            },
            main: {
                files: [
                    {
                        expand: true,
                        cwd: "dist/",
                        src: [ "**/*.js" ],
                        dest: "dist/",
                        ext: ".min.js",
                        extDot: "last"
                    }
                ]
            }
        },

        qunit: {
            all: [ "test/unit/**/*.html" ]
        }

    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-qunit");

    grunt.registerTask("default", ["clean", "copy", "uglify"]);
    grunt.registerTask("test", ["qunit"]);

};
