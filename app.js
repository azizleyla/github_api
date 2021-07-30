

const githubForm = document.getElementById('github-form');
const nameInput = document.getElementById('githubname');
const clearLastUsers = document.getElementById('clear-last-users');
const lastUsers = document.getElementById('last-users');
const github = new Github();
const ui = new UI();
// const storage = new Storage();

eventListeners();
function eventListeners() {
    githubForm.addEventListener('submit', getData);
    clearLastUsers.addEventListener('click', clearAllSearched);
    document.addEventListener('DOMContentLoaded', getAllSearched)
}

function getData(e) {

    let username = nameInput.value.trim();
    if (username === "") {
        alert('Lutfen gecerli bir kullanici adi giriniz');
    } else {
        github.getGithubData(username).then(res => {
            if (res.user.message === 'Not Found') {
                ui.showErrorMessage("Kullanici bulunamadi");
            } else {
                ui.addSearchedUserstoUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(res.user);
                ui.showRepoInfo(res.repo)
            }
        }).catch(err => ui.showErrorMessage(err));
    }
    ui.clearInput();//input temizleme
    e.preventDefault()
}

function clearAllSearched() {
    if (confirm("Eminmisiniz")) {
        Storage.clearAllSearchedFromStorage()
        ui.clearAllSearchedFromUI()
    }
}

function getAllSearched() {
    let users = Storage.getSearchedUsersFromStorage();
    let results = "";

    users.forEach(user => {
        results += `<li class="list-group-item">${user}</li>`
    })
    lastUsers.innerHTML = results;
}
