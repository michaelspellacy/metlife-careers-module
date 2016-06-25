# Compass configuration file.

# We also support plugins and frameworks, please read the docs http://docs.mixture.io/preprocessors#compass

require 'autoprefixer-rails' # Be sure to install autoprefixer (gem install autoprefixer-rails)

on_stylesheet_saved do |file|

	css = File.read(file)

	File.open(file, 'w') do |io|

		io << AutoprefixerRails.process(css)

	end

end

# Important! change the paths below to match your project setup

http_path = "../"
css_dir = "css"
sass_dir = "build/sass"
images_dir = "img"

sourcemap = true # Enable/Disable CSS source maps

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

output_style = :expanded

line_comments = false # Enable/Disable CSS line comments

cache = false # Enable/Disable .sass-cache
