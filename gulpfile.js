const gulp = require('gulp')
const fileinclude = require('gulp-file-include')
const server = require('browser-sync').create()
const { watch, series } = require('gulp')
const sass = require('gulp-sass') (require('sass'));
sass.compiler = require('node-sass')
const services = require('./data/services.json')


const paths = {
	scripts: {
		src: './',
		dest: './build/',
	},
	assets: {
		src: './',
		dest: './build/assets',
	},
}

async function includeHTML() {
	return gulp
		.src([
			'src/pages/*',
			'!header.html', // ignore
			'!footer.html', // ignore
		])
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file',
				context: {
					services
				}
			})
		)
		.pipe(gulp.dest(paths.scripts.dest))
}

// Sass compiler
async function compileSass() {
	gulp
		.src('./src/assets/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('src/assets/css'))
}

// Reload Server
async function reload() {
	server.reload()
}

// Copy assets after build
async function copyAssets() {
	gulp.src(['src/assets/**/*']).pipe(gulp.dest(paths.assets.dest))
}

async function buildAndReload() {
	await includeHTML()
	await copyAssets()
	reload()
}

exports.includeHTML = includeHTML
exports.default = async function () {
	// Init serve files from the build folder
	server.init({
		server: {
			baseDir: paths.scripts.dest,
		},
	})
	
	watch('./src/assets/sass/**/*.scss', series(compileSass))
	// Build and reload at the first time
	buildAndReload()
	// Watch task
	watch(['src/pages/*', 'src/assets/**/*', 'src/partials/**'], series(buildAndReload))
}
