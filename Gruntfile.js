module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			js: ['public/js'],
			css: ['public/css'],
			img: ['public/img']
		},
		copy: {
			js: {
				files: [
					{expand: true, cwd: 'web/js', src: ['**'], dest: 'public/js'}
				]
			},
			css: {
				files: [
					{expand: true, cwd: 'web/css', src: ['**'], dest: 'public/css'}
				]
			},
			img: {
				files: [
					{expand: true, cwd: 'web/img', src: ['**'], dest: 'public/img'}
				]
			}
		},
		requirejs: {
			options: {
				baseUrl: 'web/js',
				name: 'bower_components/requirejs/require',
				mainConfigFile: 'web/js/main.js',
				include: ['main'],
				findNestedDependencies: false,
				cjsTranslate: false,
				generateSourceMaps: true,
				preserveLicenseComments: false,
				out: 'public/js/build.js'
			},
			dev: {
				options: {
					optimize: 'none'
				}
			},
			prod: {
				options: {
					optimize: 'uglify2'
				}
			}
		},
		watch: {
			js: {
				files: ['web/js/*'],
				tasks: ['clean:js', 'copy:js', 'requirejs:dev']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');


	grunt.registerTask('default', ['clean', 'copy', 'requirejs:dev']);
	grunt.registerTask('prod', ['clean', 'copy', 'requirejs:prod']);
};