window.addEventListener("load", () => {
    document.querySelector(".main").classList.remove("hidden");
    document.querySelector(".home-section").classList.add("active");

    /*******Page Loader *******/
    document.querySelector(".page-loader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".page-loader").style.display = "none";
    }, 600);
})



/******   Toggle NAvbar   ******/
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", () => {
    hideSection();
    toggleNavbar();
    document.body.classList.toggle("hide-scrolling");
})
function hideSection() {
    document.querySelector("section.active").classList.toggle("fade-out")
}
function toggleNavbar() {
    document.querySelector(".header").classList.toggle("active");
}

/******    Active Section    ******/
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("link-item") && e.target.hash !== "") {
        //activating the overlay to prevent multiple clicks
        document.querySelector(".overlay").classList.add("active");
        navToggler.classList.add("hide");
        if (e.target.classList.contains("nav-item")) {
            toggleNavbar();
        }
        else {
            hideSection();
            document.body.classList.add("hide-scrolling");
        }
        setTimeout(() => {
            document.querySelector("section.active").classList.remove("active", "fade-out");
            document.querySelector(e.target.hash).classList.add("active");
            window.scrollTo(0, 0);
            document.body.classList.remove("hide-scrolling");
            navToggler.classList.remove("hide");
            document.querySelector(".overlay").classList.remove("active");
        }, 500);
    }
});


/* ------ About Tab ------- */
const tabsContainer = document.querySelector(".about-tabs"),
    aboutSection = document.querySelector(".about-section");

tabsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("tab-item") && !e.target.classList.contains("active")) {
        tabsContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const target = e.target.getAttribute("data-target");

        aboutSection.querySelector(".tab-content.active").classList.remove("active");
        aboutSection.querySelector(target).classList.add("active");
    }
});

/***** Portfolio item details popup ******/
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-project-btn")) {
        togglePortfolioPopup();
        document.querySelector(".portfolio-popup").scrollTo(0, 0);
        portfolioItemDetails(e.target.parentElement);
    }
})
function togglePortfolioPopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open")
    document.body.classList.toggle("hide-scrolling");
    document.querySelector(".main").classList.toggle("fade-out");
}
document.querySelector(".pp-close").addEventListener("click", togglePortfolioPopup);

//Hide popup when clicking outside of it 
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("pp-inner")) {
        togglePortfolioPopup();
    }
})


function portfolioItemDetails(portfolioItem) {
    document.querySelector(".pp-thumbnail img").src = portfolioItem.querySelector(".portfolio-item-thumbnail img").src;

    document.querySelector(".pp-header h3").innerHTML = portfolioItem.querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-body").innerHTML = portfolioItem.querySelector(".portfolio-item-details").innerHTML;
}

/*===== Typing Animation =====*/
var typed = new Typed(".typing", {
    strings: ["", "Web Developer", "Graphic Designer", "Digital Marketer"],
    typeSpeed: 120,
    BackSpeed: 30,
    loop: true
})




// Form Submission
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Validate inputs
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var messageInput = document.getElementById("message");

    if (!validateName(nameInput.value)) {
        alert("Please enter a valid name.");
        nameInput.focus();
        return;
    }

    if (!validateEmail(emailInput.value)) {
        alert("Please enter a valid email address.");
        emailInput.focus();
        return;
    }

    if (!validateMessage(messageInput.value)) {
        alert("Please Your message should be atleast 10 characters");
        messageInput.focus();
        return;
    }

    // Submit the form
    var form = this;
    var submitButton = form.querySelector("button[type=submit]");
    submitButton.disabled = true; // Disable the submit button to prevent multiple submissions

    fetch(form.action, {
        method: form.method,
        body: new FormData(form)
    })
        .then(function (response) {
            if (response.ok) {
                show_success_alert();
                form.reset();
            } else {
                show_Err_alert("An error occurred while submitting the form.");
                
            }
        })
        .catch(function (error) {
            error = error.message
            show_Err_alert(error)
            submitButton.disabled = false; // Enable the submit button
        });
});

function validateName(name) {
    // Perform name validation logic
    return name.trim().length > 2;
}

