function initSubmitContact() {
    const $form = $('#contact-form');
    const $success = $('#success-message');
    const $error = $('#error-message');

    if (!$form.length) return;

    function alertRequired(fieldName, selector) {
        alert(fieldName + ' is required.');
        if (selector) {
            $(selector).focus();
        }
    }

    $form.on('submit', function (event) {
        event.preventDefault();

        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const subject = $('#subject').val().trim();
        const projectType = $('#project-type').val().trim();
        const message = $('#Message').val().trim();

        let isValid = true;

        function validateEmail(email) {
            const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return pattern.test(email);
        }

        if (name === "") {
            alertRequired('Full Name', '#name');
            return;
        }
        if (email === "") {
            alertRequired('Email Address', '#email');
            return;
        }
        if (subject === "") {
            alertRequired('Subject', '#subject');
            return;
        }
        if (projectType === "") {
            alertRequired('Service Needed', '#project-type');
            return;
        }
        if (message === "") {
            alertRequired('Message', '#Message');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid Email Address.');
            $('#email').focus();
            isValid = false;
        }

        if (isValid) {
            // Submit form data to Web3Forms API
            const formData = new FormData($form[0]);
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    $success.removeClass('hidden');
                    $form[0].reset();
                    $('.selected-text').text("Project Type");
                    setTimeout(() => {
                        $success.addClass('hidden');
                    }, 3000);
                } else {
                    $error.removeClass('hidden');
                    setTimeout(() => {
                        $error.addClass('hidden');
                    }, 3000);
                }
            })
            .catch(err => {
                $error.removeClass('hidden');
                setTimeout(() => {
                    $error.addClass('hidden');
                }, 3000);
            });
        } else {
            $error.removeClass('hidden');

            setTimeout(() => {
                $error.addClass('hidden');
            }, 3000);
        }
    });
}
