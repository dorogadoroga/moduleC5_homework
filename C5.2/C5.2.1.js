const xmlString = `<list>
<student>
  <name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
  </name>
  <age>35</age>
  <prof>teacher</prof>
</student>
<student>
  <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
  </name>
  <age>58</age>
  <prof>driver</prof>
</student>
</list>`

const parse = new DOMParser();
const xmlDOM = parse.parseFromString(xmlString, 'text/xml');

const list = xmlDOM.querySelector('list');
const student1 = list.firstElementChild;
const student1_name = student1.querySelector('name');
const student1_first_name = student1_name.querySelector('first');
const student1_second_name = student1_name.querySelector('second');
const student1_age = student1.querySelector('age');
const student1_prof = student1.querySelector('prof');

const student2 = list.lastElementChild;
const student2_name = student2.querySelector('name');
const student2_first_name = student2_name.querySelector('first');
const student2_second_name = student2_name.querySelector('second');
const student2_age = student2.querySelector('age');
const student2_prof = student2.querySelector('prof');2

const student1_lang = student1_name.getAttribute('lang');
const student2_lang = student2_name.getAttribute('lang');

let student1_obj = {
    name: student1_first_name.textContent +' '+ student1_second_name.textContent,
    age: Number(student1_age.textContent),
    prof: student1_prof.textContent,
    lang: student1_lang
};

let student2_obj = {
    name: student2_first_name.textContent +' '+ student2_second_name.textContent,
    age: Number(student2_age.textContent),
    prof: student2_prof.textContent,
    lang: student2_lang
};

let result = {
    list: [student1_obj, student2_obj]
};

console.log(result)
