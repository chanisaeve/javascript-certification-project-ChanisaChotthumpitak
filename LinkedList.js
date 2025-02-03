// Necessary Imports (you will need to use this)
const { Student } = require('./Student')
const fs = require('fs').promises;

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList 

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    // TODO
    const studentObject = new Node(newStudent);

    if (this.head === null) {
      this.head = studentObject;
      this.tail = studentObject;
      this.length++;
    }

    else{
      this.tail.next = studentObject;
      this.tail = studentObject;
      this.length++;
    }

  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // TODO
    if (this.head === null) {
      return;
    }
    
    if (this.head.data.getEmail() === email){
      this.head = this.head.next;
      this.length--;
      return;
      }


    let current = this.head;
      while (current.next !== null) {
        if (current.next.data.getEmail() === email){
          current.next = current.next.next;
          this.length--;
          return; 
        }
      current = current.next;
      }
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO
    if (this.head === null){
      return -1;
    }
    let current = this.head;
    while (current !== null){
      if (current.data.getEmail() === email){
        return current.data;
      }
      current = current.next;
    }
    return -1
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO
    if (this.head === null) {
      return "";
  }

  let names = [];  // Use array instead of string
  let current = this.head;

  while (current !== null) {
      names.push(current.data.getName());
      current = current.next;
  }
  return names.join(", ");
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  sortStudentsByName() {
    // TODO
    if (this.head === null) {
      return [];
  }

    let nameAlphabet = [];
    let current = this.head;
    while (current !== null){
      nameAlphabet.push(current.data);
      current = current.next
    }

    nameAlphabet.sort((a, b) =>{
     return a.getName().localeCompare(b.getName());

    });

    return nameAlphabet;
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO
    if (this.head === null) {
      return [];
    }

    let studentsSpecialization = [];
    let current = this.head;

    while (current !== null){
      if (current.data.getSpecialization() === specialization){
          studentsSpecialization.push(current.data);
      }
      current = current.next;
    }

    studentsSpecialization.sort((a, b) => {
        return a.getName().localeCompare(b.getName());
      });

      return studentsSpecialization;

    }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinYear(minYear) {
    // TODO
    if (this.head === null) {
      return [];
  }

  let studentYear = [];
  let current = this.head;

  while (current !== null) {                                //while current has data 
      if (current.data.getYear() >= minYear) {              //if year of current is greater or equal input (minYear)
          studentYear.push(current.data);                   //pick current to StudentYear array
      }
      current = current.next;           //point to the next node
  }

  studentYear.sort((a, b) => a.getName().localeCompare(b.getName()));          //if wanna sort by then use the command 'getYear'

  return studentYear;
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    // TODO
    let dataStudent = [];
    let current = this.head;

    while (current !== null){
      dataStudent.push({
        name: current.data.getName(),
        year: current.data.getYear(),
        email: current.data.getEmail(),
        specialization: current.data.getSpecialization(),
      });
      current = current.next;
    }


  try {
    await fs.writeFile(fileName, JSON.stringify(dataStudent, null, 2));
    }
  catch (error) {
      console.log ('Error saving to file:', error);
    }
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    // TODO
    try {
      const fileData = await fs.readFile (fileName, 'utf8');
      const dataStudent = JSON.parse(fileData);
      this.clearStudents();

      for (const student of dataStudent){
        const newStudent = new Student(
          student.name,
          student.year,
          student.email,
          student.specialization);

      this.addStudent(newStudent);
      }

    }
    catch (error) {
      console.error ('Error loading file:', error);
    }
  }
}
module.exports = { LinkedList }
