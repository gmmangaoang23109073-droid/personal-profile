import { db, collection, addDoc } from "./firebase.js";

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {

        await addDoc(
            collection(db, "messages"),
            {
                name,
                email,
                message,
                date: new Date()
            }
        );

        document.getElementById("status").innerText =
            "Message sent successfully!";

        form.reset();

    } catch (error) {

        document.getElementById("status").innerText =
            "Error sending message.";

        console.error(error);

    }

});