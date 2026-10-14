let bookmarks = JSON.parse(localStorage.getItem('myBookmarks')) || [];

const allView = document.getElementById('all-view');
const addView = document.getElementById('add-view');
const navAll = document.getElementById('nav-all');
const navAdd = document.getElementById('nav-add');
const bookmarkList = document.getElementById('bookmark-list');
const emptyState = document.getElementById('empty-state');
const bookmarkForm = document.getElementById('bookmark-form');
const titleInput = document.getElementById('title');
const urlInput = document.getElementById('url');
const categorySelect = document.getElementById('category');
const bookmarkIndexInput = document.getElementById('bookmark-index');
const formTitleHeading = document.getElementById('form-title-heading');
const submitBtn = document.getElementById('submit-btn');

function router() {
    const hash = window.location.hash || '#all';

    allView.classList.remove('active-view');
    addView.classList.remove('active-view');
    navAll.classList.remove('active');
    navAdd.classList.remove('active');

    if (hash === '#add') {
        addView.classList.add('active-view');
        navAdd.classList.add('active');
    } else {
        allView.classList.add('active-view');
        navAll.classList.add('active');
        renderBookmarks();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('myBookmarks', JSON.stringify(bookmarks));
}

function renderBookmarks() {
    bookmarkList.innerHTML = '';

    if (bookmarks.length === 0) {
        emptyState.style.display = 'block';
        return;
    } else {
        emptyState.style.display = 'none';
    }

    bookmarks.forEach((bookmark, index) => {
        const li = document.createElement('li');

        const infoDiv = document.createElement('div');
        infoDiv.className = 'bookmark-info';

        const link = document.createElement('a');
        link.href = bookmark.url;
        link.textContent = bookmark.title;
        link.target = '_blank';

        const span = document.createElement('span');
        span.className = 'category-tag';
        span.textContent = bookmark.category;

        infoDiv.appendChild(link);
        infoDiv.appendChild(span);
        li.appendChild(infoDiv);

        const actionsDiv = document.createElement('div');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            prepareEditBookmark(index);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            deleteBookmark(index);
        });

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);
        li.appendChild(actionsDiv);

        bookmarkList.appendChild(li);
    });
}

bookmarkForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const url = urlInput.value;
    const category = categorySelect.value;
    const editingIndex = bookmarkIndexInput.value;

    if (editingIndex === "") {
        bookmarks.push({ title, url, category });
    } else {
        bookmarks[editingIndex] = { title, url, category };
        bookmarkIndexInput.value = "";
        formTitleHeading.textContent = "Add a New Bookmark";
        submitBtn.textContent = "Save Bookmark";
    }

    saveToLocalStorage();
    bookmarkForm.reset();
    window.location.hash = '#all';
});

function prepareEditBookmark(index) {
    const bookmark = bookmarks[index];
    
    titleInput.value = bookmark.title;
    urlInput.value = bookmark.url;
    categorySelect.value = bookmark.category;
    bookmarkIndexInput.value = index;

    formTitleHeading.textContent = "Edit Bookmark";
    submitBtn.textContent = "Update Bookmark";

    window.location.hash = '#add';
}

function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    saveToLocalStorage();
    renderBookmarks();
}

window.addEventListener('hashchange', router);

window.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hash) {
        window.location.hash = '#all';
    } else {
        router();
    }
});