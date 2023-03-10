const editBoardBtn = document.getElementById('edit-board-btn');
const projectEditModal = document.getElementById('projectEditModal');

const postModalData = async () => {
  if (projectEditModal.returnValue === 'register') {
    const title = document.getElementById('edit-title').value;
    const content = document.getElementById('edit-content').value;
    const techStack = document.getElementById('edit-techStack').value;
    const person = document.getElementById('edit-person').value;
    const recruitDeadline = document.getElementById(
      'edit-recruitDeadline'
    ).value;
    const projectStart = document.getElementById('edit-projectStart').value;
    const projectEnd = document.getElementById('edit-projectEnd').value;

    const projectInfo = {
      title,
      content,
      techStack,
      person,
      recruitDeadline,
      projectStart,
      projectEnd,
    };

    const response = await fetch(`/projects/${projectId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectInfo),
    });

    const { status } = response;

    if (status === 200) {
      alert('공고가 수정되었습니다!');
    } else {
      alert('공고 등록에 실패하였습니다!');
    }

    window.location.reload();
  }
};

editBoardBtn.addEventListener('click', () => {
  projectEditModal.showModal();
});

projectEditModal.addEventListener('close', postModalData);