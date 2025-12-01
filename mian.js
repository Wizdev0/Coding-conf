/* DRAG AND DROP AREA */
const dropArea = document.getElementById("dropArea");
const preview = document.getElementById("preview");
const changeBtn = document.getElementById("changeBtn");
const removeBtn = document.getElementById("removeBtn");
const previewImg = document.getElementById("previewImg");
const fileInput = document.getElementById("fileInput");
const first = document.getElementById("first");
const formQuestion = document.getElementById("formQuestion");

//Error and Nice option
const errorMessOne = document.getElementById("errorMessOne");
const infoOne = document.getElementById("infoOne");

// VALIDATION 
//check if it's an image
function validateFile(file) {
    if(!file.type.startsWith("image/")) {
        alert("only images are allowed");
        location.reload();
        return false;
    }

   // check for image size
      const maxSize = 2 * 1024 * 1024;

      if(file.size > maxSize) {
      /*   location.reload(); */
      errorMessOne.style.display = "flex";
      infoOne.style.display = "none"; 
      dropArea.style.borderColor = "grey";
      preview.style.display = "none";
      first.style.display = "block";

      return false;
    } 

    return true;

}


const input = document.querySelector('input[type="file"]');
// selecting manually
fileInput.addEventListener("change", function () {
    showPreview(this.files[0]);

    const file = fileInput.files[0];
    if(!validateFile(file)) {
        fileInput.value = "";
        return;
    }
});

// drag over
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.style.borderColor = "blue";
});

//drag leave 
dropArea.addEventListener("dragleave", () => {
    dropArea.style.borderColor = "blue";
});

// drop 
dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.style.borderColor = "blue";

    const file = e.dataTransfer.files[0];

    if(!validateFile(file)) return;

    showPreview(file);
});

function showPreview(file) {
    if(!file.type.startsWith("image/")) return;

    previewImg.src = URL.createObjectURL(file);
    preview.style.display = "block";
    first.style.display = "none";
    errorMessOne.style.display = "none";
    infoOne.style.display = "flex"; 

}

function buttonError(file) {
    if(!file.type.startsWith("image/")) return;

    dropArea.style.borderColor = "red";
}

removeBtn.addEventListener("click", () => {
    previewImg.src = "";
    first.style.display = "block";
    preview.style.display = "none";
});

changeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fileInput.click();
    showPreview(file);

    const file = e.dataTransfer.files[0];

    if(!validateFile(file)) return;
});



// FULLNAME

const fullName = document.getElementById("fullName");

const nameRegex =  /^[A-Za-z]+(?:[ '-][A-Za-z]+)+$/;

fullName.addEventListener("input", () => {
    const nameValue = fullName.value.trim();

    if(!nameRegex.test(nameValue)){
        fullName.style.borderColor = "red"
    } else {
        fullName.style.borderColor = "grey"
    }
});

// EMAIL ADDRESS 

const email = document.getElementById("email");
const emailError = document.getElementById("emailError");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

email.addEventListener("input", () => {
    const emailValue = email.value.trim();

    if(!emailRegex.test(emailValue)){
        email.style.borderColor = "red";
        emailError.style.display = "flex";
    } else {
        email.style.borderColor = "grey";
        emailError.style.display = "none";
    }

});

// GITHUB
const gitHub = document.getElementById("github");

const gitHubRegex = /^@[a-zA-Z0-9._]{1,30}$/;

gitHub.addEventListener("input", () => {
    const gitHubValue = gitHub.value.trim();

    if(!gitHubRegex.test(gitHubValue)) {
        gitHub.style.borderColor = "red";
    } else {
        gitHub.style.borderColor = "grey";
    }
});


/* CHANGE OF PICTURE */

let savedImage = "";

fileInput.addEventListener("change", () => {
     const file = fileInput.files[0];
     if(!file) return;
    const reader = new FileReader();

    reader.onload = () => {
        savedImage = reader.result;
        previewImg.src = savedImage;
    };

    reader.readAsDataURL(file);
});

 
// TICKET TEXT
const  highLight = document.getElementById("highLight");
const emailHigh = document.getElementById("emailHigh");
const githubName = document.getElementById("githubName");
const highLightTwo = document.getElementById("highLightTwo");


/* SUBMIT BUTTON */
const form = document.querySelector(".form-question");
const ticket = document.querySelector(".ticket");
const submitBtn = document.getElementById("submitBtn");
const imageAvatar = document.getElementById("imageAvatar");


submitBtn.addEventListener("click", (e) => {
   
    e.preventDefault();

    /* ERORR MESSAGES */

    const file = fileInput.files[0];
   
    if(fileInput.value.trim() !== ""){

      dropArea.style.borderColor = "blue";

    } else {
        dropArea.style.borderColor = "red";
    }

    dropArea.addEventListener("click", () => {
        dropArea.style.borderColor = "blue";
    });


   // FULL NAME
    const nameValue = fullName.value.trim();

    if(!nameRegex.test(nameValue)){
        fullName.style.borderColor = "red"
    } else {
        fullName.style.borderColor = "grey"
    }

    // EMAIL
    
    const emailValue = email.value.trim();
    if(!emailRegex.test(emailValue)){
        email.style.borderColor = "red";
        emailError.style.display = "flex";
    } else {
        email.style.borderColor = "grey";
        emailError.style.display = "none";
    }

    // GITHUB
    const gitHubValue = gitHub.value.trim();

    if(!gitHubRegex.test(gitHubValue)) {
        gitHub.style.borderColor = "red";
    } else {
        gitHub.style.borderColor = "grey";

    } 

    if (
       gitHubRegex.test(gitHubValue) &&
       emailRegex.test(emailValue) &&
       nameRegex.test(nameValue)
    ) {
        form.style.display = "none"
        ticket.style.display = "block";
    }


    /* SWITCH TO SECOND PAGE */
  
    imageAvatar.src = savedImage;
    imageAvatar.style.display = "block";


    highLight.textContent = fullName.value || "no name";
    highLightTwo.textContent = fullName.value || "no name";
    emailHigh.textContent = email.value || "no email";
    githubName.textContent = gitHub.value || "no github";

    function randomDigits(length = 5) {
        let output = "";
        for(let i = 0; i < length; i++){
            output += Math.floor(Math.random() *10);
        } 
        document.getElementById("digits").textContent = "#" + output;
    }

    randomDigits();
  
    
});
  
  


