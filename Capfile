# Load DSL and set up stages
require "capistrano/setup"

# Include default deployment tasks
require "capistrano/deploy"
#require "capistrano/phoenix"
# Include tasks from other gems included in your Gemfile
#
# For documentation on these, see for example:

require "capistrano/scm/git"
install_plugin Capistrano::SCM::Git
#
#   https://github.com/capistrano/rvm
#   https://github.com/capistrano/rbenv
#   https://github.com/capistrano/chruby
#   https://github.com/capistrano/bundler
#   https://github.com/capistrano/rails
#   https://github.com/capistrano/passenger
#
# require 'capistrano/rvm'
# require 'capistrano/rbenv'
# require 'capistrano/chruby'
# require 'capistrano/bundler'
# require 'capistrano/rails/assets'
# require 'capistrano/rails/migrations'
# require 'capistrano/passenger'

# Load custom tasks from `lib/capistrano/tasks` if you have any defined
def from_template file
    tmp_file = "/tmp/#{file}.tmp"
    info "Generating from 'config/deploy/templates/#{file}' to '#{tmp_file}'"
    template = File.read "config/deploy/templates/#{file}"
    result = ERB.new(template).result self.send(:binding)
    File.open(tmp_file, "w"){|f| f.write result }
    tmp_file
end

Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
