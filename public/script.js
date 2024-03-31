class Craft {
    constructor(id, name, image, description, supplies) {
        this.id = id;
        this.name = name;
        this.image = "images/" + image;
        this.description = description;
        this.supplies = supplies;
    }

    static async fetch(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const craftData = await response.json();
            const craft = craftData.map(craftData => {
                const { id, name, image, description, supplies } = craftData;
                return new Craft(id, name, image, description, supplies);
            });
            return craft;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    get renderCraft() {
        /* Make the main section to hold all the craft info      
           The craft cards are just the image for the craft project, but when clicked on
           they will open a modal lightbox with details about the craft project.
        */
        const craftProject = document.createElement("section");
        craftProject.classList.add("craft-card"); // Flex container for top portion
        const target = "modal-" + this.id;

        // Make the photo of the craft - to the right and is 300px
        const craftPhoto = document.createElement("img");
        craftPhoto.src = this.image;
        craftPhoto.classList.add("photo-craft");
        craftProject.onclick = () => { modalOpen(target); };
        craftProject.appendChild(craftPhoto);

        return craftProject;
    }

    get expandedSection() {
        const craftDetailCard = document.createElement("section");
        const target = "modal-" + this.id
        craftDetailCard.classList.add("w3-modal");
        craftDetailCard.id = target;

        /* Add the main div which will contain the modal */
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("w3-modal-content");
        infoDiv.classList.add("expanded-info");

        /* Add the next div which will contain the Content of the modal */
        const contentDiv = document.createElement("div");
        // contentDiv.classList.add("w3-container");

        /* Add Close Button for Modal */
        const closeButton = document.createElement("span");
        closeButton.classList.add("w3-button");
        closeButton.classList.add("w3-display-topright");
        closeButton.classList.add("close-button");
        closeButton.onclick = () => { modalClose(target); };
        closeButton.innerHTML = "&times;";

        /* Put close button into the container for the expanded info card */
        contentDiv.appendChild(closeButton);

        /* Create an image element for the craft project */
        const craftPhoto = document.createElement("img");
        craftPhoto.src = this.image;
        craftPhoto.classList.add("craft-photo-small");

        /* Create header for the title */
        const heading = document.createElement("h2");
        heading.classList.add("craft-details-header");
        heading.innerText = this.name;

        /* Create the text div and elements */
        const craftDetails = document.createElement("p");
        let craftText = "";
        craftText += "<p>" + this.description + "</p>";
        craftText += "<p><h3>Supplies Needed</h3></p>";
        craftText += "<ul>";
        this.supplies.forEach((craftSupply) => {
            craftText += "<li>" + toTitleCase(craftSupply) + "</li>";
        });
        craftText += "</li>";
        
        craftDetails.innerHTML = craftText;        

        /* Create div to contain the expanded text and image */
        const infoCard = document.createElement("div");
        infoCard.classList.add("craft-details");        
        infoCard.appendChild(heading);
        infoCard.appendChild(craftDetails);

        /* Put InfoCard into the modal content under the close button */        
        contentDiv.appendChild(infoCard);

        /* Add the inside stuff to the modal dialog */
        infoDiv.appendChild(craftPhoto);
        infoDiv.appendChild(contentDiv);
        craftDetailCard.appendChild(infoDiv);

        return craftDetailCard;
    }
}

const modalOpen = (theName) => {
    document.getElementById(theName).style.display = "block";
}

const modalClose = (theName) => {
    document.getElementById(theName).style.display = "none";
}

const loadCraft = async () => {
    const url = "https://node-express-h0b8.onrender.com:3000/api/crafts";
    try {
        const craft = await Craft.fetch(url);
        return await craft;
    } catch (error) {
        console.log(error);
    }
}



// It bugs me when the JSON has lowercase to start the supply names, so this fixes it
const toTitleCase = str => {
    return str.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

const initGallery = async () => {
    let craftArray = await loadCraft();
    let photoGallery = document.getElementById("craft-section");

    if (craftArray !== undefined && craftArray.length > 0) {
        craftArray.forEach((aCraft) => {
            photoGallery.append(aCraft.renderCraft);
            photoGallery.append(aCraft.expandedSection);

        })
    }
}

window.onload = () => {
    initGallery();
};






class Form {
    constructor(id, name, image, description, supplies) {
        this.id = id;
        this.name = name;
        this.image = "images/" + image;
        this.description = description;
        this.supplies = supplies;
    }

    static async fetch(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const craftData = await response.json();
            const craft = craftData.map(craftData => {
                const { id, name, image, description, supplies } = craftData;
                return new Craft(id, name, image, description, supplies);
            });
            return craft;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    get renderForm() {

        const formProject = document.createElement("section");
        formProject.classList.add("form-card"); // Flex container for top portion
        const target = "modal-" + this.id;

        const formPhoto = document.createElement("img");
        formPhoto.src = this.image;
        formPhoto.classList.add("photo-form");
        formProject.onclick = () => { modalOpen(target); };
        formProject.appendChild(formPhoto);

        return formProject;
    }

    get expandedSection() {
        const craftDetailCard = document.createElement("section");
        const target = "modal-" + this.id
        formDetailCard.classList.add("w3-modal");
        formDetailCard.id = target;

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("w3-modal-content");
        infoDiv.classList.add("expanded-info");

        /* Add the next div which will contain the Content of the modal */
        const contentDiv = document.createElement("div");
        // contentDiv.classList.add("w3-container");

        /* Add Close Button for Modal */
        const closeButton = document.createElement("span");
        closeButton.classList.add("w3-button");
        closeButton.classList.add("w3-display-topright");
        closeButton.classList.add("close-button");
        closeButton.onclick = () => { modalClose(target); };
        closeButton.innerHTML = "&times;";

        /* Put close button into the container for the expanded info card */
        contentDiv.appendChild(closeButton);

        /* Create an image element for the craft project */
        const formPhoto = document.createElement("img");
        formPhoto.src = this.image;
        formPhoto.classList.add("form-photo-small");

        /* Create header for the title */
        const heading = document.createElement("h2");
        heading.classList.add("form-details-header");
        heading.innerText = this.name;

        /* Create the text div and elements */
        const formDetails = document.createElement("p");
        let formText = "";
        craftText += "<p>" + this.description + "</p>";
        craftText += "<p><h3>Supplies Needed</h3></p>";
        craftText += "<ul>";
        this.supplies.forEach((formSupply) => {
            formText += "<li>" + toTitleCase(formSupply) + "</li>";
        });
        formText += "</li>";
        
        formDetails.innerHTML = formText;        

        /* Create div to contain the expanded text and image */
        const infoCard = document.createElement("div");
        infoCard.classList.add("craft-details");        
        infoCard.appendChild(heading);
        infoCard.appendChild(craftDetails);

        /* Put InfoCard into the modal content under the close button */        
        contentDiv.appendChild(infoCard);

        /* Add the inside stuff to the modal dialog */
        infoDiv.appendChild(formPhoto);
        infoDiv.appendChild(contentDiv);
        craftDetailCard.appendChild(infoDiv);

        return formDetailCard;
    }
}

const addEditCraft = async (e) => {
    e.preventDefault();
    const form = document.getElementById("craft-form");
    const formData = new FormData(form);
    let response;
    formData.append("supplies", getSupplies());
  
    console.log(...formData);
  
    if (form._id.value.trim() == "") {
      console.log("in post");
      response = await fetch("/api/crafts", {
        method: "POST",
        body: formData,
      });
    } else {

        console.log("in put");
      response = await fetch(`/api/crafts/${form._id.value}`,{
        method:"PUT",
        body:formData
      });
    }
  

const loadForm = async () => {
    const url = "https://node-express-h0b8.onrender.com:3000/api/crafts";
    try {
        const craft = await Form.fetch(url);
        return await Form;
    } catch (error) {
        console.log(error);
    }
}

window.onload = () => {
    initGallery();
};
