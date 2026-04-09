function addPost() {
    let input = document.getElementById("postInput");
    let postText = input.value;

    if (postText === "") return;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(postText);

    localStorage.setItem("posts", JSON.stringify(posts));

    displayPosts();
    input.value = "";
}

function displayPosts() {
    let postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.forEach((post, index) => {
        let postDiv = document.createElement("div");
        postDiv.className = "post";

        let text = document.createElement("span");
        typeEffect(text, post);

        let btnContainer = document.createElement("div");
        btnContainer.className = "post-buttons";

        // 🗑 Delete button
        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "delete-btn";
        delBtn.onclick = function () {
            posts.splice(index, 1);
            localStorage.setItem("posts", JSON.stringify(posts));
            displayPosts();
        };

        // ✏️ Edit button
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.onclick = function () {
            let newText = prompt("Edit your post:", post);
            if (newText !== null && newText !== "") {
                posts[index] = newText;
                localStorage.setItem("posts", JSON.stringify(posts));
                displayPosts();
            }
        };

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(delBtn);

        postDiv.appendChild(text);
        postDiv.appendChild(btnContainer);

        postsDiv.appendChild(postDiv);
    });
}

function createParticles() {
    const container = document.getElementById("particles");

    for (let i = 0; i < 15; i++) {
        let particle = document.createElement("div");
        particle.className = "particle";

        particle.style.left = Math.random() * 100 + "vw";
        particle.style.animationDuration = (5 + Math.random() * 10) + "s";
        particle.style.opacity = Math.random();

        container.appendChild(particle);
    }
}

createParticles();

// Load posts when page opens
window.onload = function() {
    displayPosts();
};

function typeEffect(element, text) {
    let i = 0;
    element.textContent = "";

    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, 20);
        }
    }

    typing();
}