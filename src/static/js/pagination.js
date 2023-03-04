const urlSearch = new URLSearchParams(location.search);
const projectsBox = document.getElementById('projectsBox');
const paginationBox = document.getElementById('pagination');

const page = urlSearch.get('page') || 1;

if (page === null || page <= 0) {
  page = 1;
}

const prevPage = page >= 10 ? (Math.floor(page / 10) - 1) * 10 + 1 : 1;
let nextPage = (Math.floor(page / 10) + 1) * 10 + 1;

if (page) {
  fetch(`http://localhost:3000/api/projects?page=${page}&site=notices`)
    .then((response) => response.json())
    .then((projectsAndPageArr) => {
      const {
        projects,
        pageInfo: { pageArr, totalPage },
      } = projectsAndPageArr;

      const firstPageBtn = document.createElement('a');
      const lastPageBtn = document.createElement('a');
      const prevPageBtn = document.createElement('a');
      const nextPageBtn = document.createElement('a');

      projects.forEach((project) => {
        const li = document.createElement('li');
        const h1 = document.createElement('h1');
        const p = document.createElement('p');
        const footer = document.createElement('footer');
        const ownerSpan = document.createElement('span');
        const createdAtSpan = document.createElement('span');

        //todo <김우중> <2023.03.03> : 프로필 이미지는 추후 유저 조회 기능이 합쳐졌을 때 추가하겠습니다.
        // const img = document.createElement('img');

        h1.textContent = project.title;
        p.textContent = project.content;

        //todo <김우중> <2023.03.03> : 프로젝트 소유자 칼럼이 추가되면 추가하겠습니다.
        // ownerSpan.textContent = project.owner

        ownerSpan.textContent = '소유자'; //- 임시구현
        createdAtSpan.textContent = project.createdAt;

        footer.append(ownerSpan, createdAtSpan);
        li.append(h1, p, footer);
        projectsBox.appendChild(li);
      });

      firstPageBtn.href = '?page=1&site=notices';
      firstPageBtn.classList.add('fa-solid', 'fa-angles-left');
      lastPageBtn.href = `?page=${totalPage}&site=notices`;
      lastPageBtn.classList.add('fa-solid', 'fa-angles-right');

      if (nextPage > totalPage) {
        nextPage = Math.floor(totalPage / 10) * 10 + 1;
      }

      prevPageBtn.href = `?page=${prevPage}&site=notices`;
      prevPageBtn.classList.add('fa-solid', 'fa-angle-left');
      nextPageBtn.href = `?page=${nextPage}&site=notices`;
      nextPageBtn.classList.add('fa-solid', 'fa-angle-right');

      paginationBox.append(firstPageBtn, prevPageBtn);
      pageArr.forEach((page) => {
        const aTag = document.createElement('a');
        aTag.href = `?page=${page}&site=notices`;
        aTag.textContent = page;
        paginationBox.appendChild(aTag);
      });
      paginationBox.append(nextPageBtn, lastPageBtn);
    });
}
