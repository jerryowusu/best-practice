import TodoList from './taskClass.js';

export const todo = new TodoList();
const listSection = document.querySelector('.list-section');
export const createTodo = () => {
  listSection.replaceChildren();
  if (todo.allTodos.length > 0) {
    listSection.style.display = 'block';
    const listContainer = document.createElement('ul');
    listContainer.className = 'allTodos';
    listSection.appendChild(listContainer);
    todo.allTodos.map((a) => {
      const list = document.createElement('li');
      list.className = 'todo';

      const descrptContainer = document.createElement('div');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = 'checkbox';
      if (a.completed === true) { checkbox.checked = 'checked'; }

      checkbox.onclick = (e) => {
        todo.completedTodo(e.target.checked, a.index);
      };

      descrptContainer.appendChild(checkbox);

      const descrpt = document.createElement('p');
      descrpt.id = 'task-description';
      descrpt.textContent = a.description;
      descrptContainer.appendChild(descrpt);
      list.appendChild(descrptContainer);

      const dragIcon = document.createElement('i');
      dragIcon.className = 'fa fa-ellipsis-v';
      list.appendChild(dragIcon);

      const deleteIcon = document.createElement('i');
      deleteIcon.className = 'fa fa-times';
      deleteIcon.id = a.index;

      list.onclick = () => {
        descrpt.contentEditable = 'true';
        dragIcon.style.display = 'none';
        list.style.backgroundColor = 'greenyellow';
        list.appendChild(deleteIcon);
        descrpt.addEventListener('keydown', () => {
          const newValue = descrpt.innerHTML.trim();
          todo.editTodo(newValue, a.index);
        });
      };

      deleteIcon.onclick = () => {
        todo.deleteTodo(a.index);
        todo.saveTodo();
        createTodo();
      };
      listContainer.append(list);
      return list;
    });
    listSection.appendChild(listContainer);
  }
};
