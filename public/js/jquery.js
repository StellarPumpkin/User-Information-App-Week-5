$(document).ready(() => {
    //POST

    let start = Date.now();

    $('#searchId').keyup(() => {
        let inputValue = $('#searchId').val().toLowerCase();

        if ((Date.now() - start) > 300) {
            //console.log('This is inputValue: ' + inputValue);
            $.ajax({
                type: 'POST',
                url: '/ajaxcall',
                data: {
                    name: inputValue
                },
            }).done((response) => {

                $('#listOfNames').empty();
                for (let i in response) {
                    $('#listOfNames').append('<li>' + response[i].firstname + response[i].lastname + '</li>');
                }
            });
            start = Date.now();

        }
    })
})