function validateEmail(email) {
    // Perform email validation logic
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMessage(message) {
    // Perform message validation logic
    return message.trim().length > 10;
}


//Alert Modal
document.addEventListener('click', function(event) {
    if (event.target.matches('.alert_footer .close')) {
      var alertContainer = event.target.closest('.alert_container');
      var alertModal = alertContainer.closest('.alert_modal');
      alertContainer.remove();
      alertModal.remove();
    } else if (event.target.matches('.alert_footer .accept')) {
      var alertContainer = event.target.closest('.alert_container');
      var alertModal = alertContainer.closest('.alert_modal');
      alertContainer.remove();
      alertModal.remove();
      accept();
    }
  });
  
const New = {
    status: 'success',
    title: '',
    content: '',
    alert: function ({ status, title, content, confirmbtn = true }) {
        var title;
        var status;
        var content;
        var modal = document.createElement('section');
        modal.setAttribute('class', 'alert_modal');
        document.body.append(modal);
        var alert = document.createElement('div');
        alert.setAttribute('class', 'alert_container');
        modal.appendChild(alert);
        if (title == '' || title == null) {
            title = this.title;
        } else {
            title = title
        }
        if (status == '' || status == null) {
            status = this.status;
        } else {
            status = status;
        }
        if (content == '' || content == null) {
            content = this.content;
        } else {
            content = content
        }
        alert.innerHTML = `
         <div class="alert_heading"></div>
    <div class="alert_details">
        <h2>
          ${title}
        </h2>
        <p>
            ${content}

        </p>
    </div>
    <div class="alert_footer"></div>
         ` ;



        var alert_heading = document.querySelector('.alert_heading');
        var alert_footer = document.querySelector('.alert_footer');
        if (status == '' || status == 'success') {
            alert_heading.innerHTML = `
            <svg width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M8 12L11 15L16 10"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;0"/></path></g></svg>
            `;
            alert_footer.innerHTML = `
         <span class="close" title="Ok">
          Ok
        </span>
         `;
            alert_heading.style = 'background: linear-gradient(80deg, #67FF86, #1FB397);';
            document.querySelector('.alert_details > h2').style.color = '#1FB397';
        } else if (status == 'danger' || status == 'error') {
            alert_heading.innerHTML = `
            <svg width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M12 12L16 16M12 12L8 8M12 12L8 16M12 12L16 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"/></path></g></svg>
            `;
            alert_footer.innerHTML = `
         <span class="close" title="Ok">
          Ok
        </span>
         `;
            alert_heading.style = ' background: linear-gradient(80deg, #FF6767, #B31F1F);';
            document.querySelector('.alert_details > h2').style.color = '#B31F1F';
        } else if (status == 'info' || status == 'confirm') {
            alert_heading.innerHTML = `
            <svg width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="20" stroke-dashoffset="20" d="M8.99999 10C8.99999 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10C15 10.9814 14.5288 11.8527 13.8003 12.4C13.0718 12.9473 12.5 13 12 14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.4s" values="20;0"/></path></g><circle cx="12" cy="17" r="1" fill="white" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="1s" dur="0.2s" values="0;1"/></circle></svg>
            `;
            confirmbtn == true ?
                alert_footer.innerHTML = `
         <span class="accept" title="I approve">
          I approve
        </span>
        <span class="close" title="I refuse">
          I refuse
        </span>
         `
                :
                alert_footer.innerHTML = `
        <span class="close" title="Ok">
       Ok
        </span>
         `
                ;
            alert_heading.style = 'background: linear-gradient(80deg, #7ED1FF, #484B95);';
            document.querySelector('.alert_details > h2').style.color = '#484B95';
        }
        // document.querySelector('.alert_footer .close').addEventListener('click', function () {
        //     alert.remove();
        //     modal.remove();
        // })
        // document.querySelector('.alert_footer .accept').addEventListener('click', function () {
        //     alert.remove();
        //     modal.remove();
        // })
        // document.querySelector('.alert_footer .accept').onclick = accept;

    }
}
function show_confirm_alert() {
    New.alert({
        status: 'info',
        title: 'Site administrator account',
        content: 'This account is the administrator of the site and not everyone has access to it !!!',
        confirmbtn: false
    });
}
function show_info_alert() {
    New.alert({
        status: 'info',
        title: 'You confirm to delete this account',
        content: 'Do you really want to delete this account forever?',
        confirmbtn: true
    });
}
function accept() {
    New.alert({
        status: 'success',
        title: 'successful',
    });
}

function show_Err_alert(error) {
    New.alert({
        status: 'error',
        title: 'An Error occured',
        content: error,
    })
}
function show_success_alert() {
    New.alert({
        status: 'success',
        title: 'Message Successful',
        content: 'Your message have been sent successfully',
    })
}

