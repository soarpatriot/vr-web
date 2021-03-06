# config valid only for current version of Capistrano
lock '3.7.0'

set :application, 'vr-web'
set :repo_url, 'git@github.com:soarpatriot/vr-web.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: 'log/capistrano.log', color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('docker-compose.yml','docker/Dockerfile')

# Default value for linked_dirs is []
set :linked_dirs, fetch(:linked_dirs, [])
  .push('node_modules')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 5
# set :phoenix_mix_env -> 'prod' #default fetch(:mix_env)
namespace :deploy do

  after :publishing, :upload do 
    invoke "docker:upload_compose"
    invoke "docker:upload_dockerfile"
  end

  #task :upload do 
  #  invoke "docker:upload_compose"
  #  invoke "docker:upload_docker"
  #end
  task :build do
    on roles(:all), in: :sequence do
      within current_path  do
        execute :"docker", "container prune -f"
        execute :"docker-compose", "down"
        execute :"docker-compose", "up -d"
      end
 
    end
  end
 
  after :published, "build"
  # after :publishing, "build"
  #  after :published, "restart"
  before :cleanup, :change_right

  task :change_right do
    on roles(:all), in: :sequence do
      execute :"sudo", "chown -R #{fetch(:user)}  #{fetch(:deploy_to)}/releases"
      execute :"sudo", "chown -R #{fetch(:user)}  #{fetch(:deploy_to)}/shared/node_modules"
    end
  end
end

