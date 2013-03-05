//////////////
// Database //
//////////////

// Create an empty array called tasks, or if we have our tasks stored, call that array
if (!localStorage.getItem('tasks', JSON.stringify(tasks))) {
    var tasks = [];
} else {
    getTasks();
}

/////////////////
// Controllers //
/////////////////

// Refresh View
function getTasks() {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

function updateTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Object constructer for Task items
function taskItem(name) {
    this.name = name;
}

// Add a new task item to our task list
function addTaskItem(name) {
    tasks.push(new taskItem(name));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshView();
}

// Form for Adding New Items to Task List
$(document).on('submit', 'form', function() {

    // Get our values
    var name = $('.item-name').val();

    // Stop blank values
    if (name.length === 0) {
        // ADD IN ERROR MESSAGE
         $('.item-name').attr('placeholder', 'What\'s your task?').addClass('error');
        return false;
    }

    else {
        // Add our task Item
        addTaskItem(name);
         $('.item-name').val('');
        return false;
    }

});

// Delete a task item
function deleteTaskItem(id) {
    id = id-1;
    tasks.splice(id,1);
    updateTasks();
    refreshView();
    if (totalItems() === 0) {
        buildTemplate('.tasks', tasksCompleteTemplate);
    }


}

$(document).on('click', '.task-item-remove .button', function() {

    var id = $(this).closest('.task-item').data('item') + 1;

    $(this).closest('.task-item').fadeOut(function() {
        deleteTaskItem(id);
    });

    return false;

});

// Get our total number of items
function totalItems() {
    return tasks.length;
}

///////////////
// Templates //
///////////////

// Template Builder
function buildTemplate(target, template) {
    $(target).append(template);
}

function tasksTemplate() {

    var template =
    '<div class="tasks">' +
    '<h1 class="main-title">Tasks</h1>' +
    '</div>';

    return template;
}

function taskItemTemplate(id) {

    var template =
    '<div class="task-item" data-item="' + id + '">' +
        '<span class="task-item-name">' + tasks[id].name +
        '</span>' +
        '<span class="task-item-remove"><a href="#" class="button">Delete</a>' +
        '</span>' +
    '</div>';

    return template;
}

function itemAdderTemplate() {

    var template =
    '<form class="item-adder">' +
        '<input class="item-name" placeholder="Your Task...">' +
        '<input type="submit" class="add-item button" value="+ Add Task">' +
    '</form>';

    return template;
}

function initTemplate() {

    var template =
    '<div class="no-items">' +
        '<p>Add your first task here</p>' +
    '</div>';

    return template;
}

function tasksCompleteTemplate() {

    var template =
    '<div class="no-items tasks-complete">' +
        '<p>Tasks complete!</p>' +
    '</div>';

    return template;

}

// Clear template function
function clearTemplate(element) {
    $(element).remove();
}

// Refresh View
function refreshView() {

    // Clear our tasks items
    clearTemplate('.task-item');

    if ($('no-items')) {
        $('.no-items').fadeOut(function() {

            // Clear our no items holder
            clearTemplate('.no-items');

        });
    }
// Build task item template for each task item
    for (var id = 0; id < totalItems(); id++) {
        buildTemplate('.tasks',taskItemTemplate(id));
    }
}

/////////////////////////
// Front End Functions //
/////////////////////////

$(document).ready(function() {

    // Build task template
    buildTemplate('.site-wrapper',tasksTemplate);

    // Build task item template for each task item
    for (var id = 0; id < totalItems(); id++) {
        buildTemplate('.tasks',taskItemTemplate(id));
    }

    buildTemplate('.site-wrapper', itemAdderTemplate);

    // If no items
    if (totalItems() === 0) {

        buildTemplate('.tasks', initTemplate);

    }


});