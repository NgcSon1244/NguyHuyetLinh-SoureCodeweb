async function loadMarkdown(engine = "marked") {
  try {
    const response = await fetch("readme.md");
    const text = await response.text();
    let html = "";

    if (engine === "marked") {
      html = marked.parse(text);
    } else if (engine === "showdown") {
      const converter = new showdown.Converter();
      html = converter.makeHtml(text);
    } else if (engine === "markdownit") {
      const md = window.markdownit();
      html = md.render(text);
    }

    // sanitize
    document.getElementById("content").innerHTML = DOMPurify.sanitize(html);
  } catch (err) {
    document.getElementById("content").innerHTML = 
      "<p style='color:red'>Không load được Markdown.</p>";
    console.error(err);
  }
}

document.getElementById("engine").addEventListener("change", (e) => {
  loadMarkdown(e.target.value);
});

// mặc định load bằng Marked
loadMarkdown("marked");
