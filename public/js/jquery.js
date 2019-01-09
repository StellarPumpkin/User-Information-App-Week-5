$(document).ready(() => {
    //POST
    $('#searchId').keyup(() => {

        let inputValue = $('#searchId').val().toLowerCase();

        console.log('This is inputValue: ' + inputValue);
    })
})
//POST
$('#searchId').keyup(() => {

    let inputValue = $('#searchId').val().toLowerCase();

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
})