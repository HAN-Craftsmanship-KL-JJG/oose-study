std::vector<Animal*> animals = {new Lion(), new Penguin()};

for (Animal* animal : animals) {
    std::cout << animal->makeSound() << "\n";
}

// Roar
// Squawk
