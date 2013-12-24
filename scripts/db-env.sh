# script launches irb with loaded models.rb
# don't forget to change path to models.rb if it will change
irb -r "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../app/models.rb"