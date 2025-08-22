class Animal {
  public name: string
  private age: number
  protected species: string

  constructor(name: string, age: number, species: string) {
    this.name = name
    this.age = age
    this.species = species
  }

  public getAge(): number {
    return this.age // 可以在类内部访问 private 成员
  }
}

class Dog extends Animal {
  constructor(name: string, age: number, species: string) {
    super(name, age, species)
  }

  public getSpecies(): string {
    return this.species // 可以在子类中访问 protected 成员
  }
}

const dog = new Dog('Buddy', 3, 'Canine')
console.log(dog.name) // 输出 "Buddy"
// console.log(dog.age); // 错误: 不能在类外部访问 private 成员
// console.log(dog.species); // 错误: 不能在类外部访问 protected 成员
