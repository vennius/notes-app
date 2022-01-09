const textareaEl = document.querySelectorAll('textarea');
const addBtn = document.querySelector('.add-button');
//const test = document.querySelector('.container');

let notes = document.querySelectorAll('.container');
let saveBtn = document.querySelectorAll('.btn-save');
let editBtn = document.querySelectorAll('.btn-edit');
let deleteBtn = document.querySelectorAll('.btn-min');

check();
reselect();
doEach();
//setInterval(() => {}, );

addBtn.addEventListener('click', () => {
	addNote();
	reselect();
	doEach();
});

function doEach() {
	saveBtn.forEach((save, i) => {
		save.addEventListener('click', (e) => {

			const value = e.target.parentElement.parentElement.querySelector('textarea').value;

			if (value !== '') {
				localStorage.setItem(`note_${i}`, value);
				save.style.transform = 'rotate(360deg)';
				setTimeout(() => {
					save.style.transform = '';
				}, 1000);
			}

		});
	});

	editBtn.forEach(edit => {
		edit.addEventListener('click', (e) => {

			const input = e.target.parentElement.parentElement.querySelector('textarea');
			input.classList.toggle('disabled-input');
			input.parentElement.parentElement.classList.toggle('change-color');
			//reselect();

		});
	});

	deleteBtn.forEach((min, i) => {
		min.addEventListener('click', (e) => {

			localStorage.removeItem(`note_${i}`);
			e.target.parentElement.parentElement.remove();
			reselect();

		});
	});


}

function addNote() {
	const newEl = document.createElement('div');
	newEl.classList.add('container');
	const navbar = document.createElement('div');
	navbar.classList.add('navbar');

	const newSave = document.createElement('div');
	newSave.classList.add('btn-save');
	const newEdit = document.createElement('div');
	newEdit.classList.add('btn-edit');
	const newMin = document.createElement('div');
	newMin.classList.add('btn-min');


	navbar.appendChild(newSave);
	navbar.appendChild(newEdit);
	navbar.appendChild(newMin);

	const newContent = document.createElement('div');
	newContent.classList.add('content');
	const newTextarea = document.createElement('textarea');
	if (arguments[0]) {
		newTextarea.value = arguments[0];
	}

	newContent.appendChild(newTextarea);
	newEl.appendChild(navbar);
	newEl.appendChild(newContent);
	//console.log(arguments);

	document.body.appendChild(newEl);
	doEach();
	reselect();
}

function reselect() {
	notes = document.querySelectorAll('.container');
	saveBtn = document.querySelectorAll('.btn-save');
	editBtn = document.querySelectorAll('.btn-edit');
	deleteBtn = document.querySelectorAll('.btn-min');
	doEach();
}

function check() {
	for (let i = 0; i < 100; i++) {
		if (localStorage.getItem(`note_${i}`)) {
			addNote(localStorage.getItem(`note_${i}`));
			reselect();
			doEach();
		}
	}
}
