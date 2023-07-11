puts "hello world"

sum = 4 + 4
subtraction = 4 - 2
division = 3 / 5
multiplication = 3 * 8
modulus = 89 % 7
exponention = 4 ** 7

puts "sum: #{sum}"
puts "subdraction #{subtraction}"
puts "division #{division}"
puts "multiplication #{multiplication}"
puts "modulus #{modulus}"
puts "exponention #{exponention}"

formatter = "%{sum} %{subtraction}"

puts formatter % {
    sum: sum,
    subtraction: subtraction
}

class Person
    @@created_instances = 0 

    def self.show_num_of_instances 
        puts "Created: #{@@created_instances}"
    end

    def initialize(name, age) 
        @name = name
        @age = age
        @@created_instances += 1
    end

    def introduce 
        puts "Hi! My name is #{@name}, I am #{@age} year old."
    end
end

john = Person.new("John", 40)
john.introduce

bill = Person.new("Bill", 34)
bill.introduce

Person.show_num_of_instances

arr = ["foo", "bar", "baz"]

arr.each do |i| 
    puts i
end

puts 'single #{4 + 5} quote'

map = {
    "primary" => "black",
    "secondary" => "gray",
    "ternary" => "white"
}

map.each do |k,v| 
    puts "key #{k}, value #{v}"
end

(1..10).each do |n| 
    puts n
end