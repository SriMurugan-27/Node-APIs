const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id'); // Get 'id' from URLSearchParams
let tempName

const showTask = async () => {
  try {
    const response = await axios.get(`/api/v1/tasks/${id}`);
    const task = response.data[0]; // Extract 'task' from response.data
    // console.log(task)
    const { _id: taskID, completed, name } = task;

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
}

// Pass the 'id' obtained from URLSearchParams to the showTask function
showTask(); // Pass 'id' obtained from URLSearchParams to showTask function



editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...';
  e.preventDefault();
  try {
    const taskName = taskNameDOM.value;
    const taskCompleted = taskCompletedDOM.checked;

    const response = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    });

    const { _id: taskID, completed, name } = response.data;

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    taskCompletedDOM.checked = completed; // Update task completed status

    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = 'Success! Task edited';
    formAlertDOM.classList.add('text-success');
  } catch (error) {
    console.error(error);
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = 'Error! Please try again';
    formAlertDOM.classList.remove('text-success');
  } finally {
    editBtnDOM.textContent = 'Edit';
    setTimeout(() => {
      formAlertDOM.style.display = 'none';
    }, 3000);
  }
});

