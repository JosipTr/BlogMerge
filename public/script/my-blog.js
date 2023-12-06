const deleteBtn = document.querySelectorAll(".button-46");

deleteBtn.forEach((button) => {
  button.addEventListener("click", (event) => {
    const postId = event.target.value;
    const url = "/blog/" + postId;

    fetch(url, {
      method: "DELETE",
    })
      .then((result) => {
        result.json().then((result) => {
          console.log(result);
          const post = button.closest(".post-item");
          return post.remove(post);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});