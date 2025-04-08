document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addcourseform');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();
        const rating = 0;
        const price = parseFloat(document.getElementById("price").value);
        const instructor = localStorage.getItem('username')
        const playlist = document.getElementById("playlist").value.trim();
        const material = document.getElementById("material").value.trim();
        const exam1 = document.getElementById("exam1").value.trim();
        const exam2 = document.getElementById("exam2").value.trim();
        const progress = document.getElementById("progress").value.trim();
        const errorElement = document.getElementById("error");

        // Clear previous errors
        errorElement.textContent = "";

        // Validate the form data
        if (!title || !description || isNaN(price) || !instructor || !playlist || !material || !exam1 || !exam2 || !progress ) {
            errorElement.textContent = "All fields are required.";
            return;
        }

        const courseData = {
            title,
            description,
            rating,
            price,
            instructor,
            playlist,
            material,
            exam1,
            exam2,
            progress
        };

        fetch('http://localhost:3000/add-course', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(courseData),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to add course.");
            }
            return response.text();
        })
        .then((message) => {
            alert(message);
            window.location.href = "index.html"
        })
        .catch((error) => {
            console.error("Error:", error);
            errorElement.textContent = "Failed to add course.";
        });
    });
